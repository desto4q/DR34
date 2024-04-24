import {View, Text} from 'react-native';
import React from 'react';
import {tw} from '../exports/exports';

export default function Loading() {
  return (
    <View style={tw('flex-1 justify-center align-middle items-center')}>
      <Text style={tw('text-xl')}>Loading...</Text>
    </View>
  );
}
