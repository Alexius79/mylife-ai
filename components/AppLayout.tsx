type AppLayoutProps = {
  children: React.ReactNode;
  variant?: "home" | "default";
};

export default function AppLayout({
  children,
  variant = "default",
}: AppLayoutProps) {
  const showDarkLayer = variant !== "home";

  return (
    <main className="h-dvh overflow-hidden bg-black text-white">
      <div
        className="relative mx-auto h-dvh max-w-[430px] overflow-hidden bg-black text-white"
        style={{
          backgroundImage: "url('/brain-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
        }}
      >
        {showDarkLayer && (
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]" />
        )}

        <div className="relative z-10 h-full">{children}</div>
      </div>
    </main>
  );
}