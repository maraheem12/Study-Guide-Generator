'use client';

import { useActionState, useState } from 'react';
import { createStudyGuideAction } from '@/actions/generate-guide';
import { Loader2, BookOpen, BrainCircuit } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialState = {
    error: '',
    success: false,
};

export default function GuideCreator() {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    async function handleSubmit(formData: FormData) {
        setIsPending(true);
        const result = await createStudyGuideAction(formData);
        setIsPending(false);

        if (result.error) {
            alert(result.error); // Simple alert for now, can be toast later
        } else if (result.success && result.guideId) {
            router.push(`/guides/${result.guideId}`);
        }
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
            <div className="mb-8 text-center">
                <div className="inline-flex items-center justify-center p-3 mb-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
                    <BrainCircuit className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                    Generate New Guide
                </h2>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    Paste your notes or syllabus below to get started.
                </p>
            </div>

            <form action={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Study Material
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                        placeholder="Paste your lecture notes, textbook summary, or topic list here..."
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Difficulty Level
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                        {['easy', 'medium', 'hard'].map((level) => (
                            <label key={level} className="relative cursor-pointer">
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value={level}
                                    defaultChecked={level === 'medium'}
                                    className="peer sr-only"
                                />
                                <div className="p-3 text-center rounded-lg border border-zinc-200 dark:border-zinc-700 peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20 peer-checked:text-indigo-700 dark:peer-checked:text-indigo-300 transition-all capitalize">
                                    {level}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Analyze & Generating...
                        </>
                    ) : (
                        <>
                            <BookOpen className="w-5 h-5" />
                            Create Study Guide
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
