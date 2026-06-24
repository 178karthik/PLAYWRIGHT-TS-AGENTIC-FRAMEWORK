import fs from 'fs';
import path from 'path';

// Environment variables are loaded in playwright.config.js

interface UserCredentials {
  url: string;
  email: string;
  password: string;
  key: string;
}

export const loadCredentials = (organization?: string, userType?: string): UserCredentials => {
  // Get configuration from environment variables
  const secretPath = process.env.SECRET_PATH || 'resources/configurations/pfpt/secret.json';
  const defaultOrg = process.env.ORGANIZATION || 'saucedemo';
  const defaultUserType = process.env.USER_TYPE || 'standard_user';
  
  // Use provided parameters or fallback to environment/defaults
  const orgToUse = organization || defaultOrg;
  const userTypeToUse = userType || defaultUserType;
  
  // Build the key for credential lookup
  const credentialKey = `${orgToUse}.${userTypeToUse}`;
  
  // Construct absolute path
  const absolutePath = path.resolve(secretPath);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`Secret file not found at: ${absolutePath}`);
  }
  
  // Load and parse the secret file
  const secretData = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  
  // Find matching credentials
  const userCredentials = secretData.find((user: any) => user.key === credentialKey);
  
  if (!userCredentials) {
    throw new Error(
      `Credentials not found for key: ${credentialKey} in ${absolutePath}. ` +
      `Available keys: ${secretData.map((u: any) => u.key).join(', ')}`
    );
  }
  
  return {
    url: userCredentials.url,
    email: userCredentials.email,
    password: userCredentials.password,
    key: userCredentials.key
  };
};

// Environment-specific helper functions
export const loadEnvironmentConfig = () => ({
  environment: process.env.TEST_ENVIRONMENT || 'pfpt',
  secretPath: process.env.SECRET_PATH || 'resources/configurations/pfpt/secret.json',
  defaultOrganization: process.env.ORGANIZATION || 'standard_user',
  defaultUserType: process.env.USER_TYPE || 'standard_user'
});