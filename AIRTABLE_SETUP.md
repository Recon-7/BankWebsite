# Airtable Setup Guide - The Bank Website

This guide walks you through setting up Airtable as the content management system for The Bank website menus.

## Step 1: Create an Airtable Account

1. Go to [airtable.com](https://airtable.com)
2. Sign up for a free account
3. Log in to your account

## Step 2: Create a New Base

1. Click "Add a base" or "Create" button
2. Name it: **The Bank Menu**
3. Click "Create base"

## Step 3: Create Tables

Your base needs 3 tables (you can create them empty):
- **Cocktails**
- **HappyHour**
- **OpeningHours**

(Don't worry about fields yet - the import script will create them automatically!)

## Step 3b: Automated Import (Recommended)

Instead of manually creating fields, use the automated import script:

```bash
# 1. Install dependencies
npm install

# 2. Set up your .env file with credentials (from steps below)
cp .env.example .env
# Edit .env and add your AIRTABLE_API_TOKEN and AIRTABLE_BASE_ID

# 3. Run the import script
node scripts/import-airtable.js
```

**That's it!** All your data will be imported automatically. Skip to Step 4 below.

---

## Step 3 (Manual Import): Create Tables and Fields

Alternatively, if you want to manually create fields, do this for each table below:

### Table 1: Cocktails

| Field Name | Field Type | Notes |
|------------|-----------|-------|
| name | Single line text | e.g., "Espresso Martini" |
| description | Long text | Full cocktail description |
| price | Single line text | e.g., "£9" |
| happyHour | Checkbox | Check if it's a happy hour cocktail |

**Add records from current menu (16 cocktails)** - Copy the data from `data/site-data.json`

### Table 2: HappyHour

| Field Name | Field Type | Notes |
|------------|-----------|-------|
| price | Single line text | e.g., "2 cocktails for £14" |
| times | Single line text | e.g., "Fri-Sat 6-9pm & 9-9:30pm" |
| note | Long text | e.g., "Mix & Match Happy Hour" |

**Add 1 record** with the current happy hour info

### Table 3: OpeningHours

| Field Name | Field Type | Notes |
|------------|-----------|-------|
| day | Single line text | e.g., "Monday" |
| time | Single line text | e.g., "12:30pm – Late" |
| closed | Checkbox | Check if closed on this day |

**Add 7 records** (one for each day of the week) from `data/site-data.json`

### Table 4: Menus (Optional for future use)

For now, keep the existing `data/site-data.json` for complex menu items. This table can be added later if needed.

## Step 4: Get Your API Credentials

### Generate API Token

1. Go to [airtable.com/account/tokens](https://airtable.com/account/tokens)
2. Click "Create new token"
3. Give it a name: "The Bank Website API"
4. Select these scopes:
   - ✅ data.records:read
   - ✅ data.content:read
5. Select your base "The Bank Menu"
6. Click "Create token"
7. **Copy the token** (you'll only see it once!)

### Get Base ID

1. Open your "The Bank Menu" base
2. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX/viw...`
3. The **Base ID** is the part starting with `app` → `appXXXXXXXXXXXXXX`
4. Copy this

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your credentials:
   ```
   AIRTABLE_API_TOKEN=your_token_here
   AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
   ```

3. **Important**: Never commit `.env` to git (it's in `.gitignore`)

## Step 6: Deploy Your Backend API

### Option A: Vercel (Easiest)

1. Install Vercel CLI: `npm install -g vercel`
2. From project root: `vercel`
3. Follow prompts, add environment variables when asked
4. Your API will be available at: `https://your-domain.vercel.app/api/menu`

### Option B: Netlify Functions

1. Connect your GitHub repo to Netlify
2. In site settings → Environment → Add variables:
   - `AIRTABLE_API_TOKEN`
   - `AIRTABLE_BASE_ID`
3. Functions auto-deploy from `/api` folder

### Option C: Your Company's Hosting

Deploy `api/menu.js` to your server infrastructure. You'll need:
- Node.js runtime
- Environment variables configured
- Endpoint accessible at `/api/menu`

## Step 7: Update Website

The frontend now automatically tries to fetch from `/api/menu` with fallback to local `data/site-data.json`.

**To test locally:**
```bash
npm install  # Install dependencies
npm run dev  # Start local dev server
# Visit http://localhost:3000
```

## Step 8: Go Live

1. Deploy the backend API (Vercel/Netlify/your server)
2. Update your website domain to point to the new API
3. Test all pages load correctly
4. Monitor Airtable API usage in your account dashboard

## Updating Menu Content

Once live, all updates happen in Airtable:

1. Log into your Airtable base
2. Update cocktails, hours, happy hour times, etc.
3. Changes appear on the website within 60 seconds (cache TTL)
4. No code changes needed! ✨

## Troubleshooting

**Website shows "Could not load data"**
- Check that front-end is accessing correct API URL
- Verify environment variables are set on backend
- Check Airtable API token is valid
- Check Base ID is correct

**API returns 500 error**
- Check AIRTABLE_API_TOKEN and AIRTABLE_BASE_ID in environment
- Verify token has read permission
- Check table names match exactly: "Cocktails", "HappyHour", "OpeningHours"

**Data not updating on website**
- Cache has 60-second TTL - wait a minute and refresh
- Try hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Check browser console for errors

## Support

For Airtable API questions: [Airtable API Docs](https://airtable.com/developers/web/api/introduction)
