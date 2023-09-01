import React from 'react'

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Carousel from "react-elastic-carousel"

function App() {
  const [data, setData] = useState([]);
  const [imageNo, setImageNo] = useState(1);
  const [que, setQue] = useState("mountain");
  const [classDiv, setClassdiv] = useState("");
  const [curImg, setCurImg] = useState({});


  const imagess = [
    {
      label: "1",
      value: 1
    },
    {
      label: "2",
      value: 2
    },
    {
      label: "3",
      value: 3
    },
    {
      label: "4",
      value: 4
    }
  ];
  const query = [
    {
      label: "Mountains",
      value: "mountain"
    },
    {
      label: "Food",
      value: "food"
    },
    {
      label: "Birds",
      value: "birds"
    },
    {
      label: "Reptiles",
      value: "reptile"
    },
    {
      label: "Flower",
      value: "flower"
    },
    {
      label: "Car",
      value: "car"
    }
  ];
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 850, itemsToShow: 4 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 2 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ]
  useEffect(() => {

    const URL = `https://api.unsplash.com/search/photos?page=${imageNo}&query=${que}&client_id=U2pS9emdUJKHneIjaV0wWW0xL9_U7K5gK7PPNNTGKt8`;


    axios.get(URL).then((res) => {
      setData(res.data.results);
      setCurImg(res.data.results[0]);
    })
  }, [que, imageNo])

  const handleClick = (image) => {
    setCurImg(image);
    setClassdiv("border");
  }
  const handleQuery = (e) => {
    setQue(e.target.value)
  }
  const handlePage = (e) => {
    setImageNo(e.target.value)
  }
  console.log();


  return (
    <div className="App">
      <div className="headingImage">PHOTO GALLERY</div>
      <div className="mainImage">
        <img src={curImg?.urls?.small} alt={curImg?.id} />
      </div>
      <div className="imageViewer">
        <div className="selected">
          <select onChange={handleQuery}>
            {query.map((q) => (
              <option value={q.value}>{q.label}</option>
            ))}
          </select>
          <select onChange={handlePage}>
            {imagess.map((p) => (
              <option value={p.value}>{p.label}</option>
            ))}
          </select>
        </div>
        <Carousel breakPoints={breakPoints}>
          {data.map((image) => (

            <img src={image?.urls?.small} alt={image?.id} key={image?.id} onClick={() => handleClick(image)} className={curImg?.id === image?.id ? "border" : ""} />
          ))}

        </Carousel>



      </div>


    </div>)
}


export default App;
