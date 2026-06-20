import type { Metadata } from "next";
import { DashboardShell } from "../../components/dashboard-shell";

export const metadata: Metadata = {
  title: "House Help Registration (வீட்டு உதவி பதிவு) | HomeHelp Connect",
};

export default function WorkerRegisterPage() {
  return (
    <DashboardShell
      title="House Help Registration"
      titleTamil="வீட்டு உதவி பதிவு"
      description="Create your house help profile to start finding jobs."
      descriptionTamil="வேலையைத் தேட தொடங்க உங்கள் வீட்டு உதவி சுயவிவரத்தை உருவாக்கவும்"
      placeholder="Registration form coming soon. Here you'll be able to sign up with your details, skills, and availability."
      placeholderTamil="பதிவு படிவம் விரைவில் வரும். உங்கள் விவரங்கள், திறன்கள் மற்றும் கிடைக்கும் நேரத்துடன் பதிவு செய்யலாம்"
    />
  );
}
