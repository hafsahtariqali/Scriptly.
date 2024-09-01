import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req) {
    try {
        const {
            channelName,
            videoCategory,
            preferences,
            numberOfTopics = 5
        } = await req.json();

        const systemprompt = createTopicPrompt({
            channelName,
            videoCategory,
            preferences,
            numberOfTopics
        });

        const responseContent = await getGroqCompletion(systemprompt);

        const jsonResponse = parseResponseContent(responseContent);

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error('Error in topic generation request:', error);
        return NextResponse.json({ error: 'Failed to generate topics' }, { status: 500 });
    }
}

function createTopicPrompt({
    channelName,
    videoCategory,
    preferences,
    numberOfTopics
}) {
    return `
    You are an AI assistant specialized in generating YouTube video topics. Generate a list of ${numberOfTopics} engaging video topics based on the following inputs:

    **Channel Name**: ${channelName}
    **Video Category**: ${videoCategory}
    **Preferences**: ${preferences}
    `;
}

async function getGroqCompletion(systemprompt) {
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    const completion = await groq.chat.completions.create({
        messages: [{ role: 'user', content: systemprompt }],
        model: "llama3-8b-8192",
        stream: true,
    });

    return collectContent(completion);
}

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

function parseResponseContent(content) {
    try {
        const parsedContent = JSON.parse(content);
        if (Array.isArray(parsedContent)) {
            return { topics: parsedContent };
        } else {
            throw new Error('Expected an array of topics');
        }
    } catch (e) {
        console.error('Failed to parse response as JSON:', e);
        const topics = content.split('\n').filter(line => line.trim());
        return { topics };
    }
}
