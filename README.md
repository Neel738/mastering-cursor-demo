# QnA Tool

A simple tool for collecting and managing questions from your audience.

## Features

- **Simple Onboarding**: Just enter your name to get started
- **Create Q&A Links**: Generate unique links to share with your audience
- **Question Management**: Mark questions as answered, favorite questions, and filter/search questions
- **Clean UI**: Minimalist, distraction-free interface for question submission

## Tech Stack

- **Frontend**: Next.js 14+ with App Router
- **Styling**: TailwindCSS
- **State Management**: Zustand and React Query
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Form Handling**: React Hook Form with Zod validation

## Setup

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (free tier is sufficient)

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd qnatool
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up Supabase

1. Create a new Supabase project at [https://supabase.com](https://supabase.com)
2. Get your Supabase URL and anon key from the project settings
3. Get your PostgreSQL connection string from the Database settings page

### Step 4: Configure environment variables

Create a `.env.local` file in the root of the project with the following variables:

```
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here

# Database Connection (Get this from Supabase database settings)
DATABASE_URL=your-postgres-connection-string-here
```

### Step 5: Initialize the database

```bash
npx prisma db push
```

### Step 6: Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. **Create an Account**: Enter your name on the homepage to get started
2. **Create a Q&A Link**: Click "Create New Link" on the dashboard
3. **Share the Link**: Copy the submission link and share it with your audience
4. **Manage Questions**: View, filter, and manage questions from the dashboard

## Deployment

This application can be easily deployed on Vercel:

1. Push your code to a Git repository
2. Import the project in Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy

## License

[MIT](LICENSE)
