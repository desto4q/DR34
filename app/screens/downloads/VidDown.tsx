import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  ExternalStorageDirectoryPath,
  ReadDirResItemT,
  exists,
  readDir,
  readdir,
} from '@dr.pogodin/react-native-fs';
import {tw} from '../../exports/exports';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {AiOutlineReload} from 'rn-icons/ai';
import {useNavigation} from '@react-navigation/native';

export default function VidDown() {
  let thumbs_path = ExternalStorageDirectoryPath + '/r34/video/.thumbs/';
  let [fileList, setFileList] = useState<ReadDirResItemT[]>();
  let path = ExternalStorageDirectoryPath + '/r34/video/';
  let readImages = async () => {
    if (await exists(path)) {
      let resp = await readDir(path);
      setFileList(resp);
    }
  };
  let navigation: any = useNavigation();
  useEffect(() => {
    readImages();
  }, []);

  useEffect(() => {}, []);
  return (
    <View style={tw('flex-1 p-2')}>
      <View style={tw('flex-row items-center  justify-between  h-14')}>
        <Text style={tw('p-2 text-lg capitalize')}>download: Videos</Text>
        <TouchableOpacity
          onPress={() => {
            readImages();
          }}
          style={tw('p-2 bg-amber-400 rounded-md ml-auto ')}>
          <AiOutlineReload size={22} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={tw('bg-slate-900 rounded-lg pt-3 px-2')}
        contentContainerStyle={tw('flex-row gap-2 flex-wrap  flex-1')}>
        {fileList?.map(({isFile, path, name}) => {
          let thumbNail = thumbs_path + name.replace('mp4', 'png');
          console.log(thumbNail);
          if (!isFile()) {
            return null;
          }
          return (
            <View key={name} style={tw('w-[48%]   rounded-md')}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SingleVidScreen', {
                    path: path,
                    name: name,
                    poster: thumbNail,
                  });
                }}
                style={tw(' p-1  bg-amber-400 bg-opacity-40 rounded-md')}>
                <Image
                  style={tw('h-50  w-full rounded-md')}
                  source={{
                    uri: `file:///${thumbNail}`,
                  }}
                />
              </TouchableOpacity>
              <Text style={tw('mt-2')}>{name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
