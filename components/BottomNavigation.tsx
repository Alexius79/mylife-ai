import Link from "next/link";
import { HeartIcon, HomeIcon, UserIcon } from "./icons";

type BottomNavigationProps = {
  active: "start" | "mylife" | "profil";
};

export default function BottomNavigation({ active }: BottomNavigationProps) {
  const activeClass = "text-emerald-400";
  const inactiveClass = "text-white";

  return (
    <nav className="fixed bottom-0 left-1/2 z-30 grid h-[92px] w-full max-w-[430px] -translate-x-1/2 grid-cols-3 items-center bg-black/60 px-8 pb-4 backdrop-blur-xl">
      <Link
        href="/"
        className={`flex flex-col items-center justify-center ${
          active === "start" ? activeClass : inactiveClass
        }`}
      >
        <HomeIcon className="h-7 w-7" />
        <div className="mt-1 text-[13px] font-semibold">Start</div>
      </Link>

      <Link
        href="/mylife"
        className={`flex flex-col items-center justify-center ${
          active === "mylife" ? activeClass : inactiveClass
        }`}
      >
        <HeartIcon className="h-7 w-7" />
        <div className="mt-1 text-[13px] font-semibold">My Life</div>
      </Link>

      <Link
        href="/profil"
        className={`flex flex-col items-center justify-center ${
          active === "profil" ? activeClass : inactiveClass
        }`}
      >
        <UserIcon className="h-7 w-7" />
        <div className="mt-1 text-[13px] font-semibold">Profil</div>
      </Link>
    </nav>
  );
}