import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';

export default function SliderCateg({children}) {
  let settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll:1 ,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 500,
    cssEase: "linear",
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
      {children}
      </Slider>
    </div>
  )
}
