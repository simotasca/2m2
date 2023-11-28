function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid place-items-center h-[80vh]">
        <div>
          <h1 className="text-4xl font-bold text-neutral-800">
            404 not found!
          </h1>
          <a className="text-red-600 underline" href="/">
            back to home
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
