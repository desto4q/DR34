import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ExternalStorageDirectoryPath,
  ReadDirResItemT,
  readDir,
} from '@dr.pogodin/react-native-fs';
import {ScrollView} from 'react-native-gesture-handler';
import {date, tw} from '../exports/exports';
import VideoPlayer from 'react-native-video';
import {storage} from '../storage/storage';
import {ImageData} from '../@types/types';

export default function SavedScreen() {
  let [fileList, setFileList] = useState<ReadDirResItemT[]>();

  let readDownloads = async () => {
    let resp = await readDir(ExternalStorageDirectoryPath + '/r34');

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
      {/* <ScrollView>
        {fileList?.map(({path}) => {
          return (
            <View style={tw('h-50 bg-slate-400  mt-4')}>
              <VideoPlayer
                paused
                controls
                source={{uri: path}}
                style={tw('h-full')}
              />
            </View>
          );
        })}
        <View style={tw('h-16')}></View>
      </ScrollView> */}
    </View>
  );
}
