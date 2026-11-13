/**
 * Imports the committee-provided 2026-28 JSON export into the site's shared batch schema.
 * Candidate submission timestamps and internal review flags are intentionally not published.
 *
 * Usage: npx tsx scripts/import-2026-28.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { batchSchema, type InterviewRecord } from "../src/lib/schema.ts";

interface RawRecord {
  record_id: string;
  batch: string;
  candidate: {
    name: string;
    application_id: string | null;
    linkedin_url: string | null;
  };
  scores: {
    written_score: number | null;
    pre_interview_score: number | string | null;
  };
  profile: {
    undergraduate_college: string;
    undergraduate_background: string | null;
    graduation_year: number | string | null;
    undergraduate_stream: string;
    masters_degree: string;
    postgraduate_college: string | null;
    postgraduate_graduation_year: number | string | null;
    postgraduate_stream: string | null;
    work_experience: string;
    work_experience_domain: string;
    organizations: string | null;
    prior_coding_experience: string;
  };
  preparation: {
    written_exam_resources: string | null;
    interview_preparation_resources: string | null;
  };
  interview: {
    work_experience_profile_questions: string[];
    mathematics_statistics_questions: string[];
    coding_ml_questions: string[];
    current_affairs_general_knowledge: string[];
    logical_reasoning_puzzles: string[];
    interview_difficulty: number | null;
    written_exam_difficulty: number | null;
  };
  additional_information: {
    alternate_program_offers: string | null;
    tips_for_aspirants: string[];
  };
}

interface RawBatch {
  batch: string;
  records: RawRecord[];
}

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");
const sourcePath = join(root, "archive", "2026-28_old_raw.json");
const outputPath = join(root, "src", "data", "batches", "2026-28.json");
const source = JSON.parse(readFileSync(sourcePath, "utf-8")) as RawBatch;

if (source.batch !== "2026-28" || source.records.length !== 60) {
  throw new Error(`Unexpected source batch or record count in ${sourcePath}`);
}

function optionalText(value: string | number | null): string | undefined {
  if (value === null) return undefined;
  const text = String(value).trim();
  return text || undefined;
}

function optionalScore(value: number | string | null): number | string | undefined {
  if (typeof value === "string") return value.trim() || undefined;
  return value ?? undefined;
}

function formatList(values: string[]): string | undefined {
  const items = values.map((value) => value.trim()).filter(Boolean);
  return items.length ? items.map((item) => `- ${item}`).join("\n") : undefined;
}

function buildRecord(raw: RawRecord): InterviewRecord {
  const r = raw.profile;
  const interview = raw.interview;
  const questions = {
    general: formatList(interview.work_experience_profile_questions),
    mathStats: formatList(interview.mathematics_statistics_questions),
    coding: formatList(interview.coding_ml_questions),
    gk: formatList(interview.current_affairs_general_knowledge),
    logical: formatList(interview.logical_reasoning_puzzles),
  };

  return {
    id: raw.record_id,
    batch: raw.batch,
    sourceFormat: "card-grid",
    name: raw.candidate.name.trim(),
    linkUrl: optionalText(raw.candidate.linkedin_url),
    rollNumber: optionalText(raw.candidate.application_id),
    ugCollege: optionalText(r.undergraduate_college),
    ugBackground: optionalText(r.undergraduate_background),
    gradYear: optionalText(r.graduation_year),
    gradStream: optionalText(r.undergraduate_stream),
    mastersDegree: optionalText(r.masters_degree),
    pgCollege: optionalText(r.postgraduate_college),
    pgYear: optionalText(r.postgraduate_graduation_year),
    pgStream: optionalText(r.postgraduate_stream),
    workExMonths: optionalText(r.work_experience),
    workExBackground: optionalText(r.work_experience_domain),
    organizations: optionalText(r.organizations),
    writtenScore: optionalScore(raw.scores.written_score),
    preInterviewScore: optionalScore(raw.scores.pre_interview_score),
    resourcesWritten: optionalText(raw.preparation.written_exam_resources),
    resourcesInterview: optionalText(raw.preparation.interview_preparation_resources),
    priorCoding: optionalText(r.prior_coding_experience),
    alternatePrograms: optionalText(raw.additional_information.alternate_program_offers),
    questions,
    interviewDifficulty: interview.interview_difficulty ?? undefined,
    writtenDifficulty: interview.written_exam_difficulty ?? undefined,
    tips: formatList(raw.additional_information.tips_for_aspirants),
  };
}

const batch = {
  batch: source.batch,
  label: "Batch 2026-28",
  publishedNote:
    "Candidate-submitted experiences. Missing optional scores are omitted; text and range scores are shown as submitted, without numeric interpretation.",
  records: source.records.map(buildRecord),
};
const parsed = batchSchema.safeParse(batch);

if (!parsed.success) {
  console.error("Imported batch failed schema validation:");
  console.error(parsed.error.format());
  process.exitCode = 1;
} else {
  writeFileSync(outputPath, `${JSON.stringify(parsed.data, null, 2)}\n`);
  console.log(`Imported ${parsed.data.records.length} records to ${outputPath}`);
}
