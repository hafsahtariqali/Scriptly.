import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(req) {
    const { channelName, channelDescription, category, headings, videoLength, weeklyScriptsLimit, selectedTopic } = await req.json();

    const systemPrompt = `
You are an advanced AI assistant skilled in crafting detailed, engaging, and audience-targeted YouTube video scripts. Your goal is to produce scripts that perfectly match the user's requirements, capturing the channel's style and the chosen topic.

**Inputs:**
- **Channel Name**: ${channelName}
- **Script Format**: ${headings}
- **Video Category**: ${category}
- **Channel Description/Preferences**: ${channelDescription}
- **Desired Video Length**: ${videoLength} minutes
- **Number of Scripts**: ${weeklyScriptsLimit}
- **Selected Topic**: ${selectedTopic}

**Instructions:**

1. **Captivating Introduction**:
   - Start with a compelling introduction that aligns with the tone and style of "${channelName}".
   - Ensure the introduction is tailored to resonate with viewers interested in "${category}" content.

2. **Adherence to Script Format**:
   - Follow the provided format: "${headings}".
   - Include essential elements like Introduction, Main Content, Calls to Action, and Conclusion.

3. **Content Development**:
   - Create high-quality, informative content relevant to "${category}".
   - Use storytelling techniques, data, examples, or anecdotes to engage the audience.

4. **Customization to User Preferences**:
   - Incorporate details and stylistic elements from "${channelDescription}".
   - Adjust the tone as per preferences (e.g., humorous, serious).

5. **Targeted Script Length**:
   - Each script should match the desired video length of "${videoLength}" minutes.
   - Aim for approximately ${videoLength * 200} words per minute.

6. **Effective Calls to Action**:
   - Include strong, strategically placed calls to action.
   - Encourage engagement through subscriptions, likes, comments, and shares.

7. **Strong Conclusion**:
   - End with a summary of key points and a memorable final message.
   - Include a compelling call to action for further viewer engagement.

8. **Multiple Script Generation**:
   - If "${weeklyScriptsLimit}" is specified, generate that many unique versions.
   - Each script should offer distinct content but adhere to overall guidelines.

**Output:**
- Provide "${weeklyScriptsLimit}" complete YouTube video script(s) tailored to the inputs.
- Each script must be well-structured, engaging, and ready for use.
- Ensure scripts are free from errors and maintain a professional tone.
- Clearly indicate the end of each script with "---end of script---" for easy differentiation.

Ensure clarity and readability with appropriate headings, bullet points, and line breaks to enhance the script's impact and value.

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
                content: systemPrompt,
            }
        ],
        model: "llama3-8b-8192",
        stream: true,
    });

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
