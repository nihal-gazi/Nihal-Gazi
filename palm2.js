document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chatContainer");
    const userInput = document.getElementById("userInput");
    const sendBtn = document.getElementById("sendBtn");
    const typingContainer = document.getElementById("typingContainer");
    const apiKey = "AIzaSyAcWxlhFcMPXt61Yjhd4RGe9UhDcj6P36o";
    const MODEL_NAME = "models/text-bison-001";
    let isTyping = false;
    let allMessages = [];
    var maxCharLimit = 4096;
    var fullText = "";
    var onlyText="";
    var grammar = false;
    var img = false;
    var btn = document.getElementById("sendBtn");
    const examples = [
      {
        "input": {
          "author" : "user",
          "content": "generate image of lion"
        },
        "output": {
          "author" : "AI",
          "content": "Here you go: [image of lion in a jungle]"
        }
      },
      
      
      
    ];

    sendBtn.addEventListener("click", handleOutgoingChat);

    async function handleOutgoingChat() {
        
        btn.disabled = true;
        const userText = userInput.value.trim();
        //if (!userText) return;

        userInput.value = "";

        
        /*allMessages.push({ author: "user", content: userText });
        addChat("outgoing", userText);
        */
        
        if(fullText==""){fullText= "<div id=\"usermsg\">"+userText+"</div><hr id=\"sep\">"; onlyText = userText;}
        else{fullText += "<div id=\"usermsg\">"+userText+"</div><hr id=\"sep\">"; onlyText += " " + userText} ;
        
        setText(fullText);
        
        showTypingAnimation();
        
        var genTextPrompt = "Generate a continuation of this story.\nInput: "+onlyText+"\nOutput: ";
        console.log(onlyText );
        //generate text
        var output = await genText(onlyText);
        if(output.length>0){
        fullText+="<br><div id=\"ai_txt\">" + output + "</div><hr id=\"sep\"><br>";
        onlyText+=" " + output;
        
        setText(fullText);
        hideTypingAnimation();
        btn.disabled = false;
        
        if(onlyText.length>50){
        output = await genText("Generate a relevant image caption for the text-["+userText+"\n"+output+"]\nimage-caption: ");
        
        //output += ", (cinemtic), 4K, detailed";
        console.log("caption: "+output);
        var url = "https://image.pollinations.ai/prompt/"+encodeURI(output.replace(".",""))+"?width=500&height=500&nologo=true&seed="+generateRandomNumber();
        var errUrl = "blank trans.png";
        var imageCode = "<center><img src= \"  "+url+"  \" onerror=\"this.onerror=null;this.src='"+errUrl+"';\" /></center>";
        fullText += ""+imageCode+"<br><div id=\"caption\">"+""+"</div><hr id=\"sep\">";
        setText(fullText);
        }}
        else{
        hideTypingAnimation();
        btn.disabled = false;
        }
        
    }

    function showTypingAnimation() {
        isTyping = true;
        typingContainer.style.display = "block";
    }

    // Function to get response from the chat-based model (but kinda useless here)
async function getChatResponse(userInput) {
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${apiKey}`;
    
    console.log(allMessages);
    
    trimAllMessages();
    
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            prompt: {
                context: "You are an AI language model developed by Nihal Gazi, a high school student from St. Stephen's School. You are meant to be entertaining. You can generate images by writing image caption in brackets. If you are asked to generate images, only write image caption in brackets.",
                examples: examples,
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
            if (chatResponse != null) {
                console.log("chatResp: "+chatResponse);
                getTextGenerationResponse("Only if there are image caption in brackets then only replace the image captions in brackets with markdown image (otherwise keep remaining text same) (format: ![img](https://image.pollinations.ai/prompt/{prompt}?width=500&height=500&nologo=true&seed={seed})): "+chatResponse+". output: ");
            }
        } else {
            throw new Error("API call failed");
        }
    } catch (error) {
        // Handle errors as needed
    } finally {
        
    }
}

// Function to get response from the text-based model (again really useless)
async function getTextGenerationResponse(promptString) {
    const GenapiEndpoint = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;
    
    
    //Request JSON
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: MODEL_NAME,
            temperature: 0.7,
            candidateCount: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 512,
            stopSequences: [],
            safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_NONE"}],
  
            prompt: {
                text: (promptString),
            },
        }),
    };

    try {
        
        //fetch request
        const textGenerationResponse = await fetch(GenapiEndpoint, requestOptions);
        const textGenerationData = await textGenerationResponse.json();
        
        
        
        
        
        
        
        //doing stuffs with request
        if (textGenerationData.candidates.length > 0 ) {
            
            const chatResponse = textGenerationData.candidates[0].output;
            
            if(img==false){
                onlyText = onlyText + " "+ textGenerationData.candidates[0].output;
            }
            
            console.log(fullText);
            
            if(img==false){
            console.log("output: " + textGenerationData.candidates[0].output);
            fullText = fullText + " "+ textGenerationData.candidates[0].output;
            setText(fullText);
            }
            else{
                setText("<hr><img src=\""+fullText+"\"></img><hr>");
            }
            
            img=!img;
            if(img==true){
            var promptimg ="Think of relevant image caption for the text and generate an image URL for this text using this format- https://image.pollinations.ai/prompt/{image+caption+in+URI+encoding}?width=500&height=500&nologo=true&seed={seed}. \ntext-\'"+onlyText+"\'" ;
            console.log(promptimg);
            getTextGenerationResponse(promptimg);
            }
            
            
            /*
            if (chatResponse != null) {
                allMessages.push({ author: "AI", content: chatResponse });
                addChat("incoming", chatResponse);
            }*/
            
            
            
        } else {
            
        }
    } catch (error) {
        
    }
    finally{
        hideTypingAnimation();
    }
}

// after realising ChatGPT has -1 IQ, I decided to code it on my own and now it is 1000x better.
async function genText(promptStr){
    var ai_com = "";
    
        const GenapiEndpoint = `https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText?key=${apiKey}`;
    
    
    //Request JSON
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: MODEL_NAME,
            temperature: 0.05,
            candidateCount: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
            stopSequences: [],
            safetySettings: [{"category":"HARM_CATEGORY_DEROGATORY","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_TOXICITY","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_VIOLENCE","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_SEXUAL","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_MEDICAL","threshold":"BLOCK_NONE"},{"category":"HARM_CATEGORY_DANGEROUS","threshold":"BLOCK_NONE"}],
  
            prompt: {
                text: (promptStr),
            },
        }),
    };

    try {
        
        //fetch request
        const textGenerationResponse = await fetch(GenapiEndpoint, requestOptions);
        console.log("TextAI output: "+JSON.stringify(textGenerationResponse));
        const textGenerationData = await textGenerationResponse.json();
        
        
        
        
        console.log("TextAI output: "+textGenerationData.candidates[0].output);
        
        
        //doing stuffs with request
        if (textGenerationData.candidates.length > 0 ) {
            ai_com = textGenerationData.candidates[0].output;
            console.log(ai_com);
        } else {
            console.log("Empty");
            alert("Nothing was generated");
        }
    } catch (error) {
        console.log("Text AI error: "+error);
        alert("Sorry, I could not continue the story further. Please try refreshing.");
    }
    finally{
        return ai_com;
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

    function setText(text){
        document.getElementById("chatContainer").innerHTML = marked.parse(text);
        
        
    }

function generateRandomNumber() {
    // Generate a random number between 10000 and 99999
    const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    return randomNumber;
}

});
