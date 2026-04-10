import { supabase } from '../supabase/client';
import GoogleSheetsService from './client';

// Configuration for Google Sheets
const GOOGLE_SHEETS_CONFIG = {
  spreadsheetId: import.meta.env.VITE_GOOGLE_SHEETS_SPREADSHEET_ID || '',
  sheetName: import.meta.env.VITE_GOOGLE_SHEETS_SHEET_NAME || 'Registrations',
};

// Initialize Google Sheets service
const googleSheetsService = new GoogleSheetsService(GOOGLE_SHEETS_CONFIG);

// Sync student registrations to Google Sheets
export async function syncStudentRegistrationsToSheets(): Promise<void> {
  try {
    // Fetch all student registrations from Supabase
    const { data: registrations, error } = await supabase
      .from('student_registrations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching registrations:', error);
      throw error;
    }

    if (!registrations || registrations.length === 0) {
      console.log('No registrations to sync');
      return;
    }

    // Check if Google Sheets is configured
    if (!GOOGLE_SHEETS_CONFIG.spreadsheetId) {
      console.warn('Google Sheets not configured. Skipping sync.');
      return;
    }

    // Get access token (this would need to be implemented with OAuth2 flow)
    const accessToken = await getGoogleAccessToken();
    
    if (!accessToken) {
      console.warn('Google Sheets access token not available. Skipping sync.');
      return;
    }

    // Authenticate with Google Sheets
    await googleSheetsService.authenticate(accessToken);

    // Sync data to Google Sheets
    await googleSheetsService.syncStudentRegistrations(registrations);
    
    console.log('Successfully synced student registrations to Google Sheets');
  } catch (error) {
    console.error('Error syncing registrations to Google Sheets:', error);
    throw error;
  }
}

// Sync volunteer signups to Google Sheets
export async function syncVolunteerSignupsToSheets(): Promise<void> {
  try {
    // Fetch all volunteer signups from Supabase
    const { data: signups, error } = await supabase
      .from('volunteer_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching volunteer signups:', error);
      throw error;
    }

    if (!signups || signups.length === 0) {
      console.log('No volunteer signups to sync');
      return;
    }

    // Check if Google Sheets is configured
    if (!GOOGLE_SHEETS_CONFIG.spreadsheetId) {
      console.warn('Google Sheets not configured. Skipping sync.');
      return;
    }

    // Get access token (this would need to be implemented with OAuth2 flow)
    const accessToken = await getGoogleAccessToken();
    
    if (!accessToken) {
      console.warn('Google Sheets access token not available. Skipping sync.');
      return;
    }

    // Authenticate with Google Sheets
    await googleSheetsService.authenticate(accessToken);

    // Sync data to Google Sheets
    await googleSheetsService.syncVolunteerSignups(signups);
    
    console.log('Successfully synced volunteer signups to Google Sheets');
  } catch (error) {
    console.error('Error syncing volunteer signups to Google Sheets:', error);
    throw error;
  }
}

// Get Google OAuth2 access token
async function getGoogleAccessToken(): Promise<string | null> {
  // This function needs to be implemented with your OAuth2 flow
  // Options:
  // 1. Use a backend service to handle OAuth2
  // 2. Use Supabase Edge Functions
  // 3. Use a third-party authentication service
  
  // For now, return null to indicate authentication is not set up
  // TODO: Implement OAuth2 authentication flow
  return null;
}

// Manual sync function that can be called from admin interface
export async function manualSyncToSheets(): Promise<{ success: boolean; message: string }> {
  try {
    await syncStudentRegistrationsToSheets();
    await syncVolunteerSignupsToSheets();
    return {
      success: true,
      message: 'Successfully synced all data to Google Sheets'
    };
  } catch (error) {
    return {
      success: false,
      message: `Error syncing to Google Sheets: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}
