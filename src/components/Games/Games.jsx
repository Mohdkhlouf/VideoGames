import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './Games.module.css';

export default function Games() {

  let [products,setProducts]=useState([]);
  async function getProducts(platfromId){

  let url=`https://api.rawg.io/api/games?key=ee88c2723a634f899584573bb5b3d24c`;
  if (platfromId){
  url+=`&parent_platforms=${platfromId}`;
  }

  let {data}=await axios.get(url);
    setProducts(data.results);
    }


    useEffect(()=>{
      getProducts();

},[])


  return (
    <>


    <div className="row">
  {products.map( (product)=>
  
       <div className="col-md-4">
                    <div className="categories-name">
                      <card>
                        <img className={`${style['product-image']}`} src={product.background_image} alt={product.slug}/>
                      
                        <p>{product.name}</p>
                        <p>
                          {product.parent_platforms.map((item)=>
                                  <div className="btn btn-info m-1">
                                  {item.platform.name}
                                  
                                  </div>
                        )}

                        </p>
                        <p>{product.name}</p>
                      </card>

  
                    </div>
        </div>

       

    )}
 </div>
    </>
  )
}
