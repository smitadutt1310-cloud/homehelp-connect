import type { Metadata } from "next";
import { Suspense } from "react";
import { BilingualStack, tamilTextClass } from "../components/bilingual-text";
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
  title: "House Help Registration (வீட்டு உதவி பதிவு) | HomeHelp Connect",
};

export default function WorkerRegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-8 font-sans text-slate-900 sm:px-6">
      <article className="w-full max-w-[520px] rounded-[20px] border-2 border-[#00BFFF] bg-white p-8 shadow-[0_8px_32px_rgba(0,191,255,0.18)]">
        <header className="text-center">
          <span className="text-5xl" aria-hidden="true">
            👩
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            <BilingualStack
              en="House Help Registration"
              ta="வீட்டு உதவி பதிவு"
              className="block"
              tamilClassName={`mt-1 block ${tamilTextClass}`}
            />
          </h1>
          <p className="mt-2 text-base text-slate-500">
            Create your house help profile
            <span className={`mt-1 block ${tamilTextClass}`}>
              (உங்கள் வீட்டு உதவி சுயவிவரத்தை உருவாக்கவும்)
            </span>
          </p>
        </header>

        <Suspense fallback={<p className="mt-8 text-center text-sm text-slate-500">Loading form...</p>}>
          <RegistrationForm />
        </Suspense>
      </article>
    </main>
  );
}
