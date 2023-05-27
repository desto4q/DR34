import React, { useContext, useEffect, useRef, useState } from 'react'
import { gelTags, getTaglist } from '../data/data'
import { userContext } from '../context/context'
import { Link } from 'react-router-dom'


function Search() {
  let {tagList,setTags,temp,setTemp,setSearch,page} = useContext(userContext) 

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
      }
      else{
        alert("already there")
      }

  }

  return (
    <div className="search">
      <input type="text" name="" id="" placeholder='searchtags?...' onChange={(e)=>{
        onChange(e)       
      }}/>
      <div className="buttons">
        <button>Add</button>
        <Link to={`/results/${page}`} onClick={(e)=>{
          setSearch(tagList)
        }}>
          <button>Submit</button>
        </Link>
      </div>
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

export default Search