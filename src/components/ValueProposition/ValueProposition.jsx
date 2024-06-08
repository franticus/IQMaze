import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import s from './ValueProposition.module.scss';
import certificateImage from '../../img/certificate.png';
import girl from '../../img/girl.jpg';
import man from '../../img/man.jpg';
import chart from '../../img/chart.jpg';

const ValueProposition = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className={s.valueProposition}>
      <h2 className={s.heading} data-aos='fade-up'>
        Что мы предлагаем:
      </h2>

      <div className={s.section} data-aos='fade-right'>
        <img src={certificateImage} alt='IQ Certificate' className={s.image} />
        <div className={s.text}>
          <h3 className={s.subHeading}>Персонализированный сертификат IQ</h3>
          <p>
            После покупки результатов теста вы получите персонализированный
            сертификат IQ, который включает ваш результат, рейтинг и другие
            ценные данные. Этот сертификат уникален для вас и предоставляет
            профессиональную оценку ваших когнитивных способностей.
          </p>
        </div>
      </div>

      <div className={s.section} data-aos='fade-left'>
        <div className={s.text}>
          <h3 className={s.subHeading}>Детализированный анализ результатов</h3>
          <p>
            Вместе с сертификатом вы получите подробный разбор результатов теста
            IQ. Включает информацию по различным когнитивным областям, сильным
            сторонам и областям для улучшения. Понимайте свои интеллектуальные
            способности всесторонне.
          </p>
        </div>
        <img src={girl} alt='IQ Distribution Chart' className={s.image} />
      </div>

      <div className={s.section} data-aos='fade-right'>
        <img src={man} alt='Job Relevance' className={s.image} />
        <div className={s.text}>
          <h3 className={s.subHeading}>
            Инсайты для профессионального развития
          </h3>
          <p>
            Узнайте, как ваш IQ соотносится с различными рабочими ролями и
            отраслями. Наши инсайты предоставляют информацию о том, как ваши
            когнитивные способности соответствуют различным карьерным путям,
            помогая вам принимать обоснованные решения о профессиональном
            развитии.
          </p>
        </div>
      </div>

      <div className={s.section} data-aos='fade-left'>
        <div className={s.text}>
          <h3 className={s.subHeading}>Глобальный рейтинг</h3>
          <p>
            Узнайте, как вы сравниваетесь с более чем 5 миллионами тестируемых
            по всему миру. Ваш результат и процентильное ранжирование предлагают
            глобальный взгляд на вашу когнитивную производительность,
            подчеркивая ваши интеллектуальные сильные стороны в конкурентном
            контексте.
          </p>
        </div>
        <img src={chart} alt='Global Ranking' className={s.image} />
      </div>

      <div className={s.section} data-aos='fade-up'>
        <div className={s.text}>
          <h3 className={s.subHeading}>Поддержите развитие IQMaze</h3>
          <p>
            Ваш разовый платеж всего 1,90 доллара США помогает нам поддерживать
            работу IQMaze и совершенствоваться. Этот небольшой вклад позволяет
            нам поддерживать веб-сайт, добавлять новые функции и предоставлять
            лучший опыт для всех пользователей. Спасибо за вашу поддержку!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ValueProposition;
