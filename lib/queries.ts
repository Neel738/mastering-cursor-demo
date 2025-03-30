import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Types
interface QuestionLink {
  id: string;
  slug: string;
  title: string;
  description?: string;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

interface Question {
  id: string;
  content: string;
  submitterName: string;
  isAnswered: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  questionLinkId: string;
}

interface CreateLinkInput {
  title: string;
  description?: string;
  expiresAt?: string;
  userId: string;
}

interface CreateQuestionInput {
  content: string;
  submitterName: string;
  questionLinkId: string;
}

// API functions
async function fetchLinks(userId: string): Promise<QuestionLink[]> {
  const response = await fetch(`/api/links?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch links');
  }
  return response.json();
}

async function fetchLink(slug: string): Promise<QuestionLink> {
  const response = await fetch(`/api/links/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch link');
  }
  return response.json();
}

async function fetchQuestions(linkId: string): Promise<Question[]> {
  const response = await fetch(`/api/questions?linkId=${linkId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch questions');
  }
  return response.json();
}

async function createLink(data: CreateLinkInput): Promise<QuestionLink> {
  const response = await fetch('/api/links', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create link');
  }
  
  return response.json();
}

async function createQuestion(data: CreateQuestionInput): Promise<Question> {
  const response = await fetch('/api/questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to submit question');
  }
  
  return response.json();
}

async function updateQuestionStatus(
  questionId: string, 
  isAnswered: boolean
): Promise<Question> {
  const response = await fetch(`/api/questions/${questionId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isAnswered }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update question status');
  }
  
  return response.json();
}

async function toggleFavorite(questionId: string): Promise<Question> {
  const response = await fetch(`/api/questions/${questionId}/favorite`, {
    method: 'POST',
  });
  
  if (!response.ok) {
    throw new Error('Failed to toggle favorite');
  }
  
  return response.json();
}

// React Query hooks
export function useLinks(userId?: string) {
  return useQuery({
    queryKey: ['links', userId],
    queryFn: () => fetchLinks(userId!),
    enabled: !!userId,
  });
}

export function useLink(slug?: string) {
  return useQuery({
    queryKey: ['link', slug],
    queryFn: () => fetchLink(slug!),
    enabled: !!slug,
  });
}

export function useQuestions(linkId?: string) {
  return useQuery({
    queryKey: ['questions', linkId],
    queryFn: () => fetchQuestions(linkId!),
    enabled: !!linkId,
  });
}

export function useCreateLink() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createLink,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['links', variables.userId] });
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createQuestion,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questions', data.questionLinkId] });
    },
  });
}

export function useUpdateQuestionStatus() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ questionId, isAnswered }: { questionId: string; isAnswered: boolean }) => 
      updateQuestionStatus(questionId, isAnswered),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questions', data.questionLinkId] });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['questions', data.questionLinkId] });
    },
  });
} 