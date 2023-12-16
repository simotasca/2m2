"use client";

import Button from "@/components/ui/Button";

export default function ErrorClientPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid place-items-center h-[80vh]">
        <div>
          <h1 className="text-4xl font-bold text-neutral-800">
            ERRORE NEL CARICAMENTO
          </h1>
          <Button
            className="text-red-600 underline bg-white pl-0"
            onClick={location.reload}>
            refresh
          </Button>
        </div>
      </div>
    </div>
  );
}
