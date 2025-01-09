const fs = require("fs");

async function generateReadme(prompt, fileData) {
    return fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer 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`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: fileData != "" ? [
                {
                    role: "system",
                    content: "You are AI bot for generating Readme documentation for my project. Provide only direct answers. Do not add any conversational or assistant-related language"
                },
                {
                    role: "user",
                    content: `${fileData}`
                },
                {
                    role: "user",
                    content: `${prompt}`
                }
            ] : [
                {
                    role: "system",
                    content: "You are AI bot for generating Readme documentation for my project.Provide only direct answers. Do not add any conversational or assistant-related language"
                },
                {
                    role: "user",
                    content: `${prompt} , strickly generate only proper readme file`
                }
            ]
        })
    }).then(async (res) => {
        const resp = await res.json();
        if (resp?.error) {
            console.error(resp.error);
            return false;
        } else {
            const content = resp.choices[0].message.content;
            fs.writeFileSync("README.md", content, (err) => {
                if (err) {
                    console.error(err);
                    return false;
                }
            })
            return true;
        }
    })
}

module.exports = { generateReadme }