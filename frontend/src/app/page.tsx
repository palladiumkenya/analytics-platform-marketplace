'use client'

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import Counter from "./counter";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <h1>Hello, marketplace</h1>
      <p>
        <Link href="/dashboard">Dashboard</Link>
      </p>

        <button className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg" type="button" onClick={() => router.push("/dashboard")}>Dashboard button</button>
    </>


  );
}
