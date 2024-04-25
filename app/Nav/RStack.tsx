import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RTabs from './RTabs';
import VideoScreen from '../screens/VideoScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import ImageScreen from '../screens/ImageScreen';
import FullScreen from '../screens/FullScreen';

let Stack = createNativeStackNavigator();
function RStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animation: 'slide_from_bottom',
      }}>
      <Stack.Screen name="MainScreen" component={RTabs} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="FullScreen" component={FullScreen} />
    </Stack.Navigator>
  );
}

export default RStack;
