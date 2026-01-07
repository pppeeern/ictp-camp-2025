export type StudentType = {
  student_id: number;
  name: string;
  nickname?: string;
  color?: string;
  class?: number;
};

type ColorInfo = {
  name: string;
  hex: string;
  color: string;
};

export const ColorMap: Record<string, ColorInfo> = {
  ER: { name: "เอราวัณ", hex: "#664ea7", color: "สีม่วง" },
  MY: { name: "มยุรเวนไตย", hex: "#4384f4", color: "สีน้ำเงิน" },
  BD: { name: "นาคราช", hex: "#34a953", color: "สีเขียว" },
  NK: { name: "บันฑุราชสีห์", hex: "#fbbc04", color: "สีเหลือง" },
  GL: { name: "กิเลน", hex: "#fe6d00", color: "สีส้ม" },
  KT: { name: "ครุฑา", hex: "#ea4235", color: "สีแดง" },
};
