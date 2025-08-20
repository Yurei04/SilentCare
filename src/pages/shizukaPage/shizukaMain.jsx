;"use client"

import { content } from "pdfkit/js/page";
import { useEffect, useRef, useState } from "react"

export default function ShizukaMain () {
    const [message, setMessage] = useState(" ");
    const [reply, setReply] = useState([{ role: "Shizuka", content: "Greetings, how can I help you today?"}])
    const chatEndRef = useRef(null);

    useEffect(() => {
        const listen = event => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                console("enter key pressed checkd");
                event.preventDefault()
            }
        };
        document.addEventListener("keydown", listen);
        return () => {
            document.removeEventListener("keydown", listen);
        }
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async() => {
        if (!message.trim()) return;
        try {
            const res = await fetch("http://localhost:5000/shizuka",{
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify({ message })
            })
            const data = await res.json();
            const shizukaReply = { role: "Shizuka", content: data.response || "Sorry, I do not understand."}
            setReply(prev => [...prev, shizukaReply]);
        } catch (error) {
            console.log("Backend Error Check: ", error);

        }

        setMessage("");
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <div>
                {reply.map((rep, idx) => (
                    <div
                        key={idx}
                        className=""
                    >
                        {rep.content}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            
            <div className="">
                <input
                    placeholder=""
                    className=""
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
                >
                
                </input>
                <button
                    className=""
                    onClick={sendMessage}
                >

                </button>
            </div>
        </div>
    )
}