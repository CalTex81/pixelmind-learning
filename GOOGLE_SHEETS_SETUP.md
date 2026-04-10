# Google Sheets Integration Setup

This documentation guides you through setting up Google Sheets integration to sync Supabase database data to Google Sheets.

## Overview

The Google Sheets integration automatically syncs:
- Student registrations
- Volunteer signups

## Prerequisites

1. Google Cloud Console account
2. Google Sheets API access
3. Supabase project access

## Step-by-Step Setup

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sheets API:
   - Navigate to APIs & Services > Library
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create Service Account

1. Navigate to APIs & Services > Credentials
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details:
   - Name: `pixelmind-learning-sheets`
   - Description: `Service account for Google Sheets sync`
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 3. Generate Service Account Key

1. Click on the newly created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create New Key"
4. Select "JSON" format
5. Download the key file (keep this secure!)
6. Store the key file in a secure location (not in the repository)

### 4. Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "PixelMind Learning Registrations"
4. Create a sheet named "Registrations"
5. Note the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

### 5. Share Sheet with Service Account

1. In your Google Sheet, click "Share"
2. Add the service account email (from the service account details)
3. Give it "Editor" permissions

### 6. Configure Environment Variables

Add the following environment variables to your `.env` file:

```env
VITE_GOOGLE_SHEETS_SPREADSHEET_ID=your_spreadsheet_id_here
VITE_GOOGLE_SHEETS_SHEET_NAME=Registrations
VITE_GOOGLE_SHEETS_SERVICE_ACCOUNT_EMAIL=your_service_account_email
```

### 7. Backend Authentication Setup

Since this is a frontend application, you need to set up a backend service to handle OAuth2 authentication. Options:

**Option 1: Supabase Edge Functions**
1. Create a Supabase Edge Function to handle Google Sheets authentication
2. Store the service account key in Supabase secrets
3. Call the Edge Function from the frontend

**Option 2: Backend Service**
1. Create a simple backend service (Node.js/Express)
2. Handle OAuth2 authentication on the backend
3. Expose an API endpoint for the frontend to trigger sync

**Option 3: Third-party Service**
1. Use services like Zapier, Make, or n8n
2. Set up automated sync between Supabase and Google Sheets
3. Configure triggers for new registrations

### 8. Implement OAuth2 Authentication

Update the `getGoogleAccessToken()` function in `src/integrations/google-sheets/sync.ts`:

```typescript
async function getGoogleAccessToken(): Promise<string | null> {
  try {
    // Call your backend service or Edge Function
    const response = await fetch('/api/google-sheets/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Any required parameters
      }),
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    return data.accessToken;
  } catch (error) {
    console.error('Error getting Google access token:', error);
    return null;
  }
}
```

### 9. Test the Integration

1. Start your development server
2. Complete a test registration
3. Check the browser console for sync logs
4. Verify data appears in your Google Sheet

## Data Sync Details

### Student Registrations
Synced fields:
- id
- first_name
- last_name
- email
- phone
- parent_name
- parent_email
- parent_phone
- student_age
- school
- selected_courses
- experience_level
- goals
- how_did_you_hear
- status
- submitted_at
- created_at

### Volunteer Signups
Synced fields:
- id
- name
- email
- phone
- interests
- availability
- experience
- message
- created_at

## Troubleshooting

### Sync Not Working
- Check browser console for error messages
- Verify environment variables are set correctly
- Ensure service account has proper permissions
- Check that the spreadsheet ID is correct

### Authentication Errors
- Verify service account key is valid
- Check that service account has access to the spreadsheet
- Ensure OAuth2 flow is properly implemented

### Data Not Appearing in Sheet
- Check that the sheet name matches the configuration
- Verify the service account has Editor permissions
- Check for any rate limiting from Google Sheets API

## Security Considerations

- Never commit service account keys to the repository
- Use environment variables for sensitive configuration
- Implement proper error handling
- Monitor API usage to avoid rate limits
- Regularly rotate service account keys

## Alternative Solutions

If the technical setup is too complex, consider these simpler alternatives:

1. **Zapier Integration**: Set up automated Zapier integration between Supabase and Google Sheets
2. **Make.com**: Use Make.com for no-code database sync
3. **n8n**: Self-hosted automation platform for database sync
4. **Manual Export**: Add a manual export button to your admin interface

## Support

For issues or questions:
- Check Google Sheets API documentation: https://developers.google.com/sheets/api
- Review Supabase documentation: https://supabase.com/docs
- Contact your development team for backend infrastructure setup
