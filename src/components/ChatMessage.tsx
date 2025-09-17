interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  const isTyping = !isUser && message === "..."; // detect typing

  return (
    <div
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[85%] md:max-w-[70%] px-4 py-3 rounded-lg
          transition-all duration-200 ease-in-out
          ${
            isUser
              ? "bg-chat-user-bg text-chat-user-fg rounded-br-sm"
              : "bg-chat-bot-bg text-chat-bot-fg rounded-bl-sm"
          }
        `}
        style={{ boxShadow: "var(--shadow-message)" }}
      >
        {isTyping ? (
          <div className="flex w-10 justify-between">
            <span className="w-1 h-1 bg-current rounded-full animate-bounce-dot"></span>
            <span className="w-1 h-1 bg-current rounded-full animate-bounce-dot delay-200"></span>
            <span className="w-1 h-1 bg-current rounded-full animate-bounce-dot delay-400"></span>
          </div>
        ) : (
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        )}

        {timestamp && !isTyping && (
          <p className="text-xs opacity-70 mt-2">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
