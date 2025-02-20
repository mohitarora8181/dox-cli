const fs = require("fs");

async function generateReadme(prompt, key) {
    return fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY || key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: "You are AI bot for generating Readme documentation for my project.Provide only direct answers. Do not add any conversational or assistant-related language"
                },
                {
                    role: "user",
                    content: `${prompt} , strickly generate only proper readme file.`
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

async function generateCommitName(diff, isEmoji, key) {
    return fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.GROQ_API_KEY || key}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "system",
                    content: `You are AI bot for generating one word commit message for all code difference provided ${isEmoji && " , you can also add emoji according to relevant name"}.`
                },
                {
                    role: "user",
                    content: `Generate a **concise** and **meaningful** Git commit message from the given Git diff.  
                                ### Rules:
                                - Output **only** one single commit message (no explanations).  
                                - Keep it **under 40 characters**.  
                                - Use **imperative tone** (e.g., "Fix", "Add", "Improve", "Refactor").  
                                - Follow **Conventional Commit format**: "<type>(<scope>): <message>".  
                                - No additional text or formatting.  

                                ### Git Diff:
                                ${diff}

                                Now, generate the commit message.`
                }
            ]
        })
    }).then(async (res) => {
        const resp = await res.json();
        if (resp?.error) {
            console.error(resp.error);
            return false;
        } else {
            return resp.choices[0].message.content;
        }
    })
}

module.exports = { generateReadme, generateCommitName }