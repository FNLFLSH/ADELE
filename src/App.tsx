import { useEffect } from "react";
import { listen } from "@tauri-apps/api/event";
import { ThemeProvider } from "./context/ThemeContext";
import { AppStateProvider, useAppState } from "./context/AppStateContext";
import CargillCircle from "./components/CargillCircle";
import CentralCommandPopup from "./components/CentralCommandPopup";
import { initTray } from "./initTray";
import "./styles/theme.css";

function AppContent() {
  const { setMenuOpen } = useAppState();

  useEffect(() => {
    initTray();
  }, []);

  useEffect(() => {
    let unlisten: (() => void) | undefined;
    listen("adele-tray-open", () => {
      setMenuOpen(true);
    }).then((fn: () => void) => {
      unlisten = fn;
    });
    return () => {
      unlisten?.();
    };
  }, [setMenuOpen]);

  return (
    <div
    className="flex min-h-screen min-w-full items-start justify-start gap-4 p-4"
    style={{ background: "var(--color-surface)" }}
  >
      <CargillCircle />
      <CentralCommandPopup />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppStateProvider>
        <AppContent />
      </AppStateProvider>
    </ThemeProvider>
  );
}

export default App;
