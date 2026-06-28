import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import MoodSelector from "@/components/MoodSelector";
import VoiceButton from "@/components/VoiceButton";
import { HeartPulseIcon } from "@/components/icons";

export default function Home() {
  return (
    <AppLayout>
      <Header />

      <section className="h-full overflow-y-auto px-7 pb-[120px] pt-[96px]">
        <h1 className="text-[33px] font-bold leading-[1.16] tracking-tight">
          Hallo <span className="text-emerald-400">Alex</span>, was hast du
          <br />
          auf dem Herzen?
        </h1>

        <p className="mt-3 text-[16px] leading-snug text-zinc-300">
          Dein Raum. Deine Gedanken. Deine Entwicklung.
        </p>

        <div className="relative mt-6 flex h-[220px] items-center justify-center overflow-hidden">
          <div className="absolute h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute h-px w-[150%] bg-emerald-400/80 shadow-[0_0_24px_rgba(52,211,153,0.9)]" />
          <div className="absolute bottom-8 h-24 w-64 rounded-[100%] border border-emerald-400/20" />
          <div className="absolute bottom-11 h-16 w-44 rounded-[100%] border border-emerald-400/20" />

          <HeartPulseIcon className="relative h-44 w-44 text-emerald-400 drop-shadow-[0_0_24px_rgba(52,211,153,1)]" />
        </div>

        <VoiceButton />
        <MoodSelector />
      </section>

      <BottomNavigation active="start" />
    </AppLayout>
  );
}