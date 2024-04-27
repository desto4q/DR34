import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RTabs from './RTabs';
import VideoScreen from '../screens/VideoScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
import ImageScreen from '../screens/ImageScreen';
import SingleFav from '../screens/SingleFav';
import VidDown from '../screens/downloads/VidDown';
import ImageDown from '../screens/downloads/ImageDown';
import SingleVIdScreen from '../screens/downloads/SingleVidScreen';
import SingleImageScreen from '../screens/downloads/SingleImageScreen';
import SingleVidScreen from '../screens/downloads/SingleVidScreen';

let Stack = createNativeStackNavigator();

function RStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'card',
        animation: 'slide_from_bottom',
        fullScreenGestureEnabled:true,
        freezeOnBlur:true
      }}>
      <Stack.Screen name="MainScreen" component={RTabs} />
      <Stack.Screen name="VideoScreen" component={VideoScreen} />
      <Stack.Screen name="ImageScreen" component={ImageScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen
        name="SingleFav"
        component={SingleFav}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="VidDownScreen"
        component={VidDown}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="ImageDownScreen"
        component={ImageDown}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="SingleVidScreen"
        component={SingleVidScreen}
        options={{animation: 'slide_from_right'}}
      />
      <Stack.Screen
        name="SingleImageScreen"
        component={SingleImageScreen}
        options={{animation: 'slide_from_right'}}
      />
    </Stack.Navigator>
  );
}

export default RStack;
