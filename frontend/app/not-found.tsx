// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="mt-1 text-sm text-gray-600">
        This page could not be found.
      </p>
      <a
        href="/"
        className="mt-6 text-sm text-blue-500 hover:underline"
      >
        Go back home
      </a>
    </div>
  );
}
