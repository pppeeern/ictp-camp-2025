"use client";
import { useEffect, useState } from "react";

import { compdata } from "./Comp_Data";
import CompModalCard from "./Comp_Modal_Card";
import { StudentType } from "../account/AccountData";
import { ColorMap } from "../../components/ColorData";

type StudentMemberType = {
  student_id: number;
  name: string;
  room: number;
};
type TeamMemberType = {
  students: StudentMemberType;
};
type TeamType = {
  id: number;
  no: number;
  color: string;
  members: TeamMemberType[];
};

export default function CompRegisModal({
  student,
  comp_index,
  onSwitch,
}: {
  student: StudentType | null;
  comp_index: number;
  onSwitch: () => void;
}) {
  const colorInfo = student?.color ? ColorMap[student.color] : null;

  const { name, logo, req, min, max, team_type, upl, web } =
    compdata[comp_index];

  const [fetchTeam, setFetchTeam] = useState<TeamType[] | null>(null);
  const [refreshTeams, setRefreshTeams] = useState(false);

  const [activeTeamNo, setActiveTeamNo] = useState<number>(1);

  useEffect(() => {
    setActiveTeamNo(1);
  }, [comp_index]);

  useEffect(() => {
    if (!student) return;

    async function loadTeams() {
      const data = await fetch(
        `/api/competitions/teams?comp_id=${comp_index + 1}&color=${
          student?.color
        }`
      );
      const team_data = await data.json();
      setFetchTeam(team_data);
    }

    loadTeams();
  }, [comp_index, student, activeTeamNo, refreshTeams]);

  const teams = (() => {
    if (!fetchTeam) return [];

    if (team_type === "solo") {
      const allMembers = fetchTeam.flatMap((teamData) => 
        teamData.members.map((member) => ({
          student_id: member.students.student_id,
          name: member.students.name,
          room: `${member.students.room}/6`,
          color: teamData.color
        }))
      );

      return [{
        id: 0,
        no: 1,
        members: allMembers
      }];
    }

    return fetchTeam.map((teamData) => {
      const members = teamData.members.map((member) => ({
        student_id: member.students.student_id,
        name: member.students.name,
        room: `${member.students.room}/6`,
      }));

      const mem_rows = Array.from(
        { length: max },
        (_, i) => members[i] ?? null
      );

      return {
        id: teamData.id,
        no: teamData.no,
        members: mem_rows,
      };
    });
  })();

  const activeTeam = teams.find((team) => team.no === activeTeamNo);
  const mem_amount =
    teams && activeTeam ? activeTeam?.members.filter(Boolean).length : 0;

  const is_regis =
    teams?.some((team) =>
      team?.members.some((m) => m?.student_id === student?.student_id)
    ) ?? false;
  const is_empty = mem_amount === 0;
  const is_notenough = mem_amount > 0 && mem_amount < min;
  const is_full = mem_amount >= max;
  const regis_available = !is_regis && mem_amount < max;

  const student_team_no =
    teams?.find((team) =>
      team?.members.some((m) => m?.student_id === student?.student_id)
    )?.no ?? null;

  function TeamMember({
    index,
    name,
    room,
  }: {
    index: number;
    name: string;
    room: string;
  }) {
    return (
      <>
        <div className="text-center">{index}</div>
        <div
          className={`pl-2 w-3/4 ${
            name === student?.name
              ? "bg-linear-to-r font-medium text-teal-900 from-teal-100/50 to-cyan-50 rounded-lg "
              : ""
          }`}
        >
          {name}
        </div>
        <div className="text-center">{room}</div>
      </>
    );
  }

  function SkeletonMember({ index }: { index: number }) {
    return (
      <>
        <div className="text-center">{index}</div>
        <div className="pl-2 text-sm w-3/4 h-5 bg-gray-100 text-gray-600 rounded-full flex items-center">
          ว่าง
        </div>
        <div className="text-sm w-full h-5 bg-gray-100 rounded-full flex items-center justify-center"></div>
      </>
    );
  }

  function MemberTable() {
    return (
      <div className="w-full px-4 grid grid-cols-[5%_1fr_7%] gap-x-5 gap-y-7">
        <div className="font-semibold text-sm text-teal-700 text-center">
          ลำดับ
        </div>
        <div className="font-semibold text-sm text-teal-700 pl-2">
          ชื่อ-นามสกุล
        </div>
        <div className="font-semibold text-sm text-teal-700 text-center">
          ห้อง
        </div>

        {teams.length && activeTeam
          ? activeTeam.members.map((member, index) =>
              member ? (
                <TeamMember
                  key={index}
                  index={index + 1}
                  name={member.name}
                  room={member.room}
                ></TeamMember>
              ) : (
                <SkeletonMember key={index} index={index + 1}></SkeletonMember>
              )
            )
          : Array.from(
              { length: team_type !== "solo" ? max : 0 },
              (_, i) => i
            ).map((index) => (
              <SkeletonMember key={index} index={index + 1}></SkeletonMember>
            ))}
      </div>
    );
  }

  async function register() {
    if (!student) return;

    const res = await fetch("/api/competitions/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comp_id: comp_index + 1,
        team_no: activeTeamNo,
        color: student.color,
        student_id: student.student_id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setRefreshTeams((prev) => !prev);
    } else {
      console.error("Failed to register:", data.error);
    }
  }

  return (
    <>
      <CompModalCard
        name={name}
        logo={logo}
        des_title="เงื่อนไข"
        button_text="รายละเอียด"
        onSwitch={onSwitch}
        upl={upl}
        web={web}
      >
        {req}
      </CompModalCard>

      <div className="h-full min-h-0 flex flex-col bg-white rounded-r-xl rounded-l-3xl">
        {/* Color Display */}
        <div
          id="user_color_display"
          className="bg-amber-100 pt-8 pb-6 px-12 flex gap-8 items-center rounded-tl-3xl rounded-tr-xl shrink-0"
        >
          {team_type != "solo" ? (
            <>
              <div
                style={{ backgroundColor: colorInfo?.hex ?? "#000" }}
                className="aspect-square w-12 h-12 rounded-xl rotate-45"
              ></div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">
                  {colorInfo?.name ?? "ชื่อสี"}
                </h1>
                <h3 className="text-md">{colorInfo?.color ?? "สี"}</h3>
              </div>
            </>
          ) : (
            <>
              <div
                style={{ backgroundColor: colorInfo?.hex ?? "#000" }}
                className="aspect-square w-12 h-12 rounded-xl rotate-45"
              ></div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">
                  {student?.name ?? "ชื่อ นามสกุล"}
                </h1>
                <h3 className="text-md">
                  {is_regis && activeTeam
                    ? (() => {
                        const index = activeTeam?.members.findIndex(
                          (member) => String(member?.student_id) === String(student?.student_id)
                        );
                        return index !== -1 ? `# ${index + 1}` : "Registered";
                      })()
                    : ""}
                </h3>
              </div>
            </>
          )}
        </div>
        <div
          id="team_display"
          className="px-8 py-6 w-full flex-1 overflow-y-auto"
        >
          {team_type === "duo" && (
            <div className="flex mb-4 rounded-lg overflow-clip">
              {[1, 2].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveTeamNo(i)}
                  style={
                    activeTeamNo === i
                      ? { backgroundColor: colorInfo?.shade ?? "#000" }
                      : {}
                  }
                  className={`min-w-1/3 py-2 font-semibold transition-all duration-100
                                ${
                                  activeTeamNo === i
                                    ? " text-white w-2/3"
                                    : "bg-gray-100 text-gray-600 w-1/3 cursor-pointer hover:bg-gray-200 transition-colors"
                                }
                      `}
                >
                  ทีมที่ {i}
                </button>
              ))}
            </div>
          )}
          {!fetchTeam ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-gray-400 animate-spin"></div>
            </div>
          ) : (
            <>
              <MemberTable />

              {(is_empty || is_notenough) && (
                <p className="w-full pt-4 text-sm text-yellow-600 flex gap-1 items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V13C12.75 13.4142 12.4142 13.75 12 13.75C11.5858 13.75 11.25 13.4142 11.25 13V8C11.25 7.58579 11.5858 7.25 12 7.25Z" />
                    <path d="M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M8.2944 4.47643C9.36631 3.11493 10.5018 2.25 12 2.25C13.4981 2.25 14.6336 3.11493 15.7056 4.47643C16.7598 5.81544 17.8769 7.79622 19.3063 10.3305L19.7418 11.1027C20.9234 13.1976 21.8566 14.8523 22.3468 16.1804C22.8478 17.5376 22.9668 18.7699 22.209 19.8569C21.4736 20.9118 20.2466 21.3434 18.6991 21.5471C17.1576 21.75 15.0845 21.75 12.4248 21.75H11.5752C8.91552 21.75 6.84239 21.75 5.30082 21.5471C3.75331 21.3434 2.52637 20.9118 1.79099 19.8569C1.03318 18.7699 1.15218 17.5376 1.65314 16.1804C2.14334 14.8523 3.07658 13.1977 4.25818 11.1027L4.69361 10.3307C6.123 7.79629 7.24019 5.81547 8.2944 4.47643ZM9.47297 5.40432C8.49896 6.64148 7.43704 8.51988 5.96495 11.1299L5.60129 11.7747C4.37507 13.9488 3.50368 15.4986 3.06034 16.6998C2.6227 17.8855 2.68338 18.5141 3.02148 18.9991C3.38202 19.5163 4.05873 19.8706 5.49659 20.0599C6.92858 20.2484 8.9026 20.25 11.6363 20.25H12.3636C15.0974 20.25 17.0714 20.2484 18.5034 20.0599C19.9412 19.8706 20.6179 19.5163 20.9785 18.9991C21.3166 18.5141 21.3773 17.8855 20.9396 16.6998C20.4963 15.4986 19.6249 13.9488 18.3987 11.7747L18.035 11.1299C16.5629 8.51987 15.501 6.64148 14.527 5.40431C13.562 4.17865 12.8126 3.75 12 3.75C11.1874 3.75 10.4379 4.17865 9.47297 5.40432Z"
                    />
                  </svg>
                  <span>
                    {is_empty
                      ? team_type === "solo"
                        ? "ยังไม่มีสมาชิกลงทะเบียนในรายการนี้"
                        : "สีของคุณยังไม่มีสมาชิกลงทะเบียนในรายการนี้"
                      : ""}
                    {is_notenough &&
                      `ยังมีสมาชิกไม่ครบตามจำนวนขั้นต่ำ (${min} คน)`}
                  </span>
                </p>
              )}
            </>
          )}
        </div>
        {/* Regis Section */}
        <div
          id="comp_regis_section"
          className="w-full flex items-center justify-center py-4 shrink-0"
        >
          <button
            style={
              regis_available
                ? { backgroundColor: colorInfo?.hex ?? "#000" }
                : {}
            }
            disabled={!regis_available}
            onClick={() => register()}
            className={`rounded-full text-xl px-8 py-2 font-bold text-white ${
              regis_available
                ? ` cursor-pointer transition-all duration-200 hover:shadow-md shadow-black/20 hover:scale-105`
                : is_regis
                ? `bg-teal-800`
                : `bg-gray-600`
            }`}
          >
            {regis_available ? (
              <>
                ลงทะเบียน{" "}
                <span className="font-normal text-lg">{`<${
                  team_type === "duo" ? name + " ทีมที่ " + activeTeamNo : name
                }>`}</span>
              </>
            ) : is_regis ? (
              <>
                คุณลงทะเบียนแล้ว{" "}
                <span className="font-normal text-lg">{`${
                  team_type === "duo" ? `<ทีมที่ ${student_team_no}>` : ""
                }`}</span>
              </>
            ) : is_full ? (
              "ทีมนี้มีสมาชิกครบแล้ว"
            ) : (
              "โอ๊ะโอ เจอบั๊กเข้าแล้ว"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
