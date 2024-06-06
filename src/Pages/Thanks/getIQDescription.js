export const getIQDescription = iq => {
  if (iq > 145) {
    return 'Genius or near genius: You possess extraordinary cognitive abilities that allow you to solve complex problems with ease. Your innovative thinking and deep analytical skills help you excel in various fields, from scientific research to artistic creation. Continue to challenge yourself with advanced projects and opportunities for learning to fully realize your potential.';
  }
  if (iq > 130) {
    return 'Very superior: Your cognitive abilities are significantly above average, enabling you to quickly absorb new information and effectively apply it in practice. You can tackle complex tasks requiring logical and abstract thinking. Leverage your abilities for career advancement and personal growth by engaging in intellectual games and competitions.';
  }
  if (iq > 115) {
    return 'Superior: You have strong intellectual capacity, allowing you to handle most cognitive tasks successfully. You can effectively analyze information and make well-informed decisions. To further develop your abilities, seek out new challenges, learn new skills, and engage in activities that require logical and analytical thinking.';
  }
  if (iq > 85) {
    return 'Normal: You possess average cognitive abilities, typical of the general population. You can handle everyday tasks and work effectively under standard conditions. Enhance your abilities by participating in intellectual exercises such as reading, solving puzzles, and learning new skills. This will help you stay mentally active and improve your cognitive functions.';
  }
  if (iq > 70) {
    return 'Below average: Your cognitive abilities are below average, which may make certain tasks requiring logical thinking and concentration more challenging. Engage in cognitive stimulation activities such as solving puzzles, playing intellectual games, and participating in educational programs to improve your cognitive functions and overall productivity.';
  }
  return 'Borderline deficiency: Your cognitive abilities are significantly below average, which may cause difficulties in daily life. Consider seeking professional advice to assess and develop a personalized plan for cognitive improvement. Specialists can offer programs aimed at enhancing memory, attention, and other cognitive skills to improve your quality of life.';
};
