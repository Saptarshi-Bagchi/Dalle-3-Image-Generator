import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenAI from "openai";

const app = express();
const PORT = 9000;

//!Configure openai
const openai = new OpenAI({apiKey: process.env.OPENAI_KEY});
//Middleware
app.use(express.json());

//!Route
app.post('/generate-image', async(req, res) => {
    const {prompt} = req.body;
    try{
        const imageResponse = await openai.images.generate({
            model:"gpt-image-1",
            prompt,
            n:1,
            size:'1024x1024'
        })
        res.json(imageResponse.data[0].url);
    } catch (error) {
        console.error(error);
        res.json({ message: "Error generating image"});
    }
})
//!Start the serve
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
