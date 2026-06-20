import type { ReactNode } from "react";

export const tamilTextClass = "text-sm font-normal text-[#0F766E]";

type BilingualProps = {
  en: string;
  ta: string;
  className?: string;
};

export function bilingualInline(en: string, ta: string): string {
  return `${en} (${ta})`;
}

export function bilingualPlaceholder(en: string, _ta?: string): string {
  return en;
}

export function BilingualHelperText({ ta }: { ta: string }) {
  return <p className={`mt-1.5 text-xs leading-relaxed ${tamilTextClass}`}>({ta})</p>;
}

export function BilingualInline({ en, ta, className }: BilingualProps) {
  return (
    <span className={className}>
      {en} (<span className={tamilTextClass}>{ta}</span>)
    </span>
  );
}

export function BilingualStack({
  en,
  ta,
  className,
  tamilClassName = `mt-1 block ${tamilTextClass}`,
}: BilingualProps & { tamilClassName?: string }) {
  return (
    <span className={className}>
      {en}
      <span className={tamilClassName}>({ta})</span>
    </span>
  );
}

type BilingualLabelProps = BilingualProps & {
  htmlFor?: string;
  required?: boolean;
};

export function BilingualLabel({
  en,
  ta,
  htmlFor,
  required,
  className = "mb-2 block text-sm font-medium text-slate-700",
}: BilingualLabelProps) {
  return (
    <label htmlFor={htmlFor} className={className}>
      {en} (<span className={tamilTextClass}>{ta}</span>){required ? " *" : ""}
    </label>
  );
}

export function BilingualLegend({
  en,
  ta,
  className = "mb-2 block text-sm font-medium text-slate-700",
}: BilingualProps) {
  return (
    <legend className={className}>
      {en} (<span className={tamilTextClass}>{ta}</span>)
    </legend>
  );
}

type BilingualHeadingProps = BilingualProps & {
  as?: "h1" | "h2" | "h3";
  englishClassName?: string;
};

export function BilingualHeading({
  en,
  ta,
  as: Tag = "h1",
  className,
  englishClassName,
}: BilingualHeadingProps) {
  const headingClass =
    englishClassName ??
    (Tag === "h1"
      ? "text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
      : Tag === "h2"
        ? "text-xl font-semibold text-slate-900 sm:text-2xl"
        : "text-lg font-semibold text-slate-900");

  return (
    <Tag className={className}>
      <span className={headingClass}>{en}</span>
      <span className={`mt-1 block ${tamilTextClass}`}>({ta})</span>
    </Tag>
  );
}

export function BilingualParagraph({
  en,
  ta,
  className = "text-sm leading-relaxed text-slate-500 sm:text-base",
}: BilingualProps) {
  return (
    <p className={className}>
      {en}
      <span className={`mt-1 block ${tamilTextClass}`}>({ta})</span>
    </p>
  );
}

export function BilingualButtonText({ en, ta }: BilingualProps) {
  return (
    <>
      {en}
      <span className={`mt-0.5 block ${tamilTextClass}`}>({ta})</span>
    </>
  );
}

export function BilingualLinkText({ en, ta }: BilingualProps) {
  return (
    <>
      {en}
      <span className={`mt-0.5 block ${tamilTextClass}`}>({ta})</span>
    </>
  );
}

export function BilingualBodyText({
  en,
  ta,
  className = "text-sm leading-relaxed text-slate-500 sm:text-base",
}: BilingualProps): ReactNode {
  return (
    <p className={className}>
      {en}
      <span className={`mt-2 block ${tamilTextClass}`}>({ta})</span>
    </p>
  );
}
