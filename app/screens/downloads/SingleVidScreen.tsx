import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import {tw} from '../../exports/exports';
import Video, {VideoRef} from 'react-native-video';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AiOutlineArrowLeft} from 'rn-icons/ai';
import {useNavigation} from '@react-navigation/native';

export default function SingleVidScreen({route}: {route: any}) {
  let {path, name, poster} = route.params;
  const videoRef = useRef<VideoRef>(null);
  let navigation = useNavigation();

  return (
    <View style={tw('p-2')}>
      <View style={tw('p-2 py-4')}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={tw('p-2 bg-amber-400 self-start rounded-md')}>
          <AiOutlineArrowLeft size={22} />
        </TouchableOpacity>
      </View>
      <View style={tw('p-2 mb-4')}>
        <Text style={tw('text-xl')}>{name}</Text>
      </View>
      <View style={tw('h-62')}>
        <Video
          ref={videoRef}
          paused
          poster={`file:///${poster}`}
          posterResizeMode="cover"
          controls
          fullscreenAutorotate
          fullscreenOrientation="landscape"
          style={tw(' p-2 h-full')}
          source={{uri: path}}></Video>
      </View>
    </View>
  );
}
