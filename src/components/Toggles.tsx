import { useAppState } from "../context/AppStateContext";
import type { ToggleState } from "../context/AppStateContext";

const TOGGLES: { key: keyof ToggleState; label: string }[] = [
  { key: "prReview", label: "PR Review" },
  { key: "futureFeature1", label: "Future Features" },
  { key: "futureFeature2", label: "Future Features" },
];

export function Toggles() {
  const { toggles, setToggle } = useAppState();

  return (
    <div className="flex flex-col gap-3">
      {TOGGLES.map(({ key, label }) => (
        <label
          key={key}
          className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 transition hover:border-[var(--color-accent)]"
        >
          <span className="text-sm font-medium text-[var(--color-text)]">{label}</span>
          <button
            type="button"
            role="switch"
            aria-checked={toggles[key]}
            onClick={() => setToggle(key, !toggles[key])}
            className={`relative h-6 w-11 shrink-0 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 ${
              toggles[key] ? "bg-[var(--color-primary)]" : "bg-[var(--color-toggle-off)]"
            }`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                toggles[key] ? "left-6 translate-x-[-100%]" : "left-1"
              }`}
            />
          </button>
        </label>
      ))}
    </div>
  );
}
