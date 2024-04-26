import {style as tw} from 'twrnc';
import color from 'tailwind-colors';
import { ExternalStorageDirectoryPath, exists, mkdir } from '@dr.pogodin/react-native-fs';
import { Easing, Notifier } from 'react-native-notifier';

let parser = (item: string | any) => {
  try {
    return JSON.parse(item);
  } catch (err) {
    return err;
  }
};



let date = new Date().toLocaleDateString('en-us', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});
export {tw, color as colors, parser, date};
