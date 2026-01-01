# Package Version Analysis

**Date**: January 1, 2026  
**Purpose**: Identify packages that may need updates

## How to Check Latest Versions

Run this command to check all packages at once:

```bash
npm outdated
```

Or check individual packages:

```bash
npm view <package-name> version
```

## Package Analysis

### Dependencies

| Package | Current Version | Check Latest | Notes |
|---------|----------------|--------------|-------|
| `@mdi/font` | `^7.4.47` | `npm view @mdi/font version` | Material Design Icons - check for updates |
| `@nuxt/content` | `^3.9.0` | `npm view @nuxt/content version` | Nuxt Content - may have 3.10+ available |
| `@nuxtjs/plausible` | `^2.0.1` | `npm view @nuxtjs/plausible version` | Plausible Analytics - check for updates |
| `better-sqlite3` | `^12.5.0` | `npm view better-sqlite3 version` | SQLite - check for security updates |
| `fuse.js` | `^7.1.0` | `npm view fuse.js version` | Fuzzy search - check for updates |
| `nuxt` | `^4.0.0` | `npm view nuxt version` | **Core framework** - check for 4.x updates |
| `vite-plugin-vuetify` | `^2.1.2` | `npm view vite-plugin-vuetify version` | Vite plugin - check for updates |
| `vue` | `^3.5.13` | `npm view vue version` | **Core framework** - check for 3.5.x updates |
| `vue-router` | `^4.5.0` | `npm view vue-router version` | Router - check for 4.x updates |
| `vuetify` | `^3.11.3` | `npm view vuetify version` | **UI framework** - check for 3.11.x or 3.12+ |
| `vuetify-nuxt-module` | `^0.19.0` | `npm view vuetify-nuxt-module version` | Vuetify Nuxt module - check for updates |
| `zod` | `^4.2.0` | `npm view zod version` | Schema validation - check for updates |

### DevDependencies

| Package | Current Version | Check Latest | Notes |
|---------|----------------|--------------|-------|
| `@axe-core/cli` | `^4.11.0` | `npm view @axe-core/cli version` | Accessibility testing - check for updates |
| `@axe-core/playwright` | `^4.11.0` | `npm view @axe-core/playwright version` | Accessibility testing - check for updates |
| `@nuxt/test-utils` | `^3.21.0` | `npm view @nuxt/test-utils version` | Testing utilities - check for updates |
| `@vue/test-utils` | `^2.4.6` | `npm view @vue/test-utils version` | Vue testing - check for 2.5+ |
| `axe-core` | `^4.11.0` | `npm view axe-core version` | Accessibility engine - check for updates |
| `happy-dom` | `^20.0.11` | `npm view happy-dom version` | DOM environment - check for updates |
| `netlify-cli` | `^23.12.3` | `npm view netlify-cli version` | Netlify CLI - check for updates |
| `playwright` | `^1.57.0` | `npm view playwright version` | Browser automation - check for 1.60+ |
| `playwright-core` | `^1.57.0` | `npm view playwright-core version` | Playwright core - check for updates |
| `puppeteer` | `^23.11.1` | `npm view puppeteer version` | Browser automation - check for updates |
| `sass` | `^1.80.0` | `npm view sass version` | CSS preprocessor - check for updates |
| `vitest` | `^3.2.4` | `npm view vitest version` | Test runner - check for 3.3+ |
| `xml2js` | `^0.6.2` | `npm view xml2js version` | XML parser - check for updates |

## Quick Check Script

Create a file `check-versions.sh`:

```bash
#!/bin/bash
echo "Checking package versions..."
echo ""

packages=(
  "nuxt"
  "vue"
  "@nuxt/content"
  "vuetify"
  "@nuxtjs/plausible"
  "@nuxt/test-utils"
  "vitest"
  "@vue/test-utils"
  "playwright"
  "happy-dom"
  "@mdi/font"
  "better-sqlite3"
  "fuse.js"
  "vue-router"
  "vite-plugin-vuetify"
  "vuetify-nuxt-module"
  "zod"
  "sass"
  "@axe-core/cli"
  "axe-core"
  "netlify-cli"
  "puppeteer"
  "xml2js"
)

for pkg in "${packages[@]}"; do
  current=$(grep -A 1000 '"dependencies"' package.json | grep -A 1000 '"devDependencies"' | grep "\"$pkg\"" | head -1 | sed 's/.*"\([^"]*\)".*/\1/' | sed 's/.*: "\([^"]*\)".*/\1/')
  latest=$(npm view "$pkg" version 2>/dev/null)
  if [ -n "$latest" ]; then
    echo "$pkg: $current -> $latest"
  fi
done
```

## Packages to Prioritize

### High Priority (Core Frameworks)
1. **nuxt** - Core framework, check for 4.x patch/minor updates
2. **vue** - Core framework, check for 3.5.x updates
3. **vuetify** - UI framework, check for 3.11.x or 3.12+ updates

### Medium Priority (Testing)
4. **vitest** - Test runner, check for 3.3+ updates
5. **@nuxt/test-utils** - Testing utilities
6. **playwright** - Browser automation

### Medium Priority (Content & Build)
7. **@nuxt/content** - Content management
8. **better-sqlite3** - Database (security updates)

### Low Priority (Utilities)
9. **@mdi/font** - Icons
10. **fuse.js** - Search
11. **zod** - Validation
12. **sass** - CSS preprocessor

## Update Strategy

1. **Check for security updates first**: Run `npm audit` to identify security vulnerabilities
2. **Update core frameworks carefully**: Test thoroughly after updating Nuxt, Vue, or Vuetify
3. **Update testing tools**: Generally safe to update test-related packages
4. **Update utilities**: Usually safe, but test after updating

## Recommended Commands

```bash
# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit

# Update all packages (within version ranges)
npm update

# Update specific package to latest
npm install <package-name>@latest

# Update all packages to latest (use with caution)
npx npm-check-updates -u
npm install
```

## Notes

- Packages with `^` allow minor and patch updates automatically
- Packages with `~` allow only patch updates
- Major version updates (e.g., 3.x → 4.x) require manual updates and may have breaking changes
- Always test after updating, especially core frameworks
- Review changelogs before major updates

