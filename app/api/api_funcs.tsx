let autoComp = async ({req}: {req: string}) => {
  let resp = await fetch(`https://ac.rule34.xxx/autocomplete.php?q=${req}`);
  return resp.json();
};

interface IBase {
  pid: number;
  video?: boolean;
  tags?: string;
}

// let searchbytag = async ({pid}: IBase) => {
//   try {
//     let resp = await fetch(
//       `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&tags=alcina_dimitrescu&json=1&pid=${pid}`,
//     );
//     return resp.json();
//   } catch (err) {
//     return err;
//   }
// }

let searchbytag = async ({pid, video, tags}: IBase) => {
  try {
    let resp = await fetch(
      `https://api.r34.app/booru/rule34.xxx/posts?baseEndpoint=rule34.xxx&limit=30&pageID=${pid}&tags=${tags}${
        video ? '|video' : ''
      }&score=%3E=5`,
    );
    return resp.json();
  } catch (err) {
    return err;
  }
};

let GetRecent = async ({pid, video}: IBase) => {
  let url = `https://api.r34.app/booru/rule34.xxx/posts?baseEndpoint=rule34.xxx&limit=30&pageID=${pid}&score=%3E=5`;
  if (video) {
    url = `https://api.r34.app/booru/rule34.xxx/posts?baseEndpoint=rule34.xxx&limit=30&pageID=${pid}&score=%3E=5&tags=${'video'}`;
  }
  try {
    let resp = await fetch(url);
    return resp.json();
  } catch (err) {
    return err;
  }
};
let fetch_post = async ({id}: {id: number}) => {
  let resp = await fetch(
    `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${id}&json=1`,
  );
  return resp.json();
};

let test_func = async () => {
  let resp = await fetch('https://dummyjson.com/products');
  return resp.json();
};

export {searchbytag, fetch_post, test_func, GetRecent, autoComp};
