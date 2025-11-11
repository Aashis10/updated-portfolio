import { z } from "zod";
import type { NextRequest } from "next/server";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10)
});

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  // Honeypot
  if (formData.get("website")) {
    return new Response("ok", { status: 200 });
  }

  const payload = {
    name: String(formData.get("name") || ""),
    email: String(formData.get("email") || ""),
    message: String(formData.get("message") || "")
  };

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return Response.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }

  // Integrate email provider here (Resend/SES/etc.)
  console.log("New contact message:", parsed.data);

  return Response.json({ ok: true });
}