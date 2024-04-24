import {View, Text} from 'react-native';
import React from 'react';
import {tw} from '../exports/exports';
import {Style} from 'twrnc';

interface NotfiComp {
  title?: string;
  wrapperstyle?: Style;
  desc?: string;
  titlestyle?: Style;
  descStyle?: Style;
}
export default function NotifComp({title, wrapperstyle, desc,titlestyle,descStyle}: NotfiComp) {
  return (
    <View
      style={tw(
        `p-2 py-4 border rounded-md border-amber-300 bg-neutral-700 ${wrapperstyle}`,
      )}>
      <Text style={tw(`text-lg ${titlestyle}}`)}>{title}</Text>
      <Text style={tw(`text-md  ${descStyle}`)}>{desc}</Text>
    </View>
  );
}
