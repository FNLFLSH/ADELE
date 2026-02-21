import { useRef, useEffect, useState } from "react";
import { useAppState } from "../context/AppStateContext";

export function ChatFullView() {
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
    <div className="flex h-full flex-col">
      <header className="flex shrink-0 items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
        <h2 className="text-lg font-semibold text-[var(--color-primary)]">ADELE</h2>
        <button
          type="button"
          onClick={() => setChatMode("side")}
          className="rounded-lg px-3 py-1.5 text-sm text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)] focus:outline-none"
        >
          Back to menu
        </button>
      </header>
      <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-[var(--color-text-muted)]">
            Start a conversation. When the backend is connected, ADELE will respond here.
          </p>
        ) : (
          messages.map((m) => (
            <div
              key={m.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                m.role === "user"
                  ? "ml-auto bg-[var(--color-primary)] text-white"
                  : "mr-auto bg-[var(--color-surface-elevated)] text-[var(--color-text)] border border-[var(--color-border)]"
              }`}
            >
              {m.content}
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="shrink-0 border-t border-[var(--color-border)] p-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-primary)] focus:outline-none"
        />
      </form>
    </div>
  );
}
