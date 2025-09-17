import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';
import {
  sendChatMessage,
  resetChatSession,
  fetch_chat_history,
  stream_chat_messages,
  reset_session,
  get_session_list
} from "@/api/api";
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';


interface Message {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatProps {
  session_id: string;
  set_session_id: (id: string) => void;
}

const Chat = ({ session_id, set_session_id }: ChatProps) => {
  console.log("Session ID in Chat component:", session_id);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateId = () => {
    return `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleSendMessage = async (messageText: string) => {

    const userMessage: Message = {
      id: generateId(),
      message: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Add an empty AI message placeholder
      const botMessageId = generateId();
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          message: "...",
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      // Stream response
      await stream_chat_messages(session_id, messageText, (chunk) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, message: msg.message + chunk } // append chunk
              : msg
          )
        );
      });
    } catch (error) {
      console.error("Error streaming message:", error);
      toast({
        title: "Error",
        description: "Failed to stream message. Please try again.",
        variant: "destructive",
      });

      // Update bot message with error text
      setMessages((prev) =>
        prev.map((msg) =>
          !msg.isUser && msg.message === ""
            ? {
                ...msg,
                message:
                  "I’m having trouble processing your request right now. Please try again in a moment.",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = async () => {
    setIsLoading(true);

    try {
      const response = await reset_session(session_id);

      if (response.session_id) {
        localStorage.setItem("user_session", response.session_id);
        set_session_id(response.session_id);
        setMessages([]);

        toast({
          title: "Session Reset",
          description:
            response.message ||
            "Your chat session has been reset successfully.",
        });
      } else {
        throw new Error("No session_id returned");
      }
    } catch (error) {
      console.error("Error resetting session:", error);
      toast({
        title: "Error",
        description: "Failed to reset session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetch_history = async () => {
      try {
        setIsLoading(true);
        const data = await fetch_chat_history(session_id);
        console.log("Fetched chat history:", data);
        setMessages(data);
        toast({
          description: "Chat history loaded successfully.",
          variant: "default",
        });
      } catch (error) {
        console.error("Error fetching chat history:", error);
        toast({
          title: "Error",
          description: "Failed to load chat history.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetch_history();
  }, [session_id]);

return (
  <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
    <Header />

    {/* Main Content */}
    <div className="flex flex-1 mt-[68px]">
      {/* Sidebar */}
      <div className="w-64 h-[calc(100vh-68px)] fixed top-[68px] left-0 border-r border-[hsl(var(--border))] flex flex-col">
        <Sidebar session_id={session_id} set_session_id={set_session_id} />
      </div>

      {/* Chat Window */}
      <div className="flex-1 ml-64 flex flex-col">
        <ChatWindow messages={messages} />
      </div>
    </div>

    {/* Chat Input */}
    <ChatInput
      onSendMessage={handleSendMessage}
      onResetSession={handleResetSession}
      isLoading={isLoading}
    />
  </div>
);

};

export default Chat;