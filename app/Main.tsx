import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import RTabs from './Nav/RTabs';
import RStack from './Nav/RStack';
import {QueryClient, QueryClientProvider} from 'react-query';

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
