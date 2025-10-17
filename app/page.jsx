import Image from "next/image";
import Link from "next/link";
import { ShieldPlus, LogIn } from "lucide-react";

export default function Home() {
  return (
  <div className="w-full bg-gradient-to-br from-slate-100 to-slate-200">
    <div className="container mx-auto min-h-screen flex flex-col">
      <header className="flex items-center justify-center p-4 border-b border-slate-200">
        <h1 className="text-lg font-bold text-center text-slate-800">IT Help Desk</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center p-6">
        <ShieldPlus className="text-blue-700" size={50}/>
        <h2 className="text-2xl font-bold text-slate-900 mt-6">Welcome to IT Support</h2>
        <p className="text-slate-600 mt-4 mb-6 md:w-96">Your dedicated support for all IT-related issues. How can we assist you today? Sign in to get started.</p>
        <div className="w-full">
          <Link href="/sign-in" className="flex items-center justify-center gap-2 bg-blue-500 py-3 rounded-lg text-white text-lg hover:bg-blue-600 transition-colors hover:cursor-pointer ease-in-out duration-500 md:w-52 mx-auto">
            <LogIn size={20}/>
            Sign In
          </Link>
        </div>
      </main>
    </div>
  </div>

  );
}


