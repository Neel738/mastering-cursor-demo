# Technical Requirements Document: Influencer Q&A Platform

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Styling**: TailwindCSS
- **Component Library**: shadcn/ui
- **State Management**: React Query for server state, Zustand for client state
- **Form Handling**: React Hook Form with Zod validation

### Backend
- **API**: Next.js API Routes (REST API)
- **Database**: PostgreSQL (via Neon DB)
- **ORM**: Prisma

## Architecture
- Server-side rendering for improved SEO and initial load performance
- Simple REST API for data operations
- Serverless functions for backend processing

## User Identification (No Auth)
- Simple user type identification without authentication
- User types stored in database with no passwords or sensitive information
- Session maintained using local storage or cookies
- No registration flow required for demo

## API Design
- RESTful API design
- Resource-based URL structure
- JSON response format
- HTTP status codes for error handling
- Simple endpoints focused on core CRUD operations

## Database Schema

### Tables

#### `users` (Simplified)
| Column         | Type          | Description                                 |
|----------------|---------------|---------------------------------------------|
| id             | uuid          | Primary key                                 |
| display_name   | text          | Public display name                         |
| user_type      | enum          | "influencer" or "viewer"                    |
| created_at     | timestamp     | Account creation timestamp                  |

#### `question_links`
| Column         | Type          | Description                                 |
|----------------|---------------|---------------------------------------------|
| id             | uuid          | Primary key                                 |
| influencer_id  | uuid          | Foreign key to users.id                     |
| title          | text          | Title of the Q&A session                    |
| description    | text          | Description of the Q&A session              |
| slug           | text          | Custom URL slug for the link                |
| is_active      | boolean       | Whether the link is currently active        |
| expires_at     | timestamp     | Optional expiration time                    |
| created_at     | timestamp     | Link creation timestamp                     |
| updated_at     | timestamp     | Link last updated timestamp                 |

#### `questions`
| Column         | Type          | Description                                 |
|----------------|---------------|---------------------------------------------|
| id             | uuid          | Primary key                                 |
| link_id        | uuid          | Foreign key to question_links.id            |
| submitter_name | text          | Name for the question submitter             |
| content        | text          | The question text                           |
| status         | enum          | Status: pending, answered, hidden           |
| is_featured    | boolean       | Whether the question is featured            |
| answered_at    | timestamp     | When the question was answered              |
| created_at     | timestamp     | Question submission timestamp               |

### Relationships
- **users → question_links**: One-to-many (influencer can have multiple Q&A links)
- **question_links → questions**: One-to-many (each link collects multiple questions)

### Indexes
- `question_links(influencer_id)`: For quick access to influencer's links
- `question_links(slug)`: For fast URL resolution
- `questions(link_id, status)`: For filtering questions by status within a link
- `questions(link_id, created_at)`: For chronological sorting

## ORM Implementation
Prisma will be used as the ORM for its type safety and developer experience:

- Schema-first approach with Prisma schema
- Type-safe database queries
- Automatic migrations
- Relationship handling
- Integration with Next.js

## Security Considerations
- Input validation for all user inputs
- SQL injection prevention via ORM
- XSS protection
- Environment-based configuration

## Performance Optimization
- Database query optimization
- Edge caching for static content
- Pagination for large datasets
- Optimistic UI updates
- Lazy loading for images and components

## Deployment
- Vercel for Next.js application hosting
- Neon DB for database
- Environment-based configuration 