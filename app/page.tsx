import AppLayout from "@/components/AppLayout";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import MoodSelector from "@/components/MoodSelector";
import VoiceButton from "@/components/VoiceButton";

export default function Home() {
  return (
    <AppLayout variant="home">
      <Header />

      <section className="grid h-full grid-rows-[27%_35%_38%] px-7 pb-[118px] pt-[96px]">
        <div className="flex flex-col justify-start pt-2">
          <h1 className="text-[20px] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            <span className="typing-line typing-line-1">
              Hallo <span className="text-emerald-400">Alex</span>,
            </span>
            <br />
            <span className="typing-line typing-line-2">
              was hast du auf dem Herzen?
            </span>
          </h1>

          <p className="mt-2 animate-[fadeIn_0.8s_ease-out_1.8s_both] text-[12px] leading-snug text-zinc-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            Dein Raum. Deine Gedanken. Deine Entwicklung.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <VoiceButton />
        </div>

        <div className="flex items-start justify-center pt-1">
          <MoodSelector />
        </div>
      </section>

      <BottomNavigation active="start" />

      <style>{`
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .typing-line {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          vertical-align: bottom;
          width: 0;
        }

        .typing-line-1 {
          animation: typing 0.85s steps(12, end) forwards;
        }

        .typing-line-2 {
          animation: typing 1.25s steps(28, end) 0.85s forwards;
        }
      `}</style>
    </AppLayout>
  );
}