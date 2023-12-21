"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.back(); // This function will navigate to the previous page in history THIS doesn't mean that previous components will retain past state
  };

  return (
    <Button className="mt-4 bg-blue-950 text-white" variant="outline" onClick={handleBackButtonClick}>
      <IconArrowleft className="mr-2 h-4 w-4" />
      Back
    </Button>
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
  