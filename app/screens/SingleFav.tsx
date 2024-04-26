import {View, Text, TouchableOpacity} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {NavigationAction} from '@react-navigation/native';
import {ImageData} from '../@types/types';
import {storage} from '../storage/storage';
import {colors, parser, tw} from '../exports/exports';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import VideoCard from '../Components/VideoCard';
import Card from '../Components/Card';
import SavedCard from '../Components/SavedCard';
import {AiOutlineLoading, AiOutlineReload} from 'rn-icons/ai';
import SavedVIdeoCard from '../Components/SavedVIdeoCard';

export default function SingleFav({route}: any) {
  let {date} = route.params;
  let [ItemList, setItemList] = useState<ImageData[]>();
  let getALLItems = () => {
    let resp: ImageData[] = parser(storage.getString(date));

    setItemList(resp);
    return resp;
  };

  useLayoutEffect(() => {
    getALLItems();
  }, []);
  return (
    <View style={tw('flex-1 p-2')}>
      <View style={tw('flex-row items-center h-14')}>
        <Text style={tw('p-2 text-lg capitalize')}>{date}</Text>
        <TouchableOpacity style={tw('p-2 bg-amber-400 rounded-md ml-auto ')}>
          <AiOutlineReload size={22} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={tw('bg-gray-900 pt-2 rounded-lg')}
        contentContainerStyle={tw('flex-row flex-wrap justify-center')}>
        {ItemList?.map((item, index) => {
          if (item.media_type != 'image') {
            return (
              <SavedVIdeoCard
                currdate={date}
                refresh={setItemList}
                key={index}
                item={item}
              />
            );
          }
          return (
            <SavedCard
              key={index}
              currdate={date}
              refresh={setItemList}
              item={item}
            />
          );
        })}
      </ScrollView>
    </View>
  );
}
