import Link from "next/link";
import { MicIcon } from "@/components/icons";

export default function VoiceButton() {
  return (
    <Link
      href="/new-entry"
      className="mx-auto flex w-full max-w-[340px] animate-[voiceIn_0.75s_ease-out_2.1s_both] items-center justify-center gap-4 rounded-[24px] border border-emerald-300/80 bg-black/45 px-5 py-4 shadow-[0_0_22px_rgba(52,211,153,0.22)] backdrop-blur-[2px]"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-400 shadow-[0_0_22px_rgba(52,211,153,0.45)]">
        <MicIcon className="h-6 w-6 text-white" />
      </div>

      <div className="text-left">
        <div className="text-[18px] font-semibold leading-none text-white">
          Ich höre zu
        </div>
        <div className="mt-1.5 text-[12px] leading-snug text-zinc-100">
          Erzähle, was du auf dem Herzen hast.
        </div>
      </div>

      <style>{`
        @keyframes voiceIn {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </Link>
  );
}