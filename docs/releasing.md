# Releasing

This page is for maintainers. It explains how a version reaches npm, what to set
up once, and how to promote a preview.

SinterDB publishes three packages: `sinterdb-protocol`, `sinterdb` (the driver),
and `@sinterdb/cli` (the server). They share one version. Pushing a tag such as
`v0.1.0` runs [`release.yml`](../.github/workflows/release.yml), which checks,
packs, publishes, and creates a GitHub release. There is no npm token: npm
trusts the workflow through
[trusted publishing](https://docs.npmjs.com/trusted-publishers), and every
version is published with provenance.

A developer preview goes out under the npm tag `next`, never `latest`. The
workflow and `release:publish` both refuse `latest`.

## Releasing a version

1. Describe the change with `pnpm changeset` in the pull request that makes it.
   Choose `minor` for a breaking change in `0.x` and `patch` for anything else.
2. When you are ready to release, on a branch run `pnpm version-packages`. It
   applies the changesets: package versions, changelogs, and the
   `fixed` group keep the six versioned packages on one version.
3. Then update what changesets cannot:
   - the `version` in the root `package.json`,
   - `DRIVER_PRODUCT_VERSION` in `packages/driver/src/client.ts` and
     `SERVER_PRODUCT_VERSION` in `packages/server/src/command-dispatcher.ts`,
   - the release notes in `docs/releases/<version>.md`,
   - any "Version x provides" text in the READMEs.
4. Run `pnpm release:check --release`. It lists everything that still disagrees
   about the version.
5. Run `pnpm all`, then `pnpm release:rehearse`. The rehearsal packs the three
   packages, checks what is inside, installs the tarballs into empty folders,
   follows the [quick start](./quick-start.md) with them, kills the server, and
   recovers the data. It uses no registry, so it works before anything is
   published. The same rehearsal also runs in `pnpm test`. To see what npm would
   receive without uploading anything, run
   `pnpm release:publish --dir release --version 0.1.0 --dry-run` after
   `pnpm release:rehearse --out release`.
6. Merge the pull request. Then tag the merge commit and push the tag:

   ```bash
   git switch main && git pull
   git tag v0.1.0
   git push origin v0.1.0
   ```

7. Watch the **Release** workflow. It runs the checks again, uploads the
   tarballs it tested, publishes those exact files, confirms that the `next` tag
   points at the new version, and creates a GitHub release marked as a
   prerelease.

If the workflow stops after publishing some packages, run it again from the
Actions tab. A version that is already on npm is skipped, so the run continues
with the rest.

## One-time setup

Do this once, before the first release.

### 1. Make sure you own the names

The packages are `sinterdb`, `sinterdb-protocol`, and `@sinterdb/cli` (in the
`sinterdb` npm organization). Check that you can publish to the organization and
that your account has two-factor authentication turned on.

### 2. Create the `npm` environment on GitHub

In the repository, open Settings, then Environments, and create an environment
named `npm`. Add yourself under **Required reviewers**. The publish job waits
for your approval, so a stray tag cannot publish by itself. Also consider a tag
protection rule for `v*` so only maintainers can create version tags.

### 3. Tell npm to trust the workflow

On npmjs.com, open each of the three packages, then Settings, then **Trusted
Publisher**, choose **GitHub Actions**, and enter:

| Field                | Value                            |
| -------------------- | -------------------------------- |
| Organization or user | `SinterDB`                       |
| Repository           | `sinterdb`                       |
| Workflow filename    | `release.yml`                    |
| Environment name     | `npm`                            |
| Allowed actions      | `npm publish` (and nothing else) |

The workflow filename is the name of the file, not a path. npm does not check
the settings when you save them, so a typo only shows up when the workflow
publishes. A new configuration also expires if it has not been used to publish
within two days, so set it up shortly before you push the first tag.

If npm will not let you configure a package that does not exist yet, create
the package with a throwaway placeholder version, then configure it. Do not
publish `0.1.0` by hand: a version can only be published once, and the one you
publish from your own computer has no provenance. Run this once, signed in with
`npm login`:

```bash
for name in sinterdb-protocol sinterdb @sinterdb/cli; do
  dir=$(mktemp -d)
  (
    cd "$dir"
    npm init -y > /dev/null
    npm pkg set name="$name" version=0.0.1 license=Apache-2.0 \
      description="Placeholder while the first SinterDB release is prepared." \
      repository.type=git \
      repository.url="git+https://github.com/SinterDB/sinterdb.git"
    npm publish --access public --tag placeholder
  )
done
```

Then add the trusted publishers above and push the first tag. Prefer this to
putting an npm token into GitHub.

### 4. Check the result

After the first tag, open each package on npmjs.com. The version page shows a
**Provenance** badge that links to the workflow run and commit. npm may also
point `latest` at the first version of a brand-new package, whatever tag it was
published under; the publish step prints a note when that happens, and the next
version you promote replaces it. Then:

```bash
npm view sinterdb dist-tags
npm install --global @sinterdb/cli@next
sinterd --version
```

## Promoting a preview to `latest`

Once a version has been tried and you are happy with it, point `latest` at it.
Do this by hand, for each package, with two-factor authentication:

```bash
npm dist-tag add sinterdb-protocol@0.1.0 latest
npm dist-tag add sinterdb@0.1.0 latest
npm dist-tag add @sinterdb/cli@0.1.0 latest
```

Then drop the `@next` from the install commands in the documentation, and
replace the commented-out npm badges in the root `README.md`.

## When something goes wrong

- **The publish job fails with `E404` or `ENEEDAUTH`.** npm did not recognise
  the workflow. Compare the trusted publisher settings with the table above,
  and check that `repository.url` in each `package.json` is exactly
  `git+https://github.com/SinterDB/sinterdb.git`.
- **The check job fails.** Read its list. Each line names the file and what it
  should say.
- **A version was published by mistake.** npm does not allow publishing the same
  version twice. Publish a patch version and deprecate the bad one with
  `npm deprecate sinterdb@0.1.0 "Use 0.1.1"`.
