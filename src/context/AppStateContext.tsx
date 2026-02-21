import { createContext, useContext, useState, useCallback } from "react";

export interface ToggleState {
  prReview: boolean;
  futureFeature1: boolean;
  futureFeature2: boolean;
}

const defaultToggles: ToggleState = {
  prReview: true,
  futureFeature1: false,
  futureFeature2: false,
};

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AppStateContextValue {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  chatMode: "side" | "full";
  setChatMode: (mode: "side" | "full") => void;
  toggles: ToggleState;
  setToggle: (key: keyof ToggleState, value: boolean) => void;
  messages: ChatMessage[];
  sendMessage: (content: string) => void;
}

const AppStateContext = createContext<AppStateContextValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatMode, setChatMode] = useState<"side" | "full">("side");
  const [toggles, setTogglesState] = useState<ToggleState>(defaultToggles);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const setToggle = useCallback((key: keyof ToggleState, value: boolean) => {
    setTogglesState((prev) => ({ ...prev, [key]: value }));
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    const assistantMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "ADELE is in shell mode. Connect the backend to get real responses.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMsg]);
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        menuOpen,
        setMenuOpen,
        chatMode,
        setChatMode,
        toggles,
        setToggle,
        messages,
        sendMessage,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
