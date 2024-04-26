import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {parser, tw} from '../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../storage/storage';
import {BiSave} from 'rn-icons/bi';
import {exists} from '@dr.pogodin/react-native-fs';

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
let date = new Date().toLocaleDateString('en-us', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export default function Card({item}: {item: ImageData}) {
  
  let addToFav = () => {
    if (storage.contains(String(date))) {
      let prev: ImageData[] = parser(storage.getString(date));
      let exists = false;
      for (let i of prev) {
        if (i.id == item.id) {
          exists = true;
          console.log('found');
          break;
        }
        if (!exists) {
          
        }
      }
      if (exists == false) {
        storage.set(date, JSON.stringify([...prev, item]));
        console.log('added');
        console.log('safe');
      }
    } else {
      storage.set(date, JSON.stringify([item]));
      console.log('done');
    }
  };
  let navigate: any = useNavigation();
  return (
    <View style={tw('m-1  rounded-md  w-[45%]')}>
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

      <TouchableOpacity
        onPress={() => {
          addToFav();
        }}
        style={tw('mt-4 bg-emerald-400 rounded-md p-1 self-start')}>
        <BiSave size={18} />
      </TouchableOpacity>
    </View>
  );
}
