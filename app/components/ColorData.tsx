export const ColorList = ["ER", "MY", "BD", "NK", "GL", "KT"];

type ColorInfo = {
  name: string;
  hex: string;
  shade: string;
  color: string;
};

export const ColorMap: Record<string, ColorInfo> = {
  ER: { name: "เอราวัณ", hex: "#664ea7", shade: "#5b4696", color: "สีม่วง" },
  MY: {
    name: "มยุรเวนไตย",
    hex: "#4384f4",
    shade: "#3c76db",
    color: "สีน้ำเงิน",
  },
  BD: { name: "นาคราช", hex: "#34a953", shade: "#2e984a", color: "สีเขียว" },
  NK: {
    name: "บันฑุราชสีห์",
    hex: "#fbbc04",
    shade: "#e1a903",
    color: "สีเหลือง",
  },
  GL: { name: "กิเลน", hex: "#fe6d00", shade: "#e46200", color: "สีส้ม" },
  KT: { name: "ครุฑา", hex: "#ea4235", shade: "#d23b2f", color: "สีแดง" },
};
