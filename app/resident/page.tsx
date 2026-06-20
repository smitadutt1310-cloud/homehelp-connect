import type { Metadata } from "next";

import { DashboardShell } from "../components/dashboard-shell";



export const metadata: Metadata = {

  title: "Resident Dashboard (குடியிருப்பாளர் டாஷ்போர்டு) | HomeHelp Connect",

};



export default function ResidentPage() {

  return (

    <DashboardShell

      title="Resident Dashboard"

      titleTamil="குடியிருப்பாளர் டாஷ்போர்டு"

      description="Search and book household helpers in your area."

      descriptionTamil="உங்கள் பகுதியில் வீட்டு உதவியாளர்களை தேடி முன்பதிவு செய்யுங்கள்"

      placeholder="Your resident dashboard is coming soon. Here you'll be able to browse available house helps, post jobs, and manage bookings."

      placeholderTamil="உங்கள் குடியிருப்பாளர் டாஷ்போர்டு விரைவில் வரும். கிடைக்கும் வீட்டு உதவியாளர்களை உலாவ, வேலைகளை பதிவு செய்ய மற்றும் முன்பதிவுகளை நிர்வகிக்கலாம்"

    />

  );

}

