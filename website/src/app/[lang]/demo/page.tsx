import DemoClient from "./DemoClient";

export default async function DemoPage() {
  return (
    <div className="bg-white p-8">
      <h1 className="text-lg font-bold uppercase">sono server</h1>
      <DemoClient />
    </div>
  );
}
