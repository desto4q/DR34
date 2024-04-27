import {View, Text, Image} from 'react-native';
import React from 'react';
import {tw} from '../../exports/exports';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AiOutlineArrowLeft, AiOutlineReload} from 'rn-icons/ai';
import {useNavigation} from '@react-navigation/native';
import {ReactNativeZoomableView} from '@openspacelabs/react-native-zoomable-view';
export default function SingleImageScreen({route}: {route: any}) {
  let {path, name} = route.params;
  let navigation = useNavigation();
  return (
    <View style={tw('flex-1')}>
      <View style={tw('p-2 py-4')}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={tw('p-2 bg-amber-400 self-start rounded-md')}>
          <AiOutlineArrowLeft size={22} />
        </TouchableOpacity>
      </View>
      <Text>{path}</Text>
      <View style={tw('bg-gray-800 m-2 rounded-lg flex-1 p-1')}>
        <ReactNativeZoomableView
          maxZoom={25}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1}
          bindToBorders={true}
          // onZoomAfter={this.logOutZoomState}
          style={tw('rounded-md')}>
          <Image
            style={tw('h-full  w-full rounded-md')}
            source={{uri: `file:///${path}`}}
          />
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}
