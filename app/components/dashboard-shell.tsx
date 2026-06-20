import Link from "next/link";
import { BilingualLinkText, BilingualStack, tamilTextClass } from "./bilingual-text";

export const neonBorder =
  "border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.25)]";
export const neonButton =
  "rounded-xl border-2 border-cyan-400 bg-white px-6 py-3.5 text-sm font-semibold text-cyan-600 shadow-[0_0_16px_rgba(34,211,238,0.2)] transition-all hover:bg-cyan-50 hover:shadow-[0_0_24px_rgba(34,211,238,0.4)] active:scale-[0.98]";

type DashboardShellProps = {
  title: string;
  titleTamil: string;
  description: string;
  descriptionTamil: string;
  placeholder: string;
  placeholderTamil: string;
};

export function DashboardShell({
  title,
  titleTamil,
  description,
  descriptionTamil,
  placeholder,
  placeholderTamil,
}: DashboardShellProps) {
  return (
    <div className="flex min-h-full flex-col bg-white font-sans text-slate-900">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-5 py-12 sm:px-8 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-medium text-slate-400 transition-colors hover:text-cyan-500"
        >
          <BilingualLinkText en="← Back to Home" ta="முகப்புக்கு திரும்பு" />
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <BilingualStack en={title} ta={titleTamil} className="block" />
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            {description}
            <span className={`mt-1 block ${tamilTextClass}`}>({descriptionTamil})</span>
          </p>
        </header>

        <article
          className={`rounded-2xl bg-white p-6 sm:p-8 ${neonBorder}`}
        >
          <p className="text-sm leading-relaxed text-slate-500 sm:text-base">
            {placeholder}
            <span className={`mt-2 block ${tamilTextClass}`}>({placeholderTamil})</span>
          </p>
        </article>
      </main>
    </div>
  );
}
