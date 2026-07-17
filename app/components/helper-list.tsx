"use client";

import { useState } from "react";

import {
  getPrimarySkillLabel,
  getYearsOfExperienceLabel,
} from "@/lib/helper-labels";
import type { HouseHelperProfile } from "@/lib/house-helper-types";
import { HelperCard } from "./helper-card";
import { BilingualInline, tamilTextClass } from "./bilingual-text";
import { neonBorder } from "./dashboard-shell";

type HelperListProps = {
  profiles: HouseHelperProfile[];
};

export function HelperList({ profiles }: HelperListProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProfile = profiles.find((profile) => profile.id === selectedId) ?? null;

  function handleRowClick(profileId: string) {
    setSelectedId((current) => (current === profileId ? null : profileId));
  }

  return (
    <section className="space-y-6">
      <p className="text-sm text-slate-500">
        {profiles.length} helper{profiles.length === 1 ? "" : "s"} available. Click a row to
        view full details.
        <span className={`mt-1 block ${tamilTextClass}`}>
          (முழு விவரங்களுக்கு வரிசையை கிளிக் செய்யுங்கள்.)
        </span>
      </p>

      <div className={`overflow-hidden rounded-2xl bg-white ${neonBorder}`}>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80">
                <th className="px-4 py-3 font-semibold text-slate-700">
                  <BilingualInline en="Name" ta="பெயர்" />
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  <BilingualInline en="Primary Skill" ta="முதன்மை திறன்" />
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  <BilingualInline en="Experience" ta="அனுபவம்" />
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  <BilingualInline en="Location" ta="இடம்" />
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  <BilingualInline en="Phone" ta="தொலைபேசி" />
                </th>
                <th className="px-4 py-3 font-semibold text-slate-700">
                  <BilingualInline en="Status" ta="நிலை" />
                </th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((profile) => {
                const isSelected = selectedId === profile.id;

                return (
                  <tr
                    key={profile.id}
                    onClick={() => handleRowClick(profile.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        handleRowClick(profile.id);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={isSelected}
                    aria-label={`View details for ${profile.full_name}`}
                    className={`cursor-pointer border-b border-slate-100 transition-colors last:border-b-0 hover:bg-cyan-50/60 focus:bg-cyan-50/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-300 ${
                      isSelected ? "bg-cyan-50" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium text-slate-900">{profile.full_name}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {getPrimarySkillLabel(profile.primary_skill)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {getYearsOfExperienceLabel(profile.years_of_experience)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      <span className="block">{profile.area}</span>
                      <span className="block text-xs text-slate-500">{profile.community}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{profile.phone}</td>
                    <td className="px-4 py-3">
                      {profile.looking_for_work ? (
                        <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-500">
                          Unavailable
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProfile ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700">
              Details for {selectedProfile.full_name}
            </p>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Close
            </button>
          </div>
          <HelperCard profile={selectedProfile} />
        </div>
      ) : null}
    </section>
  );
}
