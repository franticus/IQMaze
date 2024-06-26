import React from 'react';
import s from './Testimonials.module.scss';

const Testimonials = () => {
  return (
    <section className={s.testimonialSection}>
      <h2 className={s.sectionHeading}>What Our Users Say</h2>
      <div className={s.testimonials}>
        <div className={s.testimonialItem}>
          <div className={s.stars}>★★★★★</div>
          <p className={s.testimonialText}>
            "IQMaze provided me with incredible insights into my cognitive
            abilities. It’s an eye-opener!"
          </p>
          <p className={s.testimonialAuthor}>- Alex, Software Engineer</p>
        </div>
        <div className={s.testimonialItem}>
          <div className={s.stars}>★★★★★</div>
          <p className={s.testimonialText}>
            "The detailed analysis helped me understand my strengths and how to
            improve my weaknesses."
          </p>
          <p className={s.testimonialAuthor}>- Maria, University Student</p>
        </div>
        <div className={s.testimonialItem}>
          <div className={s.stars}>★★★★★</div>
          <p className={s.testimonialText}>
            "As a recruiter, IQMaze’s tests are invaluable for evaluating
            candidates’ cognitive skills."
          </p>
          <p className={s.testimonialAuthor}>- John, HR Specialist</p>
        </div>
        <div className={s.testimonialItem}>
          <div className={s.stars}>★★★★★</div>
          <p className={s.testimonialText}>
            "IQMaze has been a fantastic tool for personal growth and
            understanding my cognitive strengths."
          </p>
          <p className={s.testimonialAuthor}>- Laura, Data Analyst</p>
        </div>
        <div className={s.testimonialItem}>
          <div className={s.stars}>★★★★★</div>
          <p className={s.testimonialText}>
            "The platform is user-friendly and provides valuable insights into
            my cognitive profile."
          </p>
          <p className={s.testimonialAuthor}>- Michael, Teacher</p>
        </div>
        <div className={s.testimonialItem}>
          <div className={s.stars}>★★★★★</div>
          <p className={s.testimonialText}>
            "I highly recommend IQMaze for anyone looking to understand their
            cognitive abilities better."
          </p>
          <p className={s.testimonialAuthor}>- Sarah, Entrepreneur</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
