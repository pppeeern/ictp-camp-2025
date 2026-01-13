"use client";

import { useState, useEffect, useTransition } from "react";
import { TEAM_NAMES, TEAM_COLORS } from "@/app/lib/constants";
import { upsertSportResult, getBettingStatus, toggleBettingStatus } from "@/app/lib/actions";

type Props = {
  sportAbbr: string;
  initialRanks: string[];
  onUpdate?: () => void;
};

export default function AdminSportForm({ sportAbbr, initialRanks, onUpdate }: Props) {
  const [ranks, setRanks] = useState<string[]>(initialRanks);
  const [isPending, startTransition] = useTransition();
  const [isBettingOpen, setIsBettingOpen] = useState(true);

  useEffect(() => {
    getBettingStatus(sportAbbr).then(setIsBettingOpen);
  }, [sportAbbr]);

  const handleToggleBetting = async () => {
    const newState = !isBettingOpen;
    setIsBettingOpen(newState);
    await toggleBettingStatus(sportAbbr, newState);
  };

  const handleChange = (index: number, value: string) => {
    const newRanks = [...ranks];
    newRanks[index] = value;
    setRanks(newRanks);
  };

  const handleSave = () => {
    startTransition(async () => {
      await upsertSportResult(
        sportAbbr,
        ranks[0] || "",
        ranks[1] || "",
        ranks[2] || "",
        ranks[3] || "",
        ranks[4] || "",
        ranks[5] || ""
      );
      if (onUpdate) onUpdate();
    });
  };

  const handleClear = () => {
    const newRanks = ["", "", ""];
    setRanks(newRanks);
    startTransition(async () => {
      await upsertSportResult(sportAbbr, "", "", "", "", "", "");
      if (onUpdate) onUpdate();
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
        <span className="text-sm font-medium text-gray-700">สถานะการทายผล</span>
        <button
          onClick={handleToggleBetting}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${isBettingOpen
            ? "bg-green-100 text-green-700 border border-green-200 hover:bg-green-200"
            : "bg-red-100 text-red-700 border border-red-200 hover:bg-red-200"
            }`}
        >
          {isBettingOpen ? "เปิดทายผล" : "ปิดทายผล"}
        </button>
      </div>
      {ranks.map((currentVal, index) => {
        let label = "";
        if (index === 0) label = "🥇 อันดับ 1";
        else if (index === 1) label = "🥈 อันดับ 2";
        else if (index === 2) label = "🥉 อันดับ 3";
        else label = `# อันดับ ${index + 1}`;

        return (
          <div key={index} className="flex flex-col gap-1">
            <label className="text-sm text-gray-500 font-medium">{label}</label>
            <select
              value={currentVal}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-[#C12882]"
            >
              <option value="">-- เลือกสี --</option>
              {TEAM_NAMES.map((team) => {
                const isSelectedElsewhere = ranks.some((r, i) => i !== index && r === team && r !== "");
                if (isSelectedElsewhere) return null;

                return (
                  <option
                    key={team}
                    value={team}
                    style={{
                      backgroundColor: TEAM_COLORS[team],
                      color: TEAM_COLORS[team] === "#000000" ? "white" : "black",
                    }}
                  >
                    {team}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex-1 mt-2 bg-[#C12882] hover:bg-[#a0226c] text-white font-bold py-2 rounded-lg transition-colors shadow-md disabled:bg-gray-400"
        >
          {isPending ? "กำลังบันทึก..." : "บันทึกผล"}
        </button>
        <button
          onClick={handleClear}
          disabled={isPending}
          className="mt-2 bg-red-100 hover:bg-red-200 text-red-600 font-bold px-4 py-2 rounded-lg transition-colors shadow-sm disabled:bg-gray-100 disabled:text-gray-400"
          title="ล้างผลการแข่งขัน"
        >
          ล้าง
        </button>
      </div>
    </div>
  );
}
