# Proseflow MVP

AI-powered changelog generator from GitHub commits.

Connect your GitHub repo, pick a date range, and get polished release notes in three tones: developer, user-friendly, and executive.

## Stack

- Next.js 14 (App Router)
- NextAuth (GitHub OAuth)
- OpenAI gpt-4o-mini
- Tailwind CSS

## Deploy

Deploy to Vercel. Set env vars:
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `OPENAI_API_KEY`
