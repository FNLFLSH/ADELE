import { getCurrentWindow } from "@tauri-apps/api/window";
import { TrayIcon } from "@tauri-apps/api/tray";
import { Menu } from "@tauri-apps/api/menu";
import { emit } from "@tauri-apps/api/event";

export async function initTray(): Promise<void> {
  try {
    const appWindow = getCurrentWindow();
    const menu = await Menu.new({
      items: [
        {
          id: "open",
          text: "Open ADELE",
          action: () => {
            emit("adele-tray-open");
          },
        },
        {
          id: "quit",
          text: "Quit",
          action: () => {
            appWindow.close();
          },
        },
      ],
    });
    await TrayIcon.new({
      tooltip: "ADELE",
      menu,
      showMenuOnLeftClick: false,
    });
  } catch {
    // Tray may be unavailable (e.g. permissions or platform)
  }
}
