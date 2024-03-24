const apiKey = "AIzaSyAcWxlhFcMPXt61Yjhd4RGe9UhDcj6P36o";
const MODEL_NAME = "models/text-bison-001";

const caption_div = document.getElementById("caption");
const load_div = document.getElementById("loading_img");
const heading_div = document.getElementById("heading");
const canvas = document.getElementById("img_gen_canv");
const detail_div = document.getElementById("details");


page();

async function page(){

//init incase i need it for future stuffs, rn not rlly needed
canvas.style.display = 'none';
caption_div.style.display = 'none';
load_div.style.display = 'block';	
heading_div.style.animation = 'fadeInOut 1s infinite';
detail_div.style.animation = 'fadeInOut 1s infinite';	

var initial = "Strange Breaking News: ";

    console.log("Generating main healdine: ");
var heading = await genText(initial , 25 , 1.0);
    console.log("Refining main healdine: ");
heading = await genText("extract heading from - \""+initial+" "+heading+"\"" , 25, 0.05);
heading = heading.toString();

heading_div.style.animation = 'none';
set("heading" , heading.split("\n")[0]);


console.log(heading);

//var body = await genText("Write a fake realistic(using realistic location names and human names INSTEAD of placeholders) news report on \""+heading+"\n" , 50 , 0.9);
//body = await genText("In 100 words, briefly summarize as a serious newspaper report and replace placeholders with actual names if there are any- \""+heading+"\"\n" , 1024 , 0.05);
//body = body.toString();
//set("introduction" , ""+body.split("**")[2]);

    console.log("Generating details: ");
var detail = await genText("Write a detailed fake realistic newspaper report paragraph on this \""+heading+"\".\n",1024,1.0);
if(detail.includes("[")){

    console.log("Filling placeholders:");
    detail = await genText("replace placeholders with actual names in \""+detail+"\"" , 1024 , 0.05);
    
}
detail = detail.toString();



detail_div.style.animation = 'none';
set("details" , detail.replace("[Your Name]","Travis Trails"));


//image generation
if(true){
    console.log("Generating image caption: ");
    var caption = await genText("Generate a relevant image caption for the text-["+detail+"]\nimage-caption: ", 1024,0.7);

    var img_style = "in old vintage VCR tape 90s style, no text, no screenshot, crisp accurate photograph, low resolution, low dynamic range, accurate realistic faces";

    var url = "https://image.pollinations.ai/prompt/"+encodeURI((caption+" "+img_style).replace(".",""))+"?width=1000&height=500&nologo=true&seed="+generateRandomNumber();
    var errUrl = "blank trans.png";



    if(false){
    set("img_gen" , "<center><img  src= \"  "+url+"  \" onerror=\"this.onerror=null;this.src='"+errUrl+"';\" /></center>" );}
    else{
            // Fetching the image
            const response = await fetch(url);
            const blob = await response.blob();
            const image = await createImageBitmap(blob);
            console.log(image.width);
			
            
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext("2d");

            // Drawing the original image onto the canvas
            ctx.drawImage(image, 0, 0);

            // OpenCV actions
            
            
            const resizedWidth = image.width * 0.5;
            const resizedHeight = image.height * 0.5;
            const src = cv.imread(canvas);
            var dst = new cv.Mat();
            
            

            console.log("Desaturating...");
            //Desaturate
            cv.cvtColor(src, src, cv.COLOR_RGBA2GRAY,0.1);
            
            //high frequency
            console.log("High Frequency...");
            cv.filter2D(src, src, -1, cv.Mat.ones(2, 2, cv.CV_32F), new cv.Point(-1, -1), 0, cv.BORDER_DEFAULT);

            //Sharpen
            console.log("Sharpening...");
            const sharpenKernel1 =  cv.matFromArray(3, 3, cv.CV_32F, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
            cv.filter2D(src, src, cv.CV_8U, sharpenKernel1);
            
            //Resizing
            console.log("Resizing...");
            cv.resize(src, src, new cv.Size(resizedWidth, resizedHeight), 0, 0, cv.INTER_LINEAR);
            
            //Sharpen
            console.log("Sharpening...");
            const sharpenKernel2 =  cv.matFromArray(3, 3, cv.CV_32F, [-1, -1, -1, -1, 9, -1, -1, -1, -1]);
            cv.filter2D(src, src, cv.CV_8U, sharpenKernel2); 
            
            
            //Sharpen
            //console.log("Sharpening...");
            //const sharpenKernel3 =  cv.matFromArray(3, 3, cv.CV_32F, [-1, -1, -1, -1, 4, -1, -1, -1, -1]);
           // cv.filter2D(src, src, cv.CV_8U, sharpenKernel3); 
            
            
            

            //Gaussian noise: 10%
            //const noiseImage = new cv.Mat();
            //cv.randn(noiseImage, 0, 10);

            // Add noise to the image
            //cv.add(src, noiseImage, src, new cv.Mat(), -1);

            // Displaying the modified image in a div
            console.log("Displaying...");
            cv.imshow(canvas,src);
            


			
            canvas.style.display = 'block';
            caption_div.style.display = 'block';
            load_div.style.display = 'none';
			
			
            set("caption" , caption);

            // Clean up
            src.delete();



        }
    }   
}


async function genText(promptStr, len, temp){
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
            temperature: temp,
            candidateCount: 1,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: len,
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
        const textGenerationData = await textGenerationResponse.json();
        
        
        
        
        console.log("AI output: "+textGenerationData.candidates[0].output);
        
        
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
        location.reload();
    }
    finally{
        return ai_com;
    }

    
}



function set(id, text){
if(text=="undefined"){
document.getElementById(id).innerHTML = "News Report";
}
else{
document.getElementById(id).innerHTML = marked.parse(text);}
}



function generateRandomNumber() {
    // Generate a random number between 10000 and 99999
    const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    return randomNumber;
}
