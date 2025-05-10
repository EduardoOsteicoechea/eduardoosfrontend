import "./Chatbot_001.css";
import React, { useEffect, useRef, useState } from 'react';

interface Chatbot_001Props {
  // You can define any props this component might receive here
}

interface Message {
  text: string;
  sender: 'user' | 'bot';
  error?: boolean;
}

const Chatbot_001: React.FC<Chatbot_001Props> = ({
  // Destructure any props here if needed
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length > 0 && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  function getCurrentHourMinute() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return formattedTime;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userPrompt.trim()) 
    {
      const newUserMessage = { text: userPrompt, sender: 'user' };
      setMessages((prevMessages:any) => [...prevMessages, newUserMessage]);
      setUserPrompt('');
      setBotResponse('');
      setIsStreaming(true);
      setCurrentTime(getCurrentHourMinute());

      const previousMessagesForBackend = messages.reduce<string[]>((acc, msg) => {
        if (msg.sender === 'bot' && messages[messages.indexOf(msg) + 1]?.sender === 'user') {
          acc.push(msg.text, messages[messages.indexOf(msg) + 1].text);
        }
        return acc;
      }, []);

      const requestBody = {
        previous_messages: previousMessagesForBackend,
        prompt: userPrompt,
      };

      console.log(requestBody)

      // try {
        const response = await fetch('https://eduardoos.com/api', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }

        const data = await response.json();
        setIsStreaming(false);
        if (data && data.response) {
          setBotResponse(data.response);
          setMessages((prevMessages:any) => [...prevMessages, { text: data.response, sender: 'bot' }]);
        } else {
          const errorMessage = { text: 'No response received from the server.', sender: 'bot', error: true };
          setMessages((prevMessages:any) => [...prevMessages, errorMessage]);
        }
      // } catch (error) {
      //   console.error('Error sending request:', error);
      //   setIsStreaming(false);
      //   const errorMessage = { text: 'An error occurred while processing your request.', sender: 'bot', error: true };
      //   setMessages((prevMessages:any) => [...prevMessages, errorMessage]);
      // }
    }
  };

  return (
    <div className="Chatbot_001">
      <div className="Chatbot_001_chat_display" ref={chatContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`Chatbot_001_chat_display_message Chatbot_001_chat_display_message_${msg.sender}`}>
            <strong className="Chatbot_001_chat_display_message_subject">
              {msg.sender === 'user' ? `You (${currentTime})` : `Assistant`}
            </strong>
            <p className="Chatbot_001_chat_display_message_content">
              {msg.text}
            </p>
            {msg.error && <span className="Chatbot_001_chat_display_error_message"> (Error)</span>}
          </div>
        ))}
        {isStreaming && (
          <div className="Chatbot_001_chat_display_message Chatbot_001_chat_display_message_bot">
            <strong className="Chatbot_001_chat_display_message_subject">
              Assistant
            </strong>
            <p className="Chatbot_001_chat_display_message_content">
              {botResponse}
            </p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="Chatbot_001_input_form">
        <textarea
          className="Chatbot_001_input_form_text_area"
          value={userPrompt}
          onChange={handleInputChange}
          placeholder="Ask about Eduardo..."
          spellCheck="false"
        />
        <div className="Chatbot_001_input_form_send_buttons_container">
          <div className="Chatbot_001_input_form_send_help_buttons_container">
            <button type="submit" className="Chatbot_001_input_form_sample_prompt_button">
              a
            </button>
            <button type="submit" className="Chatbot_001_input_form_help_on_what_to_ask_button">
              a
            </button>
            <button type="submit" className="Chatbot_001_input_form_reset_chat_button">
              a
            </button>
          </div>
          <button type="submit" className="Chatbot_001_input_form_send_button" disabled={isStreaming}>
            {isStreaming ? 'Loading...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot_001;