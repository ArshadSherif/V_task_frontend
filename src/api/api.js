import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ;

export const fetch_chat_history = async (session_id) => {
  try {
    const { data } = await axios.get(`${BACKEND_URL}/session/history`, {
      headers: {
        '-session-id': session_id
      },
    })
    const messages = data.history.map((msg, index) => ({
          id: `msg-${index}-${Date.now()}`,
          message: msg.content,
          isUser: msg.role === "user",
        }));
    return messages;
  }
  catch (error) {
    console.warn("Error fetching chat history:", error);
    throw error;
   }
  
}


export const stream_chat_messages = async (sessionId, message, onChunk
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/session/chat/stream`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "-session-id": sessionId,
      },
      body: JSON.stringify({ message }),
    }
  );

  if (!response.ok || !response.body) {
    throw new Error("Failed to stream chat");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let done = false;
  while (!done) {
    const { value, done: streamDone } = await reader.read();
    if (value) {
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk); 
    }
    done = streamDone;
  }
};



export const reset_session = async () => {
  const { data } = await axios.post(`${BACKEND_URL}/session/new`);
  return data; // { session_id, message }
};


export const get_session_list = async () => { 
  const { data } = await axios.get(`${BACKEND_URL}/get-session-list`);
  console.log("Fetched session list:", data);
  return data; // Array of session IDs
}