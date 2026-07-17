"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase";
import { createDemoRegistrationData } from "@/lib/demo-registration-data";
import {
  BilingualButtonText,
  BilingualHelperText,
  BilingualInline,
  BilingualLabel,
  BilingualLegend,
  bilingualPlaceholder,
  tamilTextClass,
} from "../components/bilingual-text";

const TOTAL_STEPS = 3;

const wizardSteps = [
  { en: "Personal Information", ta: "தனிப்பட்ட தகவல்" },
  { en: "Work Information", ta: "வேலை தகவல்" },
  { en: "Charges & Location", ta: "கட்டணம் மற்றும் இடம்" },
] as const;

const inputClassName =
  "h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#00BFFF] focus:outline-none focus:ring-2 focus:ring-[#00BFFF]/30 focus:shadow-[0_0_16px_rgba(0,191,255,0.35)]";

const primaryButtonClassName =
  "h-12 w-full rounded-xl bg-[#00BFFF] text-base font-semibold text-white shadow-[0_4px_16px_rgba(0,191,255,0.35)] transition-all hover:bg-[#00a8e6] hover:shadow-[0_6px_20px_rgba(0,191,255,0.45)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButtonClassName =
  "h-12 w-full rounded-xl border-2 border-[#00BFFF] bg-white text-base font-semibold text-[#00BFFF] shadow-[0_0_12px_rgba(0,191,255,0.12)] transition-all hover:bg-cyan-50 active:scale-[0.98]";

const primarySkillOptions = [
  { value: "cooking", en: "Cooking", ta: "சமையல்" },
  { value: "house-cleaning", en: "House Cleaning", ta: "வீட்டு சுத்தம்" },
  { value: "baby-care", en: "Baby Care", ta: "குழந்தை பராமரிப்பு" },
  { value: "elder-care", en: "Elder Care", ta: "முதியோர் பராமரிப்பு" },
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

const yearsOfExperienceOptions = [
  { value: "fresher", en: "Fresher (0 Years)" },
  { value: "1-year", en: "1 Year" },
  { value: "2-year", en: "2 Years" },
  { value: "3-year", en: "3 Years" },
  { value: "4-year", en: "4 Years" },
  { value: "5-year", en: "5 Years" },
  { value: "6-10-years", en: "6–10 Years" },
  { value: "more-than-10-years", en: "More than 10 Years" },
] as const;

const MAX_AVAILABILITY_SLOTS = 4;

const availabilityTimeSlotGroups = [
  {
    groupEn: "Morning",
    groupTa: "காலை",
    slots: [
      { value: "8am-9am", en: "8 AM - 9 AM" },
      { value: "9am-10am", en: "9 AM - 10 AM" },
      { value: "10am-11am", en: "10 AM - 11 AM" },
      { value: "11am-12pm", en: "11 AM - 12 PM" },
    ],
  },
  {
    groupEn: "Afternoon",
    groupTa: "மதியம்",
    slots: [
      { value: "12pm-1pm", en: "12 PM - 1 PM" },
      { value: "1pm-2pm", en: "1 PM - 2 PM" },
      { value: "2pm-3pm", en: "2 PM - 3 PM" },
    ],
  },
  {
    groupEn: "Evening",
    groupTa: "மாலை",
    slots: [
      { value: "5pm-6pm", en: "5 PM - 6 PM" },
      { value: "6pm-7pm", en: "6 PM - 7 PM" },
    ],
  },
] as const;

const slotSelectedClassName =
  "border-[#00BFFF] bg-cyan-50 shadow-[0_0_16px_rgba(0,191,255,0.25)]";
const slotDisabledClassName =
  "cursor-not-allowed border-slate-100 bg-slate-50 text-slate-400 opacity-60";
const slotDefaultClassName =
  "border-slate-200 bg-white hover:border-cyan-200 hover:shadow-[0_0_12px_rgba(0,191,255,0.12)]";

const chargeFieldOptions = [
  { serviceKey: "sweeping-mopping", en: "Sweeping & Mopping", ta: "தூய்மை செய்தல்" },
  { serviceKey: "vessel-washing", en: "Vessel Washing", ta: "பாத்திரம் கழுவுதல்" },
  { serviceKey: "bathroom-cleaning", en: "Bathroom Cleaning", ta: "குளியலறை சுத்தம்" },
  { serviceKey: "cooking", en: "Cooking", ta: "சமையல்" },
  { serviceKey: "baby-care", en: "Baby Care", ta: "குழந்தை பராமரிப்பு" },
  { serviceKey: "elder-care", en: "Elder Care", ta: "முதியோர் பராமரிப்பு" },
] as const;

const chargesCardClassName =
  "rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

const REGISTRATION_DRAFT_KEY = "homehelp-connect-househelp-registration";

type RegistrationDraft = {
  step: number;
  fullName: string;
  phoneNumber: string;
  whatsappNumber: string;
  sameAsPhone: boolean;
  gender: string;
  age: string;
  primarySkill: string;
  yearsOfExperience: string;
  servicesOffered: string[];
  availabilityTimeSlots: string[];
  serviceCharges: Record<string, string>;
  city: string;
  area: string;
  apartmentCommunity: string;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isServiceCharges(value: unknown): value is Record<string, string> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((item) => typeof item === "string")
  );
}

function parseRegistrationDraft(raw: string): RegistrationDraft | null {
  try {
    const data: unknown = JSON.parse(raw);

    if (typeof data !== "object" || data === null) {
      return null;
    }

    const draft = data as Partial<RegistrationDraft>;

    if (
      typeof draft.step !== "number" ||
      draft.step < 1 ||
      draft.step > TOTAL_STEPS ||
      typeof draft.fullName !== "string" ||
      typeof draft.phoneNumber !== "string" ||
      typeof draft.whatsappNumber !== "string" ||
      typeof draft.sameAsPhone !== "boolean" ||
      typeof draft.gender !== "string" ||
      typeof draft.age !== "string" ||
      typeof draft.primarySkill !== "string" ||
      (draft.yearsOfExperience !== undefined &&
        typeof draft.yearsOfExperience !== "string") ||
      !isStringArray(draft.servicesOffered) ||
      !isStringArray(draft.availabilityTimeSlots) ||
      !isServiceCharges(draft.serviceCharges) ||
      typeof draft.city !== "string" ||
      typeof draft.area !== "string" ||
      typeof draft.apartmentCommunity !== "string"
    ) {
      return null;
    }

    return {
      step: draft.step,
      fullName: draft.fullName,
      phoneNumber: draft.phoneNumber,
      whatsappNumber: draft.whatsappNumber,
      sameAsPhone: draft.sameAsPhone,
      gender: draft.gender,
      age: draft.age,
      primarySkill: draft.primarySkill,
      yearsOfExperience:
        typeof draft.yearsOfExperience === "string" ? draft.yearsOfExperience : "",
      servicesOffered: draft.servicesOffered,
      availabilityTimeSlots: draft.availabilityTimeSlots,
      serviceCharges: draft.serviceCharges,
      city: draft.city,
      area: draft.area,
      apartmentCommunity: draft.apartmentCommunity,
    };
  } catch {
    return null;
  }
}

function clearRegistrationDraft(lastSavedDraftRef: React.MutableRefObject<string | null>) {
  localStorage.removeItem(REGISTRATION_DRAFT_KEY);
  lastSavedDraftRef.current = null;
  console.log("Registration draft cleared.");
}

function StepProgress({ currentStep }: { currentStep: number }) {
  const stepMeta = wizardSteps[currentStep - 1];

  return (
    <div className="mb-6">
      <p className="text-center text-sm font-medium text-slate-600">
        Step {currentStep} of {TOTAL_STEPS}
      </p>
      <div className="mt-4 flex items-center justify-center">
        {[1, 2, 3].map((stepNumber, index) => (
          <div key={stepNumber} className="flex items-center">
            <span
              className={`h-3 w-3 rounded-full transition-colors ${
                stepNumber <= currentStep
                  ? "bg-[#00BFFF] shadow-[0_0_8px_rgba(0,191,255,0.5)]"
                  : "border-2 border-slate-300 bg-white"
              }`}
              aria-hidden="true"
            />
            {index < 2 && (
              <span
                className={`h-0.5 w-10 transition-colors sm:w-14 ${
                  stepNumber < currentStep ? "bg-[#00BFFF]" : "bg-slate-200"
                }`}
                aria-hidden="true"
              />
            )}
          </div>
        ))}
      </div>
      <h2 className="mt-4 text-center text-lg font-semibold text-slate-900">
        {stepMeta.en}
        <span className={`mt-1 block text-sm font-normal ${tamilTextClass}`}>
          ({stepMeta.ta})
        </span>
      </h2>
    </div>
  );
}

function mapGenderToDatabase(gender: string): string {
  if (gender === "female") {
    return "Female";
  }
  if (gender === "male") {
    return "Male";
  }
  return "Other";
}

function mapChargesToDatabase(charges: Record<string, string>): Record<string, number> {
  return Object.fromEntries(
    Object.entries(charges)
      .filter(([, value]) => value.trim() !== "")
      .map(([key, value]) => [key, Number.parseInt(value, 10)]),
  );
}

function logSupabaseSaveError(error: unknown) {
  console.error("House Help registration save failed:", error);

  if (error && typeof error === "object") {
    const supabaseError = error as {
      message?: string;
      code?: string;
      details?: string;
      hint?: string;
    };

    console.error("Supabase error details:", {
      message: supabaseError.message,
      code: supabaseError.code,
      details: supabaseError.details,
      hint: supabaseError.hint,
    });
  }
}

function getSupabaseSaveErrorMessage(error: unknown): string {
  if (
    error instanceof Error &&
    error.message.includes("Missing Supabase environment variables")
  ) {
    return "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server.";
  }

  if (error && typeof error === "object") {
    const supabaseError = error as {
      message?: string;
      code?: string;
    };

    if (
      supabaseError.message?.toLowerCase().includes("invalid api key") ||
      supabaseError.message?.toLowerCase().includes("secret api key") ||
      supabaseError.code === "PGRST301"
    ) {
      if (supabaseError.message?.toLowerCase().includes("secret api key")) {
        return "You are using a Secret API key in the browser. In .env.local, set NEXT_PUBLIC_SUPABASE_ANON_KEY to the anon public or publishable key only (Supabase Dashboard → Project Settings → API). Never use the service_role or secret key in NEXT_PUBLIC_ variables. Restart npm run dev after changing it.";
      }

      return "Supabase API key is invalid. Replace NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local with your real anon or publishable key from Supabase Dashboard → Project Settings → API, then restart npm run dev.";
    }

    if (supabaseError.code === "23505") {
      return "A profile with this phone number already exists. Please use a different phone number.";
    }

    if (supabaseError.code === "23514") {
      return "Some profile details do not match the required format. Please review your entries and try again.";
    }

    if (supabaseError.message) {
      return `We could not save your profile: ${supabaseError.message}`;
    }
  }

  return "We could not save your profile. Please try again.";
}

const PHONE_NUMBER_LENGTH = 10;

function sanitizePhoneInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_NUMBER_LENGTH);
}

function isValidTenDigitPhone(value: string): boolean {
  return /^\d{10}$/.test(value.trim());
}

function getStep1ValidationError(
  fullName: string,
  phoneNumber: string,
  whatsappNumber: string,
  sameAsPhone: boolean,
  gender: string,
  age: string,
): { en: string; ta: string } | null {
  if (fullName.trim() === "") {
    return {
      en: "Please complete all required fields before continuing.",
      ta: "தொடர அனைத்து தேவையான புலங்களையும் நிரப்பவும்",
    };
  }

  if (!isValidTenDigitPhone(phoneNumber)) {
    return {
      en: "Please enter a valid 10-digit phone number.",
      ta: "தயவுசெய்து செல்லுபடியாகும் 10 இலக்க தொலைபேசி எண்ணை உள்ளிடவும்",
    };
  }

  const resolvedWhatsapp = sameAsPhone ? phoneNumber : whatsappNumber;
  if (!isValidTenDigitPhone(resolvedWhatsapp)) {
    return {
      en: "Please enter a valid 10-digit WhatsApp number.",
      ta: "தயவுசெய்து செல்லுபடியாகும் 10 இலக்க வாட்ஸ்அப் எண்ணை உள்ளிடவும்",
    };
  }

  if (gender === "") {
    return {
      en: "Please complete all required fields before continuing.",
      ta: "தொடர அனைத்து தேவையான புலங்களையும் நிரப்பவும்",
    };
  }

  if (age.trim() === "") {
    return {
      en: "Please complete all required fields before continuing.",
      ta: "தொடர அனைத்து தேவையான புலங்களையும் நிரப்பவும்",
    };
  }

  return null;
}

function isDemoModeFromParams(
  searchParams: { get: (key: string) => string | null },
): boolean {
  if (process.env.NODE_ENV !== "development") {
    return false;
  }

  return (
    process.env.NEXT_PUBLIC_DEMO_AUTOFILL === "true" ||
    searchParams.get("demo") === "1"
  );
}

function isDemoAutorunFromParams(
  searchParams: { get: (key: string) => string | null },
): boolean {
  return (
    isDemoModeFromParams(searchParams) &&
    (process.env.NEXT_PUBLIC_DEMO_AUTORUN === "true" ||
      searchParams.get("autorun") === "1")
  );
}

export function RegistrationForm() {
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const demoAppliedRef = useRef(false);
  const demoAutorunStartedRef = useRef(false);

  const [step, setStep] = useState(1);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [step1Error, setStep1Error] = useState("");
  const [step1ErrorTa, setStep1ErrorTa] = useState("");
  const [step2PrimarySkillError, setStep2PrimarySkillError] = useState("");
  const [step2Error, setStep2Error] = useState("");

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [primarySkill, setPrimarySkill] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [servicesOffered, setServicesOffered] = useState<string[]>([]);
  const [availabilityTimeSlots, setAvailabilityTimeSlots] = useState<string[]>([]);
  const [serviceCharges, setServiceCharges] = useState<Record<string, string>>({});
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [apartmentCommunity, setApartmentCommunity] = useState("");

  const draftHydratedRef = useRef(false);
  const lastSavedDraftRef = useRef<string | null>(null);
  const [demoReady, setDemoReady] = useState(false);

  function applyDemoRegistrationData() {
    const demo = createDemoRegistrationData();

    setFullName(demo.fullName);
    setPhoneNumber(demo.phoneNumber);
    setWhatsappNumber(demo.whatsappNumber);
    setSameAsPhone(demo.sameAsPhone);
    setGender(demo.gender);
    setAge(demo.age);
    setPrimarySkill(demo.primarySkill);
    setYearsOfExperience(demo.yearsOfExperience);
    setServicesOffered(demo.servicesOffered);
    setAvailabilityTimeSlots(demo.availabilityTimeSlots);
    setServiceCharges(demo.serviceCharges);
    setCity(demo.city);
    setArea(demo.area);
    setApartmentCommunity(demo.apartmentCommunity);
    setStep1Error("");
    setStep1ErrorTa("");
    setStep2PrimarySkillError("");
    setStep2Error("");
    setSaveError("");
    setDemoReady(true);
    console.log("Demo registration data applied.");
  }

  useEffect(() => {
    console.log("Loading registration draft...");

    if (isDemoModeFromParams(searchParams) && !demoAppliedRef.current) {
      clearRegistrationDraft(lastSavedDraftRef);
      draftHydratedRef.current = true;
      demoAppliedRef.current = true;
      applyDemoRegistrationData();
      return;
    }

    const raw = localStorage.getItem(REGISTRATION_DRAFT_KEY);
    if (!raw) {
      draftHydratedRef.current = true;
      return;
    }

    const draft = parseRegistrationDraft(raw);
    if (!draft) {
      draftHydratedRef.current = true;
      return;
    }

    setStep(draft.step);
    setFullName(draft.fullName);
    setPhoneNumber(draft.phoneNumber);
    setWhatsappNumber(draft.whatsappNumber);
    setSameAsPhone(draft.sameAsPhone);
    setGender(draft.gender);
    setAge(draft.age);
    setPrimarySkill(draft.primarySkill);
    setYearsOfExperience(draft.yearsOfExperience);
    setServicesOffered(draft.servicesOffered);
    setAvailabilityTimeSlots(draft.availabilityTimeSlots);
    setServiceCharges(draft.serviceCharges);
    setCity(draft.city);
    setArea(draft.area);
    setApartmentCommunity(draft.apartmentCommunity);

    lastSavedDraftRef.current = raw;
    console.log("Registration draft restored.");
    draftHydratedRef.current = true;
  }, [searchParams]);

  useEffect(() => {
    if (!demoReady || demoAutorunStartedRef.current || !isDemoAutorunFromParams(searchParams)) {
      return;
    }

    demoAutorunStartedRef.current = true;

    const timers = [
      setTimeout(() => setStep(2), 700),
      setTimeout(() => setStep(3), 1400),
      setTimeout(() => formRef.current?.requestSubmit(), 2100),
    ];

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [demoReady, searchParams]);

  useEffect(() => {
    if (!draftHydratedRef.current || saveSuccess) {
      return;
    }

    const draft: RegistrationDraft = {
      step,
      fullName,
      phoneNumber,
      whatsappNumber,
      sameAsPhone,
      gender,
      age,
      primarySkill,
      yearsOfExperience,
      servicesOffered,
      availabilityTimeSlots,
      serviceCharges,
      city,
      area,
      apartmentCommunity,
    };

    const serialized = JSON.stringify(draft);
    if (serialized === lastSavedDraftRef.current) {
      return;
    }

    localStorage.setItem(REGISTRATION_DRAFT_KEY, serialized);
    lastSavedDraftRef.current = serialized;
    console.log("Registration draft saved.");
  }, [
    step,
    fullName,
    phoneNumber,
    whatsappNumber,
    sameAsPhone,
    gender,
    age,
    primarySkill,
    yearsOfExperience,
    servicesOffered,
    availabilityTimeSlots,
    serviceCharges,
    city,
    area,
    apartmentCommunity,
    saveSuccess,
  ]);

  const selectedPrimarySkill = primarySkillOptions.find(
    (option) => option.value === primarySkill,
  );

  const maxSlotsSelected = availabilityTimeSlots.length >= MAX_AVAILABILITY_SLOTS;

  const visibleChargeFields = chargeFieldOptions.filter((field) =>
    servicesOffered.includes(field.serviceKey),
  );

  function handlePhoneChange(value: string) {
    const sanitized = sanitizePhoneInput(value);
    setPhoneNumber(sanitized);
    if (sameAsPhone) {
      setWhatsappNumber(sanitized);
    }
    if (step1Error) {
      setStep1Error("");
      setStep1ErrorTa("");
    }
  }

  function handleWhatsappChange(value: string) {
    const sanitized = sanitizePhoneInput(value);
    setWhatsappNumber(sanitized);
    if (step1Error) {
      setStep1Error("");
      setStep1ErrorTa("");
    }
  }

  function handleSameAsPhoneChange(checked: boolean) {
    setSameAsPhone(checked);
    if (checked) {
      setWhatsappNumber(phoneNumber);
    }
  }

  function toggleService(value: string) {
    setServicesOffered((current) => {
      if (current.includes(value)) {
        setServiceCharges((charges) => {
          const next = { ...charges };
          delete next[value];
          return next;
        });
        return current.filter((service) => service !== value);
      }
      return [...current, value];
    });
  }

  function updateServiceCharge(serviceKey: string, value: string) {
    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    setServiceCharges((current) => ({ ...current, [serviceKey]: value }));
  }

  function toggleAvailabilityTimeSlot(value: string) {
    setAvailabilityTimeSlots((current) => {
      if (current.includes(value)) {
        return current.filter((slot) => slot !== value);
      }
      if (current.length >= MAX_AVAILABILITY_SLOTS) {
        return current;
      }
      return [...current, value];
    });
  }

  function handleNext() {
    if (step === 1) {
      const validationError = getStep1ValidationError(
        fullName,
        phoneNumber,
        whatsappNumber,
        sameAsPhone,
        gender,
        age,
      );

      if (validationError) {
        setStep1Error(validationError.en);
        setStep1ErrorTa(validationError.ta);
        return;
      }
    }
    setStep1Error("");
    setStep1ErrorTa("");

    if (step === 2) {
      let hasStep2Error = false;

      if (primarySkill === "") {
        setStep2PrimarySkillError("Please select your primary skill.");
        hasStep2Error = true;
      } else {
        setStep2PrimarySkillError("");
      }

      if (yearsOfExperience === "") {
        setStep2Error("Please select your years of experience.");
        hasStep2Error = true;
      } else {
        setStep2Error("");
      }

      if (hasStep2Error) {
        return;
      }
    }

    setStep((current) => Math.min(current + 1, TOTAL_STEPS));
  }

  function handlePrevious() {
    setStep1Error("");
    setStep1ErrorTa("");
    setStep2PrimarySkillError("");
    setStep2Error("");
    setStep((current) => Math.max(current - 1, 1));
  }

  async function handleSaveProfile(event: React.FormEvent) {
    event.preventDefault();
    setSaveError("");

    const validationError = getStep1ValidationError(
      fullName,
      phoneNumber,
      whatsappNumber,
      sameAsPhone,
      gender,
      age,
    );

    if (validationError) {
      setSaveError(validationError.en);
      return;
    }

    setIsSaving(true);

    const profile = {
      full_name: fullName.trim(),
      phone: phoneNumber.trim(),
      whatsapp: (sameAsPhone ? phoneNumber : whatsappNumber).trim(),
      gender: mapGenderToDatabase(gender),
      age: Number.parseInt(age.trim(), 10),
      years_of_experience: yearsOfExperience,
      primary_skill: primarySkill,
      services: servicesOffered,
      charges: mapChargesToDatabase(serviceCharges),
      availability_slots: availabilityTimeSlots,
      city: city.trim(),
      area: area.trim(),
      community: apartmentCommunity.trim(),
    };

    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase.from("house_helper_profiles").insert(profile);

      if (error) {
        throw error;
      }

      clearRegistrationDraft(lastSavedDraftRef);
      setSaveSuccess(true);
    } catch (error) {
      logSupabaseSaveError(error);
      setSaveError(getSupabaseSaveErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  if (saveSuccess) {
    return (
      <div className="mt-8 rounded-xl border-2 border-[#00BFFF] bg-cyan-50 px-6 py-10 text-center shadow-[0_8px_32px_rgba(0,191,255,0.18)]">
        <span className="text-4xl" aria-hidden="true">
          ✓
        </span>
        <p className="mt-4 text-xl font-semibold text-slate-900">
          Profile Saved Successfully
        </p>
        <p className={`mt-2 ${tamilTextClass}`}>
          (சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது)
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} className="mt-8" onSubmit={handleSaveProfile}>
      <StepProgress currentStep={step} />

      <div className="space-y-5 transition-opacity duration-300">
        {step === 1 && (
          <>
            <div>
              <BilingualLabel en="Full Name" ta="முழு பெயர்" htmlFor="full-name" />
              <input
                id="full-name"
                type="text"
                className={inputClassName}
                placeholder={bilingualPlaceholder("Enter your name")}
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
              />
              <BilingualHelperText ta="உங்கள் பெயரை உள்ளிடவும்" />
            </div>

            <div>
              <BilingualLabel en="Phone Number" ta="தொலைபேசி எண்" htmlFor="phone-number" />
              <input
                id="phone-number"
                type="tel"
                inputMode="numeric"
                maxLength={PHONE_NUMBER_LENGTH}
                className={inputClassName}
                placeholder={bilingualPlaceholder("Enter phone number")}
                value={phoneNumber}
                onChange={(event) => handlePhoneChange(event.target.value)}
              />
              <BilingualHelperText ta="தொலைபேசி எண்ணை உள்ளிடவும்" />
            </div>

            <div>
              <BilingualLabel
                en="WhatsApp Number"
                ta="வாட்ஸ்அப் எண்"
                htmlFor="whatsapp-number"
              />
              <input
                id="whatsapp-number"
                type="tel"
                inputMode="numeric"
                maxLength={PHONE_NUMBER_LENGTH}
                className={inputClassName}
                placeholder={bilingualPlaceholder("Enter WhatsApp number")}
                value={whatsappNumber}
                onChange={(event) => handleWhatsappChange(event.target.value)}
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
                    checked={gender === "female"}
                    onChange={(event) => setGender(event.target.value)}
                    className="h-4 w-4 border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]/30"
                  />
                  <BilingualInline en="Female" ta="பெண்" />
                </label>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(event) => setGender(event.target.value)}
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
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
              <BilingualHelperText ta="உங்கள் வயதை உள்ளிடவும்" />
            </div>

            {step1Error && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {step1Error}
                <span className={`mt-1 block ${tamilTextClass}`}>
                  ({step1ErrorTa})
                </span>
              </p>
            )}

            <button type="button" onClick={handleNext} className={primaryButtonClassName}>
              <BilingualButtonText en="Next" ta="அடுத்து" />
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <BilingualLabel
                en="Primary Skill"
                ta="முக்கிய திறன்"
                htmlFor="primary-skill"
                required
              />
              <select
                id="primary-skill"
                className={inputClassName}
                value={primarySkill}
                onChange={(event) => {
                  setPrimarySkill(event.target.value);
                  if (event.target.value) {
                    setStep2PrimarySkillError("");
                  }
                }}
              >
                <option value="">Select Primary Skill</option>
                {primarySkillOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.en} ({option.ta})
                  </option>
                ))}
              </select>
              {step2PrimarySkillError ? (
                <p className="mt-1.5 text-sm text-red-600">{step2PrimarySkillError}</p>
              ) : (
                <BilingualHelperText
                  ta={
                    selectedPrimarySkill
                      ? selectedPrimarySkill.ta
                      : "முக்கிய திறனை தேர்ந்தெடுக்கவும்"
                  }
                />
              )}
            </div>

            <div>
              <BilingualLabel
                en="Years of Experience"
                ta="அனுபவ ஆண்டுகள்"
                htmlFor="years-of-experience"
                required
              />
              <select
                id="years-of-experience"
                className={inputClassName}
                value={yearsOfExperience}
                onChange={(event) => {
                  setYearsOfExperience(event.target.value);
                  if (event.target.value) {
                    setStep2Error("");
                  }
                }}
              >
                <option value="">Select Years of Experience</option>
                {yearsOfExperienceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.en}
                  </option>
                ))}
              </select>
              {step2Error ? (
                <p className="mt-1.5 text-sm text-red-600">
                  {step2Error}
                  <span className={`mt-1 block ${tamilTextClass}`}>
                    (தயவுசெய்து உங்கள் அனுபவ ஆண்டுகளை தேர்வு செய்யவும்.)
                  </span>
                </p>
              ) : (
                <BilingualHelperText ta="உங்கள் அனுபவ ஆண்டுகளை தேர்ந்தெடுக்கவும்" />
              )}
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

            <fieldset>
              <BilingualLegend en="Availability Time Slots" ta="கிடைக்கும் நேரம்" />
              <p className="mb-4 text-sm text-slate-500">
                You can select up to 4 preferred time slots.
                <span className={`mt-1 block ${tamilTextClass}`}>
                  (அதிகபட்சம் 4 நேரங்களை தேர்வு செய்யலாம்)
                </span>
              </p>
              <div className="space-y-5">
                {availabilityTimeSlotGroups.map((group) => (
                  <div key={group.groupEn}>
                    <p className="mb-3 text-sm font-semibold text-slate-900">
                      {group.groupEn} (<span className={tamilTextClass}>{group.groupTa}</span>)
                    </p>
                    <div className="space-y-2">
                      {group.slots.map((slot) => {
                        const isSelected = availabilityTimeSlots.includes(slot.value);
                        const isDisabled = !isSelected && maxSlotsSelected;

                        return (
                          <label
                            key={slot.value}
                            className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-sm transition-all ${
                              isSelected
                                ? `cursor-pointer ${slotSelectedClassName} text-slate-900`
                                : isDisabled
                                  ? slotDisabledClassName
                                  : `cursor-pointer ${slotDefaultClassName} text-slate-700`
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              disabled={isDisabled}
                              onChange={() => toggleAvailabilityTimeSlot(slot.value)}
                              className="h-4 w-4 shrink-0 rounded border-slate-300 text-[#00BFFF] focus:ring-[#00BFFF]/30 disabled:cursor-not-allowed"
                            />
                            {slot.en}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={handlePrevious} className={secondaryButtonClassName}>
                <BilingualButtonText en="Previous" ta="முந்தைய" />
              </button>
              <button type="button" onClick={handleNext} className={primaryButtonClassName}>
                <BilingualButtonText en="Next" ta="அடுத்து" />
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <fieldset>
              <BilingualLegend en="Charges" ta="கட்டணம்" />
              <div className={`${chargesCardClassName} space-y-4`}>
                {visibleChargeFields.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    Select services in Step 2 to enter charges.
                    <span className={`mt-1 block ${tamilTextClass}`}>
                      (கட்டணம் உள்ளிட 2-வது படியில் சேவைகளை தேர்ந்தெடுக்கவும்)
                    </span>
                  </p>
                ) : (
                  visibleChargeFields.map((field) => (
                    <div key={field.serviceKey}>
                      <label
                        htmlFor={`charge-${field.serviceKey}`}
                        className="mb-2 block text-sm font-medium text-slate-700"
                      >
                        {field.en} (<span className={tamilTextClass}>{field.ta}</span>)
                      </label>
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-medium text-slate-500"
                        >
                          ₹
                        </span>
                        <input
                          id={`charge-${field.serviceKey}`}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          className={`${inputClassName} pl-9`}
                          placeholder={bilingualPlaceholder("Enter Amount")}
                          value={serviceCharges[field.serviceKey] ?? ""}
                          onChange={(event) =>
                            updateServiceCharge(field.serviceKey, event.target.value)
                          }
                        />
                      </div>
                      <BilingualHelperText ta="தொகையை உள்ளிடவும்" />
                    </div>
                  ))
                )}
              </div>
            </fieldset>

            <fieldset>
              <BilingualLegend en="Location" ta="இடம்" />
              <div className={`${chargesCardClassName} space-y-4`}>
                <div>
                  <BilingualLabel en="City" ta="நகரம்" htmlFor="city" />
                  <input
                    id="city"
                    type="text"
                    className={inputClassName}
                    placeholder={bilingualPlaceholder("Enter city")}
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                  <BilingualHelperText ta="நகரத்தை உள்ளிடவும்" />
                </div>

                <div>
                  <BilingualLabel en="Area" ta="பகுதி" htmlFor="area" />
                  <input
                    id="area"
                    type="text"
                    className={inputClassName}
                    placeholder={bilingualPlaceholder("Enter area")}
                    value={area}
                    onChange={(event) => setArea(event.target.value)}
                  />
                  <BilingualHelperText ta="பகுதியை உள்ளிடவும்" />
                </div>

                <div>
                  <BilingualLabel
                    en="Apartment / Community"
                    ta="குடியிருப்பு"
                    htmlFor="apartment-community"
                  />
                  <input
                    id="apartment-community"
                    type="text"
                    className={inputClassName}
                    placeholder={bilingualPlaceholder("Enter apartment or community")}
                    value={apartmentCommunity}
                    onChange={(event) => setApartmentCommunity(event.target.value)}
                  />
                  <BilingualHelperText ta="குடியிருப்பு பெயரை உள்ளிடவும்" />
                </div>
              </div>
            </fieldset>

            {saveError && (
              <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {saveError}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={handlePrevious} className={secondaryButtonClassName}>
                <BilingualButtonText en="Previous" ta="முந்தைய" />
              </button>
              <button
                type="submit"
                className={primaryButtonClassName}
                disabled={isSaving}
              >
                <BilingualButtonText en="Save Profile" ta="சுயவிவரத்தை சேமிக்கவும்" />
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}
