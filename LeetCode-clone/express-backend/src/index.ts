import express from 'express';
import { createClient } from 'redis';

const app = express();
app.use(express.json());

const client = createClient();
client.on('error',(err)=>console.log('Redis Client Error',err))

app.post('/submit',async(req,res)=>{
    // const problemId = req.body.problemId;
    // const code = req.body.code;
    // const language = req.body.language
    const {problemId,userId,code, language} = req.body

    try{
        await client.lPush("problems",JSON.stringify({code,userId,language,problemId}))

        //store it in databse
        res.status(200).send("Submission received and stored")
    }catch(error){
        console.error("Redis error: ",error);
        res.status(500).send("Failed to store submission. ");
    }
});

async function startServer() {
    try{
        await client.connect();
        console.log("connected to REdis");

        app.listen(3000,()=>{
            console.log("Server is running on port 3000")
        })
    }catch(error){
        console.error("Failed to connect to Redis ",error)
    }
}

startServer()