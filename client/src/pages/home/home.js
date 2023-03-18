import React, { useState, useEffect } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
import { Carousel } from 'react-responsive-carousel';
import './Home.css';

const Home = () => {
  // state for the carousel images
  const images = [
    require('./bg3.jpg'),
    require('./bg6.jpg'),
    require('./bg7.jpg'),
  ];

  // state for the card data
  const [cardData, setCardData] = useState([
    {
      imagePath: require('./bg3.jpg'),
      name: 'Card Name 1',
      date: '15th March, 2023',
    },
    {
      imagePath: require('./bg3.jpg'),
      name: 'Card Name 2',
      date: '14th March, 2023',
    },
    {
      imagePath: require('./bg3.jpg'),
      name: 'Card Name 3',
      date: '13th March, 2023',
    },
    {
      imagePath: require('./bg3.jpg'),
      name: 'Card Name 4',
      date: '12th March, 2023',
    },
    {
      imagePath: require('./bg3.jpg'),
      name: 'Card Name 5',
      date: '11th March, 2023',
    },
  ]);

  // state for search query
  const [searchQuery, setSearchQuery] = useState('');

  // handle search submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      // redirect to search page with searchQuery as parameter
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  function handleSubmitkk() {
    window.location.href = `/search?q= `;
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
          placeholder="Search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      <div className="cards">
        {cardData.map((card, index) => (
          <div key={index} className="card">
            <img src={card.imagePath} alt={`Card ${index}`} />
            <div className="card-info">
              <h3>{card.name}</h3>
              <p>{card.date}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="view-more">
        <button onClick={handleSubmitkk}>View More</button>
      </div>
    </div>
  );
};
export default Home;
