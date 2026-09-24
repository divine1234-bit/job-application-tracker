"use client";

import {Button} from "./ui/button";
import Image from "next/image";
import { useState } from "react";

export default function ImageTabs () {
const [activetab,setactivetab] = useState("organise")
    return (
    <section className="border-t bg-white py-16">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-6xl"> 
        {/*tabs*/}   
        <div className="flex gap-2 justify-center mb-8 ">
          <Button onClick={() => setactivetab("organise")} 
          className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors
           ${activetab === "organise" ? "bg-primary text-white" : "bg-gray-100 text-grey-700 hover:bg-grey-200"}`}>
            Organise applications
            </Button>
           <Button onClick={() => setactivetab("hired")} className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors
           ${activetab === "hired" ? "bg-primary text-white" : "bg-gray-100 text-grey-700 hover:bg-grey-200"}`}>
            get hired
             </Button>
            <Button onClick={() => setactivetab("boards")} className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors
           ${activetab === "boards" ? "bg-primary text-white" : "bg-gray-100 text-grey-700 hover:bg-grey-200"}`}>
              manage boards
              </Button>
        </div>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border-grey-200 shadow-xl">
         {activetab === "organise" &&( 
          <Image 
           src="/hero-images/hero1.png" 
          alt="Organise applications"
          width={1200}
          height={800}
          />
         )}

          {activetab === "hired" && ( 
          <Image
           src="/hero-images/hero2.png" 
          alt="Organise applications"
          width={1200}
          height={800}
          />
          )}

          {activetab === "boards" &&(
            <Image
           src="/hero-images/hero3.png" 
          alt="Organise applications"
          width={1200}
          height={800}
          /> 
          )}

        </div>
      </div>
    </div>
  </section>
    );
}
