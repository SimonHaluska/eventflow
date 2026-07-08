"use server";

type ContactResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function submitContact(
  formData: FormData
): Promise<ContactResult> {
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const segment = formData.get("segment") as string;
  const packageTier = formData.get("package") as string;
  const message = (formData.get("message") as string)?.trim();

  if (!name || name.length < 2) {
    return { ok: false, message: "Zadajte prosím vaše meno." };
  }

  if (!email || !email.includes("@")) {
    return { ok: false, message: "Zadajte platný e-mail." };
  }

  if (!message || message.length < 10) {
    return {
      ok: false,
      message: "Správa musí mať aspoň 10 znakov.",
    };
  }

  // Zatiaľ len validácia — e-mailovú integráciu (Resend) doplníme neskôr.
  console.log("Nový dopyt:", {
    name,
    email,
    phone,
    segment,
    packageTier,
    message,
    date: new Date().toISOString(),
  });

  return {
    ok: true,
    message:
      "Ďakujeme za dopyt! Ozveme sa vám do 2 pracovných dní. Na kľúčové stretnutia chodíme vždy spolu.",
  };
}
