"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { TbInfoCircleFilled, TbX } from "react-icons/tb";

export const Header = () => {
  const [isCardVisible, setIsCardVisible] = useState(false);
  const handleInfoClick = () => {
    // console.log('info clicked');
    setIsCardVisible(true);
  };
  const handleClose = () => {
    setIsCardVisible(false);
  };

  return (
    <div className="min-h-[8vh] bg-white flex flex-row w-full justify-between items-center py-4 px-8 border-b border-gray-100 z-[999999]">
      <h1 className="font-medium text-2xl text-gray-800 uppercase">
        <Link href="/">TokenBoard</Link>
      </h1>
      <TbInfoCircleFilled
        size={24}
        className="text-gray-400 hover:text-gray-800 cursor-pointer transition delay-150 duration-150 ease-in-out hover:scale-110"
        onClick={handleInfoClick}
      />

      {isCardVisible && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[99999]"
            onClick={handleClose}
          ></div>{" "}
          <div className="fixed inset-0 flex justify-center items-center z-[100000]">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex flex-row items-center justify-between mb-4">
                <p className="font-medium text-xl">Hello 👋</p>
                <TbX
                  size={24}
                  onClick={handleClose}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  This tool was designed and developed by Chao Zhang, a Ph.D.
                  student in Human-Computer Interaction at Cornell University.
                </p>
                <p className="text-gray-500">
                  Personal site:{" "}
                  <a href="https://zhangchaodesign.com/" className="underline">
                    https://zhangchaodesign.com/
                  </a>
                </p>
                <p className="text-gray-500">
                  Email:{" "}
                  <a href="mailto:cz468@cornell.edu" className="underline">
                    cz468@cornell.edu
                  </a>
                </p>
                <p>Feel free to reach out!</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
