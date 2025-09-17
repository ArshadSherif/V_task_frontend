import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

interface Message {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div 
      className="flex-1 overflow-auto px-4 py-6 mb-12"
      style={{
        background: 'var(--gradient-chat)',
      }}
    >
      <div className="container mx-auto max-w-4xl">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[300px]">
            <div className="text-center text-muted-foreground">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-lg font-medium mb-2">Start a conversation</h3>
              <p className="text-sm">Ask me anything about the news!</p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage
                key={msg.id}
                message={msg.message}
                isUser={msg.isUser}
                timestamp={msg.timestamp}
              />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;