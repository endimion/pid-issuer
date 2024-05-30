"use client";

import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Persona1 from "./img/persona1.webp";
import Persona2 from "./img/persona2.webp";
import Persona3 from "./img/persona3.webp";
import { v4 as uuidv4 } from "uuid";

export default function SelectPersona() {
  const [formData, setFormData] = useState({});
  const [ticketError, setTicketError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const handlePersonaClick = async (idx) => {
    console.log("handlePersonaClick");
    const sessionId = uuidv4();
    router.push(`/personas?sessionId=${sessionId}&id=${idx}`);
  };

  const personas = [
    {
      id: 1,
      name: "Mario Conti",
      description: "Male from Florence, Italy",
      image: Persona3,
    },
    {
      id: 2,
      name: "Hannah Matkalainen",
      description: "Female from Helsinki, Finland",
      image: Persona2,
    },
    {
      id: 3,
      name: "Felix Fischer",
      description: "Male from Essen, Germany",
      image: Persona1,
    },
  ];

  const mainContent = (
    <div className="flex flex-col flex-1 items-center justify-center w-full h-full">
      <div className="flex-1 px-4 sm:px-6 md:px-8 bg-gray-50 flex items-center justify-center w-full">
        <form className="w-full max-w-4xl bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6 text-purple-900">
            Select your PID Persona
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {personas.map((persona) => (
              <div
                key={persona.id}
                className="bg-purple-200 p-6 rounded-lg cursor-pointer hover:bg-purple-300 transition flex flex-col items-center justify-center"
                onClick={() => handlePersonaClick(persona.id)}
              >
                <div className="flex items-center justify-center w-full h-60">
                  <Image
                    src={persona.image}
                    alt={persona.name}
                    width={180}
                    height={180}
                    className="rounded-md"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-semibold">{persona.name}</h3>
                  <p className="text-gray-700">{persona.description}</p>
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col flex-1 overflow-hidden"> {mainContent}</div>
  );
}
