
import { getDefaultMessages } from '@/utils/chatUtils';
import ChatContainer from '@/components/ChatContainer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b glass-effect py-4">
        <div className="container">
          <h1 className="text-2xl font-semibold text-center">AI Chat Assistant</h1>
        </div>
      </header>
      <main className="flex-1 container py-4">
        <ChatContainer initialMessages={getDefaultMessages()} />
      </main>
    </div>
  );
};

export default Index;
