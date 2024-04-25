import {style as tw} from 'twrnc';
import color from 'tailwind-colors';

let parser = (item: string | any) => {
  try {
    return JSON.parse(item);
  } catch (err) {
    return err;
  }
};
export {tw, color as colors, parser};
