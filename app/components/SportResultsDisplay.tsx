import { TEAM_COLORS } from "../lib/constants";
import { sportdata } from "./sports/Sport_Data";

type SportResult = {
    sport: string;
    rank_1: string;
    rank_2: string;
    rank_3: string;
    rank_4?: string;
    rank_5?: string;
    rank_6?: string;
};

export default function SportResultsDisplay({ results }: { results: SportResult[] }) {
    const resultsMap = new Map(results.map(r => [r.sport, r]));

    return (
        <div className="w-full max-w-4xl mt-12 px-4 md:px-0">
            <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-8 text-shadow-lg drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">
                ผลการแข่งขันกีฬา
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sportdata.map((sport) => {
                    const result = resultsMap.get(sport.abbr);

                    return (
                        <div key={sport.abbr} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/50 flex flex-col items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                            <h3 className="text-xl font-bold text-[#1E6C74]">{sport.name}</h3>
                            <div className="w-full h-[1px] bg-gray-200"></div>

                            {result ? (
                                <div className="w-full flex flex-col gap-3">
                                    <ResultRow rank={1} teamName={result.rank_1} />
                                    <ResultRow rank={2} teamName={result.rank_2} />
                                    <ResultRow rank={3} teamName={result.rank_3} />
                                    {result.rank_4 && <ResultRow rank={4} teamName={result.rank_4} />}
                                    {result.rank_5 && <ResultRow rank={5} teamName={result.rank_5} />}
                                    {result.rank_6 && <ResultRow rank={6} teamName={result.rank_6} />}
                                </div>
                            ) : (
                                <div className="py-8 text-gray-400 text-sm font-medium italic">
                                    ยังไม่ได้แข่งนะจ๊ะ
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function ResultRow({ rank, teamName }: { rank: number; teamName: string }) {
    const color = TEAM_COLORS[teamName] || "#ccc";
    const medal = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : <span className="font-bold text-gray-500 w-6 text-center">{rank}</span>;

    return (
        <div className="flex items-center justify-between w-full bg-gray-50 p-2 px-3 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2">
                <span className="text-xl">{medal}</span>
                <span className="font-bold text-gray-700">{teamName}</span>
            </div>
            <div
                className="w-4 h-4 rounded-full shadow-sm ring-1 ring-black/5"
                style={{ backgroundColor: color }}
            />
        </div>
    );
}
