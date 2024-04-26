import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, tw} from '../exports/exports';
import {BiSearch} from 'rn-icons/bi';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {autoComp} from '../api/api_funcs';
import {Notifier} from 'react-native-notifier';
import {AiFillCloseCircle} from 'rn-icons/ai';
import {useNavigation} from '@react-navigation/native';

interface ISearchResults {
  label: string;
  type: string;
  value: string;
}

let ErrorComp = () => {
  return (
    <View
      style={tw(
        'm-2 bg-neutral-900  p-2 py-4 rounded-md border border-yellow-500',
      )}>
      <Text style={tw('text-lg')}>Exists</Text>
    </View>
  );
};
let showError = () => {
  Notifier.showNotification({
    title: 'exists',
    Component: ErrorComp,
  });
};

export default function SearchScreen() {
  let [searchInput, setSearchInput] = useState<string>('');
  let [tags, SetTags] = useState<ISearchResults[]>([]);

  let {data} = useQuery<ISearchResults[]>([searchInput], () => {
    return autoComp({req: searchInput});
  });
  // useEffect(() => {
  //   console.log(tags);
  // }, [tags]);
  let navigation: any = useNavigation();
  return (
    <View style={tw('flex-1 p-2 bg-gray-900')}>
      <View style={tw('bg-neutral-700 flex-row items-center px-2 rounded-md')}>
        <BiSearch style={tw()} fill={colors.yellow[400]} size={28} />
        <TextInput
          placeholder="search tags..."
          onChangeText={e => {
            setSearchInput(e);
          }}
          value={searchInput}
          multiline
          style={{...tw('mr-auto w-[80%]')}}
        />
        <TouchableOpacity
          disabled={tags.length > 0 ? false : true}
          onPress={() => {
            navigation.navigate('SearchResults', {tags});
          }}
          style={tw('bg-yellow-600 p-2 rounded-sm ml-auto')}>
          <Text style={tw('text-black')}>Go</Text>
        </TouchableOpacity>
      </View>
      <View style={tw('pt-2 rounded-lg bg-neutral-800 mt-2 px-0')}>
        {data?.map(({label, value, type}, index) => {
          let itemObject: ISearchResults = {
            type: type,
            value: value,
            label: label,
          };
          if (index > 6) {
            return null;
          }
          return (
            <TouchableOpacity
              onPress={() => {
                for (let i of tags) {
                  if (i.value == itemObject.value) {
                    showError();
                    return '';
                    break;
                  }
                }
                SetTags(prev => [...prev, itemObject]);
              }}
              key={label}
              style={tw(' border-b border-neutral-700 p-2 py-3')}>
              <Text>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={tw('mt-auto mb-16 flex-row gap-2 flex-wrap')}>
        {tags.map(({value, type, label}, index) => {
          return (
            <View
              key={value}
              style={tw(
                'p-2 bg-neutral-700 flex-row  gap-2 items-center  rounded-md',
              )}>
              <Text style={tw('text-sm')}>{label}</Text>
              <TouchableOpacity
                onPress={() => {
                  for (let i of tags) {
                    if (i.value == value) {
                      SetTags(prev =>
                        prev.filter(item => item.value != i.value),
                      );
                    }
                  }
                }}>
                <AiFillCloseCircle style={tw('text-red-200')} size={22} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}
