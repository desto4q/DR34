import {View, Text} from 'react-native';
import React from 'react';
import Main from './app/Main';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NotifierWrapper } from "react-native-notifier";


export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NotifierWrapper>
                 <Main/>
      </NotifierWrapper>
    </GestureHandlerRootView>
    )
}
