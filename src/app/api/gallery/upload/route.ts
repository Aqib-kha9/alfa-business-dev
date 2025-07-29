// /app/api/gallery/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

function parseForm(req: NextRequest): Promise<{ fields: any; files: any }> {
  const form = new IncomingForm({ keepExtensions: true });

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const folder = formData.get("folder")?.toString() || "Gallery";

  if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadRes = await cloudinary.uploader.upload_stream(
    {
      folder: `Gallery/${folder}`,
      resource_type: 'image',
    },
    (error, result) => {
      if (error || !result) {
        console.error(error);
        return;
      }
    }
  );

  const url = await new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `Gallery/${folder}` },
      (error, result) => {
        if (result?.secure_url) resolve(result.secure_url);
        else reject(error);
      }
    );
    stream.end(buffer);
  });

  return NextResponse.json({ url });
}
