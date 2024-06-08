export const getIQDescription = iq => {
  if (iq > 145) {
    return `
      <p><strong>Genius or near genius</strong>: You possess extraordinary cognitive abilities that allow you to solve complex problems with ease. Your innovative thinking and deep analytical skills help you excel in various fields, from scientific research to artistic creation. Continue to challenge yourself with advanced projects and opportunities for learning to fully realize your potential.</p>

      <p><strong>Advanced Analytical Reasoning</strong>: Engage in activities that challenge your advanced problem-solving and analytical skills. Consider projects in scientific research, advanced mathematics, or creative writing to further enhance your abilities.</p>

      <p><strong>Innovative Thinking Tasks</strong>: Participate in innovation workshops, hackathons, or start your own projects that require creative solutions. This will help you apply your high-level cognitive skills in practical and impactful ways.</p>
    `;
  }
  if (iq > 130) {
    return `
      <p><strong>Very superior</strong>: Your cognitive abilities are significantly above average, enabling you to quickly absorb new information and effectively apply it in practice. You can tackle complex tasks requiring logical and abstract thinking. Leverage your abilities for career advancement and personal growth by engaging in intellectual games and competitions.</p>

      <p><strong>Complex Problem-Solving</strong>: Take on challenging tasks that require deep logical and abstract thinking. Engage in activities such as strategic games, advanced programming, or complex data analysis to hone your skills.</p>

      <p><strong>Continuous Learning</strong>: Enroll in advanced courses or workshops that push your intellectual boundaries. Fields such as advanced sciences, philosophy, and high-level mathematics are particularly suitable for your cognitive profile.</p>
    `;
  }
  if (iq > 115) {
    return `
      <p><strong>Superior</strong>: You have strong intellectual capacity, allowing you to handle most cognitive tasks successfully. You can effectively analyze information and make well-informed decisions. To further develop your abilities, seek out new challenges, learn new skills, and engage in activities that require logical and analytical thinking.</p>

      <p><strong>Analytical Skill Development</strong>: Participate in activities that require thorough analysis and critical thinking. Consider puzzles, complex problem-solving games, and learning new technologies to enhance your abilities.</p>

      <p><strong>Leadership Roles</strong>: Use your intellectual strengths to take on leadership roles in projects or teams. This will help you apply your decision-making skills and analytical thinking in real-world scenarios.</p>
    `;
  }
  if (iq > 85) {
    return `
      <p><strong>Normal</strong>: You possess average cognitive abilities, typical of the general population. You can handle everyday tasks and work effectively under standard conditions. Enhance your abilities by participating in intellectual exercises such as reading, solving puzzles, and learning new skills. This will help you stay mentally active and improve your cognitive functions.</p>

      <p><strong>Mental Stimulation</strong>: Engage in activities that stimulate your brain. Regular reading, solving puzzles, and learning new hobbies are excellent ways to keep your mind sharp and active.</p>

      <p><strong>Skill Development</strong>: Focus on developing practical skills that interest you. This can include anything from learning a new language to taking up a new sport, helping to broaden your cognitive and physical abilities.</p>
    `;
  }
  if (iq > 70) {
    return `
      <p><strong>Below average</strong>: Your cognitive abilities are below average, which may make certain tasks requiring logical thinking and concentration more challenging. Engage in cognitive stimulation activities such as solving puzzles, playing intellectual games, and participating in educational programs to improve your cognitive functions and overall productivity.</p>

      <p><strong>Cognitive Exercises</strong>: Participate in cognitive training exercises designed to improve memory, attention, and problem-solving skills. Apps and online programs focused on brain training can be particularly helpful.</p>

      <p><strong>Educational Support</strong>: Seek out educational programs and resources that can provide structured learning and cognitive support. Tutoring, workshops, and adult education classes can offer the guidance needed to improve your cognitive skills.</p>
    `;
  }
  return `
    <p><strong>Borderline deficiency</strong>: Your cognitive abilities are significantly below average, which may cause difficulties in daily life. Consider seeking professional advice to assess and develop a personalized plan for cognitive improvement. Specialists can offer programs aimed at enhancing memory, attention, and other cognitive skills to improve your quality of life.</p>

    <p><strong>Professional Support</strong>: It is advisable to seek professional assistance to better understand your cognitive profile and develop a targeted improvement plan. This might include cognitive therapy, special education programs, and personalized coaching.</p>

    <p><strong>Daily Cognitive Activities</strong>: Engage in simple, everyday cognitive activities such as memory games, puzzles, and reading to gradually improve your cognitive functions. Consistency and regular practice are key to making progress.</p>
  `;
};
