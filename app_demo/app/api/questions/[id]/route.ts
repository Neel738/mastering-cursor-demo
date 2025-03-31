import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH /api/questions/[id]
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  if (!id) {
    return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
  }
  
  try {
    const body = await request.json();
    const { isAnswered } = body;
    
    if (isAnswered === undefined) {
      return NextResponse.json({ error: 'isAnswered status is required' }, { status: 400 });
    }
    
    const question = await prisma.question.update({
      where: {
        id,
      },
      data: {
        isAnswered,
      },
    });
    
    return NextResponse.json(question);
  } catch (error) {
    console.error('Failed to update question:', error);
    return NextResponse.json({ error: 'Failed to update question' }, { status: 500 });
  }
}

// DELETE /api/questions/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  if (!id) {
    return NextResponse.json({ error: 'Question ID is required' }, { status: 400 });
  }
  
  try {
    const question = await prisma.question.delete({
      where: {
        id,
      },
    });
    
    return NextResponse.json(question);
  } catch (error) {
    console.error('Failed to delete question:', error);
    return NextResponse.json({ error: 'Failed to delete question' }, { status: 500 });
  }
} 