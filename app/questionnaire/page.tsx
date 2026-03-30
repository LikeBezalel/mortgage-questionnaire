import { QuestionnaireForm } from "@/components/questionnaire-form";

export default function QuestionnairePage() {
  return (
    <main className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <div className="inline-flex rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600">
            Mortgage OS Discovery
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-950">
            Jason Project Questionnaire
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-neutral-600">
            This form is designed to align the product vision, lock the MVP, and
            define the first version of the system clearly enough for design and
            development.
          </p>
        </div>

        <QuestionnaireForm />
      </div>
    </main>
  );
}