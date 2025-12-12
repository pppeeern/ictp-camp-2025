const nav = [
  { name: "กำหนดการ", href: "/" },
  { name: "กีฬา", href: "/" },
  { name: "การแข่งขัน", href: "/" },
  { name: "อันดับ", href: "/" },
];

const sched = [
  { date: 5, month: "DEC", title: "ลงทะเบียนการแข่งขัน" },
  { date: 25, month: "DEC", title: "Zero Day Workshop" },
  { date: 5, month: "JAN", title: "RoboMission Practice" },
  // {date: 5, month: "DEC", title: "ลงทะเบียนการแข่งขัน"},
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8]">
        <div className="w-full flex justify-center pt-20">
          <div className="w-2xl h-14 flex items-center justify-center rounded-3xl bg-linear-to-b from-[#d3f0f0] to-[#8CC0C5] backdrop-blur-lg shadow-lg p-0.5 overflow-hidden">
            <div className="rounded-3xl h-full w-full px-6 flex items-center justify-around bg-linear-to-b from-[#517a7e] to-[#628e96]">
              {nav.map(({ name }, index) => (
                <div
                  key={index}
                  className="text-white text-lg text-shadow-md cursor-pointer transition-colors duration-150 hover:text-gray-200"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pt-10">
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
    </div>
  );
}
