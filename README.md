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
- **Database**: PostgreSQL via Neon DB
- **ORM**: Prisma
- **Form Handling**: React Hook Form with Zod validation

## Setup

### Prerequisites

- Node.js 18+ and npm
- A Neon DB account (free tier is sufficient)

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd qnatool
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Set up Neon DB

1. Create a new Neon DB project at [https://neon.tech](https://neon.tech)
2. Create a new database in your project
3. Get your PostgreSQL connection string from the Connection Details page

### Step 4: Configure environment variables

Create a `.env.local` file in the root of the project with the following variables:

```
# Neon DB Configuration
DATABASE_URL=your-neon-postgres-connection-string-here
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
