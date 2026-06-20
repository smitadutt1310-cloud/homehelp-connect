"use client";

import { useState } from "react";
import {
  BilingualButtonText,
  BilingualHelperText,
  BilingualInline,
  BilingualLabel,
  BilingualLegend,
  bilingualPlaceholder,
} from "../components/bilingual-text";

const inputClassName =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#00BFFF] focus:outline-none focus:ring-2 focus:ring-[#00BFFF]/30 focus:shadow-[0_0_16px_rgba(0,191,255,0.35)]";

const houseHelpTypeOptions = [
  { value: "maid", en: "Maid", ta: "வீட்டு வேலை" },
  { value: "cook", en: "Cook", ta: "சமையல்காரர்" },
  { value: "baby-care", en: "Baby Care Helper", ta: "குழந்தை பராமரிப்பு" },
  { value: "elder-care", en: "Elder Care Helper", ta: "முதியோர் பராமரிப்பு" },
] as const;

const servicesOfferedOptions = [
  { value: "sweeping-mopping", en: "Sweeping & Mopping", ta: "தூய்மை செய்தல்" },
  { value: "vessel-washing", en: "Vessel Washing", ta: "பாத்திரம் கழுவுதல்" },
  { value: "bathroom-cleaning", en: "Bathroom Cleaning", ta: "குளியலறை சுத்தம்" },
  { value: "deep-cleaning", en: "Deep Cleaning", ta: "முழு வீட்டு சுத்தம்" },
  { value: "cooking", en: "Cooking", ta: "சமையல்" },
  { value: "baby-care", en: "Baby Care", ta: "குழந்தை பராமரிப்பு" },
  { value: "elder-care", en: "Elder Care", ta: "முதியோர் பராமரிப்பு" },
] as const;

export function RegistrationForm() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [houseHelpType, setHouseHelpType] = useState("");
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);

  const selectedHouseHelpType = houseHelpTypeOptions.find(
    (option) => option.value === houseHelpType,
  );

  function handlePhoneChange(value: string) {
    setPhoneNumber(value);
    if (sameAsPhone) {
      setWhatsappNumber(value);
    }
  }

  function handleSameAsPhoneChange(checked: boolean) {
    setSameAsPhone(checked);
    if (checked) {
      setWhatsappNumber(phoneNumber);
    }
  }

  function toggleService(value: string) {
    setServicesOffered((current) =>
      current.includes(value)
        ? current.filter((service) => service !== value)
        : [...current, value],
    );
  }

  return (
    <form className="mt-8 space-y-5">
      <div>
        <BilingualLabel en="Full Name" ta="முழு பெயர்" htmlFor="full-name" />
        <input
          id="full-name"
          type="text"
          className={inputClassName}
          placeholder={bilingualPlaceholder("Enter your name")}
        />
        <BilingualHelperText ta="உங்கள் பெயரை உள்ளிடவும்" />
      </div>

      <div>
        <BilingualLabel en="Phone Number" ta="தொலைபேசி எண்" htmlFor="phone-number" />
        <input
          id="phone-number"
          type="tel"
          className={inputClassName}
          placeholder={bilingualPlaceholder("Enter phone number")}
          value={phoneNumber}
          onChange={(event) => handlePhoneChange(event.target.value)}
        />
        <BilingualHelperText ta="தொலைபேசி எண்ணை உள்ளிடவும்" />
      </div>

      <div>
        <BilingualLabel en="WhatsApp Number" ta="வாட்ஸ்அப் எண்" htmlFor="whatsapp-number" />
        <input
          id="whatsapp-number"
          type="tel"
          className={inputClassName}
          placeholder={bilingualPlaceholder("Enter WhatsApp number")}
          value={whatsappNumber}
          onChange={(event) => setWhatsappNumber(event.target.value)}
          disabled={sameAsPhone}
        />
        <BilingualHelperText ta="வாட்ஸ்அப் எண்ணை உள்ளிடவும்" />
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={sameAsPhone}
            onChange={(event) => handleSameAsPhoneChange(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]/30"
          />
          <BilingualInline en="Same as Phone Number" ta="தொலைபேசி எண்ணைப் போலவே" />
        </label>
      </div>

      <fieldset>
        <BilingualLegend en="Gender" ta="பாலினம்" />
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="gender"
              value="female"
              className="h-4 w-4 border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]/30"
            />
            <BilingualInline en="Female" ta="பெண்" />
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name="gender"
              value="male"
              className="h-4 w-4 border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]/30"
            />
            <BilingualInline en="Male" ta="ஆண்" />
          </label>
        </div>
      </fieldset>

      <div>
        <BilingualLabel en="Age" ta="வயது" htmlFor="age" />
        <input
          id="age"
          type="number"
          className={inputClassName}
          placeholder={bilingualPlaceholder("Enter your age")}
        />
        <BilingualHelperText ta="உங்கள் வயதை உள்ளிடவும்" />
      </div>

      <div>
        <BilingualLabel en="House Help Type" ta="உதவி வகை" htmlFor="house-help-type" />
        <select
          id="house-help-type"
          className={inputClassName}
          value={houseHelpType}
          onChange={(event) => setHouseHelpType(event.target.value)}
        >
          <option value="">Select House Help Type</option>
          {houseHelpTypeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.en} ({option.ta})
            </option>
          ))}
        </select>
        <BilingualHelperText
          ta={
            selectedHouseHelpType
              ? selectedHouseHelpType.ta
              : "வீட்டு உதவி வகையை தேர்ந்தெடுக்கவும்"
          }
        />
      </div>

      <fieldset>
        <BilingualLegend en="Services Offered" ta="வழங்கப்படும் சேவைகள்" />
        <div className="space-y-3">
          {servicesOfferedOptions.map((service) => (
            <label
              key={service.value}
              className="flex cursor-pointer items-start gap-2 text-sm text-slate-700"
            >
              <input
                type="checkbox"
                checked={servicesOffered.includes(service.value)}
                onChange={() => toggleService(service.value)}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]/30"
              />
              <BilingualInline en={service.en} ta={service.ta} />
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="submit"
        className="mt-2 h-12 w-full rounded-xl bg-[#00BFFF] text-base font-semibold text-white shadow-[0_4px_16px_rgba(0,191,255,0.35)] transition-all hover:bg-[#00a8e6] hover:shadow-[0_6px_20px_rgba(0,191,255,0.45)] active:scale-[0.98]"
      >
        <BilingualButtonText en="Continue" ta="தொடரவும்" />
      </button>
    </form>
  );
}
