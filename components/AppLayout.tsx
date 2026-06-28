type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="h-dvh overflow-hidden bg-black text-white">
      <div
        className="relative mx-auto h-dvh max-w-[430px] overflow-hidden bg-[#020607]"
        style={{
          backgroundImage: "url('/brain-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 h-full">{children}</div>
      </div>
    </main>
  );
}