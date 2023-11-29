import { twMerge } from "tailwind-merge";

export default function MobilePanel() {
  return (
    <div
      className={twMerge(
        "fixed w-screen h-screen top-0 left-full bg-dark text-white transition-transform duration-300 z-[51]",
        "[.mobile-panel-open_&]:-translate-x-full"
      )}>
      <p>ciao</p>
      <button onClick={() => setMobilePanelOpen(false)}>close</button>
    </div>
  );
}

/** to toggle just leave val undefined */
export function setMobilePanelOpen(val?: boolean) {
  if (val ?? !isOpen()) {
    document.documentElement.classList.add("mobile-panel-open");
  } else {
    document.documentElement.classList.remove("mobile-panel-open");
  }
}

function isOpen() {
  return document.documentElement.classList.contains("mobile-panel-open");
}
