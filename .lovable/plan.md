

## Fix: GitHub Actions not triggering on push

### Problem
All 3 workflows (`build.yml`, `test.yml`, `lint.yml`) are configured to trigger on pushes to branch **`master`**, but Lovable pushes to branch **`main`**. So the Actions never run.

### Changes

Update the branch trigger in all 3 workflow files:

**`.github/workflows/build.yml`** (line 6):
```yaml
    branches:
      - main
      - master
```

**`.github/workflows/test.yml`** (line 6):
```yaml
    branches:
      - main
      - master
```

**`.github/workflows/lint.yml`** (line 6):
```yaml
    branches:
      - main
      - master
```

Adding both `main` and `master` ensures the Actions trigger regardless of which branch name is used. After this change, the next Lovable push will automatically trigger all 3 workflows.

