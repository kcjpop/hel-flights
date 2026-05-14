## Notes

- 20260514: Cached install DuckDB in workflow and created a share job for both cron and manual data fetching.
- 20260510: Rebuild the UI with Preact.
- 20251019: Task failed because the database grew larger than 100MB. Thought data for one month is under that limit, but it seemed not. Changed to split database by weeks.
