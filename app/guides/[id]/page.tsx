import connectToDatabase from '@/lib/db';
import StudyGuide from '@/models/StudyGuide';
import { notFound } from 'next/navigation';
import GuideReview from '@/components/GuideReview';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

async function getGuide(id: string) {
    await connectToDatabase();
    const guide = await StudyGuide.findById(id).lean();

    if (!guide) return null;

    // Convert MongoDB _id and dates to simple strings for client component
    return {
        ...guide,
        _id: guide._id.toString(),
        supabaseUserId: guide.supabaseUserId,
        generatedContent: guide.generatedContent, // Already JSON
        createdAt: guide.createdAt.toISOString(),
        updatedAt: guide.updatedAt.toISOString(),
    } as any;
}

export default async function GuidePage({ params }: { params: { id: string } }) {
    // Await params first to satisfy Next.js guidelines
    const { id } = await params;
    const guide = await getGuide(id);

    if (!guide) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-4 md:p-8">
            <div className="max-w-4xl mx-auto mb-6">
                <Link href="/" className="inline-flex items-center text-zinc-500 hover:text-indigo-600 transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Dashboard
                </Link>
            </div>
            <GuideReview guide={guide} />
        </div>
    );
}
