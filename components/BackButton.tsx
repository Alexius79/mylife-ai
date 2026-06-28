import Link from "next/link";
import { ArrowLeftIcon } from "@/components/icons";

type BackButtonProps = {
  href: string;
  label?: string;
};

export default function BackButton({ href, label = "Zurück" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"
    >
      <ArrowLeftIcon className="h-5 w-5" />
      {label}
    </Link>
  );
}