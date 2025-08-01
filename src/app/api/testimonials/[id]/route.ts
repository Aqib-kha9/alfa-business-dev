import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import cloudinary from '@/app/lib/cloudinary';

type CloudinaryUploadResult = {
  secure_url: string;
};

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const formData = await req.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const title = formData.get('title') as string;
    const message = formData.get('message') as string;
    const status = formData.get('status') as string;
    const imageFile = formData.get('image') as File | null;

    const updateData: Record<string, string> = {
      name,
      email,
      title,
      message,
      status,
    };

    if (imageFile && typeof imageFile === 'object') {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploaded: CloudinaryUploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'testimonials',
            resource_type: 'image',
          },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result as CloudinaryUploadResult);
          }
        ).end(buffer);
      });

      updateData.image = uploaded.secure_url;
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection('testimonials').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Testimonial updated successfully' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const testimonial = await db
      .collection('testimonials')
      .findOne({ _id: new ObjectId(params.id) });

    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }

    return NextResponse.json({ testimonial });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
