import React from 'react';
import s from './About.module.scss';
import about_1 from '../../img/about_1.jpg';
import about_2 from '../../img/about_2.jpg';
import about_3 from '../../img/about_3.jpg';
import about_4 from '../../img/about_4.jpg';
import about_5 from '../../img/about_5.jpg';

const About = () => {
  return (
    <div className={s.about}>
      <section className={s.heroSection}>
        <h1 className={s.mainHeading}>
          Explore the World of Intelligence with IQMaze
        </h1>
        <p className={s.introText}>
          IQMaze invites you on an exploratory journey through the fascinating
          realms of intelligence and cognitive capability. Our scientifically
          validated IQ tests offer a window into the intricacies of your mind,
          laying out a maze that challenges and reveals your unique intellectual
          profile.
        </p>
        <img
          src={about_1}
          alt='Brain maze representing the complexity of human intelligence'
          className={s.heroImage}
        />
      </section>

      <section className={s.infoSection}>
        <h2 className={s.sectionHeading}>Understanding IQ Tests</h2>
        <p className={s.sectionText}>
          Intelligence Quotient (IQ) tests are a series of standardized
          assessments that evaluate a range of cognitive skills, such as
          problem-solving, logical reasoning, memory, and general knowledge. The
          scores from these tests are designed to reflect an individual's
          relative intellectual capabilities compared to the population. With a
          legacy dating back over a century, IQ tests have evolved to become a
          valuable tool for educational placement, assessment of intellectual
          disability, and even job candidate evaluation.
        </p>
        <img
          src={about_2}
          alt='Vintage illustration of an early IQ test'
          className={s.infoImage}
        />
      </section>

      <section className={s.infoSection}>
        <h2 className={s.sectionHeading}>The Benefits of IQ Testing</h2>
        <p className={s.sectionText}>
          Engaging with IQ tests can be much more than an academic exercise. It
          is a means of self-discovery, providing insights into how you process
          information and solve complex problems. These tests can highlight your
          cognitive strengths and pinpoint areas for growth, offering a
          blueprint for personal and professional development. Whether you're a
          student looking to assess your learning style, a professional seeking
          to enhance problem-solving skills, or simply a curious mind, IQMaze's
          tests are tailored to foster self-improvement and intellectual
          curiosity.
        </p>
        <img
          src={about_3}
          alt='Individuals engaged in thoughtful problem-solving'
          className={s.infoImage}
        />
      </section>

      <section className={s.infoSection}>
        <h2 className={s.sectionHeading}>Our Test Development Process</h2>
        <p className={s.sectionText}>
          At IQMaze, our IQ tests are developed by a dedicated team of
          psychometricians, neuroscientists, and cognitive psychologists who
          ensure that each assessment is empirically sound and reflects the
          latest advancements in the field. Our rigorous test development
          process includes extensive research, item analysis, and norming
          procedures that adhere to the highest standards of psychological
          testing. By participating in an IQMaze test, you are not only
          measuring your intellectual capacity but also contributing to a
          broader scientific understanding of human intelligence.
        </p>
        <img
          src={about_4}
          alt='The IQMaze team of experts collaborating on test development'
          className={s.infoImage}
        />
      </section>

      <section className={s.infoSection}>
        <h2 className={s.sectionHeading}>Join the IQMaze Community</h2>
        <p className={s.sectionText}>
          When you take an IQMaze test, you become part of a global community of
          learners, thinkers, and explorers united in the pursuit of knowledge.
          Our community platform allows you to compare scores, share
          experiences, and engage in discussions about cognitive health and
          intellectual pursuits. We believe that understanding your IQ is just
          the beginning—it's what you do with this knowledge that truly makes
          the difference. Embark on your intellectual journey with IQMaze and
          unlock the potential of your mind.
        </p>
        <img
          src={about_5}
          alt='A diverse group of people from the IQMaze community'
          className={s.infoImage}
        />
      </section>
    </div>
  );
};

export default About;
