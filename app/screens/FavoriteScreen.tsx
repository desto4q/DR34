import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storage} from '../storage/storage';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {parser, tw} from '../exports/exports';
import {ImageData, SavedItems} from '../@types/types';
import {useNavigation} from '@react-navigation/native';
import {AiOutlineReload} from 'rn-icons/ai';
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
  let [savedItems, setSavedItems] = useState<ItemsCard[]>([]);
  let checkStore = () => {
    let resp = storage.getAllKeys();
    let newList: ItemsCard[] = [];
    for (let i of resp) {
      let itmList: ImageData[] = parser(storage.getString(i));
      if (itmList.length< 1) {
        storage.delete(i)
      }
      let itm = {
        date: String(i),
        items: itmList,
      };
      newList.push(itm);
    }
    setSavedItems(newList);



    setSaved(resp);
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
        {savedItems?.map(item => {
          // return <Text>{item.date}</Text>;
          
          return (
            <View style={tw('w-[45%]   mt-2  p-2 ')}>
              <TouchableOpacity
                style={tw('gap-2')}
                onPress={() => {
                  navigate.navigate('SingleFav', {
                    date: item.date,
                  });
                }}>
                <Text>{item.date}</Text>
                {item?.items.length > 0 ? (
                  <Image
                    style={tw('h-50 rounded-md')}
                    source={{uri: item?.items[0]?.low_res_file.url}}
                  />
                ) : (
                  <View style={tw('bg-neutral-800 h-50 w-full p-2 rounded-md')}>
                    <Text>Empty</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
