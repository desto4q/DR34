import {View, Text, PermissionsAndroid} from 'react-native';
import React, {useEffect} from 'react';
import {
  DocumentDirectoryPath,
  DownloadDirectoryPath,
  ExternalDirectoryPath,
  ExternalStorageDirectoryPath,
  exists,
  mkdir,
  readDir,
  readdir,
} from '@dr.pogodin/react-native-fs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {tw} from '../exports/exports';
import {GiOnSight} from 'rn-icons/gi';

export default function SettingsScreen() {
  async function requestStorageAccess() {
    const permission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
    );

    if (permission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Granted');
    }
    else {
      console.log("failed")
    }
  }

  useEffect(() => {}, []);
  return (
    <View>
      <Text>Settings ssScreen</Text>
      <TouchableOpacity
        style={tw('bg-emerald-800 p-2 rounded-md m-2')}
        onPress={async () => {
          // let resp = await readdir("/storage/emulated/0/")
          // console.log(DownloadDirectoryPath)
          // console.log(resp)
          // await requestStorageAccess()
          if (await exists(ExternalStorageDirectoryPath + '/r34')) {
            console.log('exists');
          } else {
            await mkdir(ExternalStorageDirectoryPath + '/r34').then(resp => {
              console.log('done');
            });
          }
        }}>
        <Text>Click me</Text>
      </TouchableOpacity>
    </View>
  );
}
