import { NextRequest, NextResponse } from "next/server";
import { questionnaireSchema } from "@/lib/questionnaire-schema";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = questionnaireSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      return NextResponse.json(
        { error: firstIssue?.message || "Invalid form submission." },
        { status: 400 }
      );
    }

    const supabase = createAdminSupabaseClient();

    const forwardedFor = req.headers.get("x-forwarded-for");
    const userAgent = req.headers.get("user-agent");

    const payload = {
      ...parsed.data,
      submitted_from_ip: forwardedFor?.split(",")[0]?.trim() || null,
      user_agent: userAgent || null,
    };

    const { error } = await supabase
      .from("questionnaire_responses")
      .insert([payload]);

    if (error) {
      return NextResponse.json(
        { error: error.message || "Failed to save submission." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}