import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import MoodSelector from "@/components/MoodSelector";
import VoiceButton from "@/components/VoiceButton";

export default function Home() {
  return (
    <AppLayout>
      <Header />

      <section className="relative h-full px-7 pb-[104px] pt-[96px]">

        {/* Überschrift */}
        <div className="absolute left-7 right-7 top-[76px]">
          <h1 className="text-[20px] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Hallo <span className="text-emerald-400">Alex</span>,
            <br />
            was hast du auf dem Herzen?
          </h1>

          <p className="mt-2 text-[12px] leading-snug text-zinc-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Dein Raum. Deine Gedanken. Deine Entwicklung.
          </p>
        </div>

        {/* Voice Button */}
        <div className="absolute left-7 right-7 top-[62%] -translate-y-1/2">
          <VoiceButton />
        </div>

        {/* Stimmung */}
        <div className="absolute left-7 right-7 bottom-[178px]">
          <MoodSelector />
        </div>

      </section>

      <BottomNavigation active="start" />
    </AppLayout>
  );
}