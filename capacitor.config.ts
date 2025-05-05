
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.6a91b118645e48b9960e0113402db332',
  appName: 'nepali-calendar-converter-web',
  webDir: 'dist',
  server: {
    url: 'https://6a91b118-645e-48b9-960e-0113402db332.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      releaseType: undefined
    }
  }
};

export default config;
