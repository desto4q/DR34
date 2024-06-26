import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Button,
  Easing,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import {
  ExternalStorageDirectoryPath,
  downloadFile,
  exists,
  mkdir,
  stopDownload,
} from '@dr.pogodin/react-native-fs';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import {colors, tw} from '../exports/exports';
import NotifComp from '../Components/NotifComp';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {AiFillCloseCircle} from 'rn-icons/ai';
import Video, {VideoRef} from 'react-native-video';
import {ImageData} from '../@types/types';

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
  const videoRef = useRef<VideoRef>(null);
  const [prog, setProg] = useState<number>(0);
  const [jobid, setJobid] = useState<number>(0);
  const [downloadState, setDownloadState] = useState<boolean>();

  const downloadVideo = async ({id}: {id: string | number}) => {
    try {
      await downloadFile({
        fromUrl: item?.high_res_file?.url,
        toFile: `${ExternalStorageDirectoryPath}/r34/video/${id}.mp4`,
        progress: e => {
          setProg(prog => prog + 1);
        },
        begin: e => {
          if (e.jobId) {
            stopDownload(jobid);
            setJobid(0);
          }

          setDownloadState(true);
          setJobid(e.jobId);
          setProg(0);
        },
        progressDivider: 10,
      }).promise.then(res => {
        downloadFile({
          fromUrl: item?.low_res_file.url,
          toFile: `${ExternalStorageDirectoryPath}/r34/video/.thumbs/${id}.png`,
        });
        setJobid(0);
        setProg(0);

        done();
        setDownloadState(false);
      });
    } catch (err) {
      console.log(err);
      setDownloadState(false);
    }
  };
  let pathChecker = async ({id}: {id: string | number}) => {
    if (await exists(ExternalStorageDirectoryPath + '/r34/video/')) {
      if (
        await exists(`${ExternalStorageDirectoryPath}/r34/video/${id}.mp4`)
      ) {
        Notifier.showNotification({
          title: 'Video exists',
          easing: Easing.ease,
          duration: 1500,
          showAnimationDuration: 600,
        });
      } else {
        try {
          await downloadVideo({id: id});
        } catch (err) {
          await downloadVideo({id: id});
        }
      }
    } else {
      try {
        await mkdir(
          ExternalStorageDirectoryPath + '/r34/video/' &&
            ExternalStorageDirectoryPath + '/r34/video/.thumbs/',
        ).then(async resp => {
          await downloadVideo({id: id});
        });
      } catch (err) {
        return err;
      }
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
      {downloadState ? (
        <NotifComp
          wrapperstyle={tw(
            'absolute w-[100%]  bg-neutral-800  z-10 m-auto self-center  opacity-100',
          )}
          desc="video is downloading">
          <TouchableOpacity>
            <AiFillCloseCircle />
          </TouchableOpacity>
          <ProgressBar
            indeterminate={false}
            progress={prog / 10}
            styleAttr="Horizontal"
            color={colors.green[500]}
          />
        </NotifComp>
      ) : null}
      <View style={tw('h-62')}>
        <Video
          ref={videoRef}
          paused
          poster={item.low_res_file.url}
          posterResizeMode="cover"
          controls
          fullscreenAutorotate
          fullscreenOrientation="landscape"
          style={tw('bg-red-200 p-2 h-full')}
          source={{uri: item.high_res_file.url}}></Video>
      </View>

      <ScrollView style={tw('flex-1 p-2')}>
        <TouchableOpacity
          onPress={() => {
            pathChecker({id: item.id});
          }}
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
