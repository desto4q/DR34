import {MMKV} from 'react-native-mmkv';
import * as RNFS from '@dr.pogodin/react-native-fs';
import {exists} from '@dr.pogodin/react-native-fs';

let storage = new MMKV({
    id:"user-storage",
    path: RNFS.ExternalStorageDirectoryPath + "/rs34",
});
export {storage};
