"use client";

import { useEffect, useState } from "react";
import { sportdata } from "./Sport_Data";
import SportBetModal from "./Sport_Bet_modal";
import { StudentType } from "../account/AccountData";
import { Session } from "next-auth";
import LoginFirstModal from "../account/LoginFirstModal";

export default function SportLanding({
  session,
  student,
}: {
  session?: Session | null;
  student: StudentType | null;
}) {
  const [betModal, setBetModal] = useState<number>(-1);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(true);
  }, []);
  const [randomPath, setRandomPath] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const ran = (Math.floor(Math.random() * 12) % 4) + 1;
      setRandomPath(ran);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="sports"
      className="relative min-h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center gap-8 pt-25"
    >
      <img
        className="absolute w-screen scale-120 top-0 translate-y-[calc(-50%-10px)]"
        src="/landing/cloud-cover.png"
        alt="cloud cover"
      />
      <div className="w-full pt-5 flex flex-col items-center justify-end">
        <div className="relative flex items-center justify-center w-full mt-5 mb-10 drop-shadow-2xl">
          <h2 className="text-6xl font-bold -translate-y-2 z-10">กีฬา</h2>
          <img
            className="absolute w-120 -scale-x-65 drop-shadow-md"
            src="/landing/topic-sign.webp"
            alt=""
          />
        </div>
      </div>
      <div className="w-5/6 md:w-9/10 grid md:grid-cols-3 gap-5">
        {sportdata.map(({ name, abbr, date, mem, dur }, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center gap-4 py-10 px-10 rounded-xl bg-amber-100 aspect-square shadow-lg"
          >
            <div className="w-full text-center text-4xl font-bold">{name}</div>
            <div className="w-full aspect-3/2 bg-amber-200 rounded-xl border-6 border-[#C12882] overflow-clip">
              <img
                className="h-full w-full aspect-3/2 object-fill"
                src={`/sports/${abbr}-${randomPath}.webp`}
                alt={abbr}
              />
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              {[date, mem, dur].map((e, index) => (
                <div
                  key={index}
                  className="rounded-lg px-2 pt-1 pb-0.5 text-gray-700 bg-white"
                >
                  {index === 1
                    ? "ทีมละ " + mem + " คน"
                    : index === 2
                    ? "รอบละ " + dur + " นาที"
                    : e}
                </div>
              ))}
            </div>
            <button
              onClick={() => setBetModal(session ? index : -10)}
              className="z-20 absolute bottom-0 translate-y-4 flex justify-center items-center gap-1.5 rounded-2xl bg-[#C12882] text-white text-center text-xl font-bold px-6 py-1.5 drop-shadow-lg cursor-pointer transition-transform duration-100 hover:scale-105 hover:translate-y-2 group"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="group-hover:scale-110 group-hover:animate-spin"
              >
                <g>
                  <path d="M5 4a1 1 0 000 2h.01a1 1 0 000-2H5zM7 8a1 1 0 011-1h.01a1 1 0 010 2H8a1 1 0 01-1-1zM11.01 10a1 1 0 100 2h.01a1 1 0 100-2h-.01z" />

                  <path
                    fillRule="evenodd"
                    d="M3.25 1A2.25 2.25 0 001 3.25v9.5A2.25 2.25 0 003.25 15h9.5A2.25 2.25 0 0015 12.75v-9.5A2.25 2.25 0 0012.75 1h-9.5zM2.5 3.25a.75.75 0 01.75-.75h9.5a.75.75 0 01.75.75v9.5a.75.75 0 01-.75.75h-9.5a.75.75 0 01-.75-.75v-9.5z"
                    clipRule="evenodd"
                  />
                </g>
              </svg>
              ทายผล
            </button>
          </div>
        ))}
      </div>

      {betModal >= 0 && (
        <SportBetModal
          student={student}
          sport_index={betModal}
          isOpen={isOpen}
          onClose={() => setBetModal(-1)}
        />
      )}
      {betModal == -10 && <LoginFirstModal onClose={() => setBetModal(-1)} />}
    </div>
  );
}
