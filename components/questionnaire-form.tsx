"use client";

import { useMemo, useState } from "react";
import type { QuestionnaireInput } from "@/lib/questionnaire-schema";
import { Section } from "@/components/section";

const initialForm: QuestionnaireInput = {
  respondent_name: "",
  respondent_email: "",
  company_name: "",

  alignment_confirmed: "Yes — this matches my vision",
  alignment_notes: "",

  top_3_features: "",
  version_1_win: "",
  day_1_success: "",

  daily_actions: "",
  call_list_ideal: "",
  manager_review_items: "",

  lead_stages: "",
  loan_stages: "",
  stage_triggers: "",
  stage_owners: "",

  v1_roles: "",
  role_permissions: "",

  daily_kpis: "",
  weekly_kpis: "",
  lo_performance_definition: "",
  company_profit_definition: "",

  lo_profitability_formula: "",
  lo_direct_costs: "",
  company_wide_costs: "",

  mobile_priority: "Important",
  mobile_full_workflow: "",
  mobile_fast_actions: "",

  top_3_automations: "",
  ai_best_uses: "",
  human_controlled_items: "",

  integration_timing: "After core system is built",
  long_term_required_systems: "",

  biggest_problem_first: "",
  success_30_60_days: "",
  pitch_timeline: "After internal testing",

  most_broken_today: "",
  build_from_start_notes: "",
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function QuestionnaireForm() {
  const [form, setForm] = useState<QuestionnaireInput>(initialForm);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");

  const progress = useMemo(() => {
    const entries = Object.entries(form);
    const filled = entries.filter(([, value]) => String(value).trim().length > 0).length;
    return Math.round((filled / entries.length) * 100);
  }, [form]);

  function updateField<K extends keyof QuestionnaireInput>(
    key: K,
    value: QuestionnaireInput[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("submitting");
    setError("");

    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Something went wrong.");
      }

      setSubmitState("success");
      setForm(initialForm);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setSubmitState("error");
      setError(err instanceof Error ? err.message : "Failed to submit.");
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
        <h2 className="text-2xl font-semibold text-green-900">Submitted successfully</h2>
        <p className="mt-2 text-green-800">
          Thank you. Your responses were saved and are ready for review.
        </p>
        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-5 rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="sticky top-0 z-20 rounded-2xl border border-neutral-200 bg-white/90 p-4 shadow-sm backdrop-blur">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-700">Completion</span>
          <span className="text-sm font-semibold text-neutral-900">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-neutral-900 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Section
        title="Project Alignment"
        description="Please review the current understanding of the project before answering."
      >
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm leading-7 text-neutral-700">
          <p>
            Based on our conversations, the goal is to build an operating system
            for loan officers that replaces scattered spreadsheets, paper trackers,
            and disconnected tools with one structured platform.
          </p>
          <p className="mt-3">
            This system should guide daily execution, provide visibility into the
            loan pipeline, and track performance and financial outcomes.
          </p>
          <p className="mt-3">
            AI is expected to act as a supporting layer over time for communication,
            task execution, document handling, and automation, rather than being
            the foundation of the system itself.
          </p>
          <p className="mt-3">
            The initial goal is to build this as an internal tool, refine it, and
            then potentially productize it for other mortgage teams.
          </p>
        </div>

        <TextInput
          label="Your name"
          value={form.respondent_name || ""}
          onChange={(v) => updateField("respondent_name", v)}
        />

        <TextInput
          label="Your email"
          value={form.respondent_email || ""}
          onChange={(v) => updateField("respondent_email", v)}
          type="email"
        />

        <TextInput
          label="Company name"
          value={form.company_name || ""}
          onChange={(v) => updateField("company_name", v)}
        />

        <RadioGroup
          label="Do you agree with this direction?"
          value={form.alignment_confirmed}
          onChange={(value) =>
            updateField(
              "alignment_confirmed",
              value as QuestionnaireInput["alignment_confirmed"]
            )
          }
          options={[
            "Yes — this matches my vision",
            "Mostly — but I would adjust some things",
            "No — I see this differently",
          ]}
        />

        <TextArea
          label="If not fully aligned, what would you change or clarify?"
          value={form.alignment_notes}
          onChange={(v) => updateField("alignment_notes", v)}
        />
      </Section>

      <Section title="1. MVP Focus">
        <TextArea
          label="If we could only build 3 core features first, what should they be?"
          value={form.top_3_features}
          onChange={(v) => updateField("top_3_features", v)}
        />
        <TextArea
          label="What would make Version 1 immediately useful for your team?"
          value={form.version_1_win}
          onChange={(v) => updateField("version_1_win", v)}
        />
        <TextArea
          label="What should a loan officer be able to do on Day 1 inside this system that would make it a win?"
          value={form.day_1_success}
          onChange={(v) => updateField("day_1_success", v)}
        />
      </Section>

      <Section title="2. Daily Execution">
        <TextArea
          label="What daily actions should every loan officer be guided to complete?"
          value={form.daily_actions}
          onChange={(v) => updateField("daily_actions", v)}
        />
        <TextArea
          label="How should the call list system work in your ideal version?"
          value={form.call_list_ideal}
          onChange={(v) => updateField("call_list_ideal", v)}
        />
        <TextArea
          label="What activities should managers be able to review every week for coaching?"
          value={form.manager_review_items}
          onChange={(v) => updateField("manager_review_items", v)}
        />
      </Section>

      <Section title="3. Workflow & Pipeline">
        <TextArea
          label="What are the exact stages a lead goes through from new lead to pre-approval?"
          value={form.lead_stages}
          onChange={(v) => updateField("lead_stages", v)}
        />
        <TextArea
          label="What are the exact stages a loan goes through from pre-approved to funded and finalized?"
          value={form.loan_stages}
          onChange={(v) => updateField("loan_stages", v)}
        />
        <TextArea
          label="What should trigger movement between stages?"
          value={form.stage_triggers}
          onChange={(v) => updateField("stage_triggers", v)}
        />
        <TextArea
          label="Who should be responsible at each stage?"
          value={form.stage_owners}
          onChange={(v) => updateField("stage_owners", v)}
        />
      </Section>

      <Section title="4. Users & Roles">
        <TextArea
          label="Which users need access in Version 1?"
          value={form.v1_roles}
          onChange={(v) => updateField("v1_roles", v)}
        />
        <TextArea
          label="What should each role be able to see and do?"
          value={form.role_permissions}
          onChange={(v) => updateField("role_permissions", v)}
        />
      </Section>

      <Section title="5. KPIs & Performance">
        <TextArea
          label="What are the most important KPIs you want to see daily?"
          value={form.daily_kpis}
          onChange={(v) => updateField("daily_kpis", v)}
        />
        <TextArea
          label="What are the most important KPIs you want to review weekly?"
          value={form.weekly_kpis}
          onChange={(v) => updateField("weekly_kpis", v)}
        />
        <TextArea
          label="What numbers define whether a loan officer is performing well?"
          value={form.lo_performance_definition}
          onChange={(v) => updateField("lo_performance_definition", v)}
        />
        <TextArea
          label="What numbers define whether the company is profitable?"
          value={form.company_profit_definition}
          onChange={(v) => updateField("company_profit_definition", v)}
        />
      </Section>

      <Section title="6. Financial Tracking">
        <TextArea
          label="How should loan officer profitability be calculated?"
          value={form.lo_profitability_formula}
          onChange={(v) => updateField("lo_profitability_formula", v)}
        />
        <TextArea
          label="What costs should be tied directly to each loan officer?"
          value={form.lo_direct_costs}
          onChange={(v) => updateField("lo_direct_costs", v)}
        />
        <TextArea
          label="What costs should be considered company-wide?"
          value={form.company_wide_costs}
          onChange={(v) => updateField("company_wide_costs", v)}
        />
      </Section>

      <Section title="7. Mobile Experience">
        <RadioGroup
          label="How important is mobile usage for Version 1?"
          value={form.mobile_priority}
          onChange={(value) =>
            updateField("mobile_priority", value as QuestionnaireInput["mobile_priority"])
          }
          options={["Critical", "Important", "Not important"]}
        />
        <TextArea
          label="Should a loan officer be able to fully work their daily list from their phone?"
          value={form.mobile_full_workflow}
          onChange={(v) => updateField("mobile_full_workflow", v)}
        />
        <TextArea
          label="What actions should be fastest and easiest on mobile?"
          value={form.mobile_fast_actions}
          onChange={(v) => updateField("mobile_fast_actions", v)}
        />
      </Section>

      <Section title="8. Automation & AI">
        <TextArea
          label="What are the top 3 manual tasks you want automated first?"
          value={form.top_3_automations}
          onChange={(v) => updateField("top_3_automations", v)}
        />
        <TextArea
          label="Where do you see AI helping the most in this system?"
          value={form.ai_best_uses}
          onChange={(v) => updateField("ai_best_uses", v)}
        />
        <TextArea
          label="What decisions or actions should always remain human-controlled?"
          value={form.human_controlled_items}
          onChange={(v) => updateField("human_controlled_items", v)}
        />
      </Section>

      <Section title="9. Integrations">
        <RadioGroup
          label="When should we prioritize integrating tools like GHL or ARIVE?"
          value={form.integration_timing}
          onChange={(value) =>
            updateField(
              "integration_timing",
              value as QuestionnaireInput["integration_timing"]
            )
          }
          options={["Immediately", "After core system is built", "Later"]}
        />
        <TextArea
          label="What systems are absolutely required long-term?"
          value={form.long_term_required_systems}
          onChange={(v) => updateField("long_term_required_systems", v)}
        />
      </Section>

      <Section title="10. Priority & Strategy">
        <TextArea
          label="What is the single biggest problem this system must solve first?"
          value={form.biggest_problem_first}
          onChange={(v) => updateField("biggest_problem_first", v)}
        />
        <TextArea
          label="What would success look like after 30–60 days of using this system?"
          value={form.success_30_60_days}
          onChange={(v) => updateField("success_30_60_days", v)}
        />
        <RadioGroup
          label="How soon do you want to start pitching this externally?"
          value={form.pitch_timeline}
          onChange={(value) =>
            updateField("pitch_timeline", value as QuestionnaireInput["pitch_timeline"])
          }
          options={["ASAP", "After internal testing", "Much later"]}
        />
      </Section>

      <Section title="11. Final Input">
        <TextArea
          label="What feels most broken or inefficient in your current workflow today?"
          value={form.most_broken_today}
          onChange={(v) => updateField("most_broken_today", v)}
        />
        <TextArea
          label="Anything else you want us to build into this system from the start?"
          value={form.build_from_start_notes}
          onChange={(v) => updateField("build_from_start_notes", v)}
        />
      </Section>

      {submitState === "error" ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white disabled:opacity-60"
        >
          {submitState === "submitting" ? "Submitting..." : "Submit questionnaire"}
        </button>
        <span className="text-sm text-neutral-500">
          Responses will be saved securely.
        </span>
      </div>
    </form>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-neutral-900">{label}</div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={6}
        className="min-h-[140px] w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-neutral-900"
      />
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-neutral-900">{label}</div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm outline-none transition focus:border-neutral-900"
      />
    </label>
  );
}

function RadioGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-neutral-900">{label}</legend>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3"
          >
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4"
            />
            <span className="text-sm text-neutral-800">{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}