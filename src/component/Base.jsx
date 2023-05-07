import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../App.css'
import NavBar from './NavBar';
import { NavLink } from 'react-router-dom';


const baseURL = axios.create({
  baseURL: 'https://api.tvmaze.com/'
});

export default function Base() {

  let [data,setData] = useState([]) // for storing the api fetch data

  // Fetch data by using axios 
  let getData=()=>{
    baseURL.get('search/shows?q=all').then((data)=>{
      setData(data.data);
    })
  }

  useEffect(() => {
    getData()
  }, []);

  return (
   <div className='base'>
   <NavBar/>
   <div className='container'>
   <div className="row">
   {
     data?(

       data.map((data,i)=>{
         return ( 
         <NavLink to={`details/${data.show.id}`}  key={data.show.id} className="col-md-2 m-2 img-card">
           <div className="image">
           {data.show.image != null ? <img src={data.show.image.medium} alt="" className='w-100 h-100'/>: <h4> Image not found!</h4>}
           </div>

           <div className='caption'>
           <b className='text-white-50'>{data.show.name}</b>
           <p className='text-white-50'>{data.show.rating.average ? ` ${data.show.rating.average}/10 `: ''}</p>
           </div>
         </NavLink>
        
         )
       })

     ):null
   }
   </div>
   </div></div>
  )
}
