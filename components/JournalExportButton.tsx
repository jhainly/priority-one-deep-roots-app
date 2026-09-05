"use client";

import { useState } from "react";
import type { Program } from "@/types/program";

type JournalExportButtonProps = {
  program: Program;
  weekNumber: number;
};

export function JournalExportButton({ program, weekNumber }: JournalExportButtonProps) {
  const [status, setStatus] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const week = program.weeks.find((candidate) => candidate.weekNumber === weekNumber);
  const sourcePdfUrl = week?.sourcePdfUrl?.trim() || getDefaultSourcePdfUrl(weekNumber);

  async function exportSourcePdf() {
    setStatus("");

    if (!week) {
      setStatus("That week is not available in the active Deep Roots mission.");
      return;
    }

    if (!sourcePdfUrl) {
      setStatus("No source PDF has been attached for this week.");
      return;
    }

    setIsExporting(true);

    try {
      if (isLocalAssetUrl(sourcePdfUrl)) {
        const response = await fetch(sourcePdfUrl, { method: "HEAD" });

        if (!response.ok) {
          setStatus("The source PDF for this week could not be found.");
          return;
        }
      }

      const link = document.createElement("a");
      link.href = sourcePdfUrl;
      link.download = `${slugify(program.program.title)}-week-${weekNumber}.pdf`;
      document.body.append(link);
      link.click();
      link.remove();
    } catch {
      setStatus("The source PDF for this week could not be exported.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <>
      <button className="button secondary" disabled={isExporting} onClick={() => void exportSourcePdf()} type="button">
        {isExporting ? "Exporting..." : "Export week PDF"}
      </button>
      {status ? <p className="muted">{status}</p> : null}
    </>
  );
}

function getDefaultSourcePdfUrl(weekNumber: number): string {
  return `/program-pdfs/deep-roots-week-${weekNumber}.pdf`;
}

function isLocalAssetUrl(value: string): boolean {
  return value.startsWith("/") && !value.startsWith("//");
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
