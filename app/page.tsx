import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import MoodSelector from "@/components/MoodSelector";
import VoiceButton from "@/components/VoiceButton";

export default function Home() {
  return (
    <AppLayout>
      <Header />

      <section className="flex h-full flex-col justify-between px-7 pb-[104px] pt-[96px]">
        <div>
          <h1 className="text-[30px] font-bold leading-tight tracking-tight">
            Hallo <span className="text-emerald-400">Alex</span>,
            <br />
            wie geht es dir heute?
          </h1>

          <p className="mt-3 text-[15px] leading-snug text-zinc-300">
            Dein Raum. Deine Gedanken. Deine Entwicklung.
          </p>
        </div>

        <div className="space-y-5">
          <VoiceButton />
          <MoodSelector />
        </div>
      </section>

      <BottomNavigation active="start" />
    </AppLayout>
  );
}