
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message, generateId, generateAssistantResponse } from '@/utils/chatUtils';

interface ChatContainerProps {
  initialMessages?: Message[];
}

const ChatContainer: React.FC<ChatContainerProps> = ({ initialMessages = [] }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setIsTyping(true);
    try {
      const responseContent = await generateAssistantResponse(content);
      const assistantMessage: Message = {
        id: generateId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="flex items-center gap-1 px-4 py-2 text-muted-foreground animate-fade-in">
            <div className="w-2 h-2 rounded-full bg-primary animate-typing-dot-1" />
            <div className="w-2 h-2 rounded-full bg-primary animate-typing-dot-2" />
            <div className="w-2 h-2 rounded-full bg-primary animate-typing-dot-3" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="px-4 py-4">
        <ChatInput onSubmit={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
};

export default ChatContainer;
