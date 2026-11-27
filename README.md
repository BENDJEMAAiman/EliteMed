# EliteMed

EliteMed is a web-based educational platform for medical students. It gives students a single academic space to access their modules, past exam papers (annales d'épreuves) and validated pedagogical resources.

The project is built with **React + TypeScript + Vite** on the frontend and **Supabase** as the backend (authentication and database).

## Current Features

- Email / password login
- Student account creation (full name, email, phone number, password confirmation)
- Password reset by email
- Google sign-in (OAuth through Supabase)
- Responsive authentication page (French interface)

## Tech Stack

| Layer          | Technology                       |
| -------------- | -------------------------------- |
| UI             | React 19                         |
| Language       | TypeScript 5.9                   |
| Build tool     | Vite 8                           |
| Routing        | React Router 7 (installed)       |
| Backend / Auth | Supabase (`@supabase/supabase-js`) |
| Linting        | ESLint 10 + typescript-eslint    |

## Prerequisites

- **Node.js 22.12 or newer** (required by Vite 8 and the Supabase client)
- **npm** (comes with Node.js)
- A **Supabase project** (free plan is enough): https://supabase.com

Check your versions:

```bash
node -v
npm -v
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd elitemed
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a file named `.env` (or `.env.local`) at the root of the project:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
```

You can find both values in your Supabase dashboard under **Project Settings → API**.

> Never commit this file. `*.local` files are already ignored by Git; if you use `.env`, add it to `.gitignore`.

### 4. Configure Supabase Auth

In the Supabase dashboard, go to **Authentication**:

- **Providers → Email**: enable it (disable "Confirm email" if you want instant login during development).
- **Providers → Google**: enable it and add your Google OAuth Client ID and Secret.
- **URL Configuration**: add `http://localhost:5173` to the **Redirect URLs** (and your production URL later).

When signing up, the user's `full_name` and `phone` are stored in the user metadata.

### 5. Run the development server

```bash
npm run dev
```

Then open http://localhost:5173 in your browser.

## Available Scripts

| Command           | Description                                            |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Start the Vite development server with hot reload      |
| `npm run build`   | Type-check with TypeScript and build for production    |
| `npm run preview` | Preview the production build locally                   |
| `npm run lint`    | Run ESLint on the project                              |

### Build for production

```bash
npm run build
npm run preview
```

The optimized files are generated in the `dist/` folder.

## Project Structure

```
elitemed/
├── public/                 # Static files (favicon, icons)
├── src/
│   ├── assets/             # Logo and illustrations (SVG)
│   ├── lib/
│   │   └── supabase.ts     # Supabase client setup
│   ├── App.tsx             # Login / Signup / Forgot password pages
│   ├── App.css             # Authentication page styles
│   ├── index.css           # Global styles
│   └── main.tsx            # Application entry point
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── eslint.config.js
└── vite.config.ts
```

## Troubleshooting

- **Blank page or `supabaseUrl is required` error**: your `.env` file is missing or the variable names are wrong. Variables must start with `VITE_`, and you must restart `npm run dev` after editing the file.
- **Google sign-in redirects to the wrong page**: check the Redirect URLs in Supabase Authentication settings.
- **`npm install` or `npm run dev` fails with an engine error**: upgrade Node.js to version 22.12 or newer.
- **No confirmation email received**: check your spam folder, or review the email settings in Supabase.

## Roadmap

- Protected routes and student dashboard (using React Router)
- Modules and courses pages
- Past exam papers (annales) library
- Validated pedagogical resources
- User profile management

## License

This project is for educational purposes.
