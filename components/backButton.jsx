"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";


export default function BackButton({ className }) {
  const router = useRouter();

  return (
    <button
      className={`mt-4 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 ${className}`}
      onClick={() => router.back()}
    >
      &larr; Back
    </button>
  );
}


function IconArrowleft(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
