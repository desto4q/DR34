import {style as tw} from 'twrnc';
import color from 'tailwind-colors';

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
export {tw, color as colors, parser,date};
