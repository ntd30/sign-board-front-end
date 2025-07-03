import React, { useRef } from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

// Dữ liệu mẫu cho slides
const defaultSlides = [
  { src: '/img/12.jpg', alt: 'Slide 1' },
  { src: '/img/2.jpg', alt: 'Slide 2' },
  { src: '/img/33.jpg', alt: 'Slide 3' },
  { src: '/img/43.jpg', alt: 'Slide 4' },
];

const SliderComponent = ({ slides = defaultSlides, autoplaySpeed = 5000 }) => {
  const carouselRef = useRef(null);

  const outerContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#000',
    position: 'relative',
    aspectRatio: '21 / 9',
  };

  return (
    <>
      <div style={outerContainerStyle}>
        <LeftOutlined
          onClick={() => carouselRef.current.prev()}
          className="carousel-arrow carousel-arrow-left"
        />
        <RightOutlined
          onClick={() => carouselRef.current.next()}
          className="carousel-arrow carousel-arrow-right"
        />
        <Carousel
          autoplay
          autoplaySpeed={autoplaySpeed}
          effect="fade"
          dotPosition="bottom"
          ref={carouselRef}
          arrows={false}
          dots={{ className: 'custom-carousel-dots' }}
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <img
                src={slide.src}
                alt={slide.alt}
                className="slide-image"
                loading="lazy"
              />
            </div>
          ))}
        </Carousel>
      </div>
      <style jsx>{`
        .slide-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .slide-image:hover {
          transform: scale(1.03); /* Zoom nhẹ khi hover */
        }

        .carousel-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 24px;
          color: #fff;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 50%;
          padding: 10px;
          z-index: 10;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .carousel-arrow:hover {
          background-color: rgba(0, 0, 0, 0.7);
        }

        .carousel-arrow-left {
          left: 10px;
        }

        .carousel-arrow-right {
          right: 10px;
        }

        .custom-carousel-dots {
          bottom: 10px !important;
        }

        .custom-carousel-dots li button {
          width: 10px !important;
          height: 10px !important;
          border-radius: 50% !important;
          background-color: rgba(255, 255, 255, 0.5) !important;
        }

        .custom-carousel-dots li.slick-active button {
          background-color: #ff0400 !important;
        }
      `}</style>
    </>
  );
};

export default SliderComponent;