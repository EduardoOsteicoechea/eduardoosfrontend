import "./Chatbot_001.css"
import React, { useEffect, useRef, useState } from 'react';

interface Chatbot_001Props {
  // You can define any props this component might receive here
}

interface StreamedChoiceDelta {
  content?: string;
}

interface StreamedChoice {
  index: number;
  delta: StreamedChoiceDelta;
  logprobs: null;
  finish_reason: 'stop' | null;
}

interface StreamedResponseChunk {
  id: string;
  object: 'chat.completion.chunk';
  created: number;
  model: string;
  system_fingerprint: string;
  choices: StreamedChoice[];
}

const Chatbot_001: React.FC<Chatbot_001Props> = ({
  // Destructure any props here if needed
}) => {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; error?: boolean }>>([]);
  const [userPrompt, setUserPrompt] = useState('');
  const [streamingResponse, setStreamingResponse] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTime, setCurrentTime] = useState('');  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isStreaming && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (messages.length > 0 && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isStreaming, messages]);

  function getCurrentHourMinute() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes(); 
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return formattedTime;
  }

  const documentText: string = `
---
**Name**
Eduardo Osteicoechea

---
**Birth Date**
January 19 of 1992

---
**Core Professional Identity**
Christian Thinker, BIM Architect and Multiplatform Developer committed to professional excellence and ethics.

---
**Formal Studies - Degree**
Bachelor's in Architecture from the Universidad De Los Andes in 2017.

---
**Formal Studies - Skills & Training (During Bachelor's)**
This allowed me to practice extensively with Architectural design, AutoCAD drawings and 3D modeling using SketchUp. I also completed a BIM training at an Autodesk Authorized Training Center during this epoch.

---
**Work Experience**

---
**Galpon5 (Project Assistant, 2017-2018)**
Between 2017 and 2018, I worked as a project assistant for Galpon5, modeling, documenting and rendering buildings in AutoCAD, SketchUp, V-RAY and 3ds Max.
During this stage, I generated the exterior image desing, lobby interior design and pool area design along with their rendering in 3ds Max, for the Lindo Sol Suites Hotel project. I also authored the exterior image, floor plans, and SketchUp modeling with it's V-Ray rendering for the Lindo Bakery.
My involvement in this projects allowed my employer to fulfill requirements without a separate AutoCAD Drafter and Modeling technician, 3ds Max Renderer and Interior Designer.

---
**Iglesia Palabra Viva (Venezuelan Missionary, until 2023)**
After that, I served as a Venezuelan missionary for the Iglesia Palabra Viva and studied theology at the online Dominican Republic institute Integridad & Sabiduría until 2023.
In this stage, I engaged in leadership, teaching, public speaking, counseling, and began my journey as an enthusiastic writer and song creator.

---
**Web Development Learning (Self-Study, 2020-2023)**
When the 2020 pandemic came, I decided to learn Web Development, starting with an Udemy Web Fullstack Course, that covered HTML, CSS, JavaScript, Bootstrap, PHP, and MySQL, leveraging also the XAMPP Stack and Hosting services.
I equally consumed much content from YouTube channels like Web Dev Simplified, Kevin Powell, Bro Code, Programming with Mosh, and websites like w3schools.com and developer.mozilla.org in this time.

---
**VDC Works (Revit BIM Technician, 2023)**
Starting the 2023, I re-entered the AEC industry as a Revit BIM Technician for VDC Works in Miami, documenting electrical rooms and sets of electrical assemblies using BIM collaborative workflows. This was the place were I discovered visual programming through Revit Dynamo and Python Scripts.

---
**BIMIQs (BIM Modeler, Revit API Developer, Web Developer, 2023)**
That same year, my manager at VDC Works invited me to be the first employee of BIMIQs, a consulting startup for US AEC companies. Here, I worked as a BIM modeler, Revit families designer, Revit API developer, and Web developer. I coded tools like the Revit Modeler and developed the graphic design for bimiqs.com.
At BIMIQs, my employer obtained services for BIM modeling, BIM Research, RevitAPI development, and Fullstack Web Development form my single role.
This was the year when I received three LinkedIn Badges on programming languages, getting ranked as part of the top 30% on C#, top 15% on PHP, and top 5% on CSS in this tests.

---
**Freelancer (Web Fullstack & UI/UX, Late 2023)**
On the last quarter of 2023, I started as a six moths journey as a Web Fullstack freelancer and UI & UX designer for scalaa.com, theinspiratagroup.com, hotelbelensate.com, eduardoos.com (my previous PHP-based site), crintt.com, and my signature landing page website thedalessiogroup.com, where I handled the full hosting, branding, page design, and coding of the project.
During this period, I provided services on Python scripting, hosting setup, email migration, Fullstack development, UI & UX Design, image and video editing, and graphic design.

---
**Avant Leap (BIM Software Developer, March 2024 - Present)**
After that, In March of 2024, I started a role as a professional BIM software developer at Avant Leap, an AI BIM Software development startup based in California.
Here, I provided support and functionality extensions for Revit Add-ins such as Clash Detection, Object Visualizer, Object Quantifier, 4D Simulation, Avant Leap's Revit Dynamo Zero Touch Nodes, Mirar, Andiamo, and Itera.
I also authored the full design and coding of the SincronizadorGPS50, a desktop Windows Forms and SQL Server application to connect Gestproject2024 and Sage50.
Remarkably, during this period, I was introduced to AI integrations for applications, intervening in Andiamo OpenAI Requests, Mirar queries to StabilityAI, and developing the Itera WPF Addin and collaborating on the setup of ReplicateAI-based actions.
This company received services in Windows Applications development, API development, RevitAPI External Command, Revit Add-in development, Revit Dynamo Zero Touch Nodes development, and AI integration through my multitasking role.

---
**Current Focus**
Currently, I'm developing Fullstack web applications with React and .NET minimal APIs, GitHub CI & CD workflows for AWS, leveraging the DeepSeek AI API, and using SQLite, with the aim of moving towards multiplatform integrations for AI-powered BIM applications for the AEC Industry.

---
**Final Statement**
I'm eager to continue learning and refining my role to support AEC companies that seek multitasking professionals for developing AI-powered BIM Multiplatform solutions.
If you're interested in collaborating or hiring me, reach out through the following mediums.
Whatsapp:584147281033.
Email:eduardooost@gmail.com.
Linkedin:www.linkedin.com/in/eduardoosteicoechea.
  `;

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(event.target.value);
  };

  const selectRelevantChunks = (query: string, allChunks: string[], topN: number = 3): string[] => {
    const queryKeywords = query.toLowerCase().split(/\s+/);
    const chunkScores: { index: number; score: number }[] = [];

    allChunks.forEach((chunk, index) => {
      let score = 0;
      const lowerChunk = chunk.toLowerCase();
      queryKeywords.forEach((keyword) => {
        if (lowerChunk.includes(keyword)) {
          score++;
        }
      });
      chunkScores.push({ index, score });
    });

    chunkScores.sort((a, b) => b.score - a.score);
    const relevantIndices = chunkScores.slice(0, topN).map(item => item.index);
    const relevantChunks = relevantIndices.map(index => allChunks[index]);
    return relevantChunks.filter(chunk => {
      const foundIndex = chunkScores.findIndex(item => item.index === allChunks.indexOf(chunk));
      return foundIndex !== -1 && chunkScores[foundIndex].score > 0;
    });
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission
    if (userPrompt.trim()) {
      const newUserMessage = { text: userPrompt, sender: 'user' };
      setMessages((messages: any) => [...messages, newUserMessage]);
      setUserPrompt(''); // Clear the input
      setStreamingResponse('');
      setIsStreaming(true);      
      setCurrentTime(getCurrentHourMinute())

      const chunks = documentText.split('---').map(chunk => chunk.trim()).filter(chunk => chunk !== '');
      const relevantChunks = selectRelevantChunks(userPrompt, chunks);
      const context = relevantChunks.join('\n\n');

      const deepSeekMessages = [
        { role: 'system', content: 'You are a helpful assistant. Avoid phrases like "based on the provided context" and "This individual". Talk as if you know Eduardo from the university and you are his professional representant. Talk naturally and in a relaxed but formal manner. The signature character of this person is a relaxed and formal professional. Do not include the name of the person asking the questions. Give concise and direct answers. Do not provide analysis hints of your context evaluation process when parsing the context. Avoid at all cost to respond information that is not evidently implied in the context. Say that you do not know if you do not have the answer.' },
        ...messages.map(msg => ({ role: msg.sender === 'bot' ? 'assistant' : msg.sender, content: msg.text })),
        { role: 'user', content: `Context:\n${context}\n\nUser Question: ${userPrompt}` },
      ];

      const requestBody = {
        messages: deepSeekMessages,
        model: 'deepseek-chat',
        frequency_penalty: 0,
        max_tokens: 2048,
        presence_penalty: 0,
        response_format: { type: 'text' },
        stop: null,
        stream: true,
        stream_options: {
          include_usage: false
        },
        temperature: 1,
        top_p: 1,
        tool_choice: 'none',
        tools: null,
      };

      // console.log(requestBody)

      try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer sk-a02d0d7af7194f2cab0a53fdd20a0361',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder('utf-8');
        let accumulatedResponse = '';


        if (reader) {
          setIsStreaming(true);
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              setIsStreaming(false);
              const botResponse = { text: accumulatedResponse, sender: 'bot' };
              setMessages((messages: any) => [...messages, botResponse]);
              break;
            }
            const chunkText = decoder.decode(value);
            const parts = chunkText.split('data: ');
            for (const part of parts) {
              const trimmedPart = part.trim();
              if (trimmedPart) {
                if (trimmedPart === '[DONE]') {
                  setIsStreaming(false);
                  const botResponse = { text: accumulatedResponse, sender: 'bot' };
                  setMessages((messages: any) => [...messages, botResponse]);
                  return; 
                }
                try {
                  const parsedChunk: StreamedResponseChunk = JSON.parse(trimmedPart);
                  // console.log('Parsed Streamed Chunk:', parsedChunk);
                  if (parsedChunk.choices && parsedChunk.choices[0]?.delta?.content) {
                    accumulatedResponse += parsedChunk.choices[0].delta.content;
                    setStreamingResponse(accumulatedResponse);
                  }
                } catch (error) {
                  console.error('Error parsing streamed chunk:', error, trimmedPart);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error('Error sending request:', error);
        setIsStreaming(false);
        const errorMessage = { text: 'An error occurred while processing your request.', sender: 'bot', error: true };
        setMessages((massages: any) => [...massages, errorMessage]);
      }
    }
  }

  return (
    <div className="Chatbot_001">

      <div className="Chatbot_001_chat_display" ref={chatContainerRef}>
        {
          messages.map((msg, index) => (
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
              {streamingResponse}
            </p>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="Chatbot_001_input_form">
        <textarea className="Chatbot_001_input_form_text_area"
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
            {isStreaming ? 'Streaming...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot_001;