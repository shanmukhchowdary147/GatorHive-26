import React, { useState, useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { Carousel } from "react-responsive-carousel";
import "./Home.css";
import { BiSearchAlt } from "react-icons/bi";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
// import EventSlider from "../../components/EventSlider/EventSlider";

const Home = () => {
  // state for the carousel images
  const images = [
    require("../../images/c3.jpg"),
    require("../../images/c4.jpg"),
    require("../../images/c2.jpg"),
    require("../../images/bg3.jpg"),
  ];

  const images1 = [
    require("../../images/c5.jpg"),
    require("../../images/c1.jpg"),
    require("../../images/bg5.jpg"),
    require("../../images/c2.jpg"),
  ];

  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const getPopularEvents = async () => {
      try {
        const response = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/events/getPopularEvents`
        );
        setCardData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getPopularEvents();
  }, []);

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
    window.location.href = `/event?eventId=${encodeURIComponent(eventId)}`;
  }

  // update carousel images every 5 seconds
  function handleChatbotClick() {
    window.location.href = `/chatbot`;
  }

  function convertUtcToLocal(eventDate) {
    const utcDate = new Date(eventDate);
    const etTime = utcDate.toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
    });
    const [time, meridiem] = etTime.split(" ");
    const date = utcDate.toLocaleDateString("en-US", {
      timeZone: "America/New_York",
    });
    return `${date} ${time} ${meridiem}`;
  }

  return (
    <div className="home-main-cont">
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
              images={images1}
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
              className="popular-card"
              onClick={() => handleTrendingEventCardClick(card.id)}
            >
              <img src={card.posterLink} alt={`Card ${index}`} />
              <div className="card-info">
                <h3>{card.eventName}</h3>
                <p>{convertUtcToLocal(card.eventAtUtc)}</p>
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
      <Footer />
    </div>
  );
};
export default Home;
