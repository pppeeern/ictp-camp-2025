import Link from "next/link";
import { colldata } from "./CollectionData";
import { supabase } from "../lib/supabase";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

type CollType = {
  id: number;
  name: string;
  code: string;
  rarity: string;
  icon: string;
  des: string;
};
type UserCollType = {
  obtained_at: string;
  collections: CollType;
}[];

export default async function Collection() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("user_collect")
    .select(
      `
        obtained_at,
        collections (
            id,
            name,
            code,
            rarity,
            des
        )
    `
    )
    .eq("student_id", session.user.studentId || "");

  if (error || !data) {
    console.error("Error fetching student:", error);
    return <div className="p-4 text-red-500">Error loading collection.</div>;
  }

  const coll = data as unknown as UserCollType;
  const sort_coll = [...coll].sort(
    (a, b) =>
      new Date(b.obtained_at).getTime() - new Date(a.obtained_at).getTime()
  );

  return (
    <div
      id="landing"
      className="relative flex justify-center items-center w-screen h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] overflow-hidden"
    >
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
        className="w-full absolute bottom-0 translate-y-5 select-none pointer-events-none"
        src="/landing/water-1.png"
        alt="water-1"
      />
      <Link href={"/"}>
        <img
          draggable="false"
          className="absolute z-50 top-10 left-10 w-14 cursor-pointer hover:brightness-95 transition-all duration-100"
          src="/button/close-button.png"
          alt="close"
        />
      </Link>
      <div className="w-3/4 max-w-200 h-4/5 flex flex-col gap-10 items-center z-10">
        <div className="w-full pt-5 flex flex-col items-center justify-end">
          <div className="relative flex items-center justify-center w-full mt-5 mb-10 drop-shadow-2xl">
            <h2 className="text-5xl font-bold -translate-y-2 z-10">
              คอลเลกชัน
            </h2>
            <img
              className="absolute w-100 drop-shadow-md"
              src="/landing/topic-sign.webp"
              alt=""
            />
          </div>
        </div>
        <div className="w-full flex-1 p-6 grid grid-cols-4 gap-6 bg-[#cda987] border-8 border-orange-900/70 rounded-3xl shadow-xl shadow-black/20 overflow-y-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar-thumb]:bg-amber-100/50 [&::-webkit-scrollbar-thumb]:rounded-full">
          {sort_coll.map((c, index) => {
            return (
              <div
                key={index}
                title={c.collections.name}
                className="relative group p-4 aspect-square flex justify-center items-center bg-amber-50 border-4 border-[#cda987] outline-6 outline-amber-50 rounded-xl cursor-pointer hover:outline-[#59A0A8] transition-colors"
              >
                <img
                  className="group-hover:hidden"
                  src={`/collections/${c.collections.code}.png`}
                  alt={c.collections.name}
                />
                <div className="text-center rounded-xl hidden group-hover:block">
                  <p className="text-sm font-bold">{c.collections.des}</p>
                  <p className="mt-2 text-xs text-gray-500">{c.obtained_at}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
