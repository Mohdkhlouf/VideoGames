import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from './Category.module.css'

export default function Category() {

    let [categories,setCategories]=useState([]);
    let[subCategories,setSubcategories]=useState([]);
    
    async function getCategory(){
        let {data}=await axios.get(`https://api.rawg.io/api/platforms/lists/parents?key=ee88c2723a634f899584573bb5b3d24c`);
        setCategories(data.results);
        }

    async function getSubcategories(id){
      let {data}=await axios.get(`https://api.rawg.io/api/games?key=ee88c2723a634f899584573bb5b3d24c&parent_platforms=${id}`);
      setSubcategories(data.results);
      
        }

    useEffect(()=>{
        getCategory();
        getSubcategories(1);
        

},[])
        
  return (
    <>
    <div className="sidebar">
      <div className="row">

    
    {categories.map( (cat)=>
    
       <div className="col-md-12">
                    <div className="categories-name">
                    <button onClick={()=>getSubcategories(cat.id)}>
                        <img className={`${style['categories-images']}`} src={cat.platforms[0].image_background} alt={cat.name}/>
                        
                        <span className={`${style['platfrom-name']}`}>{cat.name}</span></button>
  
                    </div>
        </div>
        

    )}
    </div>
    </div>
    <div className="product-content">
      <div className="row">
        {subCategories.map( (subCat)=>
        <div className="col-md-3">
          <img src={subCat.background_image} className={`${style['subCategories-images']}`} alt={subCat.slug} />
            <p>{subCat.name}</p>

        </div>
        
        )}
       </div> 
    </div>
    </>
  )
}
