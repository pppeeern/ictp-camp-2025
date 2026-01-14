import Link from "next/link";
import { auth } from "@/auth";
import { isAdmin } from "../lib/admin";
import { getLeaderboard, upsertLeaderboardTeam, getSportResults, upsertSportResult, getCompetitionResults, upsertCompetitionResult } from "../lib/actions";
import { TEAM_NAMES, TEAM_COLORS } from "../lib/constants";
import { sportdata } from "../components/sports/Sport_Data";
import { compdata } from "../components/competitions/Comp_Data";
import { activityData } from "../components/activities/Activity_Data";
import { revalidatePath } from "next/cache";
import AdminCompForm from "../components/admin/AdminCompForm";
import AdminSportForm from "../components/admin/AdminSportForm";

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

  const compResults = await getCompetitionResults();
  const compResultsMap = new Map<string, any>();
  if (compResults) {
    compResults.forEach((item: any) => {
      compResultsMap.set(item.competition, item);
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
              const sportId = sport.abbr;
              const initialRanks = result ? [result.rank_1, result.rank_2, result.rank_3] : ["", "", ""];

              return (
                <div key={sportId} className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-lg text-gray-700 mb-3">{sport.name}</h3>
                  <AdminSportForm sportAbbr={sportId} initialRanks={initialRanks} />

                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">อัปเดตผลการประกวด (Competitions)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {compdata.map((comp) => {
              const result = compResultsMap.get(comp.name);
              const compId = comp.name;
              const initialRanks = result ? [
                result.rank_1, result.rank_2, result.rank_3,
                result.rank_4, result.rank_5, result.rank_6
              ] : ["", "", "", "", "", ""];

              return (
                <div key={compId} className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-lg text-gray-700 mb-3">{comp.name}</h3>
                  <AdminCompForm compName={compId} initialRanks={initialRanks} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">อัปเดตผลกิจกรรมฐาน (Activities)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activityData.map((activity) => {
              const result = compResultsMap.get(activity.name);
              const activityId = activity.name;
              const initialRanks = result ? [
                result.rank_1, result.rank_2, result.rank_3,
                result.rank_4, result.rank_5, result.rank_6
              ] : ["", "", "", "", "", ""];

              return (
                <div key={activityId} className="border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-lg text-gray-700 mb-3">{activity.name}</h3>
                  <AdminCompForm compName={activityId} initialRanks={initialRanks} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
