const questions = [
  {
    category: 'Entertainment: Video Games',
    type: 'boolean',
    difficulty: 'medium',
    question: 'Amazon acquired Twitch in August 2014 for $970 million dollars.',
    correct_answer: 'True',
    incorrect_ans: ['false'],
  },

  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'easy',
    question: 'Who is the main character in &quot;The Stanley Parable&quot;?',
    correct_answer: 'Stanley',
    incorrect_answers: ['The Adventure Line', 'The Narrator', 'The Boss'],
  },
  {
    category: 'Entertainment: Books',
    type: 'multiple',
    difficulty: 'easy',
    question:
      'Under what pseudonym did Stephen King publish five novels between 1977 and 1984?',
    correct_answer: 'Richard Bachman',
    incorrect_answers: ['J. D. Robb', 'Mark Twain', 'Lewis Carroll'],
  },
  {
    category: 'Geography',
    type: 'multiple',
    difficulty: 'hard',
    question: 'Which is the largest freshwater lake in the world?',
    correct_answer: 'Lake Superior ',
    incorrect_answers: ['Caspian Sea', 'Lake Michigan', 'Lake Huron'],
  },
  {
    category: 'Entertainment: Video Games',
    type: 'boolean',
    difficulty: 'easy',
    question:
      'Rebecca Chambers does not appear in any Residente original Resident Evil and the Gamecube remake.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'What&#039;s the name of the halloween-related Sims 4 Stuff Pack released September 29th, 2015?',
    correct_answer: 'Spooky Stuff',
    incorrect_answers: [
      'Ghosts n&#039; Ghouls',
      'Nerving Nights',
      'Fearful Frights',
    ],
  },
  {
    category: 'General Knowledge',
    type: 'multiple',
    difficulty: 'medium',
    question: 'Which of these words means &quot;idle spectator&quot;?',
    correct_answer: 'Gongoozler',
    incorrect_answers: ['Gossypiboma', 'Jentacular', 'Meupareunia'],
  },
  {
    category: 'Entertainment: Film',
    type: 'multiple',
    difficulty: 'hard',
    question:
      'Which 1994 film did Roger Ebert famously despiseI hated hated hated hated hated this movie&quot;.',
    correct_answer: 'North',
    incorrect_answers: [
      '3 Ninjas Kick Back',
      'The Santa Clause',
      'Richie Rich',
    ],
  },
  {
    category: 'Entertainment: Books',
    type: 'boolean',
    difficulty: 'medium',
    question:
      'Originally, the character Charlie from Charlie and the Chocolate Factory was going to be black.',
    correct_answer: 'True',
    incorrect_answers: ['False'],
  },
  {
    category: 'Sports',
    type: 'multiple',
    difficulty: 'medium',
    question:
      'Which country did Kabaddi, a contact sport involving tackling, originate from?',
    correct_answer: 'India',
    incorrect_answers: ['Australia', 'Turkey', 'Cambodia'],
  },
];

const res = questions.map((el, i) => [el.correct_answer, ...el.incorrect_ans]);

console.log(res);
