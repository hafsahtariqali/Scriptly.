import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req) {
    try {
        const { topic } = await req.json();

        if (!topic) {
            return NextResponse.json({ error: 'Topic is required to generate a script' }, { status: 400 });
        }

        const systemprompt = createScriptPrompt(topic);
        const responseContent = await getGroqCompletion(systemprompt);

        const jsonResponse = parseResponseContent(responseContent);

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error('Error in script generation request:', error);
        return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
    }
}

function createScriptPrompt(topic) {
    return `
    You are a highly skilled AI assistant specialized in creating YouTube video scripts. Generate a detailed script based on the following topic:

    **Topic**: ${topic}

    **Instructions**:
    - Provide a complete and engaging script tailored to the topic.
    - The script should be well-structured, informative, and suitable for a YouTube video.
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
    return { script: content };
}
