"use client";

import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Chat = () => {
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! What product are you looking for?" },
  ]);
  const [message, setMessage] = useState("");
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { type: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    setMessage("");

    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const products = await res.json();

      if (products.length > 0) {
        const randomProduct = products[Math.floor(Math.random() * products.length)];

        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Here's a product for you:",
            product: {
              title: randomProduct.title,
              price: randomProduct.price,
              image: randomProduct.image,
            },
          },
        ]);
      } else {
        setMessages((prev) => [...prev, { type: "bot", text: "Sorry, no products found." }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { type: "bot", text: "Error fetching products." }]);
    }
  };

  return (
    <section className="max-w-lg mx-auto">
      <h2 className="flex gap-4 rounded-t-md border border-primary bg-secondary px-4 py-2 text-2xl font-semibold text-primary">
        <Image src="/chat-logo.svg" alt="logo" width={32} height={32} />
        Product Chat
      </h2>
      <ScrollArea className="h-96 rounded-b-md border border-primary p-4" ref={chatRef}>
        {messages.map((message, index) => (
          <ChatMessage message={message} key={index} />
        ))}
      </ScrollArea>
      <div className="grid grid-cols-[1fr_auto] items-center gap-2 py-2">
        <Input
          type="text"
          placeholder="Ask for a product..."
          className="h-12"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button type="button" className="aspect-square h-12 p-2" onClick={sendMessage}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

const ChatMessage = ({ message }) => {
  return (
    <div className={`flex flex-col gap-2 my-2 ${message.type === "user" ? "items-end" : "items-start"}`}>
      {message.text && (
        <div className={`rounded-md p-2 ${message.type === "user" ? "bg-primary text-white" : "bg-neutral-100"}`}>
          <p>{message.text}</p>
        </div>
      )}
      {message.product && (
        <div className="flex flex-col items-start gap-2 border p-3 rounded-md bg-neutral-100">
          <Image src={message.product.image} alt={message.product.title} width={100} height={100} />
          <p className="font-semibold">{message.product.title}</p>
          <p className="text-sm text-gray-600">${message.product.price}</p>
        </div>
      )}
    </div>
  );
};

export default Chat;
