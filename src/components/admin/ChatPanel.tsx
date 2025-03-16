
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import ChatMessage from './ChatMessage';

// Define types for chat messages
interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatPanel = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm your admin assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Simulate AI response - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Generate mock response based on user input
      let responseContent = "";
      
      if (inputValue.toLowerCase().includes('analytics')) {
        responseContent = "The analytics dashboard shows key metrics like sales, user engagement, and traffic sources. You can filter by date range and export reports as needed.";
      } else if (inputValue.toLowerCase().includes('product')) {
        responseContent = "In the Products section, you can manage your inventory, add new products, update SEO metadata, and adjust pricing. Each product can be assigned to categories and tags.";
      } else if (inputValue.toLowerCase().includes('order') || inputValue.toLowerCase().includes('sale')) {
        responseContent = "The Orders tab displays all customer purchases. You can filter by status, view order details, generate invoices, and process refunds if necessary.";
      } else if (inputValue.toLowerCase().includes('user') || inputValue.toLowerCase().includes('customer')) {
        responseContent = "User management allows you to view customer profiles, purchase history, and contact information. You can also manage permissions for admin users.";
      } else if (inputValue.toLowerCase().includes('blog') || inputValue.toLowerCase().includes('post')) {
        responseContent = "The Blog section lets you create, edit and publish content. You can schedule posts, add images, and optimize SEO for better visibility.";
      } else if (inputValue.toLowerCase().includes('help') || inputValue.toLowerCase().includes('assistance')) {
        responseContent = "I can help you navigate the admin panel, understand features, summarize data, and provide quick explanations for any section. Just ask about specific features or data you're looking at!";
      } else {
        responseContent = "I'm here to help you with the admin panel. You can ask me about products, orders, users, analytics, blog posts, or any other feature you need assistance with.";
      }

      // Add AI response
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-5 right-5 h-12 w-12 rounded-full shadow-lg bg-vsphere-primary text-white hover:bg-vsphere-primary/90 z-50"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-vsphere-primary" />
            Admin Assistant
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
          
          {isLoading && (
            <Card className="p-3 max-w-[80%] bg-muted/50">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-vsphere-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-vsphere-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-vsphere-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </Card>
          )}
        </div>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Textarea
              placeholder="Ask a question..."
              className="resize-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />
            <Button 
              variant="default" 
              size="icon" 
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatPanel;
