// /app/api/book-tour/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

// Mock admin validation function (replace with your real logic)
function isAdminAuthenticated(req: NextRequest): boolean {
  const token = req.cookies.get('admin-token')?.value;
  // You can validate this token with your real logic or secret
  return token === 'your-secure-admin-token'; // Replace this
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const tourId = params.id;

  if (!isAdminAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!ObjectId.isValid(tourId)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('alfa_business');
    const result = await db.collection('bookings').deleteOne({ _id: new ObjectId(tourId) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Booking deleted successfully' }, { status: 200 });
  } catch (err) {
    console.error('[DELETE Tour] Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
