import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from '../context/context';

function Card({img,title,id,details,file,sample}) {
  let {setContent} = useContext(userContext)

  let [type,setType] = useState("jpg")

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
    return url;
    
  }


  useEffect(()=>{
    //gets file type  mp4 or image
    getfiletype(sample)
  },[])

  if (type == "mp4") {
    return (
      <Link  className='card vid' to={`/post/${id}`} onClick={(e)=>{
        setContent(details)
      }}>
          <img src={img} alt="" loading='lazy' />
          <div className="info">
          </div>
      </Link>
    )
  }
  return (
    <Link  className='card' to={`post/${id}`} onClick={(e)=>{
      setContent(details)
    }}>
        <img src={img} alt="" loading='lazy'/>
        <div className="info">
        </div>
    </Link>
  )
}

export default Card