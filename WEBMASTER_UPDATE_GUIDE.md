# Webmaster Website Update Guide

Use this guide when a new webmaster needs to update the active brothers, executive committee, and headshots for a new rush.

## Overview

The website pulls brother and executive data from Supabase tables, but profile images are served from the local codebase at:

```text
public/brothers/
```

Each Supabase row has an `image_path` value, and the code turns it into a local image URL like:

```ts
`/brothers/${row.image_path}`
```

That means the value in Supabase must exactly match a file name in `public/brothers/`.

## 1. Create New Supabase Tables

Create one new table for active brothers and one new table for executive committee.

Use a consistent naming pattern:

```text
actives-spring26
ecomm-spring-26
```

For future terms, create new tables instead of editing old tables in place. Example:

```text
actives-fall26
ecomm-fall-26
```

The current production tables are:

```text
actives-spring26
ecomm-spring-26
```

## 2. Required Columns

### Active Brothers Table

The actives table should include:

| Column | Type | Notes |
| --- | --- | --- |
| `name` | text | Full display name. Used for profile routes. |
| `image_path` | text | Exact image file name in `public/brothers/`. |
| `pronouns` | text | Example: `She/Her/Hers`. |
| `location` | text | Example: `Sacramento, CA`. |
| `bio` | text | Profile bio. |
| `linkedin` | text | Full LinkedIn URL, or blank if unavailable. |

### Executive Committee Table

The ecomm table should include:

| Column | Type | Notes |
| --- | --- | --- |
| `number` | numeric/integer | Display order on the executive committee page. |
| `name` | text | Full display name. Used for profile routes. |
| `position` | text | Example: `President`, `VP Brotherhood`. |
| `image_path` | text | Exact image file name in `public/brothers/`. |
| `pronouns` | text | Example: `He/Him/His`. |
| `location` | text | Example: `San Diego, CA`. |
| `bio` | text | Profile bio. |
| `linkedin` | text | Full LinkedIn URL, or blank if unavailable. |

## 3. Upload Member Information

Upload the newest member information into the new Supabase tables.

Before uploading, check:

- Every required column exists.
- Every `name` is spelled exactly how it should appear on the site.
- Every `image_path` exactly matches a file in `public/brothers/`.
- LinkedIn values are full URLs, such as `https://www.linkedin.com/in/...`.
- Empty LinkedIn values are blank, not random placeholder text.
- Bios do not contain accidental extra quotes or broken line breaks.

Example:

```text
Yathin Mrudul -> YathinMrudul
```

## 4. Crop And Replace Headshots

All headshots live in:

```text
public/brothers/
```

Recommended process:

1. Collect the newest headshots.
2. Crop every image consistently before adding it to the repo.
3. Use portrait-oriented crops because the site displays them in tall profile cards.
4. Rename each file to match the person's name with no spaces.

Recommended file format:

```text
FirstLast.jpg
```

Example:

```text
YathinMrudul.jpg
```

Then set the Supabase `image_path` value to the same file name:

```text
YathinMrudul.jpg
```

Do not include `/brothers/` in Supabase. The code adds that automatically.

## 5. Update The Code To Use The New Tables

After creating the new Supabase tables, update every code reference from the old table names to the new table names.

Current active brothers references:

```text
src/app/brothers/active/page.tsx
src/app/brothers/active/[name]/page.tsx
```

Current executive committee references:

```text
src/app/brothers/executive/page.tsx
src/app/brothers/executive/[name]/page.tsx
src/app/page.tsx
```

Search for the old table names:

```bash
rg "actives-spring26|ecomm-spring-26"
```

Then replace them with the new table names.

Example:

```ts
.from('actives-fall26')
.from('ecomm-fall-26')
```

## 6. Confirm Image Fetching

The current site fetches image file names from Supabase, then loads local images from:

```text
public/brothers/
```

For example, if Supabase has:

```text
image_path = YathinMrudul.jpg
```

The website loads:

```text
/brothers/YathinMrudul.jpg
```

If an image is broken, check these first:

- The image exists in `public/brothers/`.
- The file name matches `image_path` exactly, including capitalization.
- The file extension matches exactly, such as `.jpg` vs `.jpeg` vs `.png`.
- The Supabase value does not include extra spaces.

## 7. Update Rush Contacts And Seasonal Text

Each rush cycle, update the rush contact information shown in the footer.

The rush contacts live in:

```text
src/components/Footer.tsx
```

Update the `rushInfo` object:

```ts
const rushInfo = {
  year: "Spring '26",
  email: "akpspringrush26@gmail.com",
  contacts: [
    { name: "Heather Jeon", phone: "(213) 999-3685", tel: "+12139993685" },
    { name: "Hailey Kim", phone: "(714) 715-0072", tel: "+17147150072" },
  ],
};
```

Check:

- `year` matches the current rush term.
- `email` is the current rush email.
- Contact names and display phone numbers are correct.
- `tel` values use only the country code and digits, with no spaces or punctuation.

Also update the home page rush season text in:

```text
src/app/page.tsx
```

Look for:

```ts
const homePresidentMessageRushSeason = 'Spring 2026 Rush';
```

Update it to match the current recruitment cycle.

The footer copyright year is currently generated automatically:

```tsx
{new Date().getFullYear()}
```

Still check the footer during local testing to make sure the year, terms link, and privacy link render correctly.

## 8. Update The Gallery

Refresh gallery photos each term so the site does not look stale.

Gallery image files live in:

```text
public/gallery/
```

The gallery image list lives in:

```text
src/utils/imageUtils.ts
```

When updating the gallery:

1. Add the new cropped/compressed images to `public/gallery/`.
2. Use simple names like `gallery1.png`, `gallery2.png`, or another consistent naming pattern.
3. Update `getGalleryImages()` in `src/utils/imageUtils.ts` so every new image path is listed.
4. Remove old image paths from `getGalleryImages()` if those files were deleted.
5. Check the home page, recruitment page, and gallery page because all three use gallery images.

Relevant pages:

```text
src/app/page.tsx
src/app/recruitment/page.tsx
src/app/gallery/page.tsx
```

## 9. Test Locally

Run the site locally:

```bash
npm run dev
```

Then check:

- Home page president image loads.
- `/brothers/active` loads all active brothers.
- Each active brother profile page opens correctly.
- `/brothers/executive` loads the full executive committee in the right order.
- Each executive profile page opens correctly.
- LinkedIn buttons work where a LinkedIn URL exists.
- Footer rush contacts, email, and phone links are correct.
- Home page rush season text is current.
- Gallery images load on the home, recruitment, and gallery pages.
- No cards show broken images.

Also run:

```bash
npm run lint
```

## 10. Deployment Checklist

Before deploying:

- New Supabase actives table exists.
- New Supabase ecomm table exists.
- All rows were imported.
- All headshots were cropped and added to `public/brothers/`.
- Every `image_path` matches a local image file.
- Code references were updated to the new table names.
- Rush contacts were updated in `src/components/Footer.tsx`.
- Home page rush season text was updated in `src/app/page.tsx`.
- Gallery images and `src/utils/imageUtils.ts` were updated.
- Local testing passes.
- Changes are committed and pushed.
