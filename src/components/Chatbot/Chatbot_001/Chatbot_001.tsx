import "./Chatbot_001.css";
 import React, { useEffect, useRef, useState } from 'react';

 interface Chatbot_001Props {
  // You can define any props this component might receive here
 }

 interface DeepSeekChatMessage {
  role: 'system' | 'user' | 'bot';
  content: string;
  error?: boolean; // Keep this for potential error messages
 }

 const Chatbot_001: React.FC<Chatbot_001Props> = ({
  // Destructure any props here if needed
 }) => {
  const [messages, setMessages] = useState<DeepSeekChatMessage[]>([]);
  const [userPrompt, setUserPrompt] = useState('');
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
   if (userPrompt.trim()) {
    const newUserMessage: DeepSeekChatMessage = { role: 'user', content: userPrompt };
    setMessages((prevMessages: DeepSeekChatMessage[]) => [...prevMessages, newUserMessage]);
    setUserPrompt('');
    setIsStreaming(true); // Keep this to disable the send button during the request
    setCurrentTime(getCurrentHourMinute());

    const requestBody = {
     previous_messages: messages.map(msg => ({ role: msg.role, content: msg.content })),
     message: { role: 'user', content: userPrompt },
    };

    console.log(requestBody);

    try {
     const response = await fetch('https://eduardoos.com/chatbot/about/eduardo', {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
     });

     console.log(response);

     if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
     }

     const data = await response.json() as DeepSeekChatMessage[];
     console.log(data);
     setIsStreaming(false); // Re-enable the send button after the response
     if (data && Array.isArray(data) && data.length > 0) {
      // Assuming the last message in the array is the bot's response
      const botMessage = data[data.length - 1];

      if (botMessage.role === 'bot' && botMessage.content) {
       setMessages(data); // Update the entire messages array with the new response
      } else {
       const errorMessage: DeepSeekChatMessage = { role: 'bot', content: 'Unexpected response format from the server.', error: true };
       setMessages((prevMessages: DeepSeekChatMessage[]) => [...prevMessages, errorMessage]);
      }
     } else {
      const errorMessage: DeepSeekChatMessage = { role: 'bot', content: 'No response or invalid response format received from the server.', error: true };
      setMessages((prevMessages: DeepSeekChatMessage[]) => [...prevMessages, errorMessage]);
     }
    } catch (error) {
     console.error('Error sending request:', error);
     setIsStreaming(false); // Re-enable the send button in case of an error
     const errorMessage: DeepSeekChatMessage = { role: 'bot', content: 'An error occurred while processing your request.', error: true };
     setMessages((prevMessages: DeepSeekChatMessage[]) => [...prevMessages, errorMessage]);
    }
   }
  };

  return (
   <div className="Chatbot_001">
    <div className="Chatbot_001_chat_display" ref={chatContainerRef}>
     {messages.map((msg, index) => (
      <div key={index} className={`Chatbot_001_chat_display_message Chatbot_001_chat_display_message_${msg.role}`}>
       <strong className="Chatbot_001_chat_display_message_subject">
        {msg.role === 'user' ? `You (${currentTime})` : `Assistant`}
       </strong>
       <p className="Chatbot_001_chat_display_message_content">
        {msg.content}
       </p>
       {msg.error && <span className="Chatbot_001_chat_display_error_message"> (Error)</span>}
      </div>
     ))}
     {/* Removed the conditional rendering for botResponse during isStreaming */}
     {/* We are now relying on the messages array to display the bot's response */}
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
