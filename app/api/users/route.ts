import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, action = 'create' } = body;

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    // Check if this is a login or create action
    if (action === 'login') {
      // Find user by name for login
      const existingUser = await prisma.user.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive', // Case insensitive search
          },
        },
      });

      if (!existingUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(existingUser);
    } else {
      // For create action, check if user with same name already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive', // Case insensitive search
          },
        },
      });

      if (existingUser) {
        // Return existing user instead of creating a duplicate
        return NextResponse.json(existingUser);
      }

      // Create a new user
      const user = await prisma.user.create({
        data: {
          name,
        },
      });

      return NextResponse.json(user);
    }
  } catch (error) {
    console.error('Failed to create/login user:', error);
    return NextResponse.json({ error: 'Failed to process user request' }, { status: 500 });
  }
}

// GET /api/users?id={id}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
} 