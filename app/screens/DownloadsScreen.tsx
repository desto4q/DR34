import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ExternalStorageDirectoryPath,
  ReadDirAssetsResItemT,
  ReadDirResItemT,
  readDir,
  readDirAssets,
} from '@dr.pogodin/react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import {date, tw} from '../exports/exports';
import VideoPlayer from 'react-native-video';
import {storage} from '../storage/storage';
import {ImageData} from '../@types/types';

export default function SavedScreen() {
  let [fileList, setFileList] = useState<ReadDirAssetsResItemT[]>();

  let readDownloads = async () => {
    let resp = await readDirAssets(ExternalStorageDirectoryPath + '/r34');
    console.log(resp)
    setFileList(resp);
    return resp;
    // let empty: ImageData[] = [];
    // storage.set(date, JSON.stringify(empty));
  };
  useEffect(() => {}, []);
  return (
    <View style={tw('p-2 flex-1')}>
      <Text>SavedScreen</Text>
      <TouchableOpacity
        style={tw('p-2 bg-amber-400 self-start mt-4')}
        onPress={readDownloads}>
        <Text>readdownloads</Text>
      </TouchableOpacity>
      
    </View>
  );
}
