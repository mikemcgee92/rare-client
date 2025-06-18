// Client credentials configuration for API calls
const clientCredentials = {
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL || 'http://localhost:8000',
  apiKey: process.env.NEXT_PUBLIC_API_KEY || '',
  // Add other credentials as needed
};

export default clientCredentials;
