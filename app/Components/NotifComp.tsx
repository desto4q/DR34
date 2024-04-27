import {View, Text} from 'react-native';
import React, {Children, ReactNode} from 'react';
import {tw} from '../exports/exports';
import {Style} from 'twrnc';

interface NotfiComp {
  title?: string;
  wrapperstyle?: Style;
  desc?: string;
  titlestyle?: Style;
  descStyle?: Style;
  children?: ReactNode;
}
export default function NotifComp({
  title,
  wrapperstyle,
  desc,
  titlestyle,
  descStyle,
  children,
}: NotfiComp) {
  return (
    <View
      style={{
        ...tw(`p-2 py-4 border rounded-md border-amber-300 bg-neutral-700 `),
        ...wrapperstyle,
      }}>
      {title ? (
        <Text style={{...tw(`text-lg`), ...titlestyle}}>{title}</Text>
      ) : null}
      {desc ? <Text style={{...tw(), ...descStyle}}>{desc}</Text> : null}
      {children}
    </View>
  );
}
