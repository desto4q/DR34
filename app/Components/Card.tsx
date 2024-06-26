import {View, Text, Image, Easing} from 'react-native';
import React, {useEffect, useState} from 'react';
import {parser, tw} from '../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../storage/storage';
import {BiSave} from 'rn-icons/bi';
import {
  ExternalStorageDirectoryPath,
  downloadFile,
  exists,
  mkdir,
  stopDownload,
} from '@dr.pogodin/react-native-fs';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {ImageData} from '../@types/types';
const done = () => {
  return Notifier.showNotification({
    title: 'Download complete',
    description: 'check saved for downloads',
    Component: NotifierComponents.Alert,
    componentProps: {
      alertType: 'success',
    },
  });
};
let date = new Date().toLocaleDateString('en-us', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
let showFound = () => {
  Notifier.showNotification({
    title: 'found',
    description: 'Item exists',
    duration: 1000,

    showAnimationDuration: 100,
    showEasing: Easing.cubic,
    onHidden: () => console.log('Hidden'),
    onPress: () => console.log('Press'),
    hideOnPress: false,
  });
};
let showAdded = () => {
  Notifier.showNotification({
    title: 'Added',
    description: `added to ${date}`,
    duration: 1000,

    showAnimationDuration: 100,
    showEasing: Easing.cubic,
    onHidden: () => console.log('Hidden'),
    onPress: () => console.log('Press'),
    hideOnPress: false,
  });
};

export default function Card({item}: {item: ImageData}) {
 
  let addToFav = () => {
    if (storage.contains(String(date))) {
      let prev: ImageData[] = parser(storage.getString(date));
      let exists = false;
      for (let i of prev) {
        if (i.id == item.id) {
          exists = true;

          break;
        }
        if (!exists) {
          showFound();
        }
      }
      if (exists == false) {
        storage.set(date, JSON.stringify([...prev, item]));
        console.log('added');
        console.log('safe');
        showAdded();
      }
    } else {
      storage.set(date, JSON.stringify([item]));
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
