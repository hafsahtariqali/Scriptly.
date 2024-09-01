import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req) {
    const {
        channelName,
        videoCategory,
        preferences,
        numberOfTopics = 3
    } = await req.json();

    const systemprompt = `
You are an AI assistant specialized in generating YouTube video topics. Based on the provided input, generate a list of ${numberOfTopics} potential topics or headlines that align with the style and tone of the "${channelName}" channel within the "${videoCategory}" category.

**Inputs:**
- **Channel Name**: ${channelName}
- **Video Category**: ${videoCategory}
- **Preferences**: ${preferences}

**Output:**
- Return only the list of topics or headlines.
`;

    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    async function collectContent(completion) {
        let content = '';
        for await (const chunk of completion) {
            const chunkContent = chunk?.choices[0]?.delta?.content;
            if (chunkContent) {
                content += chunkContent;
            }
        }
        return content.trim();
    }

    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: systemprompt }],
            model: "llama3-8b-8192",
            stream: true,
        });

        const responseContent = await collectContent(completion);

        // Assuming the response is a list of topics
        const topics = responseContent.split('\n').filter(line => line.trim());

        return NextResponse.json({ topics });
    } catch (error) {
        console.error('Error in topic generation:', error);
        return NextResponse.json({ error: 'Failed to generate topics' });
    }
}
