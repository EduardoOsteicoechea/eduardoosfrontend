import "./Chatbot_001.css";
import React, { useEffect, useRef, useState } from 'react';

interface Chatbot_001Props {

}

interface DeepSeekChatMessage {
  role: string;
  content: string;
}

const Chatbot_001: React.FC<Chatbot_001Props> = ({ }) => {
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

      setMessages((prevMessages) => {
        let updatedMessages = [...prevMessages, newUserMessage];
        console.log('messages (after user message):\n\n' + JSON.stringify(updatedMessages));

        setIsStreaming(true);
        setCurrentTime(getCurrentHourMinute());

        const requestBody = {
          previous_messages: prevMessages,
          message: { role: 'user', content: userPrompt },
        };

        console.log('requestBody:\n\n' + JSON.stringify(requestBody));

        fetch('https://eduardoos.com/chatbot/about/eduardo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
          .then(response => {
            console.log('response:', response);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json() as Promise<DeepSeekChatMessage>;
          })
          .then(data => {            
            console.log('data:', data);
            setMessages((previousMessages:any)=>[...previousMessages, data])
            updatedMessages = [...updatedMessages, data]
            console.log('updatedMessages:', updatedMessages);
            setIsStreaming(false);
          })
          .catch(error => {
            const errorMessage: DeepSeekChatMessage = { role: 'bot', content: 'An error occurred while processing your request.' };
            console.error(error);
            updatedMessages = [...updatedMessages, errorMessage]
            console.error('updatedMessages:', updatedMessages);
            setIsStreaming(false);
          });

        return updatedMessages; // Return the updated state
      });

      setUserPrompt('');
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

          </div>
        ))}
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
            <div className="Chatbot_001_input_form_sample_prompt_button">
              a
            </div>
            <div className="Chatbot_001_input_form_help_on_what_to_ask_button">
              a
            </div>
            <div className="Chatbot_001_input_form_reset_chat_button">
              a
            </div>
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