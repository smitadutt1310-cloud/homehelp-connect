import type { Metadata } from "next";

import { DashboardShell } from "../components/dashboard-shell";



export const metadata: Metadata = {

  title: "Admin Dashboard (நிர்வாகி டாஷ்போர்டு) | HomeHelp Connect",

};



export default function AdminPage() {

  return (

    <DashboardShell

      title="Admin Dashboard"

      titleTamil="நிர்வாகி டாஷ்போர்டு"

      description="Oversee users, jobs, and platform activity."

      descriptionTamil="பயனர்கள், வேலைகள் மற்றும் தள செயல்பாட்டை கண்காணிக்கவும்"

      placeholder="Your admin dashboard is coming soon. Here you'll be able to manage users, review reports, and monitor platform health."

      placeholderTamil="உங்கள் நிர்வாகி டாஷ்போர்டு விரைவில் வரும். பயனர்களை நிர்வகிக்க, அறிக்கைகளை மதிப்பாய்வு செய்ய மற்றும் தளத்தின் நிலையை கண்காணிக்கலாம்"

    />

  );

}

