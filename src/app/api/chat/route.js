import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req) {
    const {
        channelName,
        scriptFormat,
        videoCategory,
        preferences,
        videoLength,
        numberOfScripts = 2,
        generateTopicsOnly = false
    } = await req.json();

    const systemprompt = `
    You are a highly skilled AI assistant specialized in creating YouTube video scripts. First, generate a list of potential topics or headlines for the video scripts based on the user's input. Then, if requested, generate the scripts themselves.

    **Inputs:**
    - **Channel Name**: ${channelName}
    - **Script Format**: ${scriptFormat}
    - **Video Category**: ${videoCategory}
    - **Preferences**: ${preferences}
    - **Video Length**: ${videoLength} minutes
    - **Number of Scripts**: ${numberOfScripts}

    **Instructions:**
    1. **Generate Topics**: Create a list of 3-5 engaging video topics or headlines that align with the style and tone of the "${channelName}" channel and fit within the "${videoCategory}" category.
    2. **Script Generation (Optional)**: If script generation is requested, use the selected topic and generate detailed scripts based on the user's input.

    **Output:**
    - If "generateTopicsOnly" is true, return only the list of topics or headlines.
    - Otherwise, generate up to "${numberOfScripts}" complete YouTube video script(s) that strictly follow the provided format, content guidelines, and length. Each script should be coherent, engaging, and perfectly tailored to the specific needs and style of the channel.
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

        let jsonResponse;
        try {
            // Attempt to parse JSON
            jsonResponse = JSON.parse(responseContent);

            if (generateTopicsOnly && !Array.isArray(jsonResponse)) {
                throw new Error('Expected an array of topics');
            }
        } catch (e) {
            // Handle plain text or other structured formats
            jsonResponse = parseNonJsonResponse(responseContent);
        }

        if (generateTopicsOnly) {
            return NextResponse.json(jsonResponse.topics || jsonResponse);
        }

        return NextResponse.json(jsonResponse);
    } catch (error) {
        console.error('Error in completion request:', error);
        return NextResponse.json({ error: 'Failed to generate content' });
    }
}

// Example function to handle non-JSON response formats
function parseNonJsonResponse(content) {
    // Implement parsing logic based on expected format
    // For example, if response is a comma-separated list of topics:
    const topics = content.split('\n').filter(line => line.trim());
    return { topics };
}




//if want to test using OPENROUTER then the result will be accurate but the UX is going to be declined because of 
//taking much time to generate the response


// import { NextResponse } from 'next/server';
// import OpenAI from 'openai';

// export async function POST(req) {
//     const { channelName, scriptFormat, videoCategory, preferences, videoLength, numberOfDays, numberOfScripts=2 } = await req.json();

//     const openai = new OpenAI({ 
//         apiKey: process.env.OPENROUTER_API_KEY,
//         baseURL: "https://openrouter.ai/api/v1",
//     });

//     const scriptsByDay = {};

//     for (let i = 0; i < numberOfScripts; i++) {
//         const systemPrompt = `
//             You are an AI assistant specialized in generating YouTube video scripts. Your task is to create a comprehensive script based on the user's input parameters.
//             **Inputs:**
//             - **Channel Name**: ${channelName}
//             - **Script Format**: ${scriptFormat}
//             - **Video Category**: ${videoCategory}
//             - **Preferences**: ${preferences}
//             - **Video Length**: ${videoLength} minutes
//             - **Script Number**: ${i + 1} of ${numberOfScripts}

//             **Instructions:**
//             1. **Introduction**: Start with a captivating introduction fitting the style of the "${channelName}" channel, aligning with the "${videoCategory}" genre.
//             2. **Script Format**: Follow the structure indicated in "${scriptFormat}".
//             3. **Content Development**: Develop engaging content.
//             4. **User Preferences**: Include any preferences.
//             5. **Video Length**: Match the script length to "${videoLength}" minutes.
//             6. **Calls to Action**: Include calls to action.
//             7. **Conclusion**: End with a strong conclusion.

//             **Output:**
//             - Generate a complete YouTube video script based on these guidelines.
//         `;

//         try {
//             const completion = await openai.chat.completions.create({
//                 messages: [{ role: 'system', content: systemPrompt }],
//                 model: 'nousresearch/hermes-3-llama-3.1-405b'
//             });

//             const scriptContent = completion?.choices[0]?.message?.content;

//             if (scriptContent) {
//                 scriptsByDay[`Script ${i + 1}`] = scriptContent;
//             }
//         } catch (error) {
//             console.error(`Error generating script for Script ${i + 1}:`, error);
//             scriptsByDay[`Script ${i + 1}`] = `Error generating script: ${error.message}`;
//         }
//     }

//     return NextResponse.json({ scripts: scriptsByDay });
// }






