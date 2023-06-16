import Link from "next/link";
import Teams from "./teams/page";

export default async function Home() {
  
  return (
    <main className="h-screen homeBG">
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-5xl text-white font-semibold m-2">$alary Capped</h1>
        <p className="text-white m-2">Pick a Team. Track player salaries.</p>
        <Link href="#teams" className="rounded-lg px-4 py-2 border-2 border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-900 duration-300">Get Started</Link>
      </div>
      <section className="bg-gradient-to-b from-gray-900 to-gray-800">
        <Teams />
      </section>
    </main>

  );
}
