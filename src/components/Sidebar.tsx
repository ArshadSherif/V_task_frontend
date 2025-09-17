import { useEffect, useState } from "react";
import { get_session_list } from "@/api/api";

interface Session {
  session_id: string;
  last_message: string;
}

interface SidebarProps {
  session_id: string;
  set_session_id: (id: string) => void;
}

const Sidebar = ({ session_id, set_session_id }: SidebarProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await get_session_list();
        setSessions(data.sessions || []);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, [session_id]);

  const handleSessionClick = (id: string) => {
    set_session_id(id);
    localStorage.setItem("user_session", id);
  };

  return (
    <aside className="bg-[hsl(var(--card))] p-4 flex flex-col h-full">
      <h2 className="text-[hsl(var(--foreground))] text-lg font-bold mb-4">
        History
      </h2>

      {/* This ul will scroll independently */}
      <ul className="flex-1 overflow-y-auto space-y-2">
        {sessions.map((session) => (
          <li
            key={session.session_id}
            className={`hover:bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] p-2 rounded cursor-pointer ${
              session.session_id === session_id
                ? "bg-[hsl(var(--secondary))]"
                : ""
            }`}
            onClick={() => handleSessionClick(session.session_id)}
          >
            {session.last_message
              ? session.last_message.slice(0, 50) + "..."
              : "New session"}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
