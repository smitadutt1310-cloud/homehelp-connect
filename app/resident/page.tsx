import type { Metadata } from "next";
import Link from "next/link";

import { HelperList } from "../components/helper-list";
import { BilingualBodyText, BilingualLinkText, BilingualStack, tamilTextClass } from "../components/bilingual-text";
import { neonBorder } from "../components/dashboard-shell";
import type { HouseHelperProfile } from "@/lib/house-helper-types";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const metadata: Metadata = {
  title: "Resident Dashboard (குடியிருப்பாளர் டாஷ்போர்டு) | HomeHelp Connect",
};

export const dynamic = "force-dynamic";

async function fetchHouseHelpers(): Promise<{
  profiles: HouseHelperProfile[];
  errorMessage: string | null;
}> {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return {
      profiles: [],
      errorMessage:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    };
  }

  const { data, error } = await supabase
    .from("house_helper_profiles")
    .select("*")
    .eq("looking_for_work", true)
    .order("created_at", { ascending: false });

  if (error) {
    return {
      profiles: [],
      errorMessage: error.message,
    };
  }

  return {
    profiles: (data ?? []) as HouseHelperProfile[],
    errorMessage: null,
  };
}

export default async function ResidentPage() {
  const { profiles, errorMessage } = await fetchHouseHelpers();

  return (
    <div className="flex min-h-full flex-col bg-white font-sans text-slate-900">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-12 sm:px-8 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-medium text-slate-400 transition-colors hover:text-cyan-500"
        >
          <BilingualLinkText en="← Back to Home" ta="முகப்புக்கு திரும்பு" />
        </Link>

        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            <BilingualStack
              en="Find House Help"
              ta="வீட்டு உதவியை தேடுங்கள்"
              className="block"
            />
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            Browse available household helpers in your area.
            <span className={`mt-1 block ${tamilTextClass}`}>
              (உங்கள் பகுதியில் கிடைக்கும் வீட்டு உதவியாளர்களை உலாவுங்கள்.)
            </span>
          </p>
        </header>

        {errorMessage ? (
          <article className={`rounded-2xl bg-white p-6 sm:p-8 ${neonBorder}`}>
            <p className="text-sm font-medium text-red-600">Unable to load house helpers</p>
            <p className="mt-2 text-sm text-slate-500">{errorMessage}</p>
          </article>
        ) : profiles.length === 0 ? (
          <article className={`rounded-2xl bg-white p-6 sm:p-8 ${neonBorder}`}>
            <BilingualBodyText
              en="No house helps are available right now. Check back after helpers register in your community."
              ta="தற்போது வீட்டு உதவியாளர்கள் யாரும் கிடைக்கவில்லை. உங்கள் சமூகத்தில் பதிவு செய்த பிறகு மீண்டும் பார்க்கவும்."
            />
          </article>
        ) : (
          <HelperList profiles={profiles} />
        )}
      </main>
    </div>
  );
}
