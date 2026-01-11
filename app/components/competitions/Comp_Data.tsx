import { ReactElement } from "react";

export type compType = {
  name: string;
  tag: string;
  logo: string;
  des: string;
  req: ReactElement;
  min: number;
  max: number;
  team_type: "solo" | "single" | "duo";
  date: string;
  upl?: string;
  web?: string;
  rulebook?: string;
};

export const compdata: compType[] = [
  {
    name: "Zero Day Quest",
    tag: "ความปลอดภัยไซเบอร์",
    logo: "/competitions/ZDQ.png",
    des: `การแข่งขันด้านความปลอดภัยทางไซเบอร์ ในรูปแบบ CTF (Capture The Flag) ประเภท Jeopardy`,
    req: (
      <p>
        1. นักเรียนชั้นมัธยมศึกษาปีที่ 4-5 <br />
        2. ประเภททีม ทีมละ 3-5 คน สีละ 1 ทีม
      </p>
    ),
    min: 3,
    max: 5,
    team_type: "single",
    date: "13 มกราคม 2568",
    rulebook: "/competitions/rulebook/ZDQCTF_Rulebook.pdf",
    web: "https://zdqctf.lol/",
  },
  {
    name: "Pirate Frame",
    tag: "อนิเมชัน",
    logo: "/competitions/Pirate Frame.png",
    des: `การแข่งขันสร้างแอนิเมชัน 2 มิติ ในธีมโจรสลัด ตามหัวข้อที่กำหนด`,
    req: (
      <p>
        1. นักเรียนชั้นมัธยมศึกษาปีที่ 4-5 <br />
        2. ประเภททีม ทีมละ 3 คน สีละ 1 ทีม
      </p>
    ),
    min: 3,
    max: 3,
    team_type: "single",
    date: "13-14 มกราคม 2568",
    rulebook: "/competitions/rulebook/PirateFrame_Rulebook.pdf",
    upl: "https://drive.google.com/drive/folders/19vUGOO9oRHoc_0U254WWCBWIYlWH-blx?usp=sharing",
  },
  {
    name: "RoboMission",
    tag: "หุ่นยนต์",
    logo: "/competitions/RoboMission.png",
    des: `การแข่งขันหุ่นยนต์อัตโนมัติ หุ่นยนต์ PT ในสนามภารกิจ "เกาะแห่งอำพัน"`,
    req: (
      <p>
        1. นักเรียนชั้นมัธยมศึกษาปีที่ 4-5 <br />
        2. ประเภททีม ทีมละ 5 คน สีละ 1 ทีม
      </p>
    ),
    min: 5,
    max: 5,
    team_type: "duo",
    date: "14 มกราคม 2568",
    rulebook: "/competitions/rulebook/RoboMission_Rulebook.pdf",
  },
  {
    name: "GenEn",
    tag: "วิศวกรรม",
    logo: "/competitions/GenEn.png",
    des: `การแข่งขันตอบปัญหาเชิงวิศวกรรม ในรูปแบบเกมโชว์`,
    req: (
      <p>
        1. นักเรียนชั้นมัธยมศึกษาปีที่ 4-5 <br />
        2. ประเภททีม ทีมละ 4 คน สีละ 2 ทีม
      </p>
    ),
    min: 4,
    max: 4,
    team_type: "duo",
    date: "14 มกราคม 2568",
    rulebook: "/competitions/rulebook/GenEn_Rulebook.pdf",
  },
  {
    name: "เย็นตาโฟโต้",
    tag: "ถ่ายภาพ",
    logo: "/competitions/YenTaPhoto.png",
    des: `การประกวดภาพถ่าย ในหัวข้อ “บันทึกระหว่างทาง” และ “ภาพนี้คืออะไร??”`,
    req: (
      <p>
        1. นักเรียนชั้นมัธยมศึกษาปีที่ 4-6 <br />
        2. ประเภทเดี่ยว ไม่จำกัดสี
      </p>
    ),
    min: 0,
    max: 100,
    team_type: "solo",
    date: "13-14 มกราคม 2568",
    upl: "https://drive.google.com/drive/folders/1qG56fmBw9oXX5V3lP-0fG0YYKIKGdmKz?usp=sharing",
  },
];
