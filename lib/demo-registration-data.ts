export type DemoRegistrationData = {
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

export function createDemoPhone(): string {
  const suffix = Date.now().toString().slice(-9);
  return `9${suffix}`;
}

export function createDemoRegistrationData(): DemoRegistrationData {
  const phone = createDemoPhone();

  return {
    fullName: "Demo House Help",
    phoneNumber: phone,
    whatsappNumber: phone,
    sameAsPhone: true,
    gender: "female",
    age: "28",
    primarySkill: "cooking",
    yearsOfExperience: "fresher",
    servicesOffered: ["sweeping-mopping"],
    availabilityTimeSlots: ["8am-9am"],
    serviceCharges: {},
    city: "Chennai",
    area: "Adyar",
    apartmentCommunity: "Demo Community",
  };
}
