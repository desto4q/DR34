import React from 'react'
import Search from '../components/Search'
import Taglist from '../components/Taglist'

function Home() {
  return (
    <div className="home">
        <div className="titleInfo">
          Rule#34 : If it exists there is porn of it
        </div>
        <div className="title">
          <img src="https://s3.aws-k8s.generated.photos/ai-generated-photos/bg-removal-uploads/results/261/1514e894-bc64-41e9-92c3-20161f769b83.png" alt="" />
          <h1>Rule34</h1>
        </div>
        <Taglist/>
        <Search/>  
    </div>
  )
}

export default Home