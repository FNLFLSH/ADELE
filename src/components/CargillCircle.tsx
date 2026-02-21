import { useState } from "react";
import { motion } from "framer-motion";
import { useAppState } from "../context/AppStateContext";

function CargillCircle() {
  const { setMenuOpen } = useAppState();
  const [isSpinning, setIsSpinning] = useState(false);

  const handleClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
      setMenuOpen(true);
    }, 400);
  };

  return (
    <div data-tauri-drag-region className="flex shrink-0 cursor-grab active:cursor-grabbing">
      <motion.button
        type="button"
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg ring-2 ring-white/20 transition hover:bg-[var(--color-primary-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
        onClick={handleClick}
        animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        aria-label="Open ADELE"
      >
        <span className="text-sm font-semibold">Cargill</span>
      </motion.button>
    </div>
  );
}

export default CargillCircle;
