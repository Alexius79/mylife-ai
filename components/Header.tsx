import { HeartPulseIcon, UserIcon } from "./icons";

export default function Header() {
  return (
    <header className="fixed left-1/2 top-0 z-30 flex h-[82px] w-full max-w-[430px] -translate-x-1/2 items-center justify-between bg-black/55 px-7 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <HeartPulseIcon className="h-9 w-9 text-emerald-400" />
        <div className="text-[26px] font-bold tracking-tight">
          MyLife <span className="text-emerald-400">AI</span>
        </div>
      </div>

      <button className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-400/80 text-emerald-300">
        <UserIcon className="h-6 w-6" />
      </button>
    </header>
  );
}