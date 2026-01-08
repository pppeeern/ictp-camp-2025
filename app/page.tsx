import { auth } from "@/auth";
import { supabase } from "./lib/supabase";

import Navigation from "./components/Navigation";
import CompLanding from "./components/competitions/Comp_Landing";
import { StudentType } from "./components/account/AccountData";
import SportLanding from "./components/sports/Sport_Landing";

const sched = [
  { date: 5, month: "DEC", title: "ลงทะเบียนการแข่งขัน" },
  { date: 25, month: "DEC", title: "Zero Day Workshop" },
  { date: 5, month: "JAN", title: "RoboMission Practice" },
  // {date: 5, month: "DEC", title: "ลงทะเบียนการแข่งขัน"},
];

export default async function Home() {
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

  return (
    <div className="overflow-hidden scroll-smooth">
      <Navigation session={session} displayName={student?.name} />
      <div
        id="landing"
        className="relative flex flex-col items-center justify-center h-screen"
      >
        <div className="z-20 mt-40 size-100 md:size-140 xl:size-160 2xl:size-170">
          <img
            draggable="false"
            src="/landing/camp-logo_1.webp"
            alt="camp-logo"
          />
        </div>
        <img
          className="w-87.5 md:w-112.5 lg:w-162.5 top-1/2 translate-y-[calc(-50%-260px)] absolute -left-30"
          src="/landing/cloud-l.webp"
          alt="cloud-left"
        />
        <img
          className="w-87.5 md:w-112.5 lg:w-162.5 top-1/2 translate-y-[calc(-50%-260px)] absolute -right-30"
          src="/landing/cloud-r.webp"
          alt="cloud-right"
        />
        <img
          className="w-87.5 md:w-112.5 lg:w-162.5 top-1/2 translate-y-[calc(50%-50px)] md:translate-y-[calc(50%-200px)] lg:translate-y-[calc(50%-400px)] absolute -left-20 md:-left-25"
          src="/landing/rock-l.webp"
          alt="rock-left"
        />
        <img
          className="w-87.5 md:w-112.5 lg:w-150 top-1/2 translate-y-[calc(50%-50px)] md:translate-y-[calc(50%-150px)] lg:translate-y-[calc(50%-350px)] absolute -right-20 md:-right-25"
          src="/landing/rock-r.webp"
          alt="rock-right"
        />
      </div>
      <div className="hidden min-h-screen flex flex-col justify-center items-center pt-10">
        <h2 className="text-2xl font-bold">กำหนดการ</h2>
        <div className="w-3/4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sched.map(({ date, month, title }, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="flex flex-col items-center justify-center w-20 h-20 text-center rounded-full bg-teal-700">
                <span className="text-2xl font-bold text-white">{date}</span>
                <span className="text-sm leading-4 font-bold text-white">
                  {month}
                </span>
              </div>
              <p className="text-lg">{title}</p>
            </div>
          ))}
        </div>
      </div>
      <SportLanding />
      <CompLanding session={session} student={student} />
    </div>
  );
}
