import Link from "next/link";
import { MicIcon } from "@/components/icons";

export default function VoiceButton() {
  return (
    <Link
      href="/new-entry"
      className="mt-5 flex w-full items-center gap-5 rounded-[28px] border border-emerald-300/80 bg-emerald-500/12 px-6 py-4 shadow-[0_0_24px_rgba(52,211,153,0.28)]"
    >
      <MicIcon className="h-9 w-9 shrink-0 text-white" />

      <div className="text-left">
        <div className="text-[24px] font-bold leading-none">Ich höre zu</div>
        <div className="mt-2 text-[14px] text-zinc-200">
          Erzähle, was du auf dem Herzen hast.
        </div>
      </div>
    </Link>
  );
}