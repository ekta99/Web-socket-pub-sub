import { createClient } from "redis";


const client = createClient();

async function processSubmission(submission:string){
    console.log(submission,"submission")
    const {problemId,code, language,userId}= JSON.parse(submission);
    console.log(`processing submission for problemID ${problemId}`);
    console.log(`Language ${language}`);
    console.log(`Code : ${code}`);

     //actually run the user code 
     await new Promise((resolve)=>setTimeout(resolve, 1000))

     //send it to pub sub
     console.log("processed user submission")
}

async function main(){
    try{
       await client.connect();
       while(1){
        const response = await client.brPop("problems",0)
        console.log("response is ", response)
        // processSubmission(response)
            // actually run the user code 
     await new Promise((resolve)=>setTimeout(resolve, 1000))

     //send it to pub sub
     console.log("processed user submission")
    }
    }catch(error){
        console.error("Unable to connect to Redis ",error);
    }
}

main()


