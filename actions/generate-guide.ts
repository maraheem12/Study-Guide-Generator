'use server';

import { generateStudyGuide } from '@/lib/ai';
import connectToDatabase from '@/lib/db';
import StudyGuide from '@/models/StudyGuide';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function createStudyGuideAction(formData: FormData) {
    const content = formData.get('content') as string;
    const difficulty = formData.get('difficulty') as string || 'medium';

    if (!content || content.length < 50) {
        return { error: 'Content must be at least 50 characters long.' };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // Ideally redirect to login, but for server action return error to handle in UI
        return { error: 'Unauthorized. Please login.' };
    }

    try {
        // 1. Generate AI Content
        const aiData = await generateStudyGuide(content, difficulty);

        // 2. Connect to DB
        await connectToDatabase();

        // 3. Save to MongoDB
        const newGuide = await StudyGuide.create({
            supabaseUserId: user.id,
            title: aiData.key_concepts[0] || 'New Study Guide', // Use first concept as title
            originalContent: content,
            generatedContent: aiData,
            difficultyLevel: difficulty,
        });

        // 4. Return success (or redirect)
        // We strictly return a serializable object
        return { success: true, guideId: newGuide._id.toString() };

    } catch (error) {
        console.error('Study Guide Creation Error:', error);
        return { error: 'Failed to create study guide. Please try again.' };
    }
}
