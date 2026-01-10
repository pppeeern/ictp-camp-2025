import { auth } from "@/auth";
import { supabase } from "../lib/supabase";
import Navigation from "../components/Navigation";
import { StudentType } from "../components/account/AccountData";
import { getLeaderboard } from "../lib/actions";
import { TEAM_COLORS } from "../lib/constants";

import Link from "next/link";

export default async function LeaderboardPage() {
  const session = await auth();

  let student: StudentType | null = null;
  if (session?.user?.studentId) {
    const { data } = await supabase
      .from("students")
      .select(`student_id, name, nickname, color, room`)
      .eq("student_id", session.user.studentId)
      .single();

    student = data ?? null;
  }

  const leaderboard = await getLeaderboard();

  return (
    <div className="min-h-screen overflow-hidden flex flex-col bg-[#198e8b] bg-[url('/landing/cyan-bg.webp')] bg-cover bg-top bg-no-repeat font-thai">
      <Link href={"/"}>
        <img
          draggable="false"
          className="absolute z-[60] top-6 left-6 md:top-10 md:left-10 w-12 md:w-14 cursor-pointer hover:brightness-95 transition-all duration-100"
          src="/button/close-button.png"
          alt="close"
        />
      </Link>
      <Navigation session={session} displayName={student?.name} hideLogo={true} />
      
      <div className="flex-1 flex flex-col items-center justify-start p-4 pt-28 md:pt-36 pb-10">
        <div className="text-center mb-8 relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-white text-shadow-lg drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] tracking-wide">
            ตารางคะแนนรวม
            </h1>
            <p className="text-white/90 text-xl mt-2 font-medium bg-black/20 px-4 py-1 rounded-full backdrop-blur-sm inline-block">
                คะแนนรวม กีฬา & การแข่งขัน
            </p>
        </div>
        
        <div className="w-full max-w-4xl flex flex-col items-center gap-4 z-10 px-2 md:px-0">
            
            {leaderboard.length === 0 ? (
                 <div className="w-full h-80 flex flex-col items-center justify-center bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 text-white/70">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4 opacity-50">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a1.125 1.125 0 0 0-1.125-1.125h-2.25a1.125 1.125 0 0 0-1.125 1.125V14.25m-3 4.125c.621 0 1.125.504 1.125 1.125H5.25a1.125 1.125 0 0 1-1.125-1.125 1.125 1.125 0 0 1 1.125-1.125h.375Z" />
                    </svg>
                    <p className="text-xl font-medium">รอการประกาศผลคะแนน</p>
                 </div>
            ) : (
                <div className="w-full flex flex-col gap-3">
                    {leaderboard.map((team, index) => {
                        const isFirst = index === 0;
                        const isSecond = index === 1;
                        const isThird = index === 2;
                        
                        const teamColor = TEAM_COLORS[team.team_name] || "#ffffff";

                        let rankStyle = "";
                        let borderStyle = "";
                        let numberStyle = "bg-black/20 text-white/90 border border-white/20";
                        
                        const dynamicStyle = {
                            backgroundColor: teamColor,
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.4)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        };

                        if (isFirst) {
                            rankStyle = "scale-105 z-10 hover:scale-[1.07]";
                            borderStyle = "border-4 border-yellow-300";
                            numberStyle = "bg-yellow-400 text-white shadow-lg scale-125 border-2 border-white ring-2 ring-yellow-400 hover:scale-[1.4] hover:rotate-6 cursor-pointer";
                        } else if (isSecond) {
                            rankStyle = "z-0 hover:scale-[1.02]";
                            borderStyle = "border-4 border-gray-300";
                            numberStyle = "bg-gray-400 text-white shadow-lg scale-110 border-2 border-white ring-2 ring-gray-300 hover:scale-[1.25] hover:-rotate-6 cursor-pointer";
                        } else if (isThird) {
                            rankStyle = "z-0 hover:scale-[1.02]";
                            borderStyle = "border-4 border-orange-300";
                            numberStyle = "bg-orange-400 text-white shadow-lg scale-110 border-2 border-white ring-2 ring-orange-300 hover:scale-[1.25] hover:rotate-6 cursor-pointer";
                        } else {
                            rankStyle = "scale-95 opacity-90 hover:scale-100 hover:opacity-100";
                        }

                        return (
                            <div 
                                key={team.id}
                                className={`relative w-full flex items-center justify-between p-4 md:p-6 rounded-2xl transition-all duration-300 ${rankStyle} ${borderStyle} backdrop-blur-sm`}
                                style={dynamicStyle}
                            >
                                <div className="flex items-center gap-4 md:gap-8">
                                    <div className={`
                                        flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full font-black text-lg md:text-3xl transition-all duration-300
                                        ${numberStyle}
                                    `}>
                                        {index + 1}
                                    </div>
                                    <div className="flex flex-col text-white text-shadow-sm">
                                        <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-wider dropshadow-md">{team.team_name}</h2>
                                    </div>
                                </div>
                                
                                <div className="flex flex-col items-end text-white text-shadow-sm">
                                    <span className="text-3xl md:text-5xl font-extrabold tabular-nums tracking-tighter drop-shadow-md">
                                        {team.score.toLocaleString()}
                                    </span>
                                    <span className="text-xs md:text-sm font-medium opacity-80">คะแนน</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
