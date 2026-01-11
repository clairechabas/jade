import { Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-white text-slate-900 p-6">
      <header>
        <h1 className="text-2xl font-semibold">Bookmark Library</h1>
      </header>

      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  );
}
