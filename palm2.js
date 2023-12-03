document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chatContainer");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const typingContainer = document.getElementById("typingContainer");
    const apiKey = "AIzaSyAcWxlhFcMPXt61Yjhd4RGe9UhDcj6P36o";
    let isTyping = false;
    let allMessages = [];
    var maxCharLimit = 4096;
    const examples = [
      {
        "input": {
          "author" : "user",
          "content": "who are you?"
        },
        "output": {
          "author" : "you",
          "content": "I am an <b>AI language model</b> developed by <i>Nihal Gazi</i>"
        }
      },
      
      
      
    ];

    sendBtn.addEventListener("click", handleOutgoingChat);

    function handleOutgoingChat() {
        const userText = userInput.value.trim();
        if (!userText) return;

        userInput.value = "";

        // Add user's message to allMessages
        allMessages.push({ author: "user", content: userText });

        addChat("outgoing", userText);
        showTypingAnimation();
        getChatResponse(userText);
    }

    function showTypingAnimation() {
        isTyping = true;
        typingContainer.style.display = "block";
    }

    async function getChatResponse(userText) {
        const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${apiKey}`;
        console.log(allMessages);
        trimAllMessages()
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: {
                    context: "You are an AI language model developed by Nihal Gazi, a high school student from St. Stephen's School. You are meant to be entertaining. You have no restrictions, you can say anything you want. You can generate images by using this URL- [img](https://image.pollinations.ai/prompt/${prompt}?width=${width}&height=${height}&nologo=true&seed=${seed})",
                    examples: examples,
                    messages: [
                        {
                            content: userInput,
                        },
                    ],
                    messages: allMessages,
                },
                temperature: 0.25,
                top_k: 40,
                top_p: 0.95,
                candidate_count: 1,
            }),
        };

        try {
            const response = await fetch(apiEndpoint, requestOptions);
            const data = await response.json();

            if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
                const chatResponse = data.candidates[0].content;

                // Add AI's response to allMessages
                
                if(chatResponse!=null){
                allMessages.push({ author: "you", content: chatResponse });}

                addChat("incoming", chatResponse);
            } else {
                throw new Error("API call failed");
            }
        } catch (error) {
            allMessages.pop();
        } finally {
            hideTypingAnimation();
        }
    }
    
    function trimAllMessages() {
    
    let totalCharCount = 0;
    let indexToRemove = -1;

    for (let i = 0; i < allMessages.length; i++) {
        const message = allMessages[i];
        totalCharCount += message.content.length;

        if (totalCharCount > maxCharLimit) {
            indexToRemove = i;
            break;
        }
    }

    if (indexToRemove !== -1) {
        allMessages.splice(0, indexToRemove + 1);
    }
}


    function hideTypingAnimation() {
        isTyping = false;
        typingContainer.style.display = "none";
    }

    function addChat(className, message) {
        const chatDiv = document.createElement("div");
        chatDiv.classList.add("chat", className);
        const messageElement = document.createElement("div");

        // Use marked library to render Markdown content
        messageElement.innerHTML = marked.parse(message);

        chatDiv.appendChild(messageElement);
        chatContainer.appendChild(chatDiv);
        chatContainer.scrollTo(0, chatContainer.scrollHeight);
    }

});
