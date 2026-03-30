import { z } from "zod";

export const questionnaireSchema = z.object({
  respondent_name: z.string().min(1, "Name is required"),
  respondent_email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  company_name: z.string().optional().or(z.literal("")),

  alignment_confirmed: z.enum([
    "Yes — this matches my vision",
    "Mostly — but I would adjust some things",
    "No — I see this differently",
  ]),
  alignment_notes: z.string().optional().or(z.literal("")),

  top_3_features: z.string().min(1, "Required"),
  version_1_win: z.string().min(1, "Required"),
  day_1_success: z.string().min(1, "Required"),

  daily_actions: z.string().min(1, "Required"),
  call_list_ideal: z.string().min(1, "Required"),
  manager_review_items: z.string().min(1, "Required"),

  lead_stages: z.string().min(1, "Required"),
  loan_stages: z.string().min(1, "Required"),
  stage_triggers: z.string().min(1, "Required"),
  stage_owners: z.string().min(1, "Required"),

  v1_roles: z.string().min(1, "Required"),
  role_permissions: z.string().min(1, "Required"),

  daily_kpis: z.string().min(1, "Required"),
  weekly_kpis: z.string().min(1, "Required"),
  lo_performance_definition: z.string().min(1, "Required"),
  company_profit_definition: z.string().min(1, "Required"),

  lo_profitability_formula: z.string().min(1, "Required"),
  lo_direct_costs: z.string().min(1, "Required"),
  company_wide_costs: z.string().min(1, "Required"),

  mobile_priority: z.enum(["Critical", "Important", "Not important"]),
  mobile_full_workflow: z.string().min(1, "Required"),
  mobile_fast_actions: z.string().min(1, "Required"),

  top_3_automations: z.string().min(1, "Required"),
  ai_best_uses: z.string().min(1, "Required"),
  human_controlled_items: z.string().min(1, "Required"),

  integration_timing: z.enum([
    "Immediately",
    "After core system is built",
    "Later",
  ]),
  long_term_required_systems: z.string().min(1, "Required"),

  biggest_problem_first: z.string().min(1, "Required"),
  success_30_60_days: z.string().min(1, "Required"),
  pitch_timeline: z.enum([
    "ASAP",
    "After internal testing",
    "Much later",
  ]),

  most_broken_today: z.string().min(1, "Required"),
  build_from_start_notes: z.string().optional().or(z.literal("")),
});

export type QuestionnaireInput = z.infer<typeof questionnaireSchema>;