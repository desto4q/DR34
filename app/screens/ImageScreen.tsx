import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {tw} from '../exports/exports';
import {ScrollView} from 'react-native-gesture-handler';
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
export default function ImageScreen({route}: {route: any}) {
  let {item}: {item: ImageData} = route.params;
  return (
    <View style={tw('p-2 flex-1')}>
      <Text></Text>
      <View
        style={tw(
          ' h-[400px] w-full justify-center p-1 bg-opacity-10 bg-amber-600 rounded-md',
        )}>
        <Image
          source={{uri: item.high_res_file.url}}
          style={{...tw('h-full w-full'),objectFit: "contain"}}></Image>
      </View>
      <ScrollView style={tw('flex-1 p-2')}>
        <View style={{flex: 1}}>
          <View>
            <Text style={tw('text-lg mt-4')}>Artist:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {item.tags?.artist.map(item => {
                return (
                  <TouchableOpacity
                    key={item}
                    style={tw('bg-amber-500 p-1 rounded-sm')}>
                    <Text style={tw('text-black text-sm')}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View>
            <Text style={tw('text-lg mt-4')}>Character:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {item.tags?.character.map(item => {
                return (
                  <TouchableOpacity
                    key={item}
                    style={tw('bg-amber-500 p-1 rounded-sm')}>
                    <Text style={tw('text-black text-sm')}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View>
            <Text style={tw('text-lg mt-4')}>Tags:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {item.tags?.general.map(item => {
                return (
                  <TouchableOpacity
                    key={item}
                    style={tw('bg-amber-500 p-1 rounded-sm')}>
                    <Text style={tw('text-black text-sm')}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <View style={tw('h-2')}></View>
      </ScrollView>
    </View>
  );
}
