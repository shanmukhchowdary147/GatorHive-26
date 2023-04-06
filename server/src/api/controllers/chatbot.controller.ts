import { NextFunction, Request, Response } from "express";
import { Configuration, OpenAIApi } from "openai";

class ChatBotController {
  config: Configuration;
  openai: OpenAIApi;
  constructor(){
    this.config = new Configuration({
      apiKey: process.env.CHATGPT_API_KEY
    });
    this.openai = new OpenAIApi(this.config);
  }
  generateResponse = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userMessage = req.body.message;
      const prompt = `User: ${userMessage}\nBot:`;
      const response = await this.openai.createCompletion({
        model: "text-davinci-003", 
        prompt: prompt,
        max_tokens: 2048,
        temperature: 0.5, // adjust the "creativity" of the response
      });
      const message = response.data.choices[0].text;
      res.json({ message: message });
    } catch (error) {
      next(error);
    }
  };
}

export const chatbotController = new ChatBotController();
