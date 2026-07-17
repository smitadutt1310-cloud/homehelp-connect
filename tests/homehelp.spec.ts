import { test, expect } from "@playwright/test";
import {
  completeStep1,
  completeStep2,
  completeStep3AndSave,
  hasSupabaseConfig,
  openHouseHelpRegistration,
  uniqueTestPhone,
  wizardButton,
} from "./helpers/registration";

test.describe("HomeHelp Connect", () => {
  test("landing page loads", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText("HomeHelp Connect")).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Continue as Resident/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Register as House Help/i }),
    ).toBeVisible();
  });

  test("navigates to House Help registration", async ({ page }) => {
    await openHouseHelpRegistration(page);

    await expect(page.locator("#full-name")).toBeVisible();
    await expect(page.locator("#phone-number")).toBeVisible();
    await expect(page.getByText("Step 1 of 3")).toBeVisible();
  });

  test("validates 10-digit phone number on step 1", async ({ page }) => {
    await openHouseHelpRegistration(page);

    await page.locator("#full-name").fill("Test User");
    await page.locator("#phone-number").fill("12345");
    await page.locator("#whatsapp-number").fill("12345");
    await page.getByRole("radio", { name: /Female/i }).check();
    await page.locator("#age").fill("25");
    await wizardButton(page, "Next").click();

    await expect(
      page.getByText(/Please enter a valid 10-digit phone number/i),
    ).toBeVisible();
    await expect(page.getByText("Personal Information")).toBeVisible();
  });

  test("completes the registration wizard through step 3", async ({ page }) => {
    const phone = uniqueTestPhone();

    await openHouseHelpRegistration(page);
    await completeStep1(page, {
      fullName: "Playwright Test User",
      phone,
      age: "28",
    });
    await completeStep2(page);

    await expect(page.getByLabel(/City/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /^Save Profile \(/ })).toBeVisible();
  });
});

test.describe("House Help registration save", () => {
  test.skip(
    !hasSupabaseConfig(),
    "Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );

  test("saves profile to Supabase and shows success screen", async ({ page }) => {
    const phone = uniqueTestPhone();

    await openHouseHelpRegistration(page);
    await completeStep1(page, {
      fullName: "Playwright E2E User",
      phone,
      age: "30",
    });
    await completeStep2(page);
    await completeStep3AndSave(page, {
      city: "Chennai",
      area: "Adyar",
      community: "Playwright Test Community",
    });

    await expect(page.getByText("Profile Saved Successfully")).toBeVisible();
    await expect(
      page.getByText("சுயவிவரம் வெற்றிகரமாக சேமிக்கப்பட்டது"),
    ).toBeVisible();
  });
});
