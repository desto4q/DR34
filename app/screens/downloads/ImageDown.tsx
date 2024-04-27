import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {tw} from '../../exports/exports';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {AiOutlineReload} from 'rn-icons/ai';
import {
  ExternalStorageDirectoryPath,
  ReadDirResItemT,
  exists,
  readDir,
  readdir,
} from '@dr.pogodin/react-native-fs';

export default function ImageDown() {
  let [fileList, setFileList] = useState<ReadDirResItemT[]>();
  let path = ExternalStorageDirectoryPath + '/r34/images/';
  let readImages = async () => {
    if (await exists(path)) {
      let resp = await readDir(path);
      setFileList(resp);
    }
  };
  useEffect(() => {
    readImages();
  }, []);
  return (
    <View style={tw('flex-1 p-2')}>
      <View style={tw('flex-row items-center  justify-between  h-14')}>
        <Text style={tw('p-2 text-lg capitalize')}>downloads</Text>
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
        {fileList?.map(({path, name}) => {
          return (
            <View key={name} style={tw('w-[48%]   rounded-md')}>
              <TouchableOpacity style={tw(' p-1  bg-neutral-600 rounded-md')}>
                <Image
                  style={tw('h-50  w-full rounded-md')}
                  source={{uri: `file:///${path}`}}
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
