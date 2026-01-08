"use client";
import { useState } from "react";
import Modal from "../Modal";
import { sportdata } from "./Sport_Data";
import { ColorList, ColorMap } from "../ColorData";

export default function SportBetModal({
  sport_index,
  isOpen,
  onClose,
}: {
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      style="relative w-2/3 h-2/3 bg-linear-to-b from-gray-900 to-slate-900 rounded-xl flex flex-col items-center p-4"
    >
      <h1 className="pt-4 text-3xl font-bold text-white">
        ทายผล <span className="font-normal">{`<${sport.name}>`}</span>
      </h1>
      <div className="w-full flex-1 grid grid-cols-3 gap-10 py-6 px-8">
        {bet_rank.map(({ rank, point }, index) => (
          <div
            key={index}
            onClick={() => setActiveRank(activeRank == rank ? 0 : rank)}
            style={{
              background: `linear-gradient(60deg,
                ${
                  bet[rank - 1] != "" ? ColorMap[bet[rank - 1]].hex : "#d1d5dc"
                },
                ${
                  bet[rank - 1] != ""
                    ? ColorMap[bet[rank - 1]].shade
                    : "#6a7282"
                }
              )`,
            }}
            className={`flex flex-col items-center justify-between gap-4 px-4 py-8 w-full h-full rounded-xl cursor-pointer transition-all hover:-translate-y-1.5 hover:scale-105 hover:outline-4 outline-[#C12882] ${
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
            {/* <div className="w-full flex gap-2 items-center justify-center">
              {Array.from({ length: point }, (_, i) => i).map((p) => (
                <span key={p}>⭐</span>
              ))}
            </div> */}

            {activeRank === rank && (
              <div className="cursor-default z-60 absolute bg-white -bottom-32 rounded-lg flex flex-col p-3 gap-1 shadow-lg">
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
      <button className="flex items-center justify-center gap-1.5 rounded-full text-2xl px-8 py-2 font-bold bg-linear-to-b from-[#C12882] to-[#b31b74] text-white cursor-pointer transition-all duration-200 hover:shadow-md shadow-black/20 hover:scale-105 hover:bg-linear-to-t">
        ทาย!
      </button>
    </Modal>
  );
}
