### Branch Protection Rules for "main"

## Rules in Place

# 1. Pull Requests Required

- All changes to "main" must go through a pull request.
- Direct pushes to "main" are blocked.

# 2. Minimum 1 Approval

- A pull request needs at least 1 approval from another team member before it can be merged.

# 3. Tests Must Pass

- Pull requests will only be mergeable if the "Tests CI" workflow passes.
- Make sure your branch passes "npm test" before requesting a review.

# 4. Force Pushes Blocked

- Force pushing to "main" is disabled to protect commit history.

# 5. Deletions Blocked

- The "main" branch cannot be deleted accidentally.

---

# Tips for Working with These Rules

- Always create a feature branch from "main" before starting work.
- Push your changes and open a pull request when ready.
- Tag someone for review.
- If your PR falls behind "main", you may need to "git merge main" into your branch.
