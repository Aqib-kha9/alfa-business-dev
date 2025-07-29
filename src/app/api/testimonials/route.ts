// /app/api/testimonials/route.ts
import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/app/lib/cloudinary';
import clientPromise from '@/app/lib/mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const title = formData.get('title') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'testimonials',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const { secure_url } = uploadResult as any;

    // ✅ Insert into MongoDB
    const client = await clientPromise;
    const db = client.db();

    const newTestimonial = {
      name,
      email,
      title,
      message,
      image: secure_url,
      status: 'pending', // optional: default value
      creditedAt: new Date(), // this is needed for sorting in GET
    };

    await db.collection('testimonials').insertOne(newTestimonial);

    return NextResponse.json({
      success: true,
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error('❌ API error in POST /api/testimonials:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const testimonials = await db.collection('testimonials').find({}).toArray();

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('GET testimonials error:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
