import React from 'react';
import SwiperCore, { Navigation, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './TestimonialsSwiper.css';
import star from '../../img/star.svg';
import s from './TestimonialsSlider.module.scss';
import { testimonialsData } from './testimonialsData';

SwiperCore.use([Navigation, Autoplay]);

const TestimonialsSlider = ({ testimonials = testimonialsData }) => {
  const swiperParams = {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    initialSlide: 3,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
  };

  return (
    <>
      <div className={s.mainTitle}>What Our Users Are Saying About IQMaze</div>
      <div className='testimonials-container'>
        <div className='testimonials-swiper'>
          <Swiper {...swiperParams}>
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className='swiper-slide-content'>
                  <div className={s.top}>
                    <div className={s.stars_block}>
                      <div className={s.title}>{testimonial.title}</div>
                      <div className={s.stars}>
                        {testimonial.stars.map((starNum, i) =>
                          starNum ? (
                            <img
                              className={s.star}
                              key={i}
                              src={star}
                              alt='star'
                            />
                          ) : (
                            <img
                              style={{ opacity: '0.4' }}
                              className={s.star}
                              key={i}
                              src={star}
                              alt='star'
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={s.description}>{testimonial.text}</div>
                  <div className={s.author}>{testimonial.author}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default TestimonialsSlider;
