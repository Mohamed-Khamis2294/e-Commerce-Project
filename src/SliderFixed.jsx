import React from 'react'
import Slider from "react-slick";
import image1 from './images/slider-image-1.jpeg'
import image2 from './images/slider-image-2.jpeg'
import image3 from './images/slider-image-3.jpeg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderFixed() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    adaptiveHeight: true,
    arrows: false,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <img className='h-48 sm:h-48 md:h-72 lg:h-96  object-cover' src={image1} alt="" />
        </div>
        <div>
          <img className='h-48 sm:h-48 md:h-72 lg:h-96 object-cover' src={image2} alt="" />
        </div>
        <div>
          <img className=' h-48 sm:h-48 md:h-72 lg:h-96 object-cover' src={image3} alt="" />
        </div>
      </Slider>
    </div>
  );
}



