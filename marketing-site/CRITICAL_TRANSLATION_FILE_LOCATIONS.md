# 🚨 CRITICAL: Translation File Locations

## ❌ COMMON ERROR - DO NOT MAKE THIS MISTAKE

Many developers (including AI assistants) mistakenly put translation files in:
```
marketing-site/locales/*.json  ❌ WRONG - DON'T USE THIS PATH
```

## ✅ CORRECT LOCATION

Translation files MUST be in:
```
marketing-site/i18n/locales/*.json  ✅ CORRECT - ALWAYS USE THIS PATH
```

## Why This Confusion Happens

In `nuxt.config.ts`, the configuration shows:
```javascript
i18n: {
  langDir: 'locales'  // This looks like it means /locales/
}
```

But Nuxt i18n automatically prefixes this with `i18n/`, so it actually looks in `i18n/locales/`.

## Current File Structure

```
marketing-site/
├── i18n/
│   └── locales/           ✅ CORRECT LOCATION
│       ├── en.json        ✅ English translations
│       ├── fr.json        ✅ French translations
│       └── ar.json        ✅ Arabic translations
└── locales/               ❌ REMOVED - This folder has been deleted
```

## What Was Fixed

1. ✅ Moved all translation keys to correct `i18n/locales/` location
2. ✅ Added all 10 personalization variants to EN, FR, AR
3. ✅ Completely removed the incorrect `locales/` folder
4. ✅ Updated all documentation

## Adding New Languages

When adding new languages like Spanish or German:

```bash
# ✅ CORRECT
touch i18n/locales/es.json
touch i18n/locales/de.json

# ❌ WRONG - DO NOT DO THIS
touch locales/es.json  # This won't work!
```

## Testing Translation Files

If you see errors like:
```
[intlify] Not found 'personalization.variants.7.headline' key in 'en' locale messages
```

It means the translation files aren't being loaded from the correct location.

**Always verify files are in `i18n/locales/`, not `locales/`!**