// Google Sheets Integration Service
// This service handles synchronization between Supabase and Google Sheets

export interface GoogleSheetsConfig {
  spreadsheetId: string;
  sheetName: string;
}

export interface SyncData {
  table: string;
  data: any[];
  operation: 'insert' | 'update' | 'delete';
}

class GoogleSheetsService {
  private config: GoogleSheetsConfig;
  private accessToken: string | null = null;

  constructor(config: GoogleSheetsConfig) {
    this.config = config;
  }

  // Initialize OAuth2 authentication
  async authenticate(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }

  // Sync data to Google Sheets
  async syncToSheet(data: SyncData): Promise<void> {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.sheetName}:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            values: this.formatDataForSheet(data),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Google Sheets API error: ${response.statusText}`);
      }

      console.log(`Successfully synced ${data.table} data to Google Sheets`);
    } catch (error) {
      console.error('Error syncing to Google Sheets:', error);
      throw error;
    }
  }

  // Format data for Google Sheets
  private formatDataForSheet(data: SyncData): string[][] {
    // Convert data objects to 2D array for Google Sheets
    const rows: string[][] = [];
    
    if (data.data.length === 0) return rows;

    // Get headers from first object
    const headers = Object.keys(data.data[0]);
    rows.push(headers);

    // Add data rows
    data.data.forEach(item => {
      const row = headers.map(header => {
        const value = item[header];
        return value !== null && value !== undefined ? String(value) : '';
      });
      rows.push(row);
    });

    return rows;
  }

  // Sync student registrations to Google Sheets
  async syncStudentRegistrations(registrations: any[]): Promise<void> {
    await this.syncToSheet({
      table: 'student_registrations',
      data: registrations,
      operation: 'insert',
    });
  }

  // Sync volunteer signups to Google Sheets
  async syncVolunteerSignups(signups: any[]): Promise<void> {
    await this.syncToSheet({
      table: 'volunteer_signups',
      data: signups,
      operation: 'insert',
    });
  }
}

export default GoogleSheetsService;
