import { createAdminSupabaseClient } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

type ResponseRow = {
  id: string;
  created_at: string;
  respondent_name: string;
  respondent_email: string | null;
  company_name: string | null;

  alignment_confirmed: string;
  alignment_notes: string | null;

  top_3_features: string;
  version_1_win: string;
  day_1_success: string;

  daily_actions: string;
  call_list_ideal: string;
  manager_review_items: string;

  lead_stages: string;
  loan_stages: string;
  stage_triggers: string;
  stage_owners: string;

  v1_roles: string;
  role_permissions: string;

  daily_kpis: string;
  weekly_kpis: string;
  lo_performance_definition: string;
  company_profit_definition: string;

  lo_profitability_formula: string;
  lo_direct_costs: string;
  company_wide_costs: string;

  mobile_priority: string;
  mobile_full_workflow: string;
  mobile_fast_actions: string;

  top_3_automations: string;
  ai_best_uses: string;
  human_controlled_items: string;

  integration_timing: string;
  long_term_required_systems: string;

  biggest_problem_first: string;
  success_30_60_days: string;
  pitch_timeline: string;

  most_broken_today: string;
  build_from_start_notes: string | null;
};

export default async function ResponsesPage() {
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from("questionnaire_responses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          Failed to load responses: {error.message}
        </div>
      </main>
    );
  }

  const responses = (data || []) as ResponseRow[];

  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">Questionnaire Responses</h1>
          <p className="mt-2 text-neutral-600">
            {responses.length} total submission{responses.length === 1 ? "" : "s"}.
          </p>
        </div>

        <div className="space-y-6">
          {responses.map((response) => (
            <article
              key={response.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 border-b border-neutral-200 pb-4">
                <h2 className="text-2xl font-semibold">{response.respondent_name}</h2>
                <p className="mt-1 text-sm text-neutral-600">
                  {response.respondent_email || "No email"}
                  {response.company_name ? ` • ${response.company_name}` : ""}
                  {" • "}
                  {new Date(response.created_at).toLocaleString()}
                </p>
              </div>

              <div className="grid gap-4">
                <Field label="Alignment" value={response.alignment_confirmed} />
                <Field label="Alignment notes" value={response.alignment_notes} />
                <Field label="Top 3 features" value={response.top_3_features} />
                <Field label="Version 1 win" value={response.version_1_win} />
                <Field label="Day 1 success" value={response.day_1_success} />
                <Field label="Daily actions" value={response.daily_actions} />
                <Field label="Ideal call list" value={response.call_list_ideal} />
                <Field label="Manager review items" value={response.manager_review_items} />
                <Field label="Lead stages" value={response.lead_stages} />
                <Field label="Loan stages" value={response.loan_stages} />
                <Field label="Stage triggers" value={response.stage_triggers} />
                <Field label="Stage owners" value={response.stage_owners} />
                <Field label="V1 roles" value={response.v1_roles} />
                <Field label="Role permissions" value={response.role_permissions} />
                <Field label="Daily KPIs" value={response.daily_kpis} />
                <Field label="Weekly KPIs" value={response.weekly_kpis} />
                <Field
                  label="LO performance definition"
                  value={response.lo_performance_definition}
                />
                <Field
                  label="Company profit definition"
                  value={response.company_profit_definition}
                />
                <Field
                  label="LO profitability formula"
                  value={response.lo_profitability_formula}
                />
                <Field label="LO direct costs" value={response.lo_direct_costs} />
                <Field label="Company-wide costs" value={response.company_wide_costs} />
                <Field label="Mobile priority" value={response.mobile_priority} />
                <Field
                  label="Mobile full workflow"
                  value={response.mobile_full_workflow}
                />
                <Field label="Mobile fast actions" value={response.mobile_fast_actions} />
                <Field label="Top 3 automations" value={response.top_3_automations} />
                <Field label="Best AI uses" value={response.ai_best_uses} />
                <Field
                  label="Human-controlled items"
                  value={response.human_controlled_items}
                />
                <Field label="Integration timing" value={response.integration_timing} />
                <Field
                  label="Required long-term systems"
                  value={response.long_term_required_systems}
                />
                <Field
                  label="Biggest problem first"
                  value={response.biggest_problem_first}
                />
                <Field label="30–60 day success" value={response.success_30_60_days} />
                <Field label="Pitch timeline" value={response.pitch_timeline} />
                <Field label="Most broken today" value={response.most_broken_today} />
                <Field
                  label="Build from start notes"
                  value={response.build_from_start_notes}
                />
              </div>
            </article>
          ))}

          {responses.length === 0 ? (
            <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-neutral-600">
              No submissions yet.
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;

  return (
    <div className="rounded-xl border border-neutral-200 p-4">
      <div className="mb-2 text-sm font-semibold text-neutral-900">{label}</div>
      <div className="whitespace-pre-wrap text-sm leading-6 text-neutral-700">
        {value}
      </div>
    </div>
  );
}