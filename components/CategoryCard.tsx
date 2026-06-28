import Link from "next/link";
import { ChevronRightIcon } from "@/components/icons";

type CategoryCardProps = {
  title: string;
  description: string;
  href: string;
};

export default function CategoryCard({
  title,
  description,
  href,
}: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex w-full items-center justify-between rounded-3xl bg-white/[0.06] px-5 py-4 text-left backdrop-blur-md transition hover:bg-white/[0.09]"
    >
      <div>
        <div className="text-[20px] font-bold text-white">{title}</div>
        <div className="mt-1 text-[14px] leading-snug text-zinc-300">
          {description}
        </div>
      </div>

      <ChevronRightIcon className="h-6 w-6 shrink-0 text-emerald-400" />
    </Link>
  );
}