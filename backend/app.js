import dotenv from "dotenv";
dotenv.config();
import express from "express";
import OpenAI from "openai";

const app = express();
const PORT = 9000;

// Create the client only for live requests, so testing mode cannot touch it.
const getOpenAIClient = () => new OpenAI({ apiKey: process.env.OPENAI_KEY });
//Middleware
app.use(express.json());

//!Route
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;
  try{
    const imageResponse = await getOpenAIClient().images.generate({
        model: "gpt-image-1",
        prompt: prompt,
        n:1,
        size: "1024x1024",
        quality: "low"
    })
    res.json(imageResponse.data[0].url);
  } catch (error) {
    res.json({ message: "Error generating image" });
  }
});

//!Start the sever
app.listen(PORT, console.log("Server is running..."));
