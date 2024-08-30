import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "You are an assistant for a Youtuber. You will create scripts according to the users requirements such as their channel type, their demographic, length of video, etc. You will take these into account while creating the script. The script has to be made according to how long it will take to be verbally spoken out. You will take the users preferences and use them as inspiration. You will make scripts which align with the Youtube algorithm. You will allow for regenrations with specific requests.",
      },
    ],
    model: "llama3-8b-8192",
  });
}
