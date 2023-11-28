function DemoWrapper({ children }) {
  return (
    <div className="flex flex-col items-center max-w-lg mx-auto p-4">
      {children}
    </div>
  );
}

export default DemoWrapper;
