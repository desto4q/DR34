import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {tw} from '../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

interface ImageData {
  high_res_file: {
    height: number;
    url: string;
    width: number;
  };
  id: number;
  low_res_file: {
    height: number;
    url: string;
    width: number;
  };
  media_type: 'image';
  preview_file: {
    height: number | null;
    url: string;
    width: number | null;
  };
  rating: 'explicit';
  score: number;
  sources: string[];
  tags: {
    artist: string[];
    character: string[];
    copyright: string[];
    general: string[];
    meta: string[];
  };
}
export default function Card({item}: {item: ImageData}) {
  let navigate: any = useNavigation();
  return (
    <View style={tw('m-1 bg-red-200  rounded-md  w-[45%]')}>
      <TouchableOpacity
        onPress={() => {
          navigate.navigate('ImageScreen', {
            item,
          });
        }}
        style={tw('bg-neutral-700 rounded-md p-[2px]')}>
        <Image
          source={{uri: item.preview_file.url}}
          style={tw('h-50 w-full rounded-md')}
        />
      </TouchableOpacity>
    </View>
  );
}
