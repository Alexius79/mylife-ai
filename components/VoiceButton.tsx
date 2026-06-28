import Link from "next/link";
import { MicIcon } from "@/components/icons";

export default function VoiceButton() {
  return (
    <Link
      href="/new-entry"
      className="mx-auto flex w-full max-w-[340px] items-center justify-center gap-4 rounded-[24px] border border-emerald-300/80 bg-black/25 px-5 py-4 shadow-[0_0_22px_rgba(52,211,153,0.22)] backdrop-blur-[2px]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-300/70 bg-emerald-400/10">
        <MicIcon className="h-6 w-6 text-white" />
      </div>

      <div className="text-left">
        <div className="text-[18px] font-semibold leading-none text-white">
          Ich höre zu
        </div>
        <div className="mt-1.5 text-[12px] leading-snug text-zinc-200">
          Erzähle, was du auf dem Herzen hast.
        </div>
      </div>
    </Link>
  );
}