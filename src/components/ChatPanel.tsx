import { useRef, useEffect, useState } from "react";
import { useAppState } from "../context/AppStateContext";

export function ChatPanel() {
  const { messages, sendMessage, setChatMode } = useAppState();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2">
        <span className="text-xs font-medium text-[var(--color-text-muted)]">Chat</span>
        <button
          type="button"
          onClick={() => setChatMode("full")}
          className="text-xs text-[var(--color-primary)] hover:underline focus:outline-none"
        >
          Expand
        </button>
      </div>
      <div ref={listRef} className="flex max-h-48 min-h-32 flex-col gap-2 overflow-y-auto p-3">
        {messages.length === 0 ? (
          <p className="text-xs text-[var(--color-text-muted)]">Ask ADELE anything. Responses will appear here.</p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`rounded-lg px-3 py-2 text-sm ${
                m.role === "user"
                  ? "ml-4 bg-[var(--color-primary-muted)] text-[var(--color-text)]"
                  : "mr-4 bg-[var(--color-border)]/50 text-[var(--color-text)]"
              }`}
            >
              {m.content}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="border-t border-[var(--color-border)] p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
        />
      </form>
    </div>
  );
}
