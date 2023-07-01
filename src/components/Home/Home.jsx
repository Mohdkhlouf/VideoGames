import React from 'react'
import Category from '../Category/Category'
import News from '../News/News'

export default function Home() {
  return (
    <>
    
    <section className="news-section">
      <News postsnumber={5}/>
    </section>

    <section className="Products d-flex">
      

          <Category />
        
      
      </section>
   
      
    </>

  )
}
