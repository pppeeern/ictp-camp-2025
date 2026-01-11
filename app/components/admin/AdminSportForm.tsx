"use client";

import { useState, useEffect, useTransition } from "react";
import { TEAM_NAMES, TEAM_COLORS } from "@/app/lib/constants";
import { upsertSportResult } from "@/app/lib/actions";

type Props = {
  sportAbbr: string;
  initialRanks: string[];
  onUpdate?: () => void;
};

export default function AdminSportForm({ sportAbbr, initialRanks, onUpdate }: Props) {
  const [ranks, setRanks] = useState<string[]>(initialRanks);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setRanks(initialRanks);
  }, [initialRanks]);

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
        ranks[2] || ""
      );
      if (onUpdate) onUpdate();
    });
  };

  const handleClear = () => {
     const newRanks = ["", "", ""];
     setRanks(newRanks);
     startTransition(async () => {
        await upsertSportResult(sportAbbr, "", "", "");
        if (onUpdate) onUpdate();
     });
  };

  return (
    <div className="space-y-3">
      {ranks.map((currentVal, index) => {
        let label = index === 0 ? "🥇 อันดับ 1" : index === 1 ? "🥈 อันดับ 2" : "🥉 อันดับ 3";

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
