import Navigation from "./components/Navigation";

const sched = [
  { date: 5, month: "DEC", title: "ลงทะเบียนการแข่งขัน" },
  { date: 25, month: "DEC", title: "Zero Day Workshop" },
  { date: 5, month: "JAN", title: "RoboMission Practice" },
  // {date: 5, month: "DEC", title: "ลงทะเบียนการแข่งขัน"},
];

const sports = [{ name: "ฟุตบอลประเพณี" }, { name: "แชร์บอลทางน้ำ" }];

const comp = [
  {
    name: "Zero Day Quest",
    tag: "ความปลอดภัยไซเบอร์",
    logo: "/competitions/ZDQ.png",
    des: "",
    date: "13 มกราคม 2568",
  },
  {
    name: "Pirate Frame",
    tag: "อนิเมชัน",
    logo: "/competitions/Pirate Frame.png",
    des: "",
    date: "13 มกราคม 2568",
  },
  {
    name: "RoboMission",
    tag: "หุ่นยนต์",
    logo: "/competitions/",
    des: "",
    date: "13 มกราคม 2568",
  },
  {
    name: "GenEn",
    tag: "วิศวกรรม",
    logo: "/competitions/GenEn.png",
    des: "",
    date: "13 มกราคม 2568",
  },
  {
    name: "เย็นตาโฟโต้",
    tag: "ถ่ายภาพ",
    logo: "/competitions/",
    des: "",
    date: "13 มกราคม 2568",
  },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Navigation />
      <div
        id="landing"
        className="relative flex flex-col items-center justify-center h-screen"
      >
        <div className="z-20 mt-45 size-100 md:size-140 xl:mt-50 xl:size-160 2xl:mt-60 2xl:size-180">
          <img
            draggable="false"
            src="/landing/camp-logo_1.webp"
            alt="camp-logo"
          />
        </div>
        <img
          className="w-[350px] md:w-[450px] lg:w-[650px] top-1/2 translate-y-[calc(-50%-260px)] absolute -left-30"
          src="/landing/cloud-l.webp"
          alt="cloud-left"
        />
        <img
          className="w-[350px] md:w-[450px] lg:w-[650px] top-1/2 translate-y-[calc(-50%-260px)] absolute -right-30"
          src="/landing/cloud-r.webp"
          alt="cloud-right"
        />
        <img
          className="w-[350px] md:w-[450px] lg:w-[650px] top-1/2 translate-y-[calc(50%-50px)] md:translate-y-[calc(50%-200px)] lg:translate-y-[calc(50%-400px)] absolute -left-20 md:-left-25"
          src="/landing/rock-l.webp"
          alt="rock-left"
        />
        <img
          className="w-[350px] md:w-[450px] lg:w-[600px] top-1/2 translate-y-[calc(50%-50px)] md:translate-y-[calc(50%-150px)] lg:translate-y-[calc(50%-350px)] absolute -right-20 md:-right-25"
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
      <div
        id="sports"
        className="min-h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center gap-15 pt-12 hidden"
      >
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
      <div
        id="competitions"
        className="relative min-h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center pt-25"
      >
        <img
          className="absolute z-10 w-full top-0 translate-y-[calc(-50%)]"
          src="/landing/cloud-cover.png"
          alt="cloud cover"
        />
        <img
          className="w-[300px] md:w-[400px] lg:w-[500px] top-1/2 translate-y-[calc(-50%-280px)] absolute -left-30"
          src="/landing/cloud-l_1.png"
          alt="cloud-left"
        />
        <img
          className="w-[300px] md:w-[400px] lg:w-[500px] top-1/2 translate-y-[calc(-50%-280px)] absolute -right-30"
          src="/landing/cloud-r_1.png"
          alt="cloud-right"
        />
        <div className="w-full pt-14 flex flex-col items-center justify-end">
          <div className="relative flex items-center justify-center w-full mt-5 mb-10">
            <h2 className="text-6xl font-bold -translate-y-2 z-10">
              การแข่งขัน
            </h2>
            <img
              className="absolute w-120"
              src="/landing/topic-sign.webp"
              alt=""
            />
          </div>
        </div>
        <div className="w-full h-full px-15 py-10 pb-36 grid md:grid-cols-5 gap-2">
          {comp.map(({ name, tag, logo, des }, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-8 py-8 px-6 bg-amber-100 rounded-xl"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-full text-center text-2xl font-medium">
                  {name}
                </div>
                <div className="rounded-full px-6 py-1 text-[#333e4e] bg-white">
                  {tag}
                </div>
              </div>
              <div className="flex flex-1">
                <img src={logo} alt={name} />
              </div>
              <div className="flex flex-col items-center gap-2">
                <div>{des}</div>
              </div>
              <div className="w-full flex">
                {/* <button className="rounded-full px-4 lg:px-2 py-1 bg-[#f8f0f7] font-medium cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/5">
                  รายละเอียด
                </button> */}
                <button className="w-full rounded-full px-4 lg:px-2 py-1 bg-[#C12882] font-medium text-white cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/15">
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
