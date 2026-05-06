import Link from "next/link";

type Props = {
  href: string;
  label: string;
};

export default function BackButton({ href, label }: Props) {
  return (
    <Link
      href={href}
      className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-200 hover:text-red-700"
    >
      ← {label}
    </Link>
  );
}