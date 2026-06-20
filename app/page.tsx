import Link from "next/link";
import {
  BilingualButtonText,
  BilingualHeading,
  BilingualParagraph,
  BilingualStack,
  tamilTextClass,
} from "./components/bilingual-text";
import { neonBorder, neonButton } from "./components/dashboard-shell";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white font-sans text-slate-900">
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-10 text-center sm:mb-14">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            HomeHelp Connect
          </h1>
          <p className="mt-3 text-lg text-slate-500 sm:text-xl">
            Find Help. Find Work.
            <span className={`mt-1 block ${tamilTextClass}`}>
              (உதவியை கண்டுபிடிக்கவும். வேலையை கண்டுபிடிக்கவும்.)
            </span>
          </p>
        </header>

        <div className="flex w-full flex-col gap-6 md:flex-row md:gap-8">
          <article
            className={`flex flex-1 flex-col rounded-2xl bg-white p-6 sm:p-8 ${neonBorder}`}
          >
            <span className="text-4xl" aria-hidden="true">
              🏠
            </span>
            <BilingualHeading
              as="h2"
              en="Find House Help"
              ta="வீட்டு உதவியை தேடுங்கள்"
              className="mt-4"
              englishClassName="text-xl font-semibold text-slate-900 sm:text-2xl"
            />
            <BilingualParagraph
              en="Search available household helpers"
              ta="கிடைக்கும் வீட்டு உதவியாளர்களை தேடுங்கள்"
              className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 sm:text-base"
            />
            <Link href="/resident" className={`mt-8 block w-full text-center ${neonButton}`}>
              <BilingualButtonText en="Continue as Resident" ta="குடியிருப்பாளராக தொடரவும்" />
            </Link>
          </article>

          <article
            className={`flex flex-1 flex-col rounded-2xl bg-white p-6 sm:p-8 ${neonBorder}`}
          >
            <span className="text-4xl" aria-hidden="true">
              👩
            </span>
            <BilingualHeading
              as="h2"
              en="Find Work"
              ta="வேலையை தேடுங்கள்"
              className="mt-4"
              englishClassName="text-xl font-semibold text-slate-900 sm:text-2xl"
            />
            <BilingualParagraph
              en="Register as House Help"
              ta="வீட்டு உதவியாக பதிவு செய்யுங்கள்"
              className="mt-2 flex-1 text-sm leading-relaxed text-slate-500 sm:text-base"
            />
            <Link href="/worker" className={`mt-8 block w-full text-center ${neonButton}`}>
              <BilingualButtonText en="Register as House Help" ta="வீட்டு உதவியாக பதிவு செய்யுங்கள்" />
            </Link>
          </article>
        </div>
      </main>

      <footer className="border-t border-cyan-100 py-6 text-center">
        <Link
          href="/admin"
          className="text-sm font-medium text-slate-400 transition-colors hover:text-cyan-500"
        >
          <BilingualStack en="Admin Login" ta="நிர்வாகி உள்நுழைவு" className="inline-block" />
        </Link>
      </footer>
    </div>
  );
}
