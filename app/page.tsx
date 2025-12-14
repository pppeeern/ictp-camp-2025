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

const sports = [{ name: "ฟุตบอลประเพณี" }, { name: "แชร์บอลทางน้ำ" }];

const comp = [
  {
    name: "Zero Day Quest (ZDQ)",
    tag: "ความปลอดภัยไซเบอร์",
    des: "",
    date: "13 มกราคม 2568",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8]">
        <div className="w-full flex justify-between items-center gap-4 px-5 md:px-10 lg:px-15 pt-15 lg:pt-20">
          <img
            className="w-12"
            src="https://www.bj.ac.th/web/assets/images/BJ_LOGO_RE_2563_ENG.png"
            alt="BJ Logo"
          />
          {/* <div className="w-2xl h-14 flex items-center justify-center rounded-3xl bg-linear-to-b from-[#d3f0f0] to-[#8CC0C5] backdrop-blur-lg shadow-lg p-0.5 overflow-hidden">
            <div className="rounded-3xl h-full w-full px-6 flex items-center justify-around bg-linear-to-b from-[#517a7e] to-[#628e96]">
              {nav.map(({ name }, index) => (
                <div
                  key={index}
                  className="text-white text-lg text-shadow-md cursor-pointer transition-colors duration-150 hover:text-gray-300"
                >
                  {name}
                </div>
              ))}
            </div>
          </div> */}
          <div className="w-2xl h-14 rounded-3xl backdrop-blur-lg md:px-4 lg:px-6 flex items-center justify-around bg-linear-to-b from-[#395c69bb] via-[#518696cc] to-[#6a9fa3] border-t border-t-white/60 border-l-2 border-l-white/40 border-r border-r-white/40 border-b border-b-white/30 shadow-lg">
            {nav.map(({ name }, index) => (
              <div
                key={index}
                className="text-white text-lg text-shadow-md cursor-pointer transition-colors duration-150 hover:text-gray-300"
              >
                {name}
              </div>
            ))}
          </div>
          <div className="relative flex flex-col items-center rounded-full w-14 aspect-square bg-linear-to-b from-[#518696] to-[#6a9fa3] border border-white/60">
            <div className="absolute bottom-0 translate-y-12 flex justify-center items-center rounded-xl h-8 w-24 bg-[#C12882] text-white text-center shadow-lg cursor-pointer animate-bounce">
              เข้าสู่ระบบ!
            </div>
          </div>
        </div>
      </div>
      {/* <div className="min-h-screen flex flex-col justify-center items-center pt-10">
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
      </div> */}
      <div className="min-h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center gap-15 pt-12">
        <div className="w-full pt-14 flex flex-col items-center justify-end">
          <div className="bg-amber-50 rounded-lg px-12 pt-4 pb-2">
            <h2 className="text-6xl font-bold">กีฬา</h2>
          </div>
        </div>
        <div className="w-5/6 md:w-3/4 lg:w-2/3 grid md:grid-cols-2 gap-15 lg:gap-25">
          {sports.map(({ name }, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center py-15 px-10 bg-amber-100 aspect-square"
            >
              <div className="w-full text-center text-4xl font-medium">
                {name}
              </div>
              <button className="absolute bottom-0 translate-y-4 flex justify-center items-center rounded-2xl bg-[#C12882] text-white text-center text-2xl px-6 py-1.5 shadow-lg cursor-pointer transition-transform duration-200 hover:translate-y-3.5">
                ทายผล
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center pt-12">
        <div className="w-full pt-14 flex flex-col items-center justify-end">
          <div className="bg-amber-50 rounded-lg px-12 pt-4 pb-2">
            <h2 className="text-6xl font-bold">การแข่งขัน</h2>
          </div>
        </div>
        <div className="w-full h-full px-15 py-10 pb-36 grid md:grid-cols-5 gap-2">
          {comp.map(({ name, tag, des, date }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-8 py-8 px-6 bg-amber-100 rounded-xl"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-full text-center text-2xl font-medium">
                  {name}
                </div>
                <div className="rounded-full px-6 py-1 text-white bg-[#10203A]">
                  {tag}
                </div>
              </div>
              <div className="flex flex-1"></div>
              <div className="flex flex-col items-center gap-2">
                <div>{des}</div>
                <div className="flex gap-4">
                  <span>📅</span>
                  <span>{date}</span>
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-2">
                <button className="rounded-full px-4 py-1 bg-[#f8f0f7] font-medium cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/5">
                  รายละเอียด
                </button>
                <button className="rounded-full px-4 py-1 bg-[#C12882] font-medium text-white cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/15">
                  ลงทะเบียน
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
