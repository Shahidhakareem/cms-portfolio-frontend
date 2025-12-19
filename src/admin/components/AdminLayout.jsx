import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-blue-gray-50/50">
      <Sidebar />
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
