"use client";
import { useEffect, useState } from "react";

import { compdata as comp } from "./Comp_Data";
import CompModal from "./Comp_Modal";
import { StudentType } from "../account/AccountData";
import { Session } from "next-auth";
import LoginFirstModal from "../account/LoginFirstModal";

export default function CompLanding({
  session,
  student,
}: {
  session?: Session | null;
  student: StudentType | null;
}) {
  const [selectComp, setSelectComp] = useState<number>(-1);
  const [modalPage, setModalPage] = useState<
    "none" | "detail" | "regis" | "login"
  >("none");

  return (
    <div
      id="competitions"
      className="relative min-h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center pt-25"
    >
      <img
        className="absolute w-screen scale-120 top-0 translate-y-[calc(-50%-10px)]"
        src="/landing/cloud-cover.png"
        alt="cloud cover"
      />
      <img
        className="w-75 md:w-100 lg:w-125 top-1/2 translate-y-[calc(-50%-300px)] absolute -left-30"
        src="/landing/cloud-l_1.png"
        alt="cloud-left"
      />
      <img
        className="w-75 md:w-100 lg:w-125 top-1/2 translate-y-[calc(-50%-300px)] absolute -right-30"
        src="/landing/cloud-r_1.png"
        alt="cloud-right"
      />
      <div className="w-full pt-5 flex flex-col items-center justify-end">
        <div className="relative flex items-center justify-center w-full mt-5 mb-10 drop-shadow-2xl">
          <h2 className="text-6xl font-bold -translate-y-2 z-10">การแข่งขัน</h2>
          <img
            className="absolute w-120 drop-shadow-md"
            src="/landing/topic-sign.webp"
            alt=""
          />
        </div>
      </div>
      <div className="z-10 w-full h-full min-h-0 px-15 py-10 grid md:grid-cols-5 gap-2">
        {comp.map(({ name, tag, logo, des }, index) => (
          <div
            onClick={() => {
              setSelectComp(index);
              setModalPage("detail");
            }}
            key={index}
            className="min-h-0 h-120 flex flex-col items-center justify-between py-8 px-6 bg-amber-100 rounded-xl transition-all duration-200 cursor-pointer hover:-translate-y-1.5 hover:drop-shadow-xl drop-shadow-black/50"
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-full text-center text-2xl font-medium">
                {name}
              </div>
              <div className="rounded-lg text-sm px-2 pt-1 pb-0.5 text-gray-500 bg-gray-50">
                {tag}
              </div>
            </div>
            <img src={logo} alt={name} />
            <p className="text-amber-900 text-sm text-center">{des}</p>
            <div className="w-full flex flex-col 2xl:flex-row gap-1 justify-between">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectComp(index);
                  setModalPage("detail");
                }}
                className="rounded-full px-4 py-1 bg-[#fae2f5] text-fuchsia-950 font-medium cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/10"
              >
                รายละเอียด
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (session) {
                    setSelectComp(index);
                    setModalPage("regis");
                  } else {
                    setModalPage("login");
                  }
                }}
                className="flex-1 rounded-full px-4 py-1 bg-[#C12882] font-medium text-white cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/20"
              >
                ลงทะเบียน
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center pb-10">
        <a
          href="ictp_camp_2025_competition_rulebook.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-full text-xl px-8 py-2 font-bold bg-linear-to-b from-teal-100 to-cyan-100 text-teal-800 cursor-pointer transition-all duration-200 hover:shadow-md shadow-black/20 hover:scale-105 hover:bg-linear-to-t"
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
      {selectComp >= 0 && (
        <CompModal
          student={student}
          comp_index={selectComp}
          page={modalPage}
          onClose={() => setSelectComp(-1)}
          onSwitch={() => {
            session
              ? setModalPage((prev) => (prev === "detail" ? "regis" : "detail"))
              : setModalPage("login");
          }}
          togglePrev={() =>
            setSelectComp(
              selectComp != 0 ? (selectComp - 1) % comp.length : comp.length - 1
            )
          }
          toggleNext={() => setSelectComp((selectComp + 1) % comp.length)}
        />
      )}
      {modalPage == "login" && (
        <LoginFirstModal onClose={() => setModalPage("detail")} />
      )}
    </div>
  );
}
