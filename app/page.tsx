"use client";

import "react-toastify/dist/ReactToastify.css";
import LoadingWrapper from "./wrappers/LoadingWrapper";
import { twMerge } from "tailwind-merge";
import { outfitFont } from "@/styles/fonts";

export default function Home() {
  return (
    <div className={twMerge("w-full h-full", outfitFont)}>
      <LoadingWrapper />
    </div>
  );
}
