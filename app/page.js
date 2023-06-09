import Link from "next/link";
import Teams from "./teams/page";

export default async function Home() {
  
  return (
    <main className="h-screen homeBG">
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900">
        <h1 className="text-5xl text-white font-semibold m-2">$alary Capped</h1>
        <p className="text-white m-2">Pick a Team. Track player salaries.</p>
        <Link href="#teams" className="border-2 border-white text-white rounded-md m-1">Get Started</Link>
      </div>
      <section className="bg-gradient-to-b from-gray-900 to-gray-800">
        <Teams />
      </section>
    </main>

  );
}
