# Only You Coaching - Pilates App

A comprehensive Next.js application for Only You Coaching, featuring video streaming, meditation content, and program management for pilates and wellness coaching.

## 🏋️ Features

- **Video Streaming**: High-quality video content with adaptive streaming
- **Meditation Section**: Guided meditation and audio content
- **Program Management**: Predefined workout programs and routines
- **User Authentication**: Secure user management with NextAuth.js
- **Admin Dashboard**: Content management and video upload capabilities
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Database Integration**: Supabase for data management
- **AWS Integration**: S3 for video storage and Lambda for processing

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account
- AWS account (for S3 and Lambda)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/damsblt/only-you-coaching.git
cd only-you-coaching/pilates-coaching-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp env.example .env.local
```

4. Configure your environment variables in `.env.local`:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# AWS S3
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
S3_BUCKET_NAME=your_s3_bucket_name
```

5. Set up the database:
```bash
# Run Supabase migration
npm run db:migrate
```

6. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
pilates-coaching-app/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── feed/              # Main content feed
│   │   ├── meditation/        # Meditation section
│   │   ├── programmes/        # Workout programs
│   │   └── videos/            # Video content pages
│   ├── components/            # React components
│   │   ├── admin/             # Admin-specific components
│   │   ├── audio/             # Audio player components
│   │   ├── layout/            # Layout components
│   │   ├── ui/                # Reusable UI components
│   │   └── video/             # Video player components
│   ├── data/                  # Static data files
│   ├── lib/                   # Utility libraries
│   └── types/                 # TypeScript type definitions
├── lambda/                    # AWS Lambda functions
├── prisma/                    # Database schema
├── scripts/                   # Automation scripts
└── public/                    # Static assets
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **File Storage**: AWS S3
- **Video Processing**: AWS Lambda + FFmpeg
- **Deployment**: Vercel (recommended)

## 📚 Key Features

### Video Management
- Upload and stream high-quality video content
- Automatic thumbnail generation
- Video categorization by muscle groups
- Responsive video player with custom controls

### Content Organization
- Muscle group categorization (abdos, biceps, triceps, etc.)
- Predefined workout programs
- Meditation and audio content
- Admin interface for content management

### User Experience
- Mobile-responsive design
- Fast loading with optimized video streaming
- Intuitive navigation and content discovery
- User authentication and profile management

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run generate-thumbnails` - Generate video thumbnails

## 📖 Documentation

- [Supabase Migration Guide](./SUPABASE_MIGRATION_GUIDE.md)
- [Thumbnail Automation](./THUMBNAIL_AUTOMATION.md)
- [S3 Setup Guide](./S3_SETUP_GUIDE.md)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy to your preferred hosting platform
3. Configure environment variables
4. Set up database and file storage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is proprietary software for Only You Coaching.

## 📞 Support

For support and questions, please contact the development team.

---

Built with ❤️ for Only You Coaching