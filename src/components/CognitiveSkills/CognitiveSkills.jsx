import React from 'react';
import styles from './CognitiveSkills.module.scss';
import reaction from '../../img/cognitiveSkills/skill_reaction.svg';
import logic from '../../img/cognitiveSkills/skill_logic.svg';
import memory from '../../img/cognitiveSkills/skill_memory.svg';
import concentration from '../../img/cognitiveSkills/skill_concentration.svg';
import speed from '../../img/cognitiveSkills/skill_speed.svg';

const skills = [
  {
    title: 'Reaction',
    description:
      'Quick reaction time is an incredibly important cognitive function because we use it in our everyday lives and it keeps us safe. Through regular practice with our fun and engaging games, you can build your reaction abilities efficiently.',
    icon: reaction,
  },
  {
    title: 'Logic',
    description:
      'Improve problem-solving, critical thinking, and reasoning skills with our brain games that help develop your logic-oriented skills. You’ll be able to approach complex situations and come up with problems easily.',
    icon: logic,
  },
  {
    title: 'Memory',
    description:
      'Want a stronger memory? Our games will put your recollection to the test. Ultimately, they will empower you to increase your ability to remember things quickly and accurately.',
    icon: memory,
  },
  {
    title: 'Concentration',
    description:
      'Finding it hard to focus? We’ve been there! While a lot of us struggle with concentration, taking the time to play focus-boosting games can help. We offer games that challenge your attention through distractions, help increase your focus and teach you to observe even the smallest details.',
    icon: concentration,
  },
  {
    title: 'Speed',
    description:
      'Being able to process information quickly means you’re able to analyze and understand information more easily, and get things done faster. Can you beat your own clock?',
    icon: speed,
  },
];

const CognitiveSkills = () => {
  return (
    <div className={styles.cognitiveSkills}>
      <h2>
        The <span className={styles.highlight}>5 essential</span> cognitive
        skills you can improve:
      </h2>
      <div className={styles.skillsContainer}>
        {skills.map((skill, index) => (
          <div key={index} className={styles.skillCard}>
            <img src={skill.icon} alt={skill.title} className={styles.icon} />
            <h3>{skill.title}</h3>
            <p>{skill.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CognitiveSkills;
