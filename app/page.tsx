import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import MoodSelector from "@/components/MoodSelector";
import VoiceButton from "@/components/VoiceButton";

export default function Home() {
  return (
    <AppLayout>
      <Header />

      <section className="grid h-full grid-rows-[27%_33%_40%] px-7 pb-[118px] pt-[96px]">
        {/* Bereich 1: Überschrift oben */}
        <div className="flex flex-col justify-start pt-2">
          <h1 className="text-[20px] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Hallo <span className="text-emerald-400">Alex</span>,
            <br />
            was hast du auf dem Herzen?
          </h1>

          <p className="mt-2 text-[12px] leading-snug text-zinc-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Dein Raum. Deine Gedanken. Deine Entwicklung.
          </p>
        </div>

        {/* Bereich 2: Voice-Button mittig */}
        <div className="flex items-center justify-center">
          <VoiceButton />
        </div>

        {/* Bereich 3: Stimmung, mit Luft zur Bottom-Navigation */}
        <div className="flex items-start justify-center pt-3">
          <MoodSelector />
        </div>
      </section>

      <BottomNavigation active="start" />
    </AppLayout>
  );
}