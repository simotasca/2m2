import { twMerge } from "tailwind-merge";

export function openSearchModal() {
  document.documentElement.classList.add("search-open");
}

export function closeSearchModal() {
  document.documentElement.classList.remove("search-open");
}

export function toggleSearchModal() {
  document.documentElement.classList.toggle("search-open");
}

export default function SearchModal() {
  return (
    <>
      <div
        onClick={closeSearchModal}
        className={twMerge(
          "hidden [html.search-open_&]:block fixed inset-0 w-screen h-screen bg-black bg-opacity-40 z-[53]"
        )}></div>
      <div className="pointer-events-none [html.search-open_&]:pointer-events-auto opacity-0 [html.search-open_&]:opacity-100 fixed w-[800px] aspect-video max-w-[95vw] max-h-[90vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[54]">
        <div className="bg-white w-full h-full rounded-lg -translate-y-[5vh] [html.search-open_&]:-translate-y-[2.5vh] shadow-md shadow-neutral-500 transition-all duration-300 ease-out"></div>
      </div>
    </>
  );
}
