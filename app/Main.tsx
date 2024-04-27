import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import RTabs from './Nav/RTabs';
import RStack from './Nav/RStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {storage} from './storage/storage';

let client = new QueryClient();
export default function Main() {
  async function requestExternalStoragePermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'External Storage Permission',
          message: 'App needs access to your external storage to read files.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Read external storage permission granted');
        // You can now proceed with reading files from external storage
      } else {
        console.log('Read external storage permission denied');
        // Handle permission denial
      }
    } catch (err) {
      console.warn('Error requesting external storage permission:', err);
    }
  }
  useEffect(() => {
    requestExternalStoragePermission();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <QueryClientProvider client={client}>
        <RStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
