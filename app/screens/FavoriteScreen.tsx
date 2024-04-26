import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storage} from '../storage/storage';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {parser, tw} from '../exports/exports';
import {ImageData, SavedItems} from '../@types/types';
import {useNavigation} from '@react-navigation/native';
import {AiOutlineReload} from 'rn-icons/ai';
import uniqolor from 'uniqolor';
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
  let navigate: any = useNavigation();
  let [saved, setSaved] = useState<string[]>();
  let checkStore = () => {
    let resp = storage.getAllKeys();
    setSaved(resp);
    for (let itm of resp) {
      let itmResp = parser(storage.getString(itm));
      if (itmResp.length < 1) {
        storage.delete(itm);
      }
    }
  };
  useEffect(() => {
    checkStore();
  }, []);

  return (
    <View style={tw('flex-1')}>
      <View style={tw('p-2 flex-row items-center justify-between')}>
        <Text style={tw('text-lg capitalize')}>Saved Items</Text>
        <TouchableOpacity
          onPress={() => {
            checkStore();
            // console.log(savedItems);
          }}
          style={tw('p-2 bg-amber-400 rounded-sm')}>
          <AiOutlineReload size={22} />
        </TouchableOpacity>
      </View>

      {/* <View>
        {saved?.map(item => {
          return <Text>{item}</Text>;
        })}
      </View> */}
      <ScrollView
        style={tw('mt-0 bg-gray-900 rounded-lg')}
        contentContainerStyle={tw(
          'flex flex-row flex-wrap justify-center gap-2',
        )}>
        {saved?.map(item => {
          return (
            <View style={tw('w-[45%]   mt-2  p-2 ')}>
              <TouchableOpacity
                style={tw('gap-2')}
                onPress={() => {
                  navigate.navigate('SingleFav', {
                    date: item,
                  });
                }}>
                <View
                  style={tw(
                    `bg-neutral-800 h-50 w-full p-2 rounded-md border border-[${
                      uniqolor.random().color
                    }]`,
                  )}>
                  <Text>{item}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
