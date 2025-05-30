import HasForbiddenCharacters from "../../../Helpers/ForbiddenCharacters";
import "./Assistant_001.css";
import React, { useEffect, useRef, useState } from 'react';

interface DeepSeekChatMessage {
  role: string;
  content: string;
}
interface Assistant_001_properties {
  url: string;
}

const Assistant_001: React.FC<Assistant_001_properties> = ({url}) =>
{
  const [messages, setMessages] = useState<DeepSeekChatMessage[]>([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
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
    const inputValue = event.target.value
    let result: [boolean, string] = HasForbiddenCharacters(inputValue)
    if(result[0]){
      alert(`"${result[1]}" is a forbidden character`)
    }else{
      setUserPrompt(event.target.value);
    }
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

        fetch(url, {
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

  const handleAssistant_001_input_form_sample_prompt_buttonClick = ()=>{
    setUserPrompt("Please resume Eduardo's professional profile")
  }

  const handleAssistant_001_input_form_reset_chat_buttonClick = ()=>{
    setUserPrompt("")
  }

  return (
    <div className="Assistant_001">
      <div 
      className={`Assistant_001_chat_display ${messages.length > 0 ? "Assistant_001_chat_display_expanded" : "Assistant_001_chat_display_contracted"}`}
      ref={chatContainerRef}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`Assistant_001_chat_display_message Assistant_001_chat_display_message_${msg.role}`}>
            <strong className="Assistant_001_chat_display_message_subject">
              {msg.role === 'user' ? `You (${currentTime})` : `Assistant`}
            </strong>
            <p className="Assistant_001_chat_display_message_content">
              {msg.content}
            </p>

          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="Assistant_001_input_form">
        <textarea
          className={`Assistant_001_input_form_text_area ${messages.length > 0 ? "Assistant_001_input_form_text_area_expanded" : "Assistant_001_input_form_text_area_contracted"}`}
          value={userPrompt}
          onChange={handleInputChange}
          placeholder="Ask my AI agent about me..."
          spellCheck="false"
          ref={textareaRef}
        />
        <div className="Assistant_001_input_form_send_buttons_container">
          <div className="Assistant_001_input_form_send_help_buttons_container">
            <div 
            className="Assistant_001_input_form_sample_prompt_button"
            onClick={handleAssistant_001_input_form_sample_prompt_buttonClick}
            >
              <img src="icons/bolt_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Quick Action Icon" />
            </div>
            <div className="Assistant_001_input_form_help_on_what_to_ask_button">
              <img src="icons/help_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Quick Action Icon" />
            </div>
            <div 
            className="Assistant_001_input_form_reset_chat_button"
            onClick={handleAssistant_001_input_form_reset_chat_buttonClick}
            >
              <img src="icons/delete_24dp_1F1F1F_FILL0_wght400_GRAD0_opsz24.png" alt="Quick Action Icon" />
            </div>
          </div>
          <button type="submit" className="Assistant_001_input_form_send_button" disabled={isStreaming}>
            {isStreaming ? 'Loading...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Assistant_001;