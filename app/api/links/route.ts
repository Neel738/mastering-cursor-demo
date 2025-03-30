import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { prisma } from '@/lib/prisma';

// GET /api/links?userId={userId}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const links = await prisma.questionLink.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(links);
  } catch (error) {
    console.error('Failed to fetch links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

// POST /api/links
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, expiresAt, userId } = body;

    if (!title || !userId) {
      return NextResponse.json(
        { error: 'Title and userId are required' },
        { status: 400 }
      );
    }

    // Generate a unique slug
    const slug = nanoid(10);

    // Create a new link
    const link = await prisma.questionLink.create({
      data: {
        title,
        description,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        slug,
        userId,
      },
    });

    return NextResponse.json(link);
  } catch (error) {
    console.error('Failed to create link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
} 