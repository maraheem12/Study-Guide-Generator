import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Study Guide <span className="text-indigo-600 dark:text-indigo-400">Generator</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
            This website is very efficient for students and working professionals for structured organization of notes and flowcharts.
          </p>
        </header>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="px-8 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-black font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
          <Link
            href="/login?mode=signup"
            className="px-8 py-3 rounded-full border border-zinc-200 dark:border-zinc-800 font-semibold text-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}
