import React, { useContext, useEffect,useLayoutEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { userContext } from '../context/context'
import { useQuery } from 'react-query'
import { getSingle } from '../data/data'

function PostID() {
  let {id} = useParams()
  let [type,setType] = useState("jpg")
  let {data,isLoading} = useQuery(["single" ,id], ()=>{
    let resp = getSingle(id)
    return resp
  })


 
  

  let getfiletype = async (url) =>{
    // Remove everything to the last slash in URL
    url = url.substr(1 + url.lastIndexOf("/"));

    // Break URL at ? and take first part (file name, extension)
    url = url.split('?')[0];

    // Sometimes URL doesn't have ? but #, so we should aslo do the same for #
    url = url.split('#')[0];
    url = url.split(".")[1]
    if (url == "mp4") {
      setType(url)
    }
    console.log(url)
    return url;
  }

  useEffect(()=>{
    if (data != undefined) {
      let url = data[0].file_url
      getfiletype(url)
    }
  },[data])

   if (isLoading == false ) {
      // console.log(data[0])
    if (type == "mp4" || type=="mkv") {
        let src = data[0].sample_url.replace("jpg","mp4")
        let src2 =data[0].sample_url.replace("png", "mp4")

      return (
        <div className="postId">
          <div className="videoCont">
          <video  controls poster={data[0].sample_url}>
            <source src={src} type="video/mp4" />
          </video>
          </div>
         {/* <div className="videoCont">
            <Player >
              <source src={src} type="video/mp4" />
            </Player>
         </div> */}
          <div className="info">
            <div className='artist'><div className="left">Artist:</div> {data[0].owner}</div>
            <div> <div className="left">id:</div><p> {data[0].id}</p></div>
            <a  target='_blank' className='source' href={data[0].source}>source <img src="https://cdn-icons-png.flaticon.com/128/376/376209.png" alt="" /></a>
            <div className="tags">
              
              <div className="left">tags:</div>
              {data[0].tags}
            </div>
            <a href={src} className="download" download>
              download
            </a>
          </div>
        </div>
      )
    }
    return (
      <div className="postId">
          <img src={data[0].sample_url} alt="" />
      </div>
    )
  }
 
}

export default PostID