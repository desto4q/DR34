import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {colors, tw} from '../exports/exports';
import {searchbytag} from '../api/api_funcs';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'rn-icons/ai';
import Loading from '../Components/Loading';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import VideoCard from '../Components/VideoCard';
import Card from '../Components/Card';
import {useNavigation} from '@react-navigation/native';
interface ISearchResults {
  label: string;
  type: string;
  value: string;
}
interface ImageData {
  high_res_file: {
    height: number;
    url: string;
    width: number;
  };
  id: number;
  low_res_file: {
    height: number;
    url: string;
    width: number;
  };
  media_type: 'image';
  preview_file: {
    height: number | null;
    url: string;
    width: number | null;
  };
  rating: 'explicit';
  score: number;
  sources: string[];
  tags: {
    artist: string[];
    character: string[];
    copyright: string[];
    general: string[];
    meta: string[];
  };
}
interface IResults {
  data: ImageData[];
}

export default function SearchResultsScreen({route}: {route: any}) {
  let {tags}: {tags: ISearchResults[]} = route.params;
  let [pid, setPid] = useState<number>(0);
  let [videoState, setVideoState] = useState<boolean>(false);
  let navigate: any = useNavigation();

  let increasePage = () => {
    setPid(prev => (prev += 1));
  };
  let reducePage = () => {
    if (pid > 0) {
      setPid(prev => (prev -= 1));
    }
  };
  let taglist = tags
    .map(({value}, index) => {
      if (index > 0) {
        return '|' + value;
      }
      return value;
    })
    .join('');
  let {data, isFetching, refetch} = useQuery<IResults>(
    [taglist, videoState, pid],
    () => {
      return searchbytag({pid: pid, video: videoState, tags: String(taglist)});
    },
  );

  return (
    <View style={tw('p-2 flex-1')}>
      <View style={tw('flex-row gap-4 items-center')}>
        <TouchableOpacity
          onPress={e => {
            setVideoState(false);
          }}
          style={tw(
            ` border-b ${videoState ? '' : 'border-b border-amber-400'} p-2`,
          )}>
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={e => {
            setVideoState(true);
          }}
          style={tw(` ${videoState ? 'border-b border-amber-400' : ''} p-2`)}>
          <Text>Video</Text>
        </TouchableOpacity>
        <View
          style={tw(
            ' p-2 ml-auto w-40 bg-opacity-70 bg-neutral-600 shadow-xl right-0 justify-between flex-row items-center rounded-md ',
          )}>
          <TouchableOpacity
            style={tw('bg-amber-400 p-2 rounded-md')}
            onPress={reducePage}>
            <AiOutlineArrowLeft />
          </TouchableOpacity>
          <Text>{pid}</Text>
          <TouchableOpacity
            style={tw('bg-amber-400 p-2 rounded-md')}
            onPress={increasePage}>
            <AiOutlineArrowRight />
          </TouchableOpacity>
        </View>
      </View>
      <View style={tw('p-2 flex-row items-start gap-2 flex-wrap')}>
        <TouchableOpacity
          style={tw('bg-yellow-600 rounded-md p-2')}
          onPress={() => {
            navigate.goBack();
          }}>
          <AiOutlineArrowLeft fill={colors.black} />
        </TouchableOpacity>
        <Text style={tw('')}>{taglist.replace('|', ', ')}</Text>
      </View>
      {isFetching ? (
        <Loading />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                refetch();
              }}
            />
          }
          contentContainerStyle={tw('flex-row flex-wrap justify-center')}>
          {data?.data.map(item => {
            if (item.media_type != 'image') {
              return <VideoCard key={item.id} item={item} />;
            }
            return <Card key={item.id} item={item} />;
          })}
        </ScrollView>
      )}
    </View>
  );
}
