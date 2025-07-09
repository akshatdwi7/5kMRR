import { ChatMessage } from '../types';

const responses = [
  "Based on the current market data, this stock shows strong fundamentals with a healthy P/E ratio.",
  "The recent price movement suggests increased volatility. Consider the company's earnings report next week.",
  "This sector has been performing well due to recent technological advances and market trends.",
  "The dividend yield is attractive for income-focused investors, with a consistent payment history.",
  "Technical analysis shows the stock is approaching a key resistance level at $XXX.",
  "The company's debt-to-equity ratio is within healthy limits compared to industry peers.",
  "Recent insider trading activity shows executives have been buying shares, a positive signal.",
  "The stock's beta indicates it's less volatile than the overall market, suitable for conservative portfolios.",
];

export const chatApi = {
  sendMessage: (message: string, stockSymbol?: string): Promise<ChatMessage> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const response: ChatMessage = {
          id: Date.now().toString(),
          message: stockSymbol ? 
            `Regarding ${stockSymbol}: ${randomResponse}` : 
            randomResponse,
          sender: 'ai',
          timestamp: new Date(),
          stockSymbol,
        };
        resolve(response);
      }, 1000 + Math.random() * 1000);
    });
  },
};