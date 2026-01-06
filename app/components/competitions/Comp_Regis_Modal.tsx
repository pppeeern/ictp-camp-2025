"use client";
import { useState } from "react";

import { compdata } from "./Comp_Data";
import CompModalCard from "./Comp_Modal_Card";

function TeamMember({
  index,
  name,
  room,
  status1,
  status2,
}: {
  index: number;
  name: string;
  room: string;
  status1?: number;
  status2?: number;
}) {
  return (
    <>
      <div className="text-center">{index}</div>
      <div className="pl-2">{name}</div>
      <div className="text-center">{room}</div>
      {status1 && (
        <div className="text-center">{status1 == 2 ? "✅" : "❎"}</div>
      )}
      {status2 && (
        <div className="text-center">{status2 == 2 ? "✅" : "❎"}</div>
      )}
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

export default function CompRegisModal({
  comp_index,
  onSwitch,
}: {
  comp_index: number;
  onSwitch: () => void;
}) {
  const { name, tag, logo, req, min, max } = compdata[comp_index];

  // FIXED DATA ! Change later
  const members = [
    { name: "Lorem Ipsum", room: "6/6" },
    { name: "Dolor Sit Amet", room: "6/6", status1: 2, status2: 2 },
    { name: "Lorem Ipsum", room: "6/6" },
  ];
  const mem_amount = members.length;
  const mem_rows = Array.from({ length: max }, (_, i) => members[i] ?? null);
  const teams =
    comp_index === 3
      ? [
          { id: 1, name: "ทีมที่ 1", members: mem_rows },
          { id: 2, name: "ทีมที่ 2", members: mem_rows },
        ]
      : [{ id: 1, name: null, members: mem_rows }];
  const is_regis = true; // user's competiton registration state
  const is_empty = mem_amount === 0;
  const is_notenough = mem_amount > 0 && mem_amount < min;
  const is_full = mem_amount >= max;
  const regis_available = !is_regis && mem_amount < max;

  const [activeTeamId, setActiveTeamId] = useState(1);
  const activeTeam = teams.find((team) => team.id === activeTeamId) ?? teams[0];

  function MemberTable() {
    return comp_index != 4 ? (
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

        {activeTeam.members.map((member, index) =>
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
        )}
      </div>
    ) : (
      <div className="w-full px-4 grid grid-cols-[5%_1fr_7%_16%_16%] gap-x-5 gap-y-7">
        <div className="font-semibold text-sm text-teal-700 text-center">
          ลำดับ
        </div>
        <div className="font-semibold text-sm text-teal-700 pl-2">
          ชื่อ-นามสกุล
        </div>
        <div className="font-semibold text-sm text-teal-700 text-center">
          ห้อง
        </div>
        <div className="font-semibold text-sm text-teal-700 text-center">
          บันทึกระหว่างทาง
        </div>
        <div className="font-semibold text-sm text-teal-700 text-center">
          ภาพนี้คืออะไร??
        </div>

        {members.map((member, index) =>
          member ? (
            <TeamMember
              key={index}
              index={index + 1}
              name={member.name}
              room={member.room}
              status1={member.status1 ? member.status1 : 1}
              status2={member.status2 ? member.status2 : 1}
            ></TeamMember>
          ) : (
            <SkeletonMember key={index} index={index + 1}></SkeletonMember>
          )
        )}
      </div>
    );
  }

  return (
    <>
      <CompModalCard
        name={name}
        logo={logo}
        des_title="เงื่อนไข"
        button_text="รายละเอียด"
        onSwitch={onSwitch}
      >
        {req}
      </CompModalCard>

      <div className="h-full min-h-0 flex flex-col bg-white rounded-r-xl rounded-l-3xl">
        {/* Color Display */}
        <div
          id="user_color_display"
          className="bg-amber-100 pt-8 pb-6 px-12 flex gap-8 items-center rounded-tl-3xl rounded-tr-xl shrink-0"
        >
          {comp_index != 4 ? (
            <>
              <div className="aspect-square w-12 h-12 rounded-xl bg-red-600 rotate-45"></div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">ครุฑ</h1>
                <h3 className="text-md">สีแดง</h3>
              </div>
            </>
          ) : (
            <>
              <div className="aspect-square w-12 h-12 rounded-xl bg-red-600 rotate-45"></div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold">วชิรวิทย์ สิทธิศร</h1>
                <h3 className="text-md">#ลำดับ</h3>
              </div>
            </>
          )}
        </div>
        {/* Team Display */}
        <div
          id="team_display"
          className="px-8 py-6 w-full flex-1 overflow-y-auto"
        >
          {comp_index === 3 && (
            <div className="flex mb-4 rounded-lg overflow-clip">
              {teams.map((team) => (
                <button
                  key={team.id}
                  onClick={() => setActiveTeamId(team.id)}
                  className={`min-w-1/3 py-2 font-semibold transition-all duration-100
            ${
              activeTeamId === team.id
                ? "bg-red-800 text-white w-2/3"
                : "bg-gray-100 text-gray-600 w-1/3 cursor-pointer"
            }`}
                >
                  {team.name}
                </button>
              ))}
            </div>
          )}

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
                {is_empty && "สีของคุณยังไม่มีสมาชิกลงทะเบียนในรายการนี้"}
                {is_notenough && `ยังมีสมาชิกไม่ครบตามจำนวนขั้นต่ำ (${min} คน)`}
              </span>
            </p>
          )}
        </div>
        {/* Regis Section */}
        <div
          id="comp_regis_section"
          className="w-full flex items-center justify-center py-4 shrink-0"
        >
          <button
            className={`rounded-full text-xl px-8 py-2 font-bold text-white ${
              regis_available
                ? `bg-red-600 cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/15`
                : is_regis
                ? `bg-teal-800`
                : `bg-gray-600`
            }`}
          >
            {regis_available ? (
              <>
                ลงทะเบียน{" "}
                <span className="font-normal text-lg">
                  {`<${activeTeam.name ? name + " " + activeTeam.name : name}>`}
                </span>
              </>
            ) : is_regis ? (
              <>คุณลงทะเบียนแล้ว</>
            ) : (
              <>ทีมนี้มีสมาชิกครบแล้ว</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
