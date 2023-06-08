import Link from "next/link";
export default async function Home() {
  return (
    <main className="min-h-full flex flex-col justify-center items-center mt-24">
      <h1 className="text-3xl">$alary Capped</h1>

      <p>Pick a Team. Track player salaries.</p>
      <Link href="/teams" className="border-2 border-rose-500 rounded-lg">
        Get Started
      </Link>
    </main>
  );
}
