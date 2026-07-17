import { expect, type Page } from "@playwright/test";

export function uniqueTestPhone(): string {
  const suffix = Date.now().toString().slice(-9);
  return `9${suffix}`;
}

function wizardButton(page: Page, label: "Next" | "Save Profile" | "Previous") {
  return page.getByRole("button", { name: new RegExp(`^${label} \\(`) });
}

export { wizardButton };

export function hasSupabaseConfig(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

  return (
    url.includes("supabase.co") &&
    key.length > 20 &&
    !key.includes("REPLACE") &&
    !key.includes("your-anon")
  );
}

export async function openHouseHelpRegistration(page: Page) {
  await page.goto("/");
  await page.getByRole("link", { name: /Register as House Help/i }).click();
  await expect(page.getByText("Personal Information")).toBeVisible();
}

export async function completeStep1(
  page: Page,
  options: {
    fullName: string;
    phone: string;
    age: string;
    gender?: "female" | "male";
  },
) {
  await page.locator("#full-name").fill(options.fullName);
  await page.locator("#phone-number").fill(options.phone);

  const whatsappField = page.locator("#whatsapp-number");
  if (await whatsappField.isEnabled()) {
    await whatsappField.fill(options.phone);
  } else {
    await page.getByRole("checkbox", { name: /Same as Phone Number/i }).check();
  }

  await page.getByRole("radio", { name: /Female/i }).check();
  if (options.gender === "male") {
    await page.getByRole("radio", { name: /Male/i }).check();
  }
  await page.locator("#age").fill(options.age);
  await wizardButton(page, "Next").click();
  await expect(page.getByText("Work Information")).toBeVisible();
}

export async function completeStep2(page: Page) {
  await page.locator("#primary-skill").selectOption("cooking");
  await page.locator("#years-of-experience").selectOption("fresher");
  await page.getByRole("checkbox", { name: /Sweeping & Mopping/i }).check();
  await page.getByRole("checkbox", { name: /8 AM - 9 AM/i }).check();
  await wizardButton(page, "Next").click();
  await expect(page.getByText("Charges & Location")).toBeVisible();
}

export async function completeStep3AndSave(
  page: Page,
  options: {
    city: string;
    area: string;
    community: string;
  },
) {
  await page.locator("#city").fill(options.city);
  await page.locator("#area").fill(options.area);
  await page.locator("#apartment-community").fill(options.community);
  await wizardButton(page, "Save Profile").click();
}
