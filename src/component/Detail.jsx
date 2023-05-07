import React, { useState, useEffect } from 'react'
import {useParams,NavLink } from 'react-router-dom'
import NavBar from './NavBar'
import axios from 'axios'
import parse from "html-react-parser";

export default function Detail() {
    // let location = useLocation()
    let { id } = useParams()
    let [data, setData] = useState()

    let GetData = () => {
        axios.get(`https://api.tvmaze.com/shows/${id}`).then((data) => {
            setData(data.data)
        })

    }

    // Convert String to Html tag 
    function getText(html = '') 
    {
        const htmlString = html;
        return <div> {parse(htmlString)}</div>;
    }


    useEffect(() => {
        GetData()
    }, []);
    return (
        <div className='details'>
            <NavBar />
            {

                data ? (
                    <div className="poster" style={data.image ? { backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%), url(${data.image.original})` } : { background: '#222b30' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                    <img src={data.image ? data.image.original : 'img/emp.png'} alt="" />
                                    <p className='in-cine'>In cinemas</p>
                                </div>

                                <div className="col-md-7 right">
                                    <h1>{data.name}</h1>
                                    {data.rating.average ? <h4><i className="fa-solid fa-star"></i><span className='mx-2'>{data.rating.average}/10</span></h4>:null}
                                    <p>{data.language} | {data.type}</p>
                                    <p>
                                        {data.genres ? data.genres.map((value) => {
                                            return value + " || "
                                        }) : null}  {data.premiered}
                                    </p>
                                    <p>Status - {data.status}</p>
                                    <p>{data.schedule.time != "" ? 'Time ' + data.schedule.time : null} {data.schedule.days.length != 0 ? `|| ${data.schedule.days}` : null}</p>
                                        <button className='ticket-btn'>Book ticket</button>
                                </div>
                            </div>
                        </div>

                    </div>

                ) : null


            }

            <div className='container about my-4'>
                <h3 className='my-3'>ABOUT THE FILM</h3>
                {data ? getText(data.summary) : null}
                <NavLink to={'/'} className={'btn btn-secondary'}>Back  <i className="mx-1 fa-solid fa-house"></i></NavLink>
            </div>


        </div>
    )
}
