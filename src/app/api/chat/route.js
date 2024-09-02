// import { NextResponse } from 'next/server';
// import Groq from 'groq-sdk';

// export async function POST(req) {
//     const { channelName, channelDescription, category, headings, videoLength, weeklyScriptsLimit, selectedTopic } = await req.json();

//     const systemPrompt = `
// You are an advanced AI assistant skilled in crafting detailed, engaging, and audience-targeted YouTube video scripts. Your goal is to produce scripts that perfectly match the user's requirements, capturing the channel's style and the chosen topic.

// **Inputs:**
// - **Channel Name**: ${channelName}
// - **Script Format**: ${headings}
// - **Video Category**: ${category}
// - **Channel Description/Preferences**: ${channelDescription}
// - **Desired Video Length**: ${videoLength} minutes
// - **Number of Scripts**: ${weeklyScriptsLimit}
// - **Selected Topic**: ${selectedTopic}

// **Instructions:**

// 1. **Captivating Introduction**:
//    - Start with a compelling introduction that aligns with the tone and style of "${channelName}".
//    - Ensure the introduction is tailored to resonate with viewers interested in "${category}" content.

// 2. **Adherence to Script Format**:
//    - Follow the provided format: "${headings}".
//    - Include essential elements like Introduction, Main Content, Calls to Action, and Conclusion.

// 3. **Content Development**:
//    - Create high-quality, informative content relevant to "${category}".
//    - Use storytelling techniques, data, examples, or anecdotes to engage the audience.

// 4. **Customization to User Preferences**:
//    - Incorporate details and stylistic elements from "${channelDescription}".
//    - Adjust the tone as per preferences (e.g., humorous, serious).

// 5. **Targeted Script Length**:
//    - Each script should match the desired video length of "${videoLength}" minutes.
//    - Aim for approximately ${videoLength * 200} words per minute.

// 6. **Effective Calls to Action**:
//    - Include strong, strategically placed calls to action.
//    - Encourage engagement through subscriptions, likes, comments, and shares.

// 7. **Strong Conclusion**:
//    - End with a summary of key points and a memorable final message.
//    - Include a compelling call to action for further viewer engagement.

// 8. **Multiple Script Generation**:
//    - If "${weeklyScriptsLimit}" is specified, generate that many unique versions.
//    - Each script should offer distinct content but adhere to overall guidelines.

// **Output:**
// - Provide "${weeklyScriptsLimit}" complete YouTube video script(s) tailored to the inputs.
// - Each script must be well-structured, engaging, and ready for use.
// - Ensure scripts are free from errors and maintain a professional tone.
// - Clearly indicate the end of each script with "---end of script---" for easy differentiation.

// Ensure clarity and readability with appropriate headings, bullet points, and line breaks to enhance the script's impact and value.

// `;

//     const groq = new Groq({
//         apiKey: process.env.GROQ_API_KEY
//     });

//     const completion = await groq.chat.completions.create({
//         messages: [
//             {
//                 role: 'user',
//                 content: systemPrompt,
//             }
//         ],
//         model: "llama3-8b-8192",
//         stream: true,
//     });

//     const scripts = await collectScripts(completion);

//     if (scripts.length !== weeklyScriptsLimit) {
//         console.error(`Expected ${weeklyScriptsLimit} scripts, but got ${scripts.length}`);
//     }

//     const stream = new ReadableStream({
//         start(controller) {
//             const encoder = new TextEncoder();
//             try {
//                 const responseContent = scripts.join('\n\n');
//                 controller.enqueue(encoder.encode(responseContent));
//             } catch (error) {
//                 console.error(error);
//                 controller.error(error);
//             } finally {
//                 controller.close();
//             }
//         }
//     });

//     return new NextResponse(stream);
// }



import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req) {
    const { channelName, channelDescription, category, headings, videoLength, weeklyScriptsLimit, selectedTopic } = await req.json();

    // Default Script
    const defaultHeadings = [
        'Introduction',
        'Overview',
        'Main Content',
        'Calls to Action',
        'Background Information',
        'Key Takeaways',
        'Bonus Tips',
        'Common Mistakes',
        'Conclusion'
    ];

    // if heading then split it where comma found o/w it'll follow default
    const providedHeadings = typeof headings === 'string' ? headings.split(',').map(heading => heading.trim()) : [];

    // Merge above one with the default
    const allHeadings = [...new Set([...providedHeadings, ...defaultHeadings])];

    // Calculate of time/heading
    const timePerSection = Math.floor(videoLength * 60 / allHeadings.length); 
    const systemPrompt = `
    You are an advanced AI assistant skilled in crafting detailed, engaging, and audience-targeted YouTube video scripts. Your goal is to produce scripts that perfectly match the user's requirements, capturing the channel's style and the chosen topic. Each section should be accompanied by an approximate timestamp indicating its position in the video.
    
    **Inputs:**
    - **Channel Name**: ${channelName}
    - **Script Format**: ${allHeadings.join(', ')}
    - **Video Category**: ${category}
    - **Channel Description/Preferences**: ${channelDescription}
    - **Desired Video Length**: ${videoLength} minutes
    - **Number of Scripts**: ${weeklyScriptsLimit}
    - **Selected Topic**: ${selectedTopic}
    
    **Instructions:**
    
    1. **Captivating Introduction**:
       - Start with a compelling introduction that aligns with the tone and style of "${channelName}".
       - Ensure the introduction is tailored to resonate with viewers interested in "${category}" content.
       - **Timestamp**: Allocate approximately ${timePerSection} seconds for this section.
    
    2. **Expanded Main Content**:
       - The "Main Content" section should be the most detailed part of the script.
       - Provide in-depth information, examples, and engaging storytelling that captures the essence of "${selectedTopic}".
       - Include facts, data, anecdotes, and analysis that provide value and retain viewer interest.
       - Ensure that this section is comprehensive and aligns with the viewers' expectations for "${category}".
       - **Timestamp**: Allocate a larger portion of the video time to this section to ensure thorough coverage.
    
    3. **Adherence to Script Format**:
       - Follow the comprehensive format: "${allHeadings.join(', ')}".
       - Ensure all headings are covered in the script, even if not all were provided by the user.
       - Include essential elements like Introduction, Main Content, Calls to Action, Background Information, Key Takeaways, Bonus Tips, Common Mistakes, and Conclusion.
       - **Timestamp**: Divide the video length proportionally among the sections, ensuring each section has an approximate start time based on its order and time allocation.
    
    4. **Content Development**:
       - Create high-quality, informative content relevant to "${category}".
       - Use storytelling techniques, data, examples, or anecdotes to engage the audience.
    
    5. **Customization to User Preferences**:
       - Incorporate details and stylistic elements from "${channelDescription}".
       - Adjust the tone as per preferences (e.g., humorous, serious).
    
    6. **Targeted Script Length**:
       - Each script should match the desired video length of "${videoLength}" minutes.
       - Aim for approximately ${videoLength * 200} words per minute.
    
    7. **Effective Calls to Action**:
       - Include strong, strategically placed calls to action.
       - Encourage engagement through subscriptions, likes, comments, and shares.
    
    8. **Strong Conclusion**:
       - End with a summary of key points and a memorable final message.
       - Include a compelling call to action for further viewer engagement.
    
    9. **Multiple Script Generation**:
       - If "${weeklyScriptsLimit}" is specified, generate that many unique versions.
       - Each script should offer distinct content but adhere to overall guidelines.
    
    **Output:**
    - Provide "${weeklyScriptsLimit}" complete YouTube video script(s) tailored to the inputs.
    - Each script must be well-structured, engaging, and ready for use.
    - Ensure scripts are free from errors and maintain a professional tone.
    - Clearly indicate the end of each script with "---end of script---" for easy differentiation.
    
    Ensure clarity and readability with appropriate headings, bullet points, timestamps, and line breaks to enhance the script's impact and value.
    `;
    const groq = new Groq({
        apiKey: process.env.API_KEY
    });

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: systemPrompt,
            }
        ],
        model: "llama3-8b-8192",
        stream: true,
    });

   
    async function collectScripts(completion) {
        let scripts = [];
        let currentScript = '';
        for await (const chunk of completion) {
            const content = chunk?.choices[0]?.delta?.content;
            if (content) {
                currentScript += content;

                // Check if the current script ends and a new one begins
                if (currentScript.includes('---end of script---')) {
                    scripts.push(currentScript.trim());
                    currentScript = '';
                }
            }
        }

        // Push the last script if any content is left
        if (currentScript.trim()) {
            scripts.push(currentScript.trim());
        }

        return scripts;
    }

    const scripts = await collectScripts(completion);

    if (scripts.length !== weeklyScriptsLimit) {
        console.error(`Expected ${weeklyScriptsLimit} scripts, but got ${scripts.length}`);
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

