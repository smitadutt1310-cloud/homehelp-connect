export const primarySkillOptions = [
  { value: "cooking", en: "Cooking", ta: "சமையல்" },
  { value: "house-cleaning", en: "House Cleaning", ta: "வீட்டு சுத்தம்" },
  { value: "baby-care", en: "Baby Care", ta: "குழந்தை பராமரிப்பு" },
  { value: "elder-care", en: "Elder Care", ta: "முதியோர் பராமரிப்பு" },
] as const;

export const servicesOfferedOptions = [
  { value: "sweeping-mopping", en: "Sweeping & Mopping", ta: "தூய்மை செய்தல்" },
  { value: "vessel-washing", en: "Vessel Washing", ta: "பாத்திரம் கழுவுதல்" },
  { value: "bathroom-cleaning", en: "Bathroom Cleaning", ta: "குளியலறை சுத்தம்" },
  { value: "deep-cleaning", en: "Deep Cleaning", ta: "முழு வீட்டு சுத்தம்" },
  { value: "cooking", en: "Cooking", ta: "சமையல்" },
  { value: "baby-care", en: "Baby Care", ta: "குழந்தை பராமரிப்பு" },
  { value: "elder-care", en: "Elder Care", ta: "முதியோர் பராமரிப்பு" },
] as const;

export const yearsOfExperienceOptions = [
  { value: "fresher", en: "Fresher (0 Years)" },
  { value: "1-year", en: "1 Year" },
  { value: "2-year", en: "2 Years" },
  { value: "3-year", en: "3 Years" },
  { value: "4-year", en: "4 Years" },
  { value: "5-year", en: "5 Years" },
  { value: "6-10-years", en: "6–10 Years" },
  { value: "more-than-10-years", en: "More than 10 Years" },
] as const;

export const availabilityTimeSlots = [
  { value: "8am-9am", en: "8 AM - 9 AM" },
  { value: "9am-10am", en: "9 AM - 10 AM" },
  { value: "10am-11am", en: "10 AM - 11 AM" },
  { value: "11am-12pm", en: "11 AM - 12 PM" },
  { value: "12pm-1pm", en: "12 PM - 1 PM" },
  { value: "1pm-2pm", en: "1 PM - 2 PM" },
  { value: "2pm-3pm", en: "2 PM - 3 PM" },
  { value: "5pm-6pm", en: "5 PM - 6 PM" },
  { value: "6pm-7pm", en: "6 PM - 7 PM" },
] as const;

export function getPrimarySkillLabel(value: string): string {
  return primarySkillOptions.find((option) => option.value === value)?.en ?? value;
}

export function getPrimarySkillTamil(value: string): string {
  return primarySkillOptions.find((option) => option.value === value)?.ta ?? value;
}

export function getServiceLabel(value: string): string {
  return servicesOfferedOptions.find((option) => option.value === value)?.en ?? value;
}

export function getServiceTamil(value: string): string {
  return servicesOfferedOptions.find((option) => option.value === value)?.ta ?? value;
}

export function getYearsOfExperienceLabel(value: string): string {
  return yearsOfExperienceOptions.find((option) => option.value === value)?.en ?? value;
}

export function getAvailabilitySlotLabel(value: string): string {
  return availabilityTimeSlots.find((option) => option.value === value)?.en ?? value;
}
