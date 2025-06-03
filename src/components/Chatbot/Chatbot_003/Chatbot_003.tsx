import HasForbiddenCharacters from "../../../Helpers/ForbiddenCharacters";
import "./Chatbot_003.css";
import React, { useEffect, useRef, useState } from 'react';

interface DeepSeekChatMessage {
  role: string;
  content: string;
}

const Chatbot_003: React.FC = () => {
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
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const focusTextArea = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  const handleChatbot_003_input_form_sample_prompt_buttonClick = () => {
    setUserPrompt("Please resume Eduardo's professional profile");
    focusTextArea();
  }

  const handleChatbot_003_input_form_reset_chat_buttonClick = () => {
    setUserPrompt("");
    focusTextArea();
  }

  const Chatbot_003_input_form_help_on_what_to_ask_buttonClick = () => {
    window.open('https://eduardoos.com', '_blank');
    focusTextArea();
  }

  useEffect(() => {
    focusTextArea();
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
    if (result[0]) {
      alert(`"${result[1]}" is a forbidden character`)
    } else {
      setUserPrompt(event.target.value);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (userPrompt.trim()) {
      const newUserMessage: DeepSeekChatMessage = { role: 'user', content: userPrompt };

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
            const responseMessage: DeepSeekChatMessage = { role: 'assistant', content: data };
            updatedMessages = [...updatedMessages, responseMessage];
            setMessages((prevMessages) => [...prevMessages, responseMessage]);
            // console.log('updatedMessages:', updatedMessages);
            setIsStreaming(false);
          })
          .catch(error => {
            console.error('Fetch error:', error);
            const responseMessage: DeepSeekChatMessage = { role: 'assistant', content: 'An error occurred while processing your request.' };
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
    <div className="Chatbot_003">

      <form onSubmit={handleSubmit} className="Chatbot_003_input_form">
        <textarea
          className={`Chatbot_003_input_form_text_area ${messages.length > 0 ? "Chatbot_003_input_form_text_area_expanded" : "Chatbot_003_input_form_text_area_contracted"}`}
          value={userPrompt}
          onChange={handleInputChange}
          spellCheck="false"
          ref={textareaRef}
        />
        <div className="Chatbot_003_input_form_send_buttons_container">
          <div className="Chatbot_003_input_form_send_help_buttons_container">
            <div
              className="Chatbot_003_input_form_button Chatbot_003_input_form_sample_prompt_button"
              onClick={handleChatbot_003_input_form_sample_prompt_buttonClick}
            ></div>
            <div
              className="Chatbot_003_input_form_button Chatbot_003_input_form_help_on_what_to_ask_button"
              onClick={Chatbot_003_input_form_help_on_what_to_ask_buttonClick}
            ></div>
            <div
              className="Chatbot_003_input_form_button Chatbot_003_input_form_reset_chat_button"
              onClick={handleChatbot_003_input_form_reset_chat_buttonClick}
            ></div>
          </div>
          <button type="submit" className="Chatbot_003_input_form_send_button" disabled={isStreaming}>
            {isStreaming ? 'Loading...' : 'Send'}
          </button>
        </div>
      </form>
      <div
        className={`Chatbot_003_chat_display ${messages.length > 0 ? "Chatbot_003_chat_display_expanded" : "Chatbot_003_chat_display_contracted"}`}
        ref={chatContainerRef}
      >
        <div className={`Chatbot_003_chat_display_message Chatbot_003_chat_display_message_assistant`}>
          <strong className="Chatbot_003_chat_display_message_subject">
            {`Assistant (${currentTime})`}
          </strong>
          <p className="Chatbot_003_chat_display_message_content">
            Ask Anything About Eduardo
          </p>
        </div>
        {messages.map((msg, index) => (
          <div key={index} className={`Chatbot_003_chat_display_message Chatbot_003_chat_display_message_${msg.role}`}>
            <strong className="Chatbot_003_chat_display_message_subject">
              {msg.role === 'user' ? `You (${currentTime})` : `Assistant`}
            </strong>
            <p className="Chatbot_003_chat_display_message_content">
              {msg.content}
            </p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
    </div>
  );
};

export default Chatbot_003;