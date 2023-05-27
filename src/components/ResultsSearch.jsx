import React from 'react'
import { useContext,useLayoutEffect } from 'react'
import { userContext } from '../context/context'
import { getTaglist } from '../data/data'
import { useRef } from 'react'
import {Link} from "react-router-dom"
import { useEffect } from 'react';
import { useCookies } from "react-cookie";

function ResultsSearch() {
    let {temp,setTemp,tagList,setTags,setSearch} =useContext(userContext)
        let inputRef = useRef()

    let onChange = async (e) => {
        e.preventDefault()
        let value =  e.target.value.replace(" ",'_')
        e.target.value = value
        value = e.target.value
        let res = await getTaglist(value)    
        console.log(res)
        setTemp(res)
       
        
    }

    let onClick = (e) => {
        let value = e.currentTarget.children[0].innerHTML
        if (tagList.includes(value) == false) {
          console.log("false") 
          setTags(curr=>[...curr,value])
          inputRef.current.value = '';
          setTemp([])
        }
        else{
          alert("already there")
        }
       
  
    }
    const [cookie,setCookie,removeCookie] = useCookies()

    
    useLayoutEffect(()=>{
      if(cookie.search != undefined || cookie.search != null) {
        setTags(cookie.search)
        setSearch(cookie.search)
      }
     },[])
     

    
  return (
    <div className="Rsearch">
      <input ref={inputRef} type="text" name="" id="" placeholder='searchtags?...' onChange={(e)=>{
        onChange(e)       
      }}/>
          <button onClick={e=>{
            setSearch(tagList)
            setCookie("search", tagList)
          }}><Link to={"/results/1"}>Submit
          </Link></button>
      <div className="temp">
        {temp && temp.slice(0,5).map(({name,count},key)=>{
          return(
            <div className="tempItem" key={key} onClick={e=>{
              onClick(e)
            }}>
              <p className='name'>{name}</p> <p className="count">{count}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ResultsSearch