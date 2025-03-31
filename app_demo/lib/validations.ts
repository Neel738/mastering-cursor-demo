import { z } from 'zod';

// User validation schema
export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
});

// Question link validation schema
export const linkSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title cannot exceed 100 characters'),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
  expiresAt: z.string().optional(),
});

// Question validation schema
export const questionSchema = z.object({
  content: z.string().min(5, 'Question must be at least 5 characters').max(1000, 'Question cannot exceed 1000 characters'),
  submitterName: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
});

// Form input types
export type UserFormValues = z.infer<typeof userSchema>;
export type LinkFormValues = z.infer<typeof linkSchema>;
export type QuestionFormValues = z.infer<typeof questionSchema>; 