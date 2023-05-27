import React from 'react'
import "./App.scss"
import WebFont from 'webfontloader'
import Router from './router/Router'



import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()



function App() {
  WebFont.load({
    google: {
      families: ["Montserrat", "Courgette"]
    }
  })

  
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Router/>
      </QueryClientProvider>
    </div>
  )
}

export default App