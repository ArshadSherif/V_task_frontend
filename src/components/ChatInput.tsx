import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, RotateCcw } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onResetSession: () => void;
  isLoading?: boolean;
}

const ChatInput = ({ onSendMessage, onResetSession, isLoading = false }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
      <div className="container mx-auto max-w-4xl">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about the news..."
              disabled={isLoading}
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button 
            type="button" 
            variant="secondary" 
            onClick={onResetSession}
            className="shrink-0"
            disabled={isLoading}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;