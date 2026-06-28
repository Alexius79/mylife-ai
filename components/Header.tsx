import Link from "next/link";
import { ProfileIcon, LogoIcon } from "@/components/icons";

type HeaderProps = {
  subtitle?: string;
};

export default function Header({ subtitle }: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/5 bg-black/45 px-7 pb-5 pt-10 backdrop-blur-2xl">
      <div className="flex items-start justify-between">
        <Link href="/" className="flex items-center gap-3">
          <LogoIcon className="h-8 w-8 text-emerald-400" />

          <div>
            <div className="text-[28px] font-bold leading-none tracking-tight text-white">
              MyLife <span className="text-emerald-400">AI</span>
            </div>

            {subtitle && (
              <p className="mt-2 max-w-[250px] text-[11px] leading-snug text-zinc-300">
                {subtitle}
              </p>
            )}
          </div>
        </Link>

        <Link
          href="/profile"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-emerald-400/80 bg-black/30 text-emerald-300 backdrop-blur-xl transition-all duration-300 hover:bg-black/40"
        >
          <ProfileIcon className="h-7 w-7" />
        </Link>
      </div>
    </header>
  );
}