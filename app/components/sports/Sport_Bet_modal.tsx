"use client";
import { useEffect, useState } from "react";
import Modal from "../Modal";
import { sportdata } from "./Sport_Data";
import { ColorList, ColorMap } from "../ColorData";
import { StudentType } from "../account/AccountData";

import { getBettingStatus } from "@/app/lib/actions";

export default function SportBetModal({
  student,
  sport_index,
  isOpen,
  onClose,
}: {
  student: StudentType | null;
  sport_index: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const sport = sportdata[sport_index];

  const bet_rank = [
    { rank: 1, point: 5 },
    { rank: 2, point: 3 },
    { rank: 3, point: 1 },
  ];
  const [activeRank, setActiveRank] = useState<number>(0);
  const [bet, setBet] = useState<string[]>(["", "", ""]);
  const [hasBet, setHasBet] = useState<boolean>(false);
  const [isBettingOpen, setIsBettingOpen] = useState<boolean>(true);

  const bet_available = bet.includes("");

  useEffect(() => {
    if (!student) return;

    async function loadBet() {
      const res = await fetch(
        `/api/sports/read?student_id=${student?.student_id}&sport=${sport.abbr}`
      );
      const bet_data = await res.json();
      const bet_team_data = [
        bet_data.rank_1 ?? "",
        bet_data.rank_2 ?? "",
        bet_data.rank_3 ?? "",
      ];
      setBet(bet_team_data);
      if (bet_data.rank_1) setHasBet(true);
      
      const status = await getBettingStatus(sport.abbr);
      setIsBettingOpen(status);
    }

    loadBet();
  }, [student, sport_index]);

  async function onBet() {
    if (!student) return;

    const res = await fetch("/api/sports/bet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: student.student_id,
        sport: sport.abbr,
        rank_1: bet[0],
        rank_2: bet[1],
        rank_3: bet[2],
      }),
    });

    const data = await res.json();

    if (data.success) {
      onClose();
    } else {
      console.error("Failed to register:", data.error);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style="relative w-2/3 h-2/3 bg-linear-to-b from-gray-900 to-slate-900 rounded-xl flex flex-col items-center p-4"
    >
      <h1 className="pt-4 text-3xl font-bold text-white flex items-center gap-3">
        {hasBet ? "ผลทายของคุณ" : "ทายผล"}{" "}
        <span className="font-normal">{`<${sport.name}>`}</span>
        {!isBettingOpen && (
            <span className="text-red-500 bg-red-100/10 px-3 py-1 rounded-full text-sm border border-red-500/50">
                ปิดทายผลแล้วจ้า
            </span>
        )}
      </h1>
      <div className="w-full flex-1 grid grid-cols-3 gap-10 pt-6 px-8">
        {bet_rank.map(({ rank }, index) => (
          <div key={index} className="relative">
            <div
              key={index}
              onClick={() =>
                isBettingOpen && !hasBet && setActiveRank(activeRank == rank ? 0 : rank)
              }
              style={{
                background: `linear-gradient(60deg,
                ${
                  bet[rank - 1] != "" ? ColorMap[bet[rank - 1]].hex : "#d1d5dc"
                },
                ${
                  bet[rank - 1] != ""
                    ? ColorMap[bet[rank - 1]].shade + "80"
                    : "#6a7282"
                }
              )`,
              }}
              className={`flex flex-col items-center justify-between gap-4 px-4 py-8 w-full h-full rounded-xl ${
                !isBettingOpen ? "opacity-80 grayscale-30 cursor-not-allowed" : ""
              } ${
                hasBet
                  ? ""
                  : isBettingOpen ? `hover:-translate-y-1.5 hover:scale-105 hover:outline-4 outline-[#C12882] cursor-pointer transition-all` : ""
              } ${
                activeRank === rank
                  ? "outline-4 outline-[#C12882] scale-105 -translate-y-1.5"
                  : ""
              }`}
            >
              <div
                className={`flex flex-col items-center justify-center text-black/70 pt-3 pb-2 px-4 rounded-4xl outline-5 bg-radial ${
                  rank == 1
                    ? "to-[#ffe958] from-[#ffc905] outline-[#edbc09]"
                    : rank == 2
                    ? "from-[#b9b9c5] to-[#f6f6ff] outline-[#b7b7b7]"
                    : "from-[#b77e47] to-[#ac6b28] outline-[#945f28]"
                }`}
              >
                <h4 className="font-bold pt-1">อันดับ</h4>
                <h1 className="text-5xl font-black">{rank}</h1>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center gap-2 w-full">
                <div className="w-full text-center font-bold text-5xl opacity-70">
                  {bet[rank - 1] != ""
                    ? ColorMap[bet[rank - 1]].name
                    : "ยังไม่เลือกสี"}
                </div>
              </div>
            </div>
            {isBettingOpen && activeRank === rank && (
              <div className="cursor-default z-50 absolute bg-white -bottom-20 rounded-lg flex flex-col p-3 gap-1 shadow-lg -translate-x-15">
                <div className="flex w-full items-center justify-between">
                  <p className="pl-1 text-sm">เลือกสี อันดับที่ {rank}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveRank(0);
                    }}
                    className="text-sm cursor-pointer aspect-square flex items-center justify-center px-2 rounded-full bg-gray-50 hover:bg-gray-100"
                  >
                    x
                  </button>
                </div>
                <div className="flex gap-1.5 h-15">
                  {ColorList.map((col) => (
                    <button
                      key={col}
                      disabled={bet.includes(col) && bet[activeRank - 1] != col}
                      style={{ backgroundColor: ColorMap[col].hex }}
                      className={`cursor-pointer h-full aspect-square rounded-lg transition-all duration-100 hover:border-3 hover:border-stone-500 disabled:hover:border-stone-500 disabled:hover:opacity-70 disabled:border-3 disabled:cursor-not-allowed disabled:border-[#C12882] ${
                        bet[activeRank - 1] == col
                          ? "border-3 border-[#C12882] hover:opacity-90"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();

                        setBet((bb) => {
                          const setbet = [...bb];
                          const currentRank = activeRank - 1;
                          const currentColor = bb[currentRank];

                          const usedElsewhere = bb.some(
                            (c, i) => i !== currentRank && c === col
                          );

                          // reset
                          if (currentColor === col) {
                            setbet[currentRank] = "";
                            return setbet;
                          }

                          // cant
                          if (currentColor === "" && usedElsewhere) {
                            return bb;
                          }

                          // set
                          if (!usedElsewhere) {
                            setbet[currentRank] = col;
                          }

                          return setbet;
                        });

                        setActiveRank(0);
                      }}
                    ></button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-amber-300 pt-3 pb-1">
        คะแนน: อันดับ 1 = 5 | อันดับ 2 = 3 | อันดับ 3 = 1 (ผิด = 0)
      </p>
      
      {isBettingOpen && !hasBet && (
        <button
          onClick={() => onBet()}
          disabled={bet_available}
          className="flex items-center justify-center gap-1.5 rounded-full text-2xl px-8 py-2 font-bold bg-linear-to-b from-[#C12882] to-[#b31b74] text-white not-disabled:cursor-pointer transition-all duration-200 hover:shadow-md shadow-black/20 disabled:scale-95 not-disabled:hover:scale-105 not-disabled:hover:bg-linear-to-t disabled:brightness-50"
        >
          ทาย!
        </button>
      )}
    </Modal>
  );
}
