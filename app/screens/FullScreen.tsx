import {View, Text} from 'react-native';
import React from 'react';
import {tw} from '../exports/exports';
import VideoPlayer from 'react-native-video-controls-custom-thumbnail';
import {useNavigation} from '@react-navigation/native';

export default function FullScreen({route}: {route: any}) {
  let {path} = route.params;
  let navigation = useNavigation();
  return (
    <View style={tw('p-2 bg-red-200 flex-1')}>{/* <Text>{path}</Text> */}</View>
  );
}
