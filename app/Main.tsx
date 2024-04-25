import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import RTabs from './Nav/RTabs';
import RStack from './Nav/RStack';
import {QueryClient, QueryClientProvider} from 'react-query';
import {storage} from './storage/storage';

let client = new QueryClient();
export default function Main() {
 
  return (
    <NavigationContainer theme={DarkTheme}>
      <QueryClientProvider client={client}>
        <RStack />
      </QueryClientProvider>
    </NavigationContainer>
  );
}
