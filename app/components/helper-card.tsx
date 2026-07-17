import type { ReactNode } from "react";

import {
  getAvailabilitySlotLabel,
  getPrimarySkillLabel,
  getPrimarySkillTamil,
  getServiceLabel,
  getServiceTamil,
  getYearsOfExperienceLabel,
} from "@/lib/helper-labels";
import type { HouseHelperProfile } from "@/lib/house-helper-types";
import { BilingualInline, tamilTextClass } from "./bilingual-text";
import { neonBorder } from "./dashboard-shell";

type HelperCardProps = {
  profile: HouseHelperProfile;
};

function formatIndianPhoneLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 ? `+91${digits}` : `+${digits}`;
}

function DetailRow({
  labelEn,
  labelTa,
  children,
}: {
  labelEn: string;
  labelTa: string;
  children: ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        <BilingualInline en={labelEn} ta={labelTa} />
      </dt>
      <dd className="mt-1 text-sm text-slate-800">{children}</dd>
    </div>
  );
}

export function HelperCard({ profile }: HelperCardProps) {
  const phoneHref = `tel:${formatIndianPhoneLink(profile.phone)}`;
  const whatsappHref = `https://wa.me/${formatIndianPhoneLink(profile.whatsapp).replace("+", "")}`;
  const chargeEntries = Object.entries(profile.charges ?? {}).filter(
    ([, amount]) => typeof amount === "number" && amount > 0,
  );

  return (
    <article className={`rounded-2xl bg-white p-5 sm:p-6 ${neonBorder}`}>
      <header className="flex flex-col gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{profile.full_name}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {getPrimarySkillLabel(profile.primary_skill)}
            <span className={`ml-1 ${tamilTextClass}`}>
              ({getPrimarySkillTamil(profile.primary_skill)})
            </span>
          </p>
        </div>
        {profile.looking_for_work ? (
          <span className="inline-flex w-fit rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Available
          </span>
        ) : (
          <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-500">
            Not available
          </span>
        )}
      </header>

      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        <DetailRow labelEn="Experience" labelTa="அனுபவம்">
          {getYearsOfExperienceLabel(profile.years_of_experience)}
        </DetailRow>
        <DetailRow labelEn="Gender & Age" labelTa="பாலினம் & வயது">
          {profile.gender}, {profile.age} years
        </DetailRow>
        <DetailRow labelEn="Location" labelTa="இடம்">
          {profile.area}, {profile.city}
          <span className="mt-0.5 block text-slate-500">{profile.community}</span>
        </DetailRow>
        <DetailRow labelEn="Contact" labelTa="தொடர்பு">
          <div className="flex flex-wrap gap-2">
            <a
              href={phoneHref}
              className="rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-700 transition-colors hover:bg-cyan-100"
            >
              Call {profile.phone}
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              WhatsApp
            </a>
          </div>
        </DetailRow>
      </dl>

      {profile.services.length > 0 ? (
        <section className="mt-5">
          <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
            <BilingualInline en="Services" ta="சேவைகள்" />
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {profile.services.map((service) => (
              <li
                key={service}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-700"
              >
                {getServiceLabel(service)}
                <span className={`ml-1 ${tamilTextClass}`}>({getServiceTamil(service)})</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {chargeEntries.length > 0 ? (
        <section className="mt-5">
          <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
            <BilingualInline en="Charges" ta="கட்டணம்" />
          </h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {chargeEntries.map(([serviceKey, amount]) => (
              <li key={serviceKey}>
                {getServiceLabel(serviceKey)}: ₹{amount}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {profile.availability_slots.length > 0 ? (
        <section className="mt-5">
          <h3 className="text-xs font-medium uppercase tracking-wide text-slate-400">
            <BilingualInline en="Availability" ta="கிடைக்கும் நேரம்" />
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {profile.availability_slots.map((slot) => (
              <li
                key={slot}
                className="rounded-lg border border-cyan-100 bg-cyan-50/60 px-2.5 py-1 text-xs text-cyan-800"
              >
                {getAvailabilitySlotLabel(slot)}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
