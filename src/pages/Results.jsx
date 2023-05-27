import React, { useContext, useEffect } from 'react'
import Homebar from '../components/Homebar';
import { search } from '../data/data';
import { useQuery } from 'react-query';
import Card from '../components/Card';
import Layout from 'react-masonry-list';
import { userContext } from '../context/context';
// import { posts } from 'rule34js';
import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"



function Results() {
  let {page} = useParams()
  let {column,search_param,setSearch,setPage} = useContext(userContext)  

    let {data, isLoading,isError,refetch} = useQuery(["posts", search_param],()=> {
      let resp = search(search_param,page)
      return resp
    })
    
    useEffect(()=>{
      refetch()
    },[page])
  
  return (
    <div className="results">
      <Homebar/>
      <div className="container">
        {isLoading == true && data == undefined && isError == false ? null : 
          <>
          
          {
            data.posts == undefined || Array.isArray(data.posts) == false ?  <div className="error">Nothing here but chickens</div> :
            <>
              <Layout colCount={column} className='masonry'   gap={10} minWidth={200} items={ data.posts.map    ((item)=>
                {
                let {preview_url,change,creator_id,file_url,sample_url,id} =  item
                return(
                  <Card img={preview_url} file={file_url} sample={sample_url} key={id} id={id} details={item}/>
                )
                })}>
              </Layout>
            </>
          }

          <div className="navigation">
            <div className="cont">
            <button>
              <Link to={`/results/${page == 1 ? 1 : parseInt(page) - 1 }`}>-</Link>
            </button>
            <p>{page}</p>
            <button onClick={(e)=>{
              
            }}>
              <Link to={`/results/${parseInt(page) + 1}`}>+</Link>
            </button>
            </div>
          </div>
          </>
        }
        
      </div>
    </div>
  )
}

export default Results