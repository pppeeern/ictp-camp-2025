"use client";

import { useState } from "react";
import Modal from "./Modal";
import Link from "next/link";

const comp = [
  {
    name: "Zero Day Quest",
    tag: "ความปลอดภัยไซเบอร์",
    logo: "/competitions/ZDQ.png",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "13 มกราคม 2568",
    rulebook: "/rulebooks/ZDQ_Rulebook.pdf"
  },
  {
    name: "Pirate Frame",
    tag: "อนิเมชัน",
    logo: "/competitions/Pirate Frame.png",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "13 มกราคม 2568",
    rulebook: "/rulebooks/PirateFrame_Rulebook.pdf"
  },
  {
    name: "RoboMission",
    tag: "หุ่นยนต์",
    logo: "/competitions/RoboMission.png",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "14 มกราคม 2568",
    rulebook: "/rulebooks/RoboMission_Rulebook.pdf"
  },
  {
    name: "GenEn",
    tag: "วิศวกรรม",
    logo: "/competitions/GenEn.png",
    des: "รายการตอบปัญหาทางวิศวกรรมสุดเท่ของชาว ICTP ได้รับเเรงบันดาลใจจาก Genwit",
    date: "14 มกราคม 2568",
    rulebook: "/rulebooks/GenEn_Rulebook.pdf"
  },
  {
    name: "เย็นตาโฟโต้",
    tag: "ถ่ายภาพ",  
    logo: "/competitions/YentaPhoto.png",
    des: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    date: "13-14 มกราคม 2568",
    rulebook: "/rulebooks/YentaPhoto_Rulebook.pdf"
  },
];

export default function Competitions() {
  const [selectedComp, setSelectedComp] = useState<typeof comp[0] | null>(null);
  return (
    <>
      <div
        id="competitions"
        className="relative min-h-screen bg-linear-to-b from-[#1E6C74] to-[#59A0A8] flex flex-col items-center pt-25"
      >
        <img
          className="absolute z-10 w-full top-0 translate-y-[calc(-50%)] select-none pointer-events-none"
          src="/landing/cloud-cover.png"
          alt="cloud cover"
        />
        <img
          className="w-[300px] md:w-[400px] lg:w-[500px] top-1/2 translate-y-[calc(-50%-280px)] absolute -left-30 select-none pointer-events-none"
          src="/landing/cloud-l_1.png"
          alt="cloud-left"
        />
        <img
          className="w-[300px] md:w-[400px] lg:w-[500px] top-1/2 translate-y-[calc(-50%-280px)] absolute -right-30 select-none pointer-events-none"
          src="/landing/cloud-r_1.png"
          alt="cloud-right"
        />
        <div className="w-full pt-14 flex flex-col items-center justify-end">
          <div className="relative flex items-center justify-center w-full mt-5 mb-10">
            <h2 className="text-6xl font-bold -translate-y-2 z-10">
              การแข่งขัน
            </h2>
            <img
              className="absolute w-120 select-none pointer-events-none"
              src="/landing/topic-sign.webp"
              alt=""
            />
          </div>
        </div>
        <div className="w-full h-full px-15 py-10 pb-36 grid md:grid-cols-5 gap-2">
          {comp.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-between gap-8 py-8 px-6 bg-amber-100 rounded-xl cursor-pointer hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
              onClick={() => setSelectedComp(item)}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="w-full text-center text-2xl font-medium">
                  {item.name}
                </div>
                <div className="rounded-full px-6 py-1 text-[#333e4e] bg-white">
                  {item.tag}
                </div>
              </div>
              <div className="flex flex-1">
                 <img src={item.logo} alt={item.name} />
              </div>
              
              <div className="hidden">
                <div>{item.des}</div>
              </div>

              <div className="w-full flex">
                <button 
                  className="w-full rounded-full px-4 lg:px-2 py-1 bg-[#C12882] font-medium text-white shadow-black/15 group-hover:bg-[#a62270] transition-colors"
                >
                  ลงทะเบียน
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        title={selectedComp?.name || ""}
        isOpen={!!selectedComp}
        onClose={() => setSelectedComp(null)}
      >
        <div className="flex flex-col items-center gap-6 pb-4">
            {selectedComp?.logo && (
                 <img src={selectedComp.logo} alt={selectedComp.name} className="h-40 object-contain drop-shadow-lg" />
            )}
            
            <div className="space-y-4 w-full">
                <div>
                    <h3 className="text-lg font-semibold text-[#1E6C74]">รายละเอียด</h3>
                    <p className="text-gray-700 leading-relaxed indent-4">
                        {selectedComp?.des || "ไม่มีรายละเอียดเพิ่มเติม"}
                    </p>
                </div>
                
                <div className="flex gap-4 items-center">
                     <span className="font-semibold text-[#1E6C74]">วันที่แข่งขัน:</span>
                     <span className="text-gray-700">{selectedComp?.date}</span>
                </div>

                <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <h3 className="text-lg font-semibold text-[#1E6C74]">เอกสารการแข่งขัน</h3>
                    <a 
                        href={selectedComp?.rulebook || "#"} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#1E6C74]/5 hover:bg-[#1E6C74]/10 text-[#1E6C74] font-bold rounded-xl border border-[#1E6C74]/20 transition-all group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        ดาวน์โหลด Rulebook
                    </a>
                </div>
            </div>
        </div>
      </Modal>
    </>
  );
}
