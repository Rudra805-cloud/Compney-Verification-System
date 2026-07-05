import { LogOut } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-neutral-800">
      <h1 className="text-xl font-bold text-white">
        Veris
      </h1>

      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition">
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}