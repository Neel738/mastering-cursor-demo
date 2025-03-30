import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/questions?linkId={linkId}
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const linkId = searchParams.get('linkId');

  if (!linkId) {
    return NextResponse.json({ error: 'Link ID is required' }, { status: 400 });
  }

  try {
    const questions = await prisma.question.findMany({
      where: {
        questionLinkId: linkId,
      },
      orderBy: [
        {
          isFavorite: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error('Failed to fetch questions:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}

// POST /api/questions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, submitterName, questionLinkId } = body;

    if (!content || !submitterName || !questionLinkId) {
      return NextResponse.json(
        { error: 'Content, submitter name, and question link ID are required' },
        { status: 400 }
      );
    }

    // First, verify the link exists
    const linkExists = await prisma.questionLink.findUnique({
      where: {
        id: questionLinkId,
      },
    });

    if (!linkExists) {
      return NextResponse.json({ error: 'Question link not found' }, { status: 404 });
    }

    // Create the question
    const question = await prisma.question.create({
      data: {
        content,
        submitterName,
        questionLinkId,
      },
    });

    return NextResponse.json(question);
  } catch (error) {
    console.error('Failed to create question:', error);
    return NextResponse.json({ error: 'Failed to create question' }, { status: 500 });
  }
} 