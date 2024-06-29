"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TbArrowBack } from "react-icons/tb";

type BackBtnProps = {};

export const BackBtn = (props: BackBtnProps) => {
  const router = useRouter();

  return (
    // <button
    //   className="btn-black m-1 flex-center gap-4 absolute bottom-4 left-6 z-50"
    //   onClick={() => router.back()}
    // >
    //   <TbArrowBack size={20} className="text-white" />
    //   BACK
    // </button>
    <Link
      href="/"
      className="btn-black m-1 flex-center gap-4 absolute bottom-4 left-6 z-50"
    >
      <TbArrowBack size={20} className="text-white" />
      OVERVIEW
    </Link>
  );
};
