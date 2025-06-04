import HasForbiddenCharacters from "../../../Helpers/ForbiddenCharacters";
import "./Chatbot_004.css";
import React, { useEffect, useRef, useState } from 'react';

interface DeepSeekChatMessage {
    role: string;
    content: string;
}

const Chatbot_004: React.FC = () => {
    const [messages, setMessages] = useState<DeepSeekChatMessage[]>([]);
    const [userPrompt, setUserPrompt] = useState('');
    const [isStreaming, setIsStreaming] = useState(false);
    const [currentTime, setCurrentTime] = useState(() => { const now = new Date(); const hours = now.getHours(); const minutes = now.getMinutes(); return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`; });
    const chatEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        }
    }, [userPrompt, messages]);

    useEffect(() => {
        if (chatContainerRef.current && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    const focusTextArea = () => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }

    useEffect(() => {
        focusTextArea();
    }, [messages]);

    useEffect(() => {
        focusTextArea();
    }, []);

    function getCurrentHourMinute() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
        return formattedTime;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = event.target.value
        let result: [boolean, string] = HasForbiddenCharacters(inputValue)
        if (result[0]) {
            alert(`"${result[1]}" is a forbidden character`)
        } else {
            setUserPrompt(event.target.value);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {

        event.preventDefault();

        if (userPrompt.trim()) {
            const newUserMessage: DeepSeekChatMessage = { role: 'user', content: textareaRef.current?.value ?? "" };
            // const newUserMessage: DeepSeekChatMessage = { role: 'user', content: userPrompt };

            setMessages((prevMessages) => {

                let updatedMessages = [...prevMessages, newUserMessage];

                // console.log('messages (after user message):\n\n' + JSON.stringify(updatedMessages));

                setIsStreaming(true);
                setCurrentTime(getCurrentHourMinute());

                const requestBody = {
                    previous_messages: prevMessages,
                    message: { role: 'user', content: userPrompt },
                };

                // console.log('requestBody:\n\n' + JSON.stringify(requestBody));

                fetch('https://eduardoos.com/chatbot/about/eduardo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                    .then(response => {
                        // console.log('response:', response);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        // console.log('Response OK, attempting to read text...');
                        return response.text();
                    })
                    .then(data => {
                        // console.log('Data received:', data);
                        const responseMessage: DeepSeekChatMessage = {
                            role: 'assistant',
                            content: data
                        };
                        updatedMessages = [...updatedMessages, responseMessage];
                        setMessages((prevMessages) => [...prevMessages, responseMessage]);
                        // console.log('updatedMessages:', updatedMessages);
                        setIsStreaming(false);
                    })
                    .catch(error => {
                        console.error('Fetch error:', error);
                        const responseMessage: DeepSeekChatMessage = {
                            role: 'assistant',
                            content: 'An error occurred while processing your request.'
                        };
                        updatedMessages = [...updatedMessages, responseMessage];
                        setMessages((prevMessages) => [...prevMessages, responseMessage]);
                        // console.error('updatedMessages (error):', updatedMessages);
                        setIsStreaming(false);
                    });

                return updatedMessages;
            });

            setUserPrompt('');
        }
    };

    return (
        <div className="Chatbot_004">

            <div className={`Chatbot_004_chat_display_message Chatbot_004_chat_display_message_assistant`}>
                <strong className="Chatbot_004_chat_display_message_subject">
                    {`Assistant (${currentTime})`}
                </strong>
                <p className="Chatbot_004_chat_display_message_content">
                    Ask Anything About Eduardo
                </p>
            </div>

            {
                messages.map((messageObject, messageIndex) => (
                    <div
                        key={messageIndex}
                        className={`Chatbot_004_chat_display_message Chatbot_004_chat_display_message_${messageObject.role}`}
                    >
                        <strong className="Chatbot_004_chat_display_message_subject">
                            {
                                messageObject.role === `user`
                                    ?
                                    `You (${currentTime})`
                                    :
                                    `Assistant (${currentTime})`
                            }
                        </strong>
                        <p className="Chatbot_004_chat_display_message_content">
                            {messageObject.content}
                        </p>
                    </div>
                ))}

            <div ref={chatEndRef} />

            {
                isStreaming
                    ?
                    <div
                        className={`Chatbot_004_chat_display_message Chatbot_004_chat_display_message_assistant`}
                    >
                        <strong className="Chatbot_004_chat_display_message_subject">
                            {`Assistant (${currentTime})`}
                        </strong>
                        <div
                            className="loading_response_container"
                        >
                            <div
                                className="loading_response_container_dot loading_response_container_dot_1"
                            ></div>
                            <div
                                className="loading_response_container_dot loading_response_container_dot_2"
                            ></div>
                            <div
                                className="loading_response_container_dot loading_response_container_dot_3"
                            ></div>
                        </div>
                    </div>
                    :
                    <div
                        className="Chatbot_004_chat_display_message Chatbot_004_chat_display_current_message"
                    >
                        <textarea
                            className="Chatbot_004_chat_display_current_message_textarea"
                            onChange={handleInputChange}
                            spellCheck="false"
                            ref={textareaRef}
                        />
                        <button
                            className="Chatbot_004_chat_display_current_message_button"
                            onClick={handleSubmit}
                        >Send</button>
                    </div>
            }

        </div>
    );
};

export default Chatbot_004;