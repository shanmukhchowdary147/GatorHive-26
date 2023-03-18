import { useState, useEffect } from 'react';
import SimpleImageSlider from 'react-simple-image-slider';
// import './Home.css';

function Homex() {
  const images = [
    require('./bg3.jpg'),
    require('./bg6.jpg'),
    require('./bg7.jpg'),
  ];

  // const [currentIndex, setCurrentIndex] = useState(0);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex(
  //       currentIndex === images.length - 1 ? 0 : currentIndex + 1
  //     );
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [currentIndex, images.length]);

  return (
    <div className="carouselkkkk">
      <SimpleImageSlider
        width={800}
        height={300}
        images={images}
        showBullets={true}
        showNavs={true}
        className="custom-slider-class"
        interval={4 * 7000}
        autoPlay={true}
      />
    </div>
  );
}

export default Homex;
