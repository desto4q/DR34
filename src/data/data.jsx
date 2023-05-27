import axios from 'axios';
import { useContext } from 'react';
import { posts } from 'rule34js';
import xml2td, { td2xml } from 'xml2td';



export let  getSingle = async (id) => {
    let url = `https://api.rule34.xxx/index.php?page=dapi&s=post&q=index&id=${id}&json=1`
    let resp = await axios.get(url).then(res =>{
        
        return res.data

    })
    return resp
}




export let search =  async (search,page) => {
    console.log(search)
    let resp = await posts({tags: search ,limit: 20,pid:page, }) .then(res => {
        return res
    }).catch(err => {
        console.log(err)
    })
    return resp
}

export let getTaglist = async (value) => {
    let url = `https://api.r34.app/booru/rule34.xxx/tags?baseEndpoint=rule34.xxx&tag=${value}&order=count&limit=10`
    let resp = await axios.get(url).then((res)=> res.data.data).catch(err=>{console.log(err)})
    return resp
}


export let  gelTags =  async (value) => {
    let url = `https://gelbooru.com/index.php?page=dapi&s=tag&q=index&orderby=count&name_pattern=%${value}%&json=1&limit=6`

    let resp = await axios.get(url).then(res => {
        return res.data.tag
    })
    return resp
}