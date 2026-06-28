import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import MoodSelector from "@/components/MoodSelector";
import VoiceButton from "@/components/VoiceButton";

export default function Home() {
  return (
    <AppLayout>
      <Header />

      <section className="flex h-full flex-col justify-end px-7 pb-[104px] pt-[88px]">
        <div className="mb-5">
          <h1 className="text-[24px] font-semibold leading-tight tracking-tight text-white">
            Hallo <span className="text-emerald-400">Alex</span>,
            <br />
            was hast du auf dem Herzen?
          </h1>

          <p className="mt-2 text-[12px] leading-snug text-zinc-300">
            Dein Raum. Deine Gedanken. Deine Entwicklung.
          </p>
        </div>

        <div className="space-y-4">
          <VoiceButton />
          <MoodSelector />
        </div>
      </section>

      <BottomNavigation active="start" />
    </AppLayout>
  );
}