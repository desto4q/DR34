import {View, Text, Image} from 'react-native';
import React, {useEffect} from 'react';
import {parser, tw} from '../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../storage/storage';
import {BiSave} from 'rn-icons/bi';
import {exists} from '@dr.pogodin/react-native-fs';
import {ImageData} from '../@types/types';

interface SavedCarD extends ImageData {
  currdate?: string;
}


export default function SavedCard({
  item,
  refresh,
  currdate
}: {
  item: SavedCarD;
  refresh: any;
  currdate: string
}) {
  let removeItem = ({id}: {id: any}) => {
    try {
      // Get the current list of items from AsyncStorage
      const prevItems = storage.getString(String(currdate));
      
      if (prevItems) {
        const itemsArray = JSON.parse(prevItems);

        // Filter out the item with the specified ID
        const updatedList = itemsArray.filter(
          (itm: ImageData) => itm.id !== id,
        );
        storage.set(String(currdate), JSON.stringify(updatedList));
        refresh(updatedList);

      } else {
      }
    } catch (error) {
      console.error('Error removing item from AsyncStorage:', error);
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
      <TouchableOpacity onPress={()=>{
        removeItem({id: item.id})
      }} style={tw('p-2 bg-green-600')}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
