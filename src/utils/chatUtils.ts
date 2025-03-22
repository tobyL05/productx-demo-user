
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const getDefaultMessages = (): Message[] => {
  return [
    {
      id: generateId(),
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ];
};

export const generateAssistantResponse = async (message: string): Promise<string> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const responses = [
    "I'm an AI assistant created to provide information and assist with various tasks. How can I help you further?",
    "That's an interesting question. Let me provide some insights based on the information available to me.",
    "I understand you're asking about this topic. Here's what I can tell you based on my knowledge.",
    "Thanks for sharing that. I'm designed to be helpful, harmless, and honest in my interactions.",
    "I appreciate your question. Let me explain what I know about this subject.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};
