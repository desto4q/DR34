import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storage} from '../storage/storage';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {parser, tw} from '../exports/exports';
import {ImageData, SavedItems} from '../@types/types';
import {useNavigation} from '@react-navigation/native';
let data = new Date().toLocaleDateString('en-us', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

interface ItemsCard {
  date: string;
  items: ImageData[];
}
export default function FavoriteScreen() {
  let navigate = useNavigation<any>();
  let [saved, setSaved] = useState<string[]>();
  let [savedItems, setSavedItems] = useState<ItemsCard[]>([]);
  let checkStore = () => {
    let resp = storage.getAllKeys();
    let newList: ItemsCard[] = [];
    for (let i of resp) {
      let itmList: ImageData[] = parser(storage.getString(i));
      let itm = {
        date: String(i),
        items: itmList,
      };
      newList.push(itm);
    }
    setSavedItems(newList);

    console.log(newList);
    // for (let i of resp) {
    //   let itmList: ImageData[] = parser(storage.getString(i));
    //   let itm = {
    //     date: String(i),
    //     items: itmList,
    //   };
    //   setSavedItems(prev => [...prev, itm]);
    // }
    setSaved(resp);
  };
  useEffect(() => {
    checkStore();
  }, []);
  return (
    <View style={tw('flex-1')}>
      <Text>{data}</Text>
      <TouchableOpacity
        onPress={() => {
          checkStore();
          // console.log(savedItems);
        }}
        style={tw('p-2 bg-emerald-600')}>
        <Text>click me</Text>
      </TouchableOpacity>

      <View>
        {saved?.map(item => {
          return <Text>{item}</Text>;
        })}
      </View>
      <ScrollView
        style={tw('mt-4')}
        contentContainerStyle={tw(
          'flex flex-row flex-wrap justify-center gap-2',
        )}>
        {savedItems.map(item => {
          // return <Text>{item.date}</Text>;
          return (
            <View style={tw('w-[45%] gap-2 mt-2 ')}>
              <TouchableOpacity onPress={() => {}}>
                <Text>{item.date}</Text>
                <Image
                  style={tw('h-50')}
                  source={{uri: item.items[0].low_res_file.url}}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
