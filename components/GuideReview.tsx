import { Badge, BrainCircuit, PenTool } from 'lucide-react';
import { AIResponse } from '@/lib/ai';
import ConceptMap from './ConceptMap';
import Quiz from './Quiz';

interface GuideReviewProps {
    guide: {
        title: string;
        generatedContent: AIResponse;
        difficultyLevel: string;
        createdAt: string;
    }
}

export default function GuideReview({ guide }: GuideReviewProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-lg border border-zinc-200 dark:border-zinc-800">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{guide.title}</h1>
                        <p className="text-zinc-500 text-sm">Generated on {new Date(guide.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400 capitalize">
                        {guide.difficultyLevel}
                    </span>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-xl font-semibold mb-3 text-indigo-600 dark:text-indigo-400">Deep Dive Summary</h3>
                    <div className="leading-relaxed text-zinc-700 dark:text-zinc-300 whitespace-pre-line">
                        {guide.generatedContent.summary}
                    </div>
                </div>
            </div>

            {/* Concept Map Section */}
            {guide.generatedContent.concept_map && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                        <BrainCircuit className="w-6 h-6" /> Visual Concept Map
                    </h3>
                    <ConceptMap data={guide.generatedContent.concept_map} />
                </div>
            )}

            {/* Grid Layout for Concepts & Exam Tips */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Key Concepts */}
                <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20 dark:to-zinc-900 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-700 dark:text-indigo-300">
                        🧠 Key Concepts
                    </h3>
                    <ul className="space-y-3">
                        {guide.generatedContent.key_concepts.map((concept, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-200 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </span>
                                <span className="text-zinc-700 dark:text-zinc-300">{concept}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Exam Highlights */}
                <div className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-zinc-900 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-amber-700 dark:text-amber-400">
                        ⚠️ Exam Radar
                    </h3>
                    <ul className="space-y-3">
                        {guide.generatedContent.exam_highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 bg-white dark:bg-black/20 p-3 rounded-lg border border-amber-100 dark:border-amber-900/20">
                                <span className="text-amber-500 mt-1">⚡</span>
                                <span className="text-zinc-700 dark:text-zinc-300 text-sm">{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Definitions Cards */}
            <div>
                <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Essential Definitions</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {guide.generatedContent.definitions.map((def, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors group">
                            <span className="block text-indigo-600 dark:text-indigo-400 font-bold mb-2 group-hover:translate-x-1 transition-transform">{def.term}</span>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm">{def.definition}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quiz Section */}
            {guide.generatedContent.practice_quiz && (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-green-700 dark:text-green-400">
                        <PenTool className="w-6 h-6" /> Knowledge Check
                    </h3>
                    <Quiz questions={guide.generatedContent.practice_quiz} />
                </div>
            )}

        </div>
    );
}
