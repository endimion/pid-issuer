import Link from "next/link";
import BackButton from "./backButton";
import { Button } from "./ui/button";

export default function DeeplinkPrompt({ deepLink }) {
  return (
    <main className="mt-4 p-4 flex flex-col">
      <header className="mb-4 text-2xl font-semibold text-gray-900 text-center">
        Click the &quot;Connect Wallet&quot; button to open your EUDI Wallet and receive
        your Boarding Pass.
      </header>
      <div className="flex flex-col md:flex-row items-center justify-start p-4 bg-white rounded-lg shadow-md">
        <Button
          className="mt-4 bg-blue-950 text-white"
          variant="outline"
          onClick={ ()=>{
            window.location=deepLink
          }}
        >
          Connect Wallet
        </Button>

        <div className="flex flex-col text-lg font-medium text-gray-900 md:ml-6 mt-4 md:mt-0">
          <h1 className="font-semibold">
            Don&apos;t have a Wallet yet? Follow the next steps:
          </h1>
          <ul className="list-decimal list-inside mt-4">
            <li>
              Download an EWC Compliant Wallet from the following links
              <div className="mt-2 flex flex-col md:flex-row">
                <Link className="underline text-blue-500" href="#">
                  Google Play Store
                </Link>
                 
              </div>
            </li>
            <li>
              With an EWC Conformant Wallet installed, click the &quot;Connect Wallet&quot; button to receive your 
              Boarding Pass.
            </li>
          </ul>
        </div>
      </div>
      <BackButton />
    </main>
  );
}
