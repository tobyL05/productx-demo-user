
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message, generateId } from '@/utils/chatUtils';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useLlm } from '@/hooks/use-llm';
import { useRestClient } from '@/hooks/useRestClient';

interface ChatContainerProps {
  initialMessages?: Message[];
}

const ChatContainer: React.FC<ChatContainerProps> = () => {
  const { exchange } = useRestClient()
  const { messages, isTyping, setIsTyping, generateLlmResponse } = useLlm()
  const [openDialog, setOpenDialog] = useState<"" | "LIKE" | "DISLIKE">("");
  const [feedback, setFeedback] = useState<string | undefined>()
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
    };

    // Simulate AI response
    setIsTyping(true);
    try {
      await generateLlmResponse(userMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFeedbackSubmission = async (rating: string) => {
    console.log(`Send ${rating} with comment: ${feedback}`)
    if (rating === "LIKE") {
      exchange("POST", "http://localhost:3000/good_feed", {
        prompt_session_id: 1,
        comment: feedback
      })
    } else {
      exchange("POST", "http://localhost:3000/bad_feed", {
        prompt_session_id: 1,
        comment: feedback
      })
    }
    setOpenDialog("")
  }

  return (
    <div className="flex flex-col min-h-[54em] w-full max-w-4xl mx-auto">
        <Dialog open={openDialog !== ""} onOpenChange={() => setOpenDialog("")}>
            <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{openDialog === "LIKE" ? "What went well?" : "What should be improved?"}</DialogTitle>
                <DialogDescription>
                    Any feedback is greatly appreciated
                </DialogDescription>
            </DialogHeader>
            <Textarea 
                placeholder={openDialog === "LIKE" ? "The bot answered clearly..." : "The bot was not..."}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="resize-none"
                rows={1}
            />
            <DialogFooter>
                <Button type="submit" onClick={() => handleFeedbackSubmission(openDialog)}>Submit</Button>
            </DialogFooter>
            </DialogContent>

        </Dialog>
        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="flex flex-col justify-end min-h-full">
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
        </div>

        {/* Sticky Chat Input */}
        <div className="sticky bottom-0 z-10 w-[56em] bg-background px-4 py-4 border-t">
            <ChatInput onSubmit={handleSendMessage} disabled={isTyping} />
            {messages.length > 3 ?
                <div className="w-1/2 float-right justify-end h-8 flex flex-row gap-4 mt-2 items-center">
                    <h1 className="text-md">How is the conversation going so far?</h1>
                    <ThumbsUpIcon className="cursor-pointer w-8 h-8 hover:bg-primary hover:text-primary-foreground p-2 rounded-lg" onClick={() => setOpenDialog("LIKE")}/>
                    <ThumbsDownIcon className="cursor-pointer w-8 h-8 hover:bg-primary hover:text-primary-foreground p-2 rounded-lg" onClick={() => setOpenDialog("DISLIKE")}/>
                </div> :
                <div className="h-8 mt-2"/>
            }
        </div>
    </div>
  );
};

export default ChatContainer;
