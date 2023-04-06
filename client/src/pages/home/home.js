import React, { useState, useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { Carousel } from "react-responsive-carousel";
import "./Home.css";
import { BiSearchAlt } from "react-icons/bi";
import Axios from "axios";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

const Home = () => {
  console.log(Cookies.get("token"));
  // state for the carousel images
  const images = [
    require("../../images/bg3.jpg"),
    require("../../images/bg4.jpg"),
    require("../../images/bg5.jpg"),
  ];



  function handleChatbotClick (){
    window.location.href = `/Chatbot`;
  };

  const [cardData, setCardData] = useState([
    {
      imagePath: require("../../images/bg4.jpg"),
      id: 1,
      name: "Card Name 1",
      date: "15th March, 2023",
    },
    {
      imagePath: require("../../images/bg5.jpg"),
      id: 2,
      name: "Card Name 2",
      date: "14th March, 2023",
    },
    {
      imagePath: require("../../images/bg3.jpg"),
      id: 3,
      name: "Card Name 3",
      date: "13th March, 2023",
    },
    {
      imagePath: require("../../images/bg4.jpg"),
      id: 4,
      name: "Card Name 4",
      date: "12th March, 2023",
    },
    {
      imagePath: require("../../images/bg5.jpg"),
      id: 5,
      name: "Card Name 5",
      date: "11th March, 2023",
    },
  ]);

  // state for search query
  const [searchQuery, setSearchQuery] = useState("");

  // handle search submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // redirect to search page with searchQuery as parameter
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  function handleViewMore() {
    window.location.href = `/search?q= `;
  }

  function handleTrendingEventCardClick(eventId) {
    window.location.href = `/event/${eventId}`;
  }

  // update carousel images every 5 seconds

  return (
    <div className="home">
      <div className="carousels">
        <div className="carousel">
          <SimpleImageSlider
            width={700}
            height={350}
            images={images}
            showBullets={true}
            showNavs={true}
            className="custom-slider-class"
            autoPlay={true}
            autoPlayDelay={4.0}
            // onClick={clickImage(idx, event)}
          />
        </div>
        <div className="carousel">
          <SimpleImageSlider
            width={700}
            height={350}
            images={images}
            showBullets={true}
            showNavs={true}
            className="custom-slider-class"
            autoPlayDelay={4.0}
            autoPlay={true}
          />
          {/* <Carousel>
            {carouselImages.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={`Carousel image ${i}`}
                style={{ display: i === index ? 'block' : 'none' }}
              />
            ))}
          </Carousel> */}
        </div>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for events........"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">
          <BiSearchAlt />
        </button>
      </form>
      <h2 className="trending-events">Trending Events</h2>
      <div className="cards">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleTrendingEventCardClick(card.id)}
          >
            <img src={card.imagePath} alt={`Card ${index}`} />
            <div className="card-info">
              <h3>{card.name}</h3>
              <p>{card.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more">
        <button onClick={handleViewMore}>View More</button>
      </div>
      <div className="chatbot-btn">
        <button onClick={handleChatbotClick}>
          <IoChatbubbleEllipsesSharp />
        </button>
      </div>
    </div>
  );
};
export default Home;
