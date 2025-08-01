import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import { deleteImageFromCloudinary } from '@/app/lib/cloudinaryUtils';
import { planSchema } from '@/app/lib/schemas/planSchema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing plan ID' });
  }

  const client = await clientPromise;
  const db = client.db('alfa_center');
  const collection = db.collection('plans');

  try {
    const plan = await collection.findOne({ _id: new ObjectId(id) });

    if (!plan) {
      return res.status(404).json({ error: 'Plan not found' });
    }

    // 🔁 Handle Update (PUT)
    if (req.method === 'PUT') {
      const {
        name,
        price,
        yearlyPrice,
        available,
        features,
        images,
        description,
      } = req.body;

      // Clean up old images if new images are provided
      if (images && Array.isArray(images) && plan.images) {
        await Promise.all(plan.images.map((url: string) => deleteImageFromCloudinary(url)));
      }

      // Generate slug if name is changed
      let slug = plan.slug;
      if (name && typeof name === 'string') {
        slug = name
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');
      }

      const updateData = {
        name,
        price,
        yearlyPrice,
        available,
        features,
        images,
        description,
        slug,
      };

      // Zod Validation — partial allows optional fields
      const validated = planSchema.partial().parse(updateData);

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { ...validated, updatedAt: new Date().toISOString() } }
      );

      return res.status(200).json({ message: 'Plan updated', result });
    }

    // 🗑️ Handle Delete (DELETE)
    if (req.method === 'DELETE') {
      if (plan.images && plan.images.length) {
        await Promise.all(plan.images.map((url: string) => deleteImageFromCloudinary(url)));
      }

      await collection.deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ message: 'Plan deleted successfully' });
    }

    // ❌ Method Not Allowed
    res.setHeader('Allow', ['PUT', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: unknown) {
    console.error('[Plan API Error]', err);
    return res.status(500).json({ error: 'Server Error', details: (err as Error).message });
  }
}
