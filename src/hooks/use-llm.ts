import { useState } from "react";
import { generateId, Message, } from "@/utils/chatUtils"
import Groq from "groq-sdk"
import { omit } from "lodash"
import { useRestClient } from "./useRestClient";

const groq = new Groq({ apiKey: import.meta.env.VITE_GROQ_KEY, dangerouslyAllowBrowser: true})

export function useLlm() {
  const { exchange } = useRestClient()
  const [sysPrompt, setSysPrompt] = useState<string | undefined>(undefined)


  const [messages, setMessages] = useState<Message[]>([{
    id: generateId(),
    role: 'assistant',
    content: "Hello, I'm your friendly assistant!"
  }]);
  const [isTyping, setIsTyping] = useState(false);

  const addMessage = (newMessage: Message) => {
    setMessages((prevMsg) => [...prevMsg, newMessage])
  }

  const getSystemPrompt = (uid: string) => {
    // exchange("POST", `http://localhost:3000/get_prompt/${uid}`)
    // .then((prompt) => setSysPrompt(prompt))
    setSysPrompt("You are a helpful assistant. Always briefly elaborate on your responses.")
  }

  const getChatHistory = (uid: string) => {
    if (!sysPrompt) {
      getSystemPrompt(uid)
    }
    return [{
      role: "system",
      content: "You are a helpful assistant. Always briefly elaborate on your responses."
    }, ...messages.map((msg) => omit(msg, "id"))]
  }

  const generateLlmResponse = async (userMessage: Message): Promise<void> => {
    const chatHistory = getChatHistory("1")
    addMessage(userMessage)
    let chatCompletion = await groq.chat.completions.create({
        messages: [...chatHistory, omit(userMessage, "id")],
        model: "llama-3.1-8b-instant",
    })
    let response = chatCompletion.choices[0].message.content
    if (!response) {
      chatCompletion = await groq.chat.completions.create({
          messages: chatHistory,
          model: "llama-3.1-8b-instant",
      })
    }
    response = chatCompletion.choices[0].message.content
    addMessage({
        id: generateId(),
        role: 'assistant',
        content: response
    })
  }


  return { messages, isTyping, setIsTyping, generateLlmResponse}

}


