"use client"

import { useEffect, useRef, useState } from "react"

export default function ShizukaMain() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState([
        { role: "Shizuka", content: "Greetings, how can I help you today?" }
    ]);
    const chatEndRef = useRef(null);

    useEffect(() => {
        const listen = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console.log("enter key pressed checked");
                event.preventDefault();
            }
        };
        document.addEventListener("keydown", listen);
        return () => document.removeEventListener("keydown", listen);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [reply]);

    const sendMessage = async () => {
        if (!message.trim()) return;
        setReply(prev => [...prev, { role: "User", content: message }]);

        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });
            console.log(res)

            const data = await res.json();
            console.log(data)
            const shizukaReply = { 
                role: "Shizuka", 
                content: data.reply || "Sorry, I do not understand." 
            };

            setReply(prev => [...prev, shizukaReply]);
        } catch (error) {
            console.error("Backend Error Check: ", error);
        }

        setMessage("");
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div className="w-full max-w-md p-4 border rounded overflow-y-auto h-[400px]">
                {reply.map((rep, idx) => (
                    <div 
                        key={idx} 
                        className={`my-2 ${rep.role === "User" ? "text-blue-500" : "text-green-500"}`}
                    >
                        <strong>{rep.role}:</strong> {rep.content}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            
            <div className="w-full max-w-md flex gap-2 mt-4">
                <input
                    placeholder="Type your message..."
                    className="flex-1 border p-2 rounded"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                        } else if (e.key === "Enter" && e.shiftKey) {
                            e.preventDefault();
                            alert("Shift + Enter Pressed");
                        }
                    }}
                />
                <button
                    className="bg-blue-500 text-white px-4 rounded"
                    onClick={sendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
}
