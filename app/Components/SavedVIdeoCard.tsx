import {View, Text, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {tw} from '../exports/exports';
import {useNavigation} from '@react-navigation/native';
import {storage} from '../storage/storage';
import {ImageData} from '../@types/types';

interface SavedCarD extends ImageData {
  currdate?: string;
}

export default function SavedVIdeoCard({
  item,
  refresh,
  currdate,
}: {
  item: SavedCarD;
  refresh: any;
  currdate: string;
}) {
  let navigate: any = useNavigation();
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
  return (
    <View style={tw(' m-1  rounded-md  w-[45%]')}>
      <TouchableOpacity
        onPress={() => {
          navigate.navigate('VideoScreen', {
            item,
          });
        }}
        style={tw('bg-amber-600 bg-opacity-50 rounded-md p-[2px]')}>
        <Image
          source={{uri: item.preview_file.url}}
          style={tw('h-50 w-full rounded-md')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          removeItem({id: item.id});
        }}
        style={tw('p-2 bg-green-600')}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}
