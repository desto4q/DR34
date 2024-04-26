import {View, Text, TouchableOpacity, Image, Easing} from 'react-native';
import React, {useState} from 'react';
import {colors, tw} from '../exports/exports';
import {ScrollView} from 'react-native-gesture-handler';
import {ImageData} from '../@types/types';
import {
  ExternalStorageDirectoryPath,
  downloadFile,
  exists,
  mkdir,
  stopDownload,
} from '@dr.pogodin/react-native-fs';
import {Notifier, NotifierComponents} from 'react-native-notifier';
import NotifComp from './NotifComp';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {AiFillCloseCircle} from 'rn-icons/ai';
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
export default function ImageScreen({route}: {route: any}) {
  const [prog, setProg] = useState<number>(0);
  const [jobid, setJobid] = useState<number>(0);
  const [downloadState, setDownloadState] = useState<boolean>();

  const downloadVideo = async ({id}: {id: string | number}) => {
    try {
      await downloadFile({
        fromUrl: item?.high_res_file?.url,
        toFile: `${ExternalStorageDirectoryPath}/r34/images/${id}.png`,
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
    if (await exists(ExternalStorageDirectoryPath + '/r34/images/')) {
      if (
        await exists(`${ExternalStorageDirectoryPath}/r34/images/${id}.png`)
      ) {
        Notifier.showNotification({
          title: 'Image exists',
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
        await mkdir(ExternalStorageDirectoryPath + '/r34/images/').then(
          async resp => {
            await downloadVideo({id: id});
          },
        );
      } catch (err) {
        return err;
      }
    }
  };

  let {item}: {item: ImageData} = route.params;
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
      <View
        style={tw(
          ' h-[400px] w-full justify-center p-1 bg-opacity-10 bg-amber-600 rounded-md',
        )}>
        <Image
          source={{uri: item.high_res_file.url}}
          style={{...tw('h-full w-full'), objectFit: 'contain'}}></Image>
      </View>
      <ScrollView style={tw('flex-1 p-2')}>
        <View style={{flex: 1}}>
          <View>
            <TouchableOpacity
              onPress={() => {
                pathChecker({id: item.id});
              }}
              style={tw('bg-amber-500 p-1 rounded-sm mt-4 self-start')}>
              <Text style={tw('text-black text-lg ')}>Download</Text>
            </TouchableOpacity>
            <Text style={tw('text-lg mt-4')}>Artist:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {item.tags?.artist.map(item => {
                return (
                  <TouchableOpacity
                    key={item}
                    style={tw('bg-amber-500 p-1 rounded-sm')}>
                    <Text style={tw('text-black text-sm')}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View>
            <Text style={tw('text-lg mt-4')}>Character:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {item.tags?.character.map(item => {
                return (
                  <TouchableOpacity
                    key={item}
                    style={tw('bg-amber-500 p-1 rounded-sm')}>
                    <Text style={tw('text-black text-sm')}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View>
            <Text style={tw('text-lg mt-4')}>Tags:</Text>
            <View style={tw('flex-row gap-2 mt-2 flex-wrap')}>
              {item.tags?.general.map(item => {
                return (
                  <TouchableOpacity
                    key={item}
                    style={tw('bg-amber-500 p-1 rounded-sm')}>
                    <Text style={tw('text-black text-sm')}>{item}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
        <View style={tw('h-2')}></View>
      </ScrollView>
    </View>
  );
}
