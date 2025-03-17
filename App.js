import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SalesTrainer() {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setConversation([...conversation, userMessage]);
    setInput("");

    setIsSpeaking(true);
    const aiResponse = await fetchAIResponse(input);
    setIsSpeaking(false);

    setConversation((prev) => [...prev, { role: "ai", text: aiResponse }]);
  };

  const fetchAIResponse = async (message) => {
    return "That’s a great question! Our service provides 24/7 freight tracking and competitive rates. What are your shipping volume needs?";
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">3PL Sales AI Trainer</h1>
      <Card className="mb-4">
        <CardContent className="h-80 overflow-y-auto p-4 border rounded-lg">
          {conversation.length === 0 ? (
            <p className="text-gray-500">Start a conversation with the AI...</p>
          ) : (
            conversation.map((msg, index) => (
              <div key={index} className={\`\${msg.role === "user" ? "text-right" : "text-left"} mb-2\`}>
                <p className={msg.role === "user" ? "text-blue-600" : "text-green-600"}>
                  <strong>{msg.role === "user" ? "You:" : "AI:"}</strong> {msg.text}
                </p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} disabled={isSpeaking}>
          {isSpeaking ? "AI Responding..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
