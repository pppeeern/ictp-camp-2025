"use client";
import { useState } from "react";

import { compdata } from "./Comp_Data";
import CompModalCard from "./Comp_Modal_Card";

export default function CompDetailModal({
  comp_index,
  onSwitch,
}: {
  comp_index: number;
  onSwitch: () => void;
}) {
  const { name, tag, logo, des, date, web, upl, rulebook } =
    compdata[comp_index];
  const rule_message = [
    "ว้าย ยังไม่เสร็จ",
    "แย่จัง แย่จัง แย่จัง",
    "สมมติว่าตรงนี้มีกฎอยู่",
    "รู้สึกว่างเปล่า",
    "ลองกลับมาใหม่ปีหน้า",
    "*เสียงจิ้งหรีด*",
  ];

  return (
    <>
      <CompModalCard
        name={name}
        logo={logo}
        des_title=""
        button_text="ลงทะเบียน"
        upl={upl}
        web={web}
        onSwitch={onSwitch}
      >
        <p>{des}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          <p className="w-fit text-xs xl:text-sm rounded-lg px-2 pt-1 pb-0.5 text-gray-200 bg-gray-800">
            {tag}
          </p>
          <p className="w-fit text-xs xl:text-sm rounded-lg px-2 pt-1 pb-0.5 text-gray-200 bg-gray-800">
            {date}
          </p>
        </div>
      </CompModalCard>

      <div className="h-full min-h-0 flex flex-col bg-white rounded-r-xl rounded-l-3xl">
        <div className="px-8 py-6 w-full flex-1 overflow-y-auto rounded-tl-3xl">
          <div className="w-full h-full flex justify-center items-center text-6xl font-black text-gray-300">
            {rulebook ? (
              <iframe src={rulebook} width={"100%"} height={"100%"}></iframe>
            ) : (
              <>
                {
                  rule_message[
                    Math.floor(Math.random() * 10) % rule_message.length
                  ]
                }
              </>
            )}
          </div>
        </div>
        {rulebook && (
          <div className="shrink-0 w-full flex items-center justify-center pb-4">
            <a
              href={rulebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-full text-xl px-8 py-2 font-bold bg-teal-100 text-teal-800 cursor-pointer transition-all duration-200 hover:shadow-md shadow-black/20 hover:scale-105"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 transition-transform"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              ดาวน์โหลดกฎการแข่งขัน
            </a>
          </div>
        )}
      </div>
    </>
  );
}
