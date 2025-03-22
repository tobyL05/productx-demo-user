
import React from 'react';
import { cn } from "@/lib/utils";
import { Message } from '@/utils/chatUtils';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-slide-up chat-transition",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] px-4 py-3 rounded-2xl",
          isUser ? "bg-primary text-primary-foreground" : "glass-effect"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
