import Link from "next/link";
import { auth } from "@/auth";
import { isAdmin } from "../lib/admin";
import { getLeaderboard, upsertLeaderboardTeam, getSportResults, upsertSportResult } from "../lib/actions";
import { TEAM_NAMES, TEAM_COLORS } from "../lib/constants";
import { sportdata } from "../components/sports/Sport_Data";
import { revalidatePath } from "next/cache";

export default async function AdminPage() {
  const session = await auth();

  if (!isAdmin(session?.user?.studentId)) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 text-red-500 font-bold text-xl">
        Access Denied
      </div>
    );
  }

  const leaderboard = await getLeaderboard();
  const teamScores = new Map<string, number>();
  leaderboard.forEach(item => {
    teamScores.set(item.team_name, item.score);
  });

  const sportResults = await getSportResults();
  const sportResultsMap = new Map<string, any>();
  if (sportResults) {
    sportResults.forEach((item: any) => {
      sportResultsMap.set(item.sport, item);
    });
  }

  async function updateScoreAction(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const score = Number(formData.get("score"));
    await upsertLeaderboardTeam(name, score);
    revalidatePath("/admin");
    revalidatePath("/leaderboard");
  }

  async function updateSportResultAction(formData: FormData) {
    "use server";
    const sportAbbr = formData.get("sport") as string;
    const rank1 = formData.get("rank1") as string;
    const rank2 = formData.get("rank2") as string;
    const rank3 = formData.get("rank3") as string;
    
    if (rank1 && rank2 && rank3) {
       await upsertSportResult(sportAbbr, rank1, rank2, rank3);
       revalidatePath("/admin");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 pt-24 font-thai text-gray-800 relative">
      <Link href={"/"}>
        <img
          draggable="false"
          className="absolute z-[60] top-6 left-6 md:top-10 md:left-10 w-12 md:w-14 cursor-pointer hover:brightness-95 transition-all duration-100"
          src="/button/close-button.png"
          alt="close"
        />
      </Link>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-8 text-[#1E6C74]">Admin Panel</h1>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">อัปเดตคะแนนรวมสี</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 rounded-l-lg">ชื่อสี</th>
                  <th className="p-3">คะแนน</th>
                  <th className="p-3 rounded-r-lg text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {TEAM_NAMES.map((teamName) => {
                    const currentScore = teamScores.get(teamName) || 0;
                    return (
                        <tr key={teamName} className="border-b last:border-0 hover:bg-gray-50">
                            <td className="p-3">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-6 h-6 rounded-full border border-gray-200"
                                        style={{ backgroundColor: TEAM_COLORS[teamName] || '#ccc' }}
                                    />
                                    <span className="font-medium">{teamName}</span>
                                </div>
                            </td>
                            <td className="p-3">
                                <form action={updateScoreAction} className="flex items-center gap-4 w-full">
                                    <input type="hidden" name="name" value={teamName} />
                                    <input
                                        type="number"
                                        name="score"
                                        defaultValue={currentScore}
                                        className="w-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#C12882] outline-none text-right font-mono"
                                    />
                                    <button className="bg-[#1E6C74] hover:bg-[#165a61] text-white font-bold px-4 py-2 rounded-lg transition-colors text-sm">
                                        อัปเดต
                                    </button>
                                </form>
                            </td>
                            <td className="p-3 text-right">
                                <span className="text-xs text-gray-400">
                                    {teamScores.has(teamName) ? "Active" : "No Data"}
                                </span>
                            </td>
                        </tr>
                    );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">อัปเดตผลการแข่งขัน (Sports)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sportdata.map((sport) => {
                    const result = sportResultsMap.get(sport.abbr);
                    return (
                        <div key={sport.abbr} className="border border-gray-200 rounded-lg p-5">
                            <h3 className="font-bold text-lg text-gray-700 mb-3">{sport.name}</h3>
                            <form action={updateSportResultAction} className="space-y-3">
                                <input type="hidden" name="sport" value={sport.abbr} />
                                
                                {["rank1", "rank2", "rank3"].map((rankName, index) => {
                                    const defaultValue = result ? (index === 0 ? result.rank_1 : index === 1 ? result.rank_2 : result.rank_3) : "";
                                    const label = index === 0 ? "🥇 อันดับ 1" : index === 1 ? "🥈 อันดับ 2" : "🥉 อันดับ 3";
                                    return (
                                        <div key={rankName} className="flex flex-col gap-1">
                                            <label className="text-sm text-gray-500 font-medium">{label}</label>
                                            <select 
                                                name={rankName} 
                                                defaultValue={defaultValue}
                                                className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:border-[#C12882]"
                                            >
                                                <option value="">-- เลือกสี --</option>
                                                {TEAM_NAMES.map(team => (
                                                    <option key={team} value={team}>{team}</option>
                                                ))}
                                            </select>
                                        </div>
                                    );
                                })}

                                <button className="w-full mt-2 bg-[#C12882] hover:bg-[#a0226c] text-white font-bold py-2 rounded-lg transition-colors shadow-md">
                                    บันทึกผล
                                </button>
                            </form>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </div>
  );
}
