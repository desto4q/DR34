import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ExternalStorageDirectoryPath,
  ReadDirAssetsResItemT,
  ReadDirResItemT,
  readDir,
  readDirAssets,
  readdir,
} from '@dr.pogodin/react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import {date, tw} from '../exports/exports';
import VideoPlayer from 'react-native-video';
import {storage} from '../storage/storage';
import {ImageData} from '../@types/types';
import {AiOutlineReload} from 'rn-icons/ai';
import {
  NavigationAction,
  NavigationProp,
  NavigatorScreenParams,
  useNavigation,
} from '@react-navigation/native';

export default function SavedScreen() {
  let [fileList, setFileList] = useState<any[]>();
  let navigate: any = useNavigation();

  let readDownloads = async () => {
    let resp = await readdir(ExternalStorageDirectoryPath + '/r34');
    setFileList(resp);
    return resp;
  };
  useEffect(() => {
    readDownloads();
  }, []);

  return (
    <View style={tw('p-2 flex-1')}>
      <View style={tw('flex-row items-center h-14')}>
        <Text style={tw('p-2 text-lg capitalize')}>downloads</Text>
        <TouchableOpacity
          onPress={() => {
            readDownloads();
          }}
          style={tw('p-2 bg-amber-400 rounded-md ml-auto ')}>
          <AiOutlineReload size={22} />
        </TouchableOpacity>
      </View>
      <ScrollView style={tw('mt-2 bg-gray-900 rounded-lg pt-2')}>
        <View style={tw('  h-40 p-2 ')}>
          <TouchableOpacity
            style={tw(
              'bg-gray-600 flex-1 w-full items-center justify-center rounded-md',
            )}>
            <Text style={tw('text-5xl')}>All</Text>
          </TouchableOpacity>
        </View>

        {fileList?.map(item => {
          let route = 'ImageDownScreen';
          if (String(item).includes('video')) {
            route = 'VidDownScreen';
          }
          return (
            <View key={item} style={tw('  h-40 p-2 ')}>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(route);
                }}
                style={tw(
                  'bg-gray-600 flex-1 w-full items-center justify-center rounded-md',
                )}>
                <Text style={tw('text-5xl capitalize')}>{item}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
