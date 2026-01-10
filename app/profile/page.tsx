import { auth } from "@/auth";
import { supabase } from "@/app/lib/supabase";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ColorMap } from "../components/ColorData";
import { TEAM_COLORS } from "../lib/constants";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", session.user.studentId || "")
    .single();

  if (studentError || !student) {
    console.error("Error fetching student:", studentError);
    return <div className="p-4 text-red-500">Error loading profile.</div>;
  }

  let thaiColorName = "Unknown";
  let displayColor = "#C12882";

  if (student.color) {
     const colorKey = student.color.toUpperCase();
     const colorInfo = ColorMap[colorKey];
     if (colorInfo) {
        thaiColorName = colorInfo.name;
        displayColor = colorInfo.hex;
     } else {
         thaiColorName = student.color;
         displayColor = TEAM_COLORS[student.color] || "#C12882";
     }
  }

  return (
    <div
      id="profile"
      className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      <Link href={"/"}>
        <img
          draggable="false"
          className="absolute z-50 top-10 left-10 w-14 cursor-pointer hover:brightness-95 transition-all duration-100"
          src="/button/close-button.png"
          alt="close"
        />
      </Link>
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: "url('/landing/cyan-bg.webp')" }}
      ></div>
      <img
        draggable="false"
        className="w-72 absolute right-25 top-40 cursor-grab transition-all hover:animate-spin hover:scale-120"
        src="/landing/bird.png"
        alt="bird"
      />
      <img
        className="w-full absolute bottom-0 translate-y-5 select-none pointer-events-none"
        src="/landing/water-1.png"
        alt="water-1"
      />
      <img
        className="w-90 md:w-120 lg:w-140 bottom-0 translate-y-25 absolute -left-20 rotate-14 select-none pointer-events-none"
        src="/landing/rock-l.webp"
        alt="rock-left"
      />
      <img
        className="w-90 md:w-120 lg:w-140 bottom-0 translate-y-35 absolute -right-25 rotate-14 select-none pointer-events-none"
        src="/landing/rock-r.webp"
        alt="rock-right"
      />

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/50 relative z-10">
        <div className="flex flex-col items-center gap-2 mb-4">
          <h1 className="text-3xl md:text-5xl py-2 font-bold text-[#1E6C74] text-center">
            โปรไฟล์
          </h1>
        </div>
        <div className="space-y-4">
          <div className="border-b border-gray-200/50 pb-2">
            <span className="text-sm text-gray-500 block mb-1">
              ชื่อ-นามสกุล
            </span>
            <span className="text-xl font-medium text-[#1E6C74]">
              {student.name || "-"}
            </span>
          </div>

          <div className="border-b border-gray-200/50 pb-2">
            <span className="text-sm text-gray-500 block mb-1">
              รหัสนักเรียน
            </span>
            <span className="text-xl font-medium text-[#1E6C74]">
              {student.student_id}
            </span>
          </div>

          <div className="border-b border-gray-200/50 pb-2">
            <span className="text-sm text-gray-500 block mb-1">ชื่อเล่น</span>
            <span className="text-xl font-medium text-[#1E6C74]">
              {student.nickname || "-"}
            </span>
          </div>

          <div className="border-b border-gray-200/50 pb-2">
            <span className="text-sm text-gray-500 block mb-1">
              สีประจำกลุ่ม
            </span>
            <div className="flex items-center gap-3">
              <span
                className="text-2xl font-bold"
                style={{ color: displayColor }}
              >
                {thaiColorName}
              </span>
              {thaiColorName !== "Unknown" && (
                <div
                  className="w-8 h-8 aspect-square rounded-lg rotate-45 border-2 border-white shadow-sm ring-2 ring-gray-100"
                  style={{ backgroundColor: displayColor }}
                  title={`Color: ${thaiColorName}`}
                />
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <form
            action={async () => {
              "use server";
              await import("@/auth").then((mod) =>
                mod.signOut({ redirectTo: "/" })
              );
            }}
          >
            <button
              type="submit"
              className="cursor-pointer w-full bg-red-800/10 hover:bg-red-800/20 text-red-900 font-bold py-3 rounded-xl transition-all active:scale-95"
            >
              ออกจากระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
