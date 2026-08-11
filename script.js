  async function askAI(question) {
    try {
        const response = await fetch('http://localhost:5000/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: question })
        });

        const data = await response.json();
        if (data.status === 'success') {
            console.log("AI පිළිතුර:", data.answer);
        } else {
            console.error("Error:", data.error);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

function toggleAIChat() {
            const chatWin = document.getElementById('aiChatWindow');
            chatWin.classList.toggle('hidden');
        }

        function handleAIKeyPress(event) {
            if (event.key === 'Enter') {
                sendAIMessage();
            }
        }

        async function sendAIMessage() {
            const input = document.getElementById('aiUserInput');
            const message = input.value.trim();
            if (!message) return;

            const messagesContainer = document.getElementById('aiChatMessages');

            // Render User Message
            const userMsg = document.createElement('div');
            userMsg.className = 'ai-message user';
            userMsg.textContent = message;
            messagesContainer.appendChild(userMsg);

            input.value = '';
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            // Render Loading State
            const botMsg = document.createElement('div');
            botMsg.className = 'ai-message bot';
            botMsg.textContent = 'Thinking...';
            messagesContainer.appendChild(botMsg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            try {
                // Connect your API key or backend endpoint here
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer YOUR_API_KEY"
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [
                            { role: "system", content: "You are an assistant for DEVELOPER WEB website." },
                            { role: "user", content: message }
                        ]
                    })
                });

                const data = await response.json();
                if (data.choices && data.choices[0]) {
                    botMsg.textContent = data.choices[0].message.content;
                } else {
                    botMsg.textContent = "Sorry, I couldn't process that request right now.";
                }
            } catch (err) {
                // Fallback response for demonstration when API endpoint isn't connected
                botMsg.textContent = "sorry I'm not conect backend";
            }

            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Close widget on Escape key
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                document.getElementById('aiChatWindow').classList.add('hidden');
            }
        });

        async function askAI(question) {
    try {
        const response = await fetch('/app/app.py', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt: question })
        });

        const data = await response.json();
        if (data.status === 'success') {
            console.log("AI පිළිතුර:", data.answer);
        } else {
            console.error("Error:", data.error);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

// පරීක්ෂා කිරීම සඳහා:
askAI("Web Development කියන්නේ මොකක්ද?");