
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(message.timestamp);

  return (
    <div
      className={cn(
        "flex w-full",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex flex-col space-y-1 max-w-[80%]",
        message.isUser ? "items-end" : "items-start"
      )}>
        <div className="flex items-center gap-1.5">
          {!message.isUser && <Bot className="h-4 w-4 text-vsphere-primary" />}
          <span className="text-xs text-muted-foreground">
            {message.isUser ? 'You' : 'Assistant'} • {formattedTime}
          </span>
          {message.isUser && <User className="h-4 w-4 text-gray-500" />}
        </div>
        
        <Card className={cn(
          message.isUser 
            ? "bg-vsphere-primary text-primary-foreground" 
            : "bg-muted/50"
        )}>
          <CardContent className="p-3 text-sm whitespace-pre-wrap">
            {message.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatMessage;
