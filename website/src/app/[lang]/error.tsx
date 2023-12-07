"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex bg-neutral-100 justify-center items-center min-h-screen">
      <div className=" text-blacktext-center">
        <h1 className="text-4xl  font-semibold">Something went wrong!</h1>
        <button className="text-red-500 underline" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </div>
  );
}
