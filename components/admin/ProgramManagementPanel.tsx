"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  listProgramWeekAssignments,
  removeWeekFromGroups,
  type AdminGroupSummary,
  type ProgramWeekAssignment
} from "@/lib/services/dataClient";

export function ProgramManagementPanel({
  groups,
  onProgramChanged
}: {
  groups: AdminGroupSummary[];
  onProgramChanged: () => void;
}) {
  const [assignments, setAssignments] = useState<ProgramWeekAssignment[]>([]);
  const [assignmentStatus, setAssignmentStatus] = useState("Loading team assignments...");
  const [message, setMessage] = useState("");
  const [removingKey, setRemovingKey] = useState("");

  const refreshAssignments = useCallback(async () => {
    if (groups.length === 0) {
      setAssignments([]);
      setAssignmentStatus("Create a team before managing weekly missions.");
      return;
    }

    setAssignmentStatus("Loading team assignments...");
    const result = await listProgramWeekAssignments(groups);

    if (!result.ok) {
      setAssignments([]);
      setAssignmentStatus(result.error);
      return;
    }

    setAssignments(result.data);
    setAssignmentStatus(result.data.length > 0 ? "" : "No teams found.");
  }, [groups]);

  useEffect(() => {
    void refreshAssignments();
  }, [refreshAssignments]);

  async function removeWeekFromGroup(input: {
    groupId: string;
    groupName: string;
    title: string;
    weekNumber: number;
  }) {
    if (!window.confirm(`Remove Week ${input.weekNumber}: ${input.title} from ${input.groupName}?`)) {
      return;
    }

    setMessage("");
    setRemovingKey(`${input.groupId}:${input.weekNumber}`);
    const result = await removeWeekFromGroups({ groupIds: [input.groupId], weekNumber: input.weekNumber });
    setRemovingKey("");

    if (!result.ok) {
      setMessage(result.error);
      return;
    }

    setMessage(result.data);
    await refreshAssignments();
    onProgramChanged();
  }

  return (
    <section className="panel stack">
      <div className="row">
        <h2>Deep Roots week assignments</h2>
        <div className="row">
          <Link className="button" href="/admin/programs/import">
            Import weekly mission
          </Link>
          <Link className="button secondary" href="/admin/programs/audit">
            Audit log
          </Link>
        </div>
      </div>

      <section className="section-block stack">
        {assignments.length > 0 ? (
          <ul className="list">
            {assignments.map((assignment) => (
              <li key={assignment.groupId}>
                <details className="group-accordion">
                  <summary className="group-accordion-summary">
                    <span className="group-accordion-name">{assignment.groupName}</span>
                    <span className="muted group-accordion-count">
                      {assignment.weeks.length} active {assignment.weeks.length === 1 ? "week" : "weeks"}
                    </span>
                  </summary>
                  <div className="group-accordion-body">
                    {assignment.weeks.length > 0 ? (
                      <ul className="assignment-week-list">
                        {assignment.weeks.map((week) => (
                          <li className="assignment-week-row" key={`${assignment.groupId}:${week.weekNumber}`}>
                            <div>
                              <strong>Week {week.weekNumber}: {week.title}</strong>
                              <p className="muted">Published {formatDate(week.publishedAt)}</p>
                            </div>
                            <button
                              className="button secondary"
                              disabled={removingKey === `${assignment.groupId}:${week.weekNumber}`}
                              onClick={() =>
                                void removeWeekFromGroup({
                                  groupId: assignment.groupId,
                                  groupName: assignment.groupName,
                                  title: week.title,
                                  weekNumber: week.weekNumber
                                })
                              }
                              type="button"
                            >
                              {removingKey === `${assignment.groupId}:${week.weekNumber}` ? "Removing..." : "Remove"}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="muted">No active Deep Roots weeks assigned.</p>
                    )}
                  </div>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <p className="muted">{assignmentStatus}</p>
        )}
      </section>

      {message ? <p>{message}</p> : null}
    </section>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium"
  }).format(new Date(value));
}
