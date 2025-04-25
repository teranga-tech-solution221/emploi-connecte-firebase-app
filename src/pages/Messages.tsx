
import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Search, Send } from "lucide-react";

// Exemple de messages
const messageThreads = [
  {
    id: 1,
    name: "John Doe",
    company: "Tech Solutions Inc.",
    avatar: null,
    lastMessage: "Thank you for your application. We would like to schedule an interview.",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    company: "Digital Innovations",
    avatar: null,
    lastMessage: "Hi, I reviewed your resume and I'm impressed with your background!",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    company: "Global Systems",
    avatar: null,
    lastMessage: "Can you provide some more information about your experience with React?",
    time: "2 days ago",
    unread: false,
  },
];

// Exemple de conversation
const conversation = [
  {
    id: 1,
    sender: "John Doe",
    text: "Hi there! Thank you for your application to Tech Solutions Inc.",
    time: "10:15 AM",
    isSelf: false,
  },
  {
    id: 2,
    sender: "You",
    text: "Thank you for considering my application. I'm very interested in the position.",
    time: "10:18 AM",
    isSelf: true,
  },
  {
    id: 3,
    sender: "John Doe",
    text: "Your experience looks great! We would like to schedule an interview. Are you available next week?",
    time: "10:25 AM",
    isSelf: false,
  },
  {
    id: 4,
    sender: "You",
    text: "Yes, I'm available next week. What days and times work best for you?",
    time: "10:30 AM",
    isSelf: true,
  },
];

const Messages = () => {
  const getInitials = (name: string) => {
    return name.split(" ").map(part => part[0]).join("").toUpperCase();
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1">
          {/* Header */}
          <header className="shadow-sm border-b bg-background">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-foreground">Messages</h1>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main className="p-0 h-[calc(100vh-64px)]">
            <div className="grid grid-cols-12 h-full">
              {/* Message list sidebar */}
              <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r h-full overflow-hidden flex flex-col bg-background">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search messages..." className="pl-8" />
                  </div>
                </div>
                <div className="overflow-auto flex-1">
                  {messageThreads.map((thread) => (
                    <div 
                      key={thread.id} 
                      className={`p-3 hover:bg-accent/50 cursor-pointer ${thread.unread ? 'bg-accent/30' : ''}`}
                    >
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={thread.avatar || ""} alt={thread.name} />
                          <AvatarFallback>{getInitials(thread.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 overflow-hidden">
                          <div className="flex justify-between items-center">
                            <p className={`font-medium truncate ${thread.unread ? 'text-primary' : ''}`}>{thread.name}</p>
                            <span className="text-xs text-muted-foreground">{thread.time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate">{thread.company}</p>
                          <p className={`text-sm truncate mt-1 ${thread.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                            {thread.lastMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversation area */}
              <div className="hidden md:flex col-span-8 lg:col-span-9 flex-col h-full bg-background">
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={null} alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">Tech Solutions Inc.</p>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto p-4 space-y-4">
                  {conversation.map((message) => (
                    <div key={message.id} className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] ${message.isSelf 
                        ? 'bg-primary text-primary-foreground rounded-tl-lg rounded-tr-lg rounded-bl-lg' 
                        : 'bg-muted rounded-tl-lg rounded-tr-lg rounded-br-lg'} p-3`}
                      >
                        {!message.isSelf && <p className="font-medium text-sm mb-1">{message.sender}</p>}
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.isSelf ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input placeholder="Type your message..." className="flex-1" />
                    <Button size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Empty state (shown when no conversation is selected on mobile) */}
              <div className="col-span-12 md:hidden flex items-center justify-center h-full bg-background">
                <div className="text-center p-4">
                  <h3 className="font-medium text-lg text-foreground">No conversation selected</h3>
                  <p className="text-muted-foreground text-sm">Choose a conversation from the list</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Messages;
