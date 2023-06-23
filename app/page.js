import Link from "next/link";
import Teams from "./teams/page";
import pictures from "../public/pictures";

export default async function Home() {
  return (
    <main>
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-black to-gray-900">
        <img className="w-[600px] p-2" src={pictures.logo.src} />
        <p className="text-gray-300 mt-0 m-6 w-1/2 text-center font-semibold font-sans italic">
          Track Team Payroll & Compare Salaries around the League. Be your own
          GM.
        </p>
        <Link
          href="#teams"
          className="font-bold rounded-lg px-4 py-2 border-2 border-gray-200 text-gray-200 hover:bg-orange-700 hover:text-gray-900 duration-300"
        >
          Get Started
        </Link>
      </div>
      <section className="bg-gradient-to-b from-gray-900 to-gray-800">
        <Teams />
      </section>
      <footer className="bg-slate-800  text-center text-sm text-slate-600">
        Developed By: Grant Gilman & Christian McNeil | 2023 All Rights Reserved
      </footer>
    </main>
  );
}
