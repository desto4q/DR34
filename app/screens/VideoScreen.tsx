import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import VideoPlayer from 'react-native-video-controls';
import {
  ExternalStorageDirectoryPath,
  downloadFile,
  stopDownload,
} from '@dr.pogodin/react-native-fs';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {tw} from '../exports/exports';
import NotifComp from './NotifComp';

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
let Started = () => {
  return (
    <View
      style={tw('p-2 py-4 border rounded-md border-amber-300 bg-neutral-700')}>
      <Text style={tw('text-lg')}>download started</Text>
    </View>
  );
};

const start = () => {
  return Notifier.showNotification({
    title: 'started',
    description: 'check saved for downloads',
    Component: Started,
  });
};

const VideoScreen = ({route}: any) => {
  const navigator = useNavigation();
  const {item}: {item: ImageData} = route.params;
  const videoRef = useRef(null);
  const [prog, setProg] = useState<number>(0);
  const [jobid, setJobid] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const downloadVideo = async () => {
    try {
      await downloadFile({
        fromUrl: item.high_res_file.url,
        toFile: `${ExternalStorageDirectoryPath}/r34/${item.id}.mp4`,
        progress: e => {
          setProg(prog => prog + 1);
        },
        begin: e => {
          if (e.jobId) {
            stopDownload(jobid);
          }
          start();
          setJobid(e.jobId);
          setProg(0);
        },
        progressDivider: 10,
      }).promise.then(res => {
        setJobid(0);
        setProg(0);
        done();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const renderTags = (tags: string[]) => {
    return tags.map(item => (
      <TouchableOpacity key={item} style={tw('bg-amber-500 p-1 rounded-sm')}>
        <Text style={tw('text-black text-sm')}>{item}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={tw('p-2 flex-1')}>
      <NotifComp wrapperstyle={tw("bg-red-200")}/>
      <View style={tw('h-62')}>
        <VideoPlayer
          disableFullscreen
          controls
          source={{uri: item.high_res_file.url}}
        />
      </View>

      <ScrollView style={tw('flex-1 p-2')}>
        <TouchableOpacity
          onPress={downloadVideo}
          style={tw('bg-amber-500 p-1 rounded-sm mt-4 self-start')}>
          <Text style={tw('text-black text-lg ')}>Download</Text>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <View>
            <Text style={tw('text-lg mt-4')}>Artist:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {renderTags(item.tags.artist)}
            </View>
          </View>
          <View>
            <Text style={tw('text-lg mt-4')}>Character:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {renderTags(item.tags.character)}
            </View>
          </View>
          <View>
            <Text style={tw('text-lg mt-4')}>Tags:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {renderTags(item.tags.general)}
            </View>
          </View>
        </View>
        <View style={tw('h-2')}></View>
      </ScrollView>
    </View>
  );
};

export default VideoScreen;