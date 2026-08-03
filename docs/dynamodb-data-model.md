# DynamoDB Data Model

The app uses AWS Amplify Gen 2 Data. Each `a.model()` in `amplify/data/resource.ts` is backed by its own DynamoDB table and Amplify-managed resolvers. Journal answer text is encrypted in the browser before any write.

## Models

| Model | Identifier | Purpose |
| --- | --- | --- |
| `UserProfile` | `userId` | Display name, email, timestamps, and wrapped journal key envelope metadata. |
| `Group` | `groupId` | Team name, join code metadata, active program id, creator, and leader ids. |
| `GroupMembership` | `membershipId` | User-to-team membership with role and display name. |
| `ProgramSnapshot` | `programId` | Full imported program content for compatibility with earlier whole-program publishing. |
| `GroupProgramWeek` | `weekSnapshotId` | Active immutable week content assigned to a group. Replacement creates a new record and deactivates prior active records for that group/week. |
| `ProgramAuditEvent` | `eventId` | Import, replacement, and removal audit entries. |
| `SectionProgress` | `progressId` | Per-user completion and point metadata for sections. |
| `EncryptedAnswer` | `answerId` | Per-user encrypted reflection content plus encryption metadata. |
| `UserScore` | `scoreId` | Derived weekly and cumulative user scores used by team and program leaderboards. |
| `LeaderMetric` | `metricId` | Aggregate participation metrics reserved for leader/admin views. |

## Access Patterns

- Authenticated users read group metadata, their memberships, active week content, and score rows.
- Members write only their own encrypted answers, section progress, score sync, profile, and membership actions.
- Joining a team goes through the `joinGroupByCode` function, which hashes the submitted code server-side and creates a membership.
- Score rows are updated through `syncUserScore`, which recalculates from persisted section progress.
- Display name changes update profile, membership, Cognito preferred username best-effort, and score display names through `syncDisplayName`.
- Leaders and admins manage groups, active weeks, and program audit records.
- Admins manage Cognito `ADMINS` group membership through `manageAdminUsers`.

## Security Notes

- Plaintext reflection answers must never be sent to APIs, logs, analytics, or DynamoDB.
- `EncryptedAnswer` rows store ciphertext, IV, salt, algorithm metadata, and prompt identity only.
- Leaders and admins must not receive another user’s plaintext reflections.
- Program audit events must not include journal answer content.
- `UserScore` and `SectionProgress` contain point and completion metadata only.
- Group-scoped leader authorization is still a known gap; current `LEADERS` access is broader than the long-term target.
