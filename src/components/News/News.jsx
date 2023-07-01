import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './News.module.css';



export default function News(props) {

    let number=props.postsnumber;
    
    let[gamesNews, setNews]=useState([]);
    
        
    async function getgamesNews(){
            
        const headers={
            'X-RapidAPI-Key':  'd112be8f6cmsh651127e104987f0p1c2127jsn43ee955a2fac',
            'X-RapidAPI-Host':'videogames-news2.p.rapidapi.com'
        }

        let {data}=await axios.get('https://videogames-news2.p.rapidapi.com/videogames_news/recent?key=d112be8f6cmsh651127e104987f0p1c2127jsn43ee955a2fac',{headers});
        setNews(data)};
        
        let sliced;
        if (number){
            sliced =gamesNews.slice(0,number);
        }
        else
        sliced =gamesNews;
        

        
            
        useEffect(()=>{
            getgamesNews();
            
            
    
    },[])
       
      
        
  return (
    <>
    <div className='news'>
                    {
                    
                    sliced.map((news_element)=>
                    
                        <div className="row">
                            
                            <div className="col-md-4">
                                <img className="news_thumbnail" src={news_element.image} alt={news_element.title} />
                            </div>
                            
                            <div className="col-md-8">
                                <h3 className="news_title">{news_element.title}</h3>
                                <span>{news_element.date}</span>
                                <p className="news_p">{news_element.description}</p>
                                <a href={news_element.link} > More</a>
                            </div>
                        </div>
                        
                )}  
    
    </div>
    </>

  )
}

