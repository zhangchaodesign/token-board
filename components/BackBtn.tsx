"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { TbArrowBackUp } from "react-icons/tb";

type BackBtnProps = {};

export const BackBtn = (props: BackBtnProps) => {
  const router = useRouter();

  return (
    <button
      className="btn-black m-1 flex-center gap-4 absolute bottom-4 left-6 z-50"
      onClick={() => router.back()}
    >
      <TbArrowBackUp size={20} className="text-white" />
      BACK
    </button>
  );
};
