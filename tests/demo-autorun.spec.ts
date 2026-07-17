import { test, expect } from "@playwright/test";
import { hasSupabaseConfig } from "./helpers/registration";

test.describe("Demo auto-run", () => {
  test.skip(
    !hasSupabaseConfig(),
    "Requires .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
  );

  test("browser demo fills the form and saves automatically", async ({ page }) => {
    await page.goto("/worker?demo=1&autorun=1");

    await expect(page.getByText("Personal Information")).toBeVisible();
    await expect(page.locator("#full-name")).toHaveValue("Demo House Help");

    await expect(page.getByText("Profile Saved Successfully")).toBeVisible({
      timeout: 15_000,
    });
  });

  test("playwright fills the form and saves profile", async ({ page }) => {
    const {
      completeStep1,
      completeStep2,
      completeStep3AndSave,
      uniqueTestPhone,
    } = await import("./helpers/registration");
    const { createDemoRegistrationData } = await import(
      "../lib/demo-registration-data"
    );

    const demo = createDemoRegistrationData();
    const phone = uniqueTestPhone();

    await page.goto("/worker");

    await completeStep1(page, {
      fullName: demo.fullName,
      phone,
      age: demo.age,
    });
    await completeStep2(page);
    await completeStep3AndSave(page, {
      city: demo.city,
      area: demo.area,
      community: demo.apartmentCommunity,
    });

    await expect(page.getByText("Profile Saved Successfully")).toBeVisible();
  });
});
