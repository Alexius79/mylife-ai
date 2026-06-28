type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <main className="h-dvh overflow-hidden bg-black text-white">
      <div className="relative mx-auto h-dvh max-w-[430px] overflow-hidden bg-gradient-to-b from-[#030806] via-[#07110d] to-black">
        {children}
      </div>
    </main>
  );
}