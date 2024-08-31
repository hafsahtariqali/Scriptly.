import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req) {
    const { channelName, scriptFormat, videoCategory, preferences, videoLength, numberOfScripts=2 } = await req.json();

   const systemprompt = `
You are a highly skilled AI assistant specialized in creating YouTube video scripts. Your task is to generate detailed, engaging, and informative scripts tailored to the user's specifications.

**Inputs:**
- **Channel Name**: ${channelName}
- **Script Format**: ${scriptFormat}
- **Video Category**: ${videoCategory}
- **Preferences**: ${preferences}
- **Video Length**: ${videoLength} minutes
- **Number of Scripts**: ${numberOfScripts}

**Instructions:**
1. **Introduction**: Begin each script with a captivating introduction that captures the essence and style of the "${channelName}" channel. Ensure the tone aligns with the "${videoCategory}" genre and engages the target audience.
2. **Script Format**: Adhere strictly to the specified format, "${scriptFormat}". Include all necessary sections such as Introduction, Main Content, Calls to Action, and Conclusion, or any specific format elements provided.
3. **Content Development**: Develop rich, informative content for the "${videoCategory}" category. Ensure each script provides unique insights, valuable information, and engaging narratives. Use a storytelling approach when applicable.
4. **User Preferences**: Incorporate any specific preferences or details from "${preferences}". This includes covering particular topics, using a certain tone (e.g., humorous, serious, informative), and addressing any special requests.
5. **Video Length**: Each script should be crafted to fill approximately "${videoLength}" minutes. Aim for around ${videoLength * 150} words per minute. Provide thorough explanations, examples, case studies, or scenarios as needed to fill this duration.
6. **Calls to Action**: Integrate effective calls to action throughout each script. Encourage viewers to engage with the channel by subscribing, liking, commenting, or following on other social media platforms.
7. **Conclusion**: End each script with a strong conclusion that summarizes key points and encourages further engagement and action from viewers.
8. **Multiple Scripts**: If "${numberOfScripts}" is greater than 1, generate "${numberOfScripts}" unique scripts. Each script should offer different content while adhering to the provided inputs and preferences.

**Output:**
- Generate up to "${numberOfScripts}" complete YouTube video script(s) that strictly follow the provided format, content guidelines, and length. Each script should be coherent, engaging, and perfectly tailored to the specific needs and style of the channel.
- Ensure that each script is well-structured, flows logically, and contains no grammatical or factual errors. Use professional language and ensure the script is ready for immediate use.
`;



    const groq = new Groq({
        apiKey: process.env.API_KEY
    });

    async function collectScripts(completion) {
        let scripts = [];
        let currentScript = '';
        for await (const chunk of completion) {
            const content = chunk?.choices[0]?.delta?.content;
            if (content) {
                currentScript += content;

                if (currentScript.includes('---end of script---')) {
                    scripts.push(currentScript.trim());
                    currentScript = '';
                }
            }
        }

        if (currentScript.trim()) {
            scripts.push(currentScript.trim());
        }

        return scripts;
    }

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: systemprompt,
            }
        ],
        model: "llama3-8b-8192",
        stream: true,
    });

    const scripts = await collectScripts(completion);

    if (scripts.length !== numberOfScripts) {
        console.error(`Expected ${numberOfScripts} scripts, but got ${scripts.length}`);
    }

    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder();
            try {
                const responseContent = scripts.join('\n\n');
                controller.enqueue(encoder.encode(responseContent));
            } catch (error) {
                console.error(error);
                controller.error(error);
            } finally {
                controller.close();
            }
        }
    });

    return new NextResponse(stream);
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






