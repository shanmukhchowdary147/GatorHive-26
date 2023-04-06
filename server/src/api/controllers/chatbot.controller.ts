import { Request, Response } from 'express';
import Axios from "axios";

class ChatBotController {


  getChatGptRecommendations = async (req: Request, res: Response) => {
    const userMessage = req.body.message;
    try {
      // Call the ChatGPT API to generate recommended events based on user's input
      const response = await Axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: `Recommend events based on the user's input: ${userMessage}`,
        max_tokens: 100,
        n: 1,
        stop: '.'
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CHATGPT_API_KEY}`
        }
      });

      const recommendedEvents = response.data.choices[0].text;

      return res.status(200).json(recommendedEvents);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error generating recommended events' });
    }
  };
}

export const chatbotController = new ChatBotController();
