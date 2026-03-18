# How to Import Data into Airtable

This folder contains CSV files with all your menu data pre-formatted for easy import into Airtable.

## Import Steps:

### 1. Create tables in Airtable (if you haven't already)

In your "The Bank Menu" base, create these 3 tables:
- **Cocktails**
- **HappyHour**
- **OpeningHours**

### 2. Import Cocktails.csv

1. Open the **Cocktails** table
2. Click the **+** icon next to your table name → select **Import data**
3. Choose **Cocktails.csv**
4. Map the columns:
   - `name` → **name**
   - `description` → **description**
   - `price` → **price**
   - `happyHour` → **happyHour** (as checkbox)
5. Click **Import**

### 3. Import HappyHour.csv

1. Open the **HappyHour** table
2. Click the **+** icon → **Import data**
3. Choose **HappyHour.csv**
4. Map columns as they appear
5. Click **Import**

### 4. Import OpeningHours.csv

1. Open the **OpeningHours** table
2. Click the **+** icon → **Import data**
3. Choose **OpeningHours.csv**
4. Map columns (remember `closed` should be a checkbox)
5. Click **Import**

---

**That's it!** Your Airtable base is now populated with all your data. You can then:

1. Get your Airtable API credentials (see AIRTABLE_SETUP.md)
2. Deploy the backend API
3. Your website will start pulling live data from Airtable

## Updating Data

Going forward, just edit the data directly in Airtable and it will appear on your website automatically within 60 seconds.
