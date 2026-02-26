import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.fourcecloud.ars.dealer',
  appName: 'ARS Dealer Portal',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1B3F7A',
      showSpinner: false
    },
    StatusBar: {
      style: 'dark',
      backgroundColor: '#1B3F7A'
    }
  }
};

export default config;
