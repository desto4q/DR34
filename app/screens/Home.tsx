import {
  View,
  Text,
  TextInput,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import {tw} from '../exports/exports';
import {GetRecent, autoComp, searchbytag, test_func} from '../api/api_funcs';
import Card from '../Components/Card';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {AiOutlineArrowLeft, AiOutlineArrowRight} from 'rn-icons/ai';
import Loading from '../Components/Loading';
import VideoCard from '../Components/VideoCard';
import { ImageData } from '../@types/types';


interface IResults {
  data: ImageData[];
}
export default function Home() {
  let [pid, setPid] = useState<number>(0);
  let [videoState, setVideoState] = useState<boolean>(false);
  let {data, isFetching, refetch} = useQuery<IResults>(
    [pid, videoState],
    () => {
      return GetRecent({pid: pid, video: videoState});
    },
  );

  let increasePage = () => {
    setPid(prev => (prev += 1));
  };
  let reducePage = () => {
    if (pid > 0) {
      setPid(prev => (prev -= 1));
    }
  };
  useEffect(() => {}, [data]);

  return (
    <View style={tw('p-2 flex-1')}>
      <View style={tw(' flex-row items-center mb-4 gap-4 px-2')}>
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
        </View>
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
      {isFetching ? (
        <Loading />
      ) : (
        <ScrollView
          style={tw('bg-gray-900 pt-2  rounded-lg ')}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => {
                refetch();
              }}
            />
          }
          contentContainerStyle={tw('flex-row flex-wrap justify-center pb-18')}>
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
