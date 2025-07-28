import cloudinary from '@/app/lib/cloudinary';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('amenities');

    const amenity = await collection.findOne({ _id: new ObjectId(params.slug) });

    if (!amenity) {
      return NextResponse.json({ error: 'Amenity not found' }, { status: 404 });
    }

    return NextResponse.json(amenity);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching amenity' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { slug: string } }) {
  try {
    const id = params.slug;
    const formData = await req.formData();
    const amenitiesName = formData.get('amenitiesName') as string;
    const tag = formData.get('tag') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File;

    if (!amenitiesName || !tag || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    let updatedFields: any = {
      amenitiesName,
      tag,
      description,
      updatedAt: new Date().toISOString(),
    };

    if (imageFile && typeof imageFile === 'object') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: 'amenities' }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }).end(buffer);
      });

      const imageUrl = (uploadResult as any).secure_url;
      updatedFields.image = [imageUrl];
    }

    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('amenities');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Amenity not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Amenity updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('PUT /api/amenities/[slug] error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { slug: string } }) {
  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const collection = db.collection('amenities');

    const amenity = await collection.findOne({ _id: new ObjectId(params.slug) });

    if (!amenity) {
      return NextResponse.json({ error: 'Amenity not found' }, { status: 404 });
    }

    // Delete images from Cloudinary
    if (Array.isArray(amenity.image)) {
      await Promise.all(
        amenity.image.map(async (url: string) => {
          const publicId = url.split('/').pop()?.split('.')[0];
          if (publicId) {
            try {
              await cloudinary.uploader.destroy(`amenities/${publicId}`);
            } catch (err) {
              console.warn('Cloudinary delete failed:', publicId, err);
            }
          }
        })
      );
    }

    // Delete from DB
    await collection.deleteOne({ _id: new ObjectId(params.slug) });

    return NextResponse.json({ message: 'Amenity deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/amenities/[slug] error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
