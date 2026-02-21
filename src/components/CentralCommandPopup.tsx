import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "../context/AppStateContext";
import { useTheme } from "../context/ThemeContext";
import { Toggles } from "./Toggles";
import { ChatPanel } from "./ChatPanel";
import { ChatFullView } from "./ChatFullView";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CentralCommandPopup() {
  const { menuOpen, setMenuOpen, chatMode } = useAppState();
  const { theme, toggleTheme } = useTheme();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (menuOpen && chatMode === "side") {
      closeButtonRef.current?.focus({ preventScroll: true });
    }
  }, [menuOpen, chatMode]);

  if (!menuOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex w-[380px] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl"
    >
      <AnimatePresence mode="wait">
        {chatMode === "full" ? (
          <motion.div key="full-chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-[420px] flex-col">
            <ChatFullView />
          </motion.div>
        ) : (
          <motion.div key="command" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
            <header className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <h1 className="text-xl font-bold text-[var(--color-primary)]">ADELE</h1>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="rounded-lg px-2 py-1.5 text-xs text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)] focus:outline-none"
                  aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {theme === "dark" ? "Light" : "Dark"}
                </button>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg p-1.5 text-[var(--color-text-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>
            </header>
            <div className="flex gap-4 p-4">
              <div className="flex flex-1 flex-col gap-4">
                <Toggles />
              </div>
              <div className="w-44 shrink-0">
                <ChatPanel />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CentralCommandPopup;
