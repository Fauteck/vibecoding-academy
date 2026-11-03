> Lesen: bei langen Sessions, großen Aufgaben (> 10 Dateien), breiter Codebase-Recherche oder Stream-Timeouts.

## 2. Working Style for Long Sessions (API Stability)

> Goal: Avoid stream timeouts (`Stream idle timeout — partial response received`).
> The cause is single long operations without intermediate output,
> not the number of parallel tool calls.

### Keep Output Small

- Filter bash output: `head -n 100`, `tail -n 100`, `grep -E '...'`,
  `wc -l` instead of full logs/dumps.
- Read large files in segments (`Read` with `offset`/`limit`),
  not completely.
- No `find . | ...` dumps of entire project trees — use targeted
  `find`/`rg` queries with path filters.

### Don't Block Synchronously on Long Runs

- Start builds, tests, installations as background tasks
  (`run_in_background: true`), don't wait in the foreground.
- Set realistic timeouts for bash calls; hanging processes should
  abort quickly rather than silently blocking the stream.
- No `sleep` loops or poll-busy-waits in the main thread.

### Protect Context

- For broad codebase research (> 3 queries, unclear scope) use the
  `Explore` subagent — it encapsulates large search results and returns
  only a summary.
- For design decisions use the `Plan` subagent before making extensive edits.

### Efficient, Not Cautious

- Run independent tool calls in parallel in one message (e.g.,
  multiple `Read`s or `grep`s) — this reduces total time and thus
  the probability of timeout.
- Sequential only when one call depends on the result of the previous.

### Structure Large Tasks

- Break tasks with many file changes (> 10 files or > 3 logically
  separate sub-steps) into clear sub-steps, each as a self-contained
  unit with an intermediate result.
- Use `TodoWrite` to keep progress visible and resume seamlessly
  after interruptions.
