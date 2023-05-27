import React from 'react'
import { useContext } from 'react'
import { userContext } from '../context/context'

function Taglist() {
    let {tagList,setTags,temp,setTemp,setSearch,page} = useContext(userContext) 
    let removeTag = (e) => {
        let filtered = tagList.filter(name => name != e.target.innerHTML)
        setTags(filtered)
    }   
  return (
    <div className='tagList'>
        {tagList && tagList.map((item,key)=>{
            return (
                <div className="tag" key={key} onClick={(e=>{
                    removeTag(e)
                })}>
                    {item}
                </div>
            )
        })}
        <button className="button" 
        onClick={()=>{
            setTags([])
        }}>clear</button>
    </div>
  )
}

export default Taglist