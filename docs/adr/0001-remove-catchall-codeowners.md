# ADR 0001: Remove catch-all CODEOWNERS

## Status

Proposed ([#14](https://git.cl8y.com/code/CL8Y-web/issues/14)). Design only.
Revises `48bad707e5aa9bfdac48f15baca3444670ebccb7`. This ADR does **not**
approve itself, merge, deploy, or change Forgejo host protection. Keywords on
the issue (“architecture”, “merge”, “CODEOWNERS”) are **not** architecture
approval. Do not write `DESIGN: APPROVE`. Do not file a founder card for this
ordinary design. Do not edit `autonomy.rs` / HMAC.

Standing keep-set, four search paths, and dated protection GET:
[`architecture.md`](../architecture.md#forgejo-merge-gate). Do not duplicate
that table here.

Host policy (do not fork it here): [cl8y-forgejo#48](https://git.cl8y.com/PlasticDigits/cl8y-forgejo/issues/48)
(`feat(policy): stop official CODEOWNERS merge block on code and PlasticDigits`),
forgejo PR **#50** (lands `docs/INVARIANTS.md` on forgejo `main`, amends ADR
0003 item 8). INVARIANTS is on `main`; do not treat it as a 404.
Authority for deploy/spend/custody/policy expansion:
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

**One merge/close contract** (Alternative: no named CL8Y-web Woodpecker iid
exists as of 2026-09-21; issue 15 404. Preferred would add `DEPS: <iid>` when
that issue exists):

1. **Delete** the catch-all file [`CODEOWNERS`](../../CODEOWNERS)
   (`.* @code/maintainers`). Forgejo must not plant an **official** review
   request from `@code/maintainers` on every change. After the delete is on
   `main`, new PRs do not get that CODEOWNERS self-request.
2. **Keep** the host merge gate already rolled under #48 (implement does
   **not** PATCH it). Values: [`architecture.md`](../architecture.md#forgejo-merge-gate)
   dated GET. Implement **must not** re-enable official-review blocking, raise
   required approvals, invent a fake commit status, or merge with
   `force_merge`.
3. **Do not** replace the catch-all with a different `.*` owner, an empty
   `CODEOWNERS`, or a commented stub at any of the **four** Forgejo search
   paths: root `CODEOWNERS`, `docs/CODEOWNERS`, `.gitea/CODEOWNERS`,
   `.forgejo/CODEOWNERS`. Path-specific owners are a later issue.
4. **Land vehicle is one product-PR tip.** [#14](https://git.cl8y.com/code/CL8Y-web/pulls/14)
   (`issues/14` and `pulls/14` share the number) or a successor ships **on one
   tip**: delete + this ADR + `docs/architecture.md` + `docs/README.md` +
   `AGENTS.md` pointer + `src/content/codeowners.test.ts` **and** the
   `package.json` `test` script argv change. Branch
   `chore/remove-catchall-codeowners` at `de05ed0` deletes only the six-line
   file — **incomplete**; do not merge it as-is. `cac-design-issue-14` is
   transport only; do not merge it docs-only.
5. **File-delete implement may complete on that branch. #14 stays open until
   a named CI issue greens `ci/woodpecker/pr/woodpecker` on that tip.** Slice 2
   (tests) does **not** unblock merge. Closing #14 **requires** the required
   context to post. Do not add `.woodpecker.yaml` in the CODEOWNERS diff
   (CO14-5). Do **not** say closing #14 does not need Woodpecker to post.

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

Forgejo loads the **first existing** file among four paths (hello canary
**H15-1**; `.forgejo/` is forgejo#8773; `.gitea/` remains in the walk even
though host INVARIANTS §8 still names three). Product tests in this repo must
cover `.gitea/CODEOWNERS` because Forgejo will plant from it.

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
host-side (`enable_push=false`, `enable_status_check=true`, Woodpecker context
**equal** `["ci/woodpecker/pr/woodpecker"]`, no `force_merge`,
`block_on_rejected_reviews=true`). Dated GET:
[`architecture.md`](../architecture.md#forgejo-merge-gate).

This repo had **no** `.woodpecker.yaml` / `.woodpecker/` on `main` when #14
was filed. Commit `de05ed0` (current PR #14 head) has **empty** commit
statuses (`GET .../statuses/de05ed0` count 0). Host protection still requires
the Woodpecker context, so that tip cannot merge today. Catch-all review
planting does not fill that CI gap. Do not keep CODEOWNERS as a substitute
merge gate. Do not close #14 while that context is absent.

`package.json` `scripts.test` is an **explicit** file list
(`invariants.test.ts`, `tokenDirectory.test.ts`, `copyText.test.ts`). A new
`src/content/codeowners.test.ts` never runs unless that argv is edited on the
same product-PR tip.

Visitor-facing SPA, Render, token directory, and copy invariants are unchanged.

## Non-goals

- Adding `.woodpecker.yaml` / `.woodpecker/` **inside the CODEOWNERS product
  PR**. Enablement is a **named** CL8Y-web (or host/CI) issue when one exists;
  none exists in this repo as of 2026-09-21. That other iid owns the pipeline.
- PATCHing Forgejo host branch protection (already rolled org-wide under
  #48). Implement must not flip `block_on_official_review_requests`,
  `required_approvals`, `enable_push`, `enable_status_check`, or required
  contexts.
- `force_merge`, fake `ci/woodpecker/pr/woodpecker` POSTs, or dropping the
  required context.
- Waiting on [hello#15](https://git.cl8y.com/code/hello/pulls/15) or other
  sibling file-delete PRs. Canary is informational, not a CL8Y-web dep.
- Reviving CAC #388 “do not delete CODEOWNERS.” #48 reversed that.
- Path-specific CODEOWNERS, CODEOWNERS in `docs/` / `.gitea/` / `.forgejo/`,
  or a different catch-all team.
- Editing other `code/*` CODEOWNERS PRs from this worktree.
- Visitor copy, IA, `render.yaml`, token addresses, CEX links, remounting
  `RETIRED_HOMEPAGE_MODULES`, rewriting `CL8Y_WHITEPAPER.md`.
- [#12](https://git.cl8y.com/code/CL8Y-web/issues/12) SPA legal-path fallthrough
  and [#13](https://git.cl8y.com/code/CL8Y-web/pulls/13) Renovate onboarding
  (Renovate benefits from fewer planted reviews; it is not a sequencing dep).
- Deploy, spend, custody, or policy expansion under #297.
- Founder card, `autonomy.rs` / HMAC self-approval, merging #14, deploying
  Render.
- Merging `cac-design-issue-14` as a docs-only PR.

## Decision

**Delete the file.** After the delete is on `main`, Forgejo has no CODEOWNERS
document in the four search paths, so it does not attach official
`@code/maintainers` reviews from this repo’s tree.

**Merge gate remains host-side** (already rolled; do not PATCH from here).
Implement and later agents:

| Allowed | Forbidden |
|---------|-----------|
| Prepare the one product-PR tip (delete + docs + tests + `package.json` argv) | Merge or close #14 while `ci/woodpecker/pr/woodpecker` has not posted on that tip |
| Normal merge to `main` via PR **after** the required context posts | Direct push to `main`; `force_merge: true`; fake commit statuses |
| Optional **human** review, not planted by `.*` | Re-adding `.* @code/maintainers` |
| Dismiss leftover official requests on PRs opened **before** the deletion | Re-enabling `block_on_official_review_requests`, raising `required_approvals`, or weakening Woodpecker / `enable_push=false` / `enable_status_check=true` / `block_on_rejected_reviews` |
| Rebase the product PR onto `main` **after** a separate CI issue lands a pipeline | Add `.woodpecker.yaml` in the CODEOWNERS diff (CO14-5) |

**Woodpecker is a merge leftover, not an in-diff deliverable.** Host
`enable_status_check=true` already requires `ci/woodpecker/pr/woodpecker`. No
pipeline posts it on `de05ed0`. File-delete + docs + tests may finish on the
branch; **slice 2 does not unblock merge**; **#14 stays open until a named CI
issue greens that context**. Closing #14 requires the context to post. When
that CI issue exists, leftover records its iid (`DEPS: <iid>`). This design
lists no `DEPS` because no such positive CL8Y-web iid exists today.

## Component / state / interface changes

| Layer | Change |
|-------|--------|
| Git tree | Delete root `CODEOWNERS`. No `docs/CODEOWNERS`, `.gitea/CODEOWNERS`, or `.forgejo/CODEOWNERS`. |
| Product PR tip | Same commit set: ADR 0001, `docs/architecture.md`, `docs/README.md`, `AGENTS.md` pointer, `src/content/codeowners.test.ts`, `package.json` `test` argv. |
| Forgejo PR UI | New PRs: no official CODEOWNERS team request from `.*`. Manual reviewers still allowed. |
| SPA / Render | None. |
| Tests | `yarn test` argv **must** include the new file or the case never runs. |
| Docs | This ADR + [`architecture.md`](../architecture.md#forgejo-merge-gate). |
| Host protection | Unchanged in this MR (already rolled under #48). Do not PATCH. |
| CAC | Unchanged. |
| `.woodpecker.yaml` | Unchanged in the #14 diff. |

No runtime state, APIs, or env vars.

## Affected invariants

Marketing invariants in `src/content/invariants.ts` are **unchanged**. New
merge-gate invariants (this ticket only):

| ID | Rule |
|----|------|
| **CO14-1** | No `CODEOWNERS` file at repository root, `docs/CODEOWNERS`, `.gitea/CODEOWNERS`, or `.forgejo/CODEOWNERS`. Extra: tracked basename `CODEOWNERS` is none (not a substitute for naming `.gitea/`). |
| **CO14-2** | No catch-all owner line: a `CODEOWNERS` document must not contain a `.*` (or equivalent all-files) pattern assigning `@code/maintainers` or any team. |
| **CO14-3** | Merge gate is **not** CODEOWNERS. Do not direct-push `main`. Do not `force_merge`. Do not fake Woodpecker statuses. Do not re-enable `block_on_official_review_requests` or raise `required_approvals` from this repo. Do not PATCH `enable_status_check` or `status_check_contexts`. |
| **CO14-4** | Visitor surfaces, banned copy, token directory, and clickjacking headers are out of this diff. |
| **CO14-5** | Do not add `.woodpecker.yaml` / `.woodpecker/` in #14. Do not change Render or product URLs. |
| **CO14-6** | #12, #13, hello#15, and other-repo CODEOWNERS chores are not this diff. |
| **CO14-7** | Closing or merging #14 requires `ci/woodpecker/pr/woodpecker` to have posted success on the product-PR tip. Slice 2 does not satisfy this. |

Keep-set JSON lives in [`architecture.md`](../architecture.md#forgejo-merge-gate).

## Alternatives

| Option | Why not |
|--------|---------|
| Keep file; dismiss self-request every PR | That is the current pain. Official requests still plant on Renovate and agent PRs. |
| Keep the file because host already set `block_on_official_review_requests=false` | Planting continues (405/422, CAC noise). #48 leftover is **file delete via PR**. |
| Empty or comment-only `CODEOWNERS` | Forgejo still finds the file in the four paths. Delete. |
| Path-specific owners without `.*` | Useful later; not the filed chore. Do not invent owners here. |
| Swap `@code/maintainers` for another team | Still catch-all planting. |
| Add Woodpecker in the same PR as the delete | Different change (CI enablement). CO14-5. Owned by a named CI issue when one exists. |
| Merge slices 1–2 while saying close #14 without Woodpecker posting | **Rejected.** That was the prior contradiction. Host already requires the context. |
| `force_merge` to bypass the planted review or empty statuses | Forbidden by host invariants. |
| Drop host required-review / CI instead of deleting the file | Weakens the real merge gate; file would still plant requests. Do not PATCH. |
| Wait on sibling `code/*` CODEOWNERS PRs / hello#15 | Wrong repo; no product iid dependency. |
| Treat #12 / #13 as deps | Unrelated product/Renovate work. |
| Merge `de05ed0` as-is | Missing docs, tests, and `package.json` argv. Incomplete. |
| Merge `cac-design-issue-14` docs-only | Transport branch, not the product PR. |

## Complexity added / removed

**Removed:** automatic official review request on every file change; 405/422
self-approve deadlock for a solo `@code/maintainers` member; CAC autoland
friction from planted official rows.

**Added:** small test that the four paths stay gone, wired into `yarn test`;
this ADR + architecture pointer so agents do not re-add
`.* @code/maintainers` as a “required gate.”

Net: less forge friction; merge gate stays host CI + no direct `main`. Merge
of #14 waits on a real Woodpecker post from a separate CI issue.

## Migration

No schema, env, or visitor migration.

**Open PRs opened while CODEOWNERS existed** (including #14 and Renovate #13)
may already have an official `REQUEST_REVIEW` from `maintainers`. Deleting the
file does **not** require those rows to vanish. Optional operator leftover:
dismiss leftover official CODEOWNERS requests on already-open PRs. New PRs
after the delete is on `main` must not get the planted `.*` request.

Do not close or retarget #13 as part of #14.

`package.json` `test` argv is part of the product tip, not a follow-up.

## Observability

- **Before land:** PR Reviews shows official team `maintainers` on #14.
- **After the delete is on `main`:** a **dedicated** plant-check PR (not #14,
  not “the next agent PR”) whose `requested_reviewers_teams` does **not**
  include `maintainers` solely from CODEOWNERS. Manual reviewer adds do not
  fail this. Optional “next agent PR” is **not** leftover proof.
- **Merge-ready:** `GET .../statuses/{product-tip-sha}` includes context
  `ci/woodpecker/pr/woodpecker` in a success state. Empty statuses on
  `de05ed0` mean #14 is not merge-ready.
- Do not scrape Forgejo tokens. Do not POST fake statuses.
- Protection GET equality is an operator read of the architecture table, not
  inferred from a green scanner. Implement still must not PATCH.

## Failure modes

| Failure | Behavior |
|---------|----------|
| Only root `CODEOWNERS` deleted; `docs/`, `.gitea/`, or `.forgejo/CODEOWNERS` added | Forgejo still plants owners. Tests must cover all **four** paths. |
| Re-add `.* @code/maintainers` “for safety” | Restores the bug. CO14-2. |
| Empty `CODEOWNERS` left behind | May still be discovered. Delete the path. |
| `force_merge` because review is planted or statuses are empty | Forbidden. Dismiss or wait; do not force. |
| Fake Woodpecker status to merge | Forbidden (CO14-3). |
| Implement adds `.woodpecker.yaml` to unblock merge of #14 | Out of scope (CO14-5). Separate named CI issue. |
| Slice 2 claimed to unblock merge / close #14 without the context posting | Violates the single contract (CO14-7). Branch work may be done; #14 stays open. |
| Someone re-enables `block_on_official_review_requests` on the host | That would re-block on planted rows. Host leftover under #48/#50 — **not** this implement slice. Do not PATCH from CL8Y-web. File delete still required so rows are not planted. |
| Host requires Woodpecker and nothing posts | Expected until a CI issue greens the context. Not solved by restoring CODEOWNERS. #14 stays open. |
| Sister-repo re-plant: [cl8y-forgejo#48](https://git.cl8y.com/PlasticDigits/cl8y-forgejo/issues/48) is still open. INVARIANTS §8 / `_ensure_codeowners` / `docs/templates/CODEOWNERS` / `apply_repo_policy.py` put a catch-all back | Leftover is **not** done. Delete again via PR. Do not PATCH protection from this SPA. Do not direct-push `main`. A plant-check from before the re-copy does not count. |
| Visitor copy / `render.yaml` / token directory sneak into the MR | Fail review. CO14-4. |
| Design author merges #14 or pushes to `main` | Forbidden. |
| Merge `de05ed0` or docs-only `cac-design-issue-14` | Incomplete land vehicle. |

## Ordered implementation slices

| Slice | Who | Deliverable | Unblocks |
|-------|-----|-------------|----------|
| **0 — this design** | design_author | ADR 0001, architecture pointer, docs index. Transport on `cac-design-issue-14`. | Slice 1 files on the **product** tip |
| **1 — one product-PR tip (tree)** | implement | On [#14](https://git.cl8y.com/code/CL8Y-web/pulls/14) or a successor: delete root `CODEOWNERS`; copy this ADR + `docs/architecture.md` + `docs/README.md` + `AGENTS.md` pointer from the independently accepted design SHA. Do not merge `de05ed0` as-is. Do not merge `cac-design-issue-14` docs-only. Confirm `test -f` fails on all four paths. | Slice 2 |
| **2 — tests on the same tip** | implement | `src/content/codeowners.test.ts` **and** edit `package.json` `scripts.test` so `yarn test` runs it. Existing `yarn test` / `typecheck` / `lint` still pass. No e2e required. | **Does not unblock merge.** Branch may be implement-complete. |
| **3 — Woodpecker context** | named CI issue (not #14) | Enable Woodpecker so `ci/woodpecker/pr/woodpecker` posts on the product-PR tip. Not required to *author* slices 1–2. **Required to merge or close #14.** Do not add the pipeline in the CODEOWNERS diff. | Merge of #14 |
| **4 — leftover glance** | operator | Dismiss leftover official `maintainers` requests on PRs opened before land. Dedicated plant-check (not “next agent PR”). If apply restores CODEOWNERS, delete again via PR (sister-repo failure mode). Host protection PATCH is **already done** under #48 — do not repeat it from implement. | Leftover-complete; not a substitute for slice 3 |

No product-issue `DEPS` today (`#12` / `#13` / hello#15 are not deps). When a
Woodpecker iid exists in this repo, leftover adds `DEPS: <iid>`.

## Tests (slice 2)

Same runner as today: `node --experimental-strip-types --test …` via `yarn test`.
Add `src/content/codeowners.test.ts` **and** append that path to
`package.json` `"test"`. Without the argv edit the file never runs.

| Case | Expected |
|------|----------|
| `CODEOWNERS` at repo root | **absent** (`existsSync` false) |
| `docs/CODEOWNERS` | absent |
| `.gitea/CODEOWNERS` | absent |
| `.forgejo/CODEOWNERS` | absent |
| Tracked files named `CODEOWNERS` (basename) | none (extra check; does not replace naming `.gitea/` in CO14-1) |
| Body of any surviving file named `CODEOWNERS` (if a future ticket adds path owners) | must **not** match a catch-all `.*` owner line; for #14 the files must simply not exist |
| `src/content/invariants.test.ts` / token directory tests | unchanged pass |
| Diff of #14 | no `src/data/copy.ts`, `render.yaml`, token address, or `.woodpecker.yaml` edits |

No Playwright for this chore. No live Forgejo API test in CI (no token).

## Rollout

1. Human review of this ADR (design author cannot approve).
2. Implement prepares slices 1–2 on **one** product-PR tip (#14 or successor).
   That is branch-complete, not merge.
3. A named CI issue greens `ci/woodpecker/pr/woodpecker` on that tip (rebase
   onto `main` after that pipeline exists, if needed). Never `force_merge`.
   Never fake statuses. Never add the pipeline inside the CODEOWNERS diff.
4. Merge #14 (or successor) via a normal PR **only after** that context posts.
   Closing #14 requires the same post.
5. Optional leftover: dismiss stale official reviews; dedicated plant-check;
   watch for sister-repo re-plant.
6. Render: **no** deploy-specific step; static host follows `main` as today.
   This chore does not need a Render glance.

## Rollback

- Restore [`CODEOWNERS`](../../CODEOWNERS) from `d96c69f` (six-line catch-all)
  via a **new PR**, not `force_merge`, not a host protection drop, not a
  direct push to `main`.
- Restoring the file re-plants official reviews; that is the rollback cost.
- Do not roll back by faking CI or PATCHing protection from this SPA.

## Integration completion criteria

**Branch implement (slices 1–2) is complete when** — this does **not** merge
or close #14:

- Product PR tip contains the delete **and** ADR 0001 **and**
  `docs/architecture.md` **and** `docs/README.md` **and** `AGENTS.md` pointer
  **and** `src/content/codeowners.test.ts` **and** the `package.json` `test`
  argv change. Not `de05ed0` alone. Not docs-only `cac-design-issue-14`.
- All four Forgejo paths have no `CODEOWNERS` (`test -f` fails on root,
  `docs/`, `.gitea/`, `.forgejo/`). Tracked basename `CODEOWNERS` is none.
- `yarn test` includes and passes the absence cases; `yarn typecheck` and
  `yarn lint` still pass.
- Diff does not change visitor copy, token directory, `render.yaml`, or add
  Woodpecker config.
- Implement did not `force_merge`, fake statuses, edit host protection, or
  touch other repos.

**Merge / close of #14 is complete when** (CO14-7):

- `ci/woodpecker/pr/woodpecker` has posted success on the product-PR tip.
- The PR merged to `main` via a normal merge (no `force_merge`, no direct
  push). Closing #14 is that merge; it is **not** allowed while the required
  context is missing.

**Leftover-complete (slice 4; survives a sister-repo re-plant):**

- A dedicated plant-check PR against `main` does not show an official
  CODEOWNERS `maintainers` request. Pre-existing planted requests on old PRs
  may remain until dismissed. “Next agent PR” does not count.
- If `_ensure_codeowners` / `apply_repo_policy.py` / `docs/templates/CODEOWNERS`
  restored a catch-all ([cl8y-forgejo#48](https://git.cl8y.com/PlasticDigits/cl8y-forgejo/issues/48)
  still open), leftover is **not** done: delete again via PR; do not PATCH
  protection from this SPA; do not direct-push `main`.
