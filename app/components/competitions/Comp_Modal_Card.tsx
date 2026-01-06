export default function CompModalCard({
  name,
  logo,
  des_title,
  button_text,
  children,
  onSwitch,
}: {
  name: string;
  logo: string;
  des_title: string;
  button_text: string;
  children: React.ReactNode;
  onSwitch: () => void;
}) {
  return (
    <div className="h-full min-h-0 flex flex-col items-center justify-between py-10 bg-gray-900 rounded-l-xl rounded-r-3xl">
      <div className="flex flex-1 min-h-0 flex-col gap-2 items-center">
        <h1 className="font-bold text-2xl xl:text-3xl 2xl:text-4xl text-white text-center">
          {name}
        </h1>
        <img
          className="w-4/5 2xl:w-full aspect-square max-w-70 mb-2"
          src={logo}
          alt={name}
        />
      </div>
      <div className="w-full min-h-0 px-4 flex flex-col md:gap-4 gap-6 justify-end items-center">
        <div className="w-9/10 p-4 rounded-lg bg-gray-700 text-white text-sm xl:text-base">
          <p className="font-semibold">{des_title}</p> {children}
        </div>
        <button
          onClick={onSwitch}
          className="w-3/4 rounded-full px-4 lg:px-2 py-1 bg-[#C12882] font-medium text-white cursor-pointer transition-shadow duration-200 hover:shadow-md shadow-black/15"
        >
          {button_text}
        </button>
      </div>
    </div>
  );
}
