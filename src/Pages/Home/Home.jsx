import React from 'react';
import s from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import about_1 from '../../img/about_1.jpg';
import about_2 from '../../img/about_2.jpg';
import about_3 from '../../img/about_3.jpg';
import about_4 from '../../img/about_4.jpg';
import about_5 from '../../img/about_5.jpg';

const Home = () => {
  const navigate = useNavigate('/test');

  return (
    <div className={s.home}>
      <div className={s.hero}>
        <div className={s.did}>12,502 people did this test last week.</div>
        <div className={s.title}>Test your IQ!</div>
        <div className={s.description}>
          The IQ Test is to assess an intellectual abilities formed by general
          experience, not affected by training or learning. You can figure out
          your intellectual level compared to the group of the same age.
        </div>
        <div className={s.description}>
          As it requires concentration for a given amount of time, please
          conduct the test in a quiet and comfortable place.
        </div>
        <button className={s.button} onClick={() => navigate('/iqtest')}>
          Start IQ test
        </button>
      </div>

      <section className={s.heroSection}>
        <div className={s.heroContent}>
          <h1 className={s.mainHeading}>
            Unlock Your Cognitive Potential with IQMaze
          </h1>
          <p className={s.introText}>
            Join us on an exciting journey through the realms of intelligence
            and cognitive prowess. IQMaze offers scientifically validated tests
            that unveil the intricacies of your mind, helping you discover your
            unique intellectual strengths.
          </p>
          <img
            src={about_1}
            alt='Brain maze representing the complexity of human intelligence'
            className={s.heroImage}
          />
        </div>
      </section>

      <section className={s.featuresSection}>
        <h2 className={s.sectionHeading}>Why Choose IQMaze?</h2>
        <div className={s.features}>
          <div className={s.featureItem}>
            <img src={about_2} alt='Feature 1' className={s.featureImage} />
            <h3 className={s.featureTitle}>Comprehensive Analysis</h3>
            <p className={s.featureText}>
              Our tests provide a thorough analysis of your cognitive abilities,
              highlighting your strengths and areas for improvement.
            </p>
          </div>
          <div className={s.featureItem}>
            <img src={about_3} alt='Feature 2' className={s.featureImage} />
            <h3 className={s.featureTitle}>Scientifically Validated</h3>
            <p className={s.featureText}>
              Developed by experts, our tests are backed by rigorous research
              and scientific validation.
            </p>
          </div>
          <div className={s.featureItem}>
            <img src={about_4} alt='Feature 3' className={s.featureImage} />
            <h3 className={s.featureTitle}>Personal Growth</h3>
            <p className={s.featureText}>
              Use your results to foster personal and professional growth,
              enhancing your cognitive skills.
            </p>
          </div>
        </div>
      </section>

      <section className={s.testimonialSection}>
        <h2 className={s.sectionHeading}>What Our Users Say</h2>
        <div className={s.testimonials}>
          <div className={s.testimonialItem}>
            <p className={s.testimonialText}>
              "IQMaze provided me with incredible insights into my cognitive
              abilities. It’s an eye-opener!"
            </p>
            <p className={s.testimonialAuthor}>- Alex, Software Engineer</p>
          </div>
          <div className={s.testimonialItem}>
            <p className={s.testimonialText}>
              "The detailed analysis helped me understand my strengths and how
              to improve my weaknesses."
            </p>
            <p className={s.testimonialAuthor}>- Maria, University Student</p>
          </div>
          <div className={s.testimonialItem}>
            <p className={s.testimonialText}>
              "As a recruiter, IQMaze’s tests are invaluable for evaluating
              candidates’ cognitive skills."
            </p>
            <p className={s.testimonialAuthor}>- John, HR Specialist</p>
          </div>
        </div>
      </section>

      <section className={s.communitySection}>
        <h2 className={s.sectionHeading}>Join the IQMaze Community</h2>
        <p className={s.sectionText}>
          Connect with like-minded individuals, share your results, and
          participate in engaging discussions about intelligence and cognitive
          health. Our community is here to support your journey toward unlocking
          your full cognitive potential.
        </p>
        <img
          src={about_5}
          alt='A diverse group of people from the IQMaze community'
          className={s.communityImage}
        />
      </section>

      <section className={s.ctaSection}>
        <h2 className={s.sectionHeading}>Get Started with IQMaze</h2>
        <p className={s.sectionText}>
          Ready to discover your cognitive strengths? Take our scientifically
          validated IQ test today and start your journey towards personal and
          professional growth.
        </p>
        <button className={s.ctaButton} onClick={() => navigate('/iqtest')}>
          Start IQ test
        </button>
      </section>
    </div>
  );
};

export default Home;
