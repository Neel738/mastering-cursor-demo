import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/questions/[id]/favorite
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  if (!id) {
    return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
  }
  
  try {
    // First get the current favorite status
    const currentQuestion = await prisma.question.findUnique({
      where: {
        id,
      },
      select: {
        isFavorite: true,
      },
    });
    
    if (!currentQuestion) {
      return NextResponse.json({ error: 'Question not found' }, { status: 404 });
    }
    
    // Toggle the favorite status
    const question = await prisma.question.update({
      where: {
        id,
      },
      data: {
        isFavorite: !currentQuestion.isFavorite,
      },
    });
    
    return NextResponse.json(question);
  } catch (error) {
    console.error('Failed to toggle favorite status:', error);
    return NextResponse.json({ error: 'Failed to toggle favorite status' }, { status: 500 });
  }
} 