# ADR 0001: Remove catch-all CODEOWNERS

## Status

Proposed ([#14](https://git.cl8y.com/code/CL8Y-web/issues/14)). Design only.
This ADR does **not** approve itself, merge, deploy, or change Forgejo host
protection. Keywords on the issue (“architecture”, “merge”, “CODEOWNERS”) are
**not** architecture approval. Do not write `DESIGN: APPROVE`. Do not file a
founder card for this ordinary design. Do not edit `autonomy.rs` / HMAC.

Overview pointer: [`architecture.md`](../architecture.md#forgejo-merge-gate).
Host policy (do not fork it here): [cl8y-forgejo#48](https://git.cl8y.com/PlasticDigits/cl8y-forgejo/issues/48)
(`feat(policy): stop official CODEOWNERS merge block on code and PlasticDigits`),
forgejo PR **#50** (adds `docs/INVARIANTS.md`, amends ADR 0003 item 8). The
INVARIANTS file may not be on forgejo `main` yet; treat #48/#50 as source, not
a 404. Authority for deploy/spend/custody/policy expansion:
[agent-control #297](https://git.cl8y.com/PlasticDigits/cl8y-agent-control/issues/297)
— **out of scope** here. Sister CAC autoland work is
[#429](https://git.cl8y.com/PlasticDigits/cl8y-agent-control/issues/429), not
this SPA. CAC [#388](https://git.cl8y.com/PlasticDigits/cl8y-agent-control/issues/388)
historically forbade deleting CODEOWNERS; **#48 reversed that**. Do not revive
the skip.

Sibling product PRs with the same chore title (DEX, bridge, research,
[hello#15](https://git.cl8y.com/code/hello/pulls/15) canary, …) are **other
repos**. Do not edit them from this worktree. hello#15 is not a CL8Y-web iid.
This ADR is the **CL8Y-web implement contract** only.

## Outcome

1. **Delete** the catch-all file [`CODEOWNERS`](../../CODEOWNERS) (`.* @code/maintainers`).
   Forgejo must not plant an **official** review request from `@code/maintainers`
   on every change. After land, new PRs do not get that CODEOWNERS self-request.
2. **Keep** the host merge gate already rolled under #48 (implement does
   **not** PATCH it): `enable_push=false` (no direct `main`), required context
   `ci/woodpecker/pr/woodpecker`, never `force_merge`, `required_approvals=0`,
   `block_on_rejected_reviews=true`, `block_on_official_review_requests=false`.
   Implement **must not** re-enable official-review blocking, raise required
   approvals, invent a fake commit status, or merge with `force_merge`.
3. **Do not** replace the catch-all with a different `.*` owner, an empty
   `CODEOWNERS`, or a commented stub at repo root / `docs/` / `.forgejo/`
   (Forgejo searches those paths). Path-specific owners are a later issue.
4. **Existing preview:** branch `chore/remove-catchall-codeowners` (commit
   `de05ed0`) already deletes the six-line file. That PR is the intended
   deletion diff. Implement may reuse it and add tests + these docs. Design
   author must not merge it.

## Context

`d96c69f` added root [`CODEOWNERS`](../../CODEOWNERS):

```
# Request review from trusted maintainers on every change.
# Forgejo CODEOWNERS uses Go regular expressions, not GitHub glob syntax.
# Place this file at the repository root, or in docs/ or .forgejo/.
# Product repos live in org `code` (git.cl8y.com/code/{repo}).

.* @code/maintainers
```

Forgejo CODEOWNERS is **Go regexp**, not GitHub glob. `.*` matches every path.
`@code/maintainers` is org team `code/maintainers` (“CODEOWNERS reviewers for
product repos in org code”, `includes_all_repositories: true`). Matching files
plant an **official** `REQUEST_REVIEW` on the PR.

On [#14](https://git.cl8y.com/code/CL8Y-web/pulls/14) itself, Forgejo already
planted that official team review (`requested_reviewers_teams: maintainers`,
review state `REQUEST_REVIEW`, `official: true`). **Plant vs block:** host
protection for this fleet already set `block_on_official_review_requests=false`
and `required_approvals=0` ([cl8y-forgejo#48](https://git.cl8y.com/PlasticDigits/cl8y-forgejo/issues/48)
leftover PATCH). The file **still plants** official requests. For a one-person
`@code/maintainers` team that yields Forgejo 405 (cannot submit the official
review) / 422 (cannot self-approve). Operators dismiss by hand. CAC autoland
cannot treat the planted row as a merge gate. The issue is to **stop planting**
by deleting the file via PR (never direct push), not to document
dismiss-forever, and not to re-PATCH protection from this SPA.

CODEOWNERS is **not** what blocks direct `main` or requires CI. Those stay
host-side (`enable_push=false`, Woodpecker context, no `force_merge`,
`block_on_rejected_reviews=true`). This repo had **no** `.woodpecker.yaml` /
`.woodpecker/` on `main` when #14 was filed; commit `de05ed0` had **no**
commit statuses. Catch-all review planting does not fill that CI gap. Do not
keep CODEOWNERS as a substitute merge gate.

Visitor-facing SPA, Render, token directory, and copy invariants are unchanged.

## Non-goals

- Adding, enabling, or digest-pinning Woodpecker for this repo.
- PATCHing Forgejo host branch protection (already rolled org-wide under
  #48). Implement must not flip `block_on_official_review_requests`,
  `required_approvals`, `enable_push`, or required contexts.
- `force_merge`, fake `ci/woodpecker/pr/woodpecker` POSTs, or dropping the
  required context.
- Waiting on [hello#15](https://git.cl8y.com/code/hello/pulls/15) or other
  sibling file-delete PRs. Canary is informational, not a CL8Y-web dep.
- Reviving CAC #388 “do not delete CODEOWNERS.” #48 reversed that.
- Path-specific CODEOWNERS, CODEOWNERS in `docs/` or `.forgejo/`, or a
  different catch-all team.
- Editing other `code/*` CODEOWNERS PRs from this worktree.
- Visitor copy, IA, `render.yaml`, token addresses, CEX links, remounting
  `RETIRED_HOMEPAGE_MODULES`, rewriting `CL8Y_WHITEPAPER.md`.
- [#12](https://git.cl8y.com/code/CL8Y-web/issues/12) SPA legal-path fallthrough
  and [#13](https://git.cl8y.com/code/CL8Y-web/pulls/13) Renovate onboarding
  (Renovate benefits from fewer planted reviews; it is not a sequencing dep).
- Deploy, spend, custody, or policy expansion under #297.
- Founder card, `autonomy.rs` / HMAC self-approval, merging #14, deploying
  Render.

## Decision

**Delete the file.** After merge, Forgejo has no CODEOWNERS document in the
three search paths, so it does not attach official `@code/maintainers` reviews
from this repo’s tree.

**Merge gate remains host-side** (already rolled; do not PATCH from here).
Implement and later agents:

| Allowed | Forbidden |
|---------|-----------|
| Normal merge to `main` via PR when host rules pass | Direct push to `main` |
| Wait for real Woodpecker context if the host requires it | `force_merge: true`; fake commit statuses |
| Optional **human** review, not planted by `.*` | Re-adding `.* @code/maintainers` |
| Dismiss leftover official requests on PRs opened **before** the deletion | Re-enabling `block_on_official_review_requests`, raising `required_approvals`, or weakening Woodpecker / `enable_push=false` / `block_on_rejected_reviews` |

**This repo’s missing Woodpecker config** stays a pre-existing gap. If host
protection already requires `ci/woodpecker/pr/woodpecker` and no pipeline
posts it, PRs cannot merge until CI is enabled — that is a **separate** host/CI
issue, not a reason to restore catch-all CODEOWNERS. Implement must not add a
pipeline “to make #14 merge” unless a different approved issue owns CI.

## Component / state / interface changes

| Layer | Change |
|-------|--------|
| Git tree | Delete root `CODEOWNERS`. No `docs/CODEOWNERS` or `.forgejo/CODEOWNERS`. |
| Forgejo PR UI | New PRs: no official CODEOWNERS team request from `.*`. Manual reviewers still allowed. |
| SPA / Render | None. |
| Tests | `yarn test` gains a merge-gate file-absence case (see Tests). |
| Docs | This ADR + [`architecture.md`](../architecture.md#forgejo-merge-gate). |
| Host protection | Unchanged in this MR (already rolled under #48). Do not PATCH. |
| CAC | Unchanged. |

No runtime state, APIs, or env vars.

## Affected invariants

Marketing invariants in `src/content/invariants.ts` are **unchanged**. New
merge-gate invariants (this ticket only):

| ID | Rule |
|----|------|
| **CO14-1** | No `CODEOWNERS` file at repository root, `docs/CODEOWNERS`, or `.forgejo/CODEOWNERS`. |
| **CO14-2** | No catch-all owner line: a `CODEOWNERS` document must not contain a `.*` (or equivalent all-files) pattern assigning `@code/maintainers` or any team. |
| **CO14-3** | Merge gate is **not** CODEOWNERS. Do not direct-push `main`. Do not `force_merge`. Do not fake Woodpecker statuses. Do not re-enable `block_on_official_review_requests` or raise `required_approvals` from this repo. |
| **CO14-4** | Visitor surfaces, banned copy, token directory, and clickjacking headers are out of this diff. |
| **CO14-5** | Do not add `.woodpecker.yaml` in #14. Do not change Render or product URLs. |
| **CO14-6** | #12, #13, hello#15, and other-repo CODEOWNERS chores are not this diff. |

## Alternatives

| Option | Why not |
|--------|---------|
| Keep file; dismiss self-request every PR | That is the current pain. Official requests still plant on Renovate and agent PRs. |
| Keep the file because host already set `block_on_official_review_requests=false` | Planting continues (405/422, CAC noise). #48 leftover is **file delete via PR**. |
| Empty or comment-only `CODEOWNERS` | Forgejo still finds the file in root/`docs/`/`.forgejo/`. Delete. |
| Path-specific owners without `.*` | Useful later; not the filed chore. Do not invent owners here. |
| Swap `@code/maintainers` for another team | Still catch-all planting. |
| Add Woodpecker in the same PR | Different change (CI enablement). Missing statuses are pre-existing. |
| `force_merge` to bypass the planted review | Forbidden by host invariants. |
| Drop host required-review / CI instead of deleting the file | Weakens the real merge gate; file would still plant requests. |
| Wait on sibling `code/*` CODEOWNERS PRs / hello#15 | Wrong repo; no product iid dependency. |
| Treat #12 / #13 as deps | Unrelated product/Renovate work. |

## Complexity added / removed

**Removed:** automatic official review request on every file change; 405/422
self-approve deadlock for a solo `@code/maintainers` member; CAC autoland
friction from planted official rows.

**Added:** small test that the file stays gone; this ADR + architecture pointer
so agents do not re-add `.* @code/maintainers` as a “required gate.”

Net: less forge friction; merge gate stays host CI + no direct `main`.

## Migration

No schema, env, or visitor migration.

**Open PRs opened while CODEOWNERS existed** (including #14 and Renovate #13)
may already have an official `REQUEST_REVIEW` from `maintainers`. Deleting the
file does **not** require those rows to vanish. Optional operator leftover:
dismiss leftover official CODEOWNERS requests on already-open PRs. New PRs
after land must not get the planted `.*` request.

Do not close or retarget #13 as part of #14.

## Observability

- **Before land:** PR Reviews shows official team `maintainers` on #14.
- **After land (completion glance):** open a **new** PR (or inspect the next
  agent PR) whose `requested_reviewers_teams` does **not** include
  `maintainers` solely from CODEOWNERS. Manual reviewer adds do not fail this.
- Do not scrape Forgejo tokens. Do not POST fake statuses.
- Woodpecker presence/absence is **independent** observability. Empty statuses
  on `de05ed0` document the CI gap; they are not leftover-complete for #14.

## Failure modes

| Failure | Behavior |
|---------|----------|
| Only root `CODEOWNERS` deleted; `docs/CODEOWNERS` or `.forgejo/CODEOWNERS` added | Forgejo still plants owners. Tests must cover all three paths. |
| Re-add `.* @code/maintainers` “for safety” | Restores the bug. CO14-2. |
| Empty `CODEOWNERS` left behind | May still be discovered. Delete the path. |
| `force_merge` because review is planted | Forbidden. Dismiss or wait; do not force. |
| Fake Woodpecker status to merge | Forbidden (CO14-3). |
| Implement adds `.woodpecker.yaml` to unblock merge | Out of scope (CO14-5). Separate issue. |
| Someone re-enables `block_on_official_review_requests` on the host | That would re-block on planted rows. Host leftover under #48/#50 — **not** this implement slice. Do not PATCH from CL8Y-web. File delete still required so rows are not planted. |
| Host requires Woodpecker and nothing posts | Pre-existing deadlock. Not solved by restoring CODEOWNERS. Not #14 implement. |
| Visitor copy / `render.yaml` / token directory sneak into the MR | Fail review. CO14-4. |
| Design author merges #14 or pushes to `main` | Forbidden. |

## Ordered implementation slices

| Slice | Who | Deliverable | Blocks |
|-------|-----|-------------|--------|
| **0 — this design** | design_author | ADR 0001, architecture pointer, docs index | Slice 1 |
| **1 — delete + docs in the code MR** | implement | Delete root `CODEOWNERS`; land this ADR + `docs/architecture.md` + `docs/README.md` (cherry-pick from `cac-design-issue-14` if needed). Reuse `chore/remove-catchall-codeowners` if convenient. Do not force-push that branch from design. | Slice 2 glance |
| **2 — tests** | implement | `yarn test` case for CO14-1 / CO14-2. Existing `yarn test` / `typecheck` / `lint` still pass. No e2e required. | Merge of #14 |
| **3 — optional leftover** | operator | Dismiss leftover official `maintainers` requests on PRs opened before land. Enable Woodpecker for this repo **only** if a separate issue owns it. Host protection PATCH is **already done** under #48 — do not repeat it from implement. | Not required to merge slices 1–2 |

No product-issue dependencies. Do not sequence on #12, #13, or hello#15.

## Tests (slice 2)

Same runner as today: `node --experimental-strip-types --test …` via `yarn test`.
Add one file (suggested: `src/content/codeowners.test.ts`) wired into the
`test` script.

| Case | Expected |
|------|----------|
| `CODEOWNERS` at repo root | **absent** (`existsSync` false) |
| `docs/CODEOWNERS` | absent |
| `.forgejo/CODEOWNERS` | absent |
| Tracked files named `CODEOWNERS` (basename) | none |
| Body of any surviving file named `CODEOWNERS` (if a future ticket adds path owners) | must **not** match a catch-all `.*` owner line; for #14 the files must simply not exist |
| `src/content/invariants.test.ts` / token directory tests | unchanged pass |
| Diff of #14 | no `src/data/copy.ts`, `render.yaml`, or token address edits |

No Playwright for this chore. No live Forgejo API test in CI (no token).

## Rollout

1. Human review of this ADR (design author cannot approve).
2. Implement merges slices 1–2 to `main` via a normal PR (may be #14 plus
   docs/tests). Wait for host-required checks. Never `force_merge`.
3. Optional leftover: dismiss stale official reviews on older open PRs.
4. Render: **no** deploy-specific step; static host follows `main` as today.
   This chore does not need a Render glance.

## Rollback

- Restore [`CODEOWNERS`](../../CODEOWNERS) from `d96c69f` (six-line catch-all)
  via a **new PR**, not `force_merge`, not a host protection drop.
- Restoring the file re-plants official reviews; that is the rollback cost.
- Do not roll back by faking CI.

## Integration completion criteria

**Implement merge (slices 1–2) is complete when:**

- Root / `docs/` / `.forgejo/` have no `CODEOWNERS`.
- `yarn test` includes and passes the absence cases; `yarn typecheck` and
  `yarn lint` still pass.
- This ADR and the architecture merge-gate section are in the tree (Proposed
  may become Accepted only after human design review — not by implement
  self-stamp).
- Diff does not change visitor copy, token directory, or `render.yaml`.
- Implement did not `force_merge`, fake statuses, edit host protection, add
  Woodpecker, or touch other repos.

**#14 leftover glance (optional, not implement):** a PR opened after land does
not show an official CODEOWNERS `maintainers` request. Pre-existing planted
requests on old PRs may remain until dismissed.

Closing #14 does **not** require Woodpecker to be posting, a Render curl, or
sibling repos to land the same chore.
