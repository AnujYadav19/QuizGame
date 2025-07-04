# 🎯 Quiz Game

A modern, interactive quiz game built with HTML, CSS, and JavaScript that fetches questions from the Open Trivia Database API. Features a beautiful glassmorphism UI with smooth animations and multiple game modes.

## ✨ Features

### 🎮 Game Features

- **Multiple Categories**: Choose from 12 different quiz categories including Science, History, Sports, Entertainment, Geography, and more
- **Difficulty Levels**: Easy, Medium, Hard, or Any difficulty
- **Customizable Questions**: Set the number of questions (1-20)
- **Timer System**: Time-based questions with different limits per difficulty
- **Score Tracking**: Real-time score display with animated feedback
- **Progress Bar**: Visual progress indicator throughout the quiz
- **Detailed Results**: Comprehensive end-game summary with question-by-question breakdown

### 🎨 UI/UX Features

- **Modern Glassmorphism Design**: Beautiful glass-like cards with backdrop blur effects
- **Dark/Light Mode Toggle**: Switch between dark and light themes
- **Smooth Animations**: CSS animations for card transitions, button interactions, and score updates
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, button animations, and visual feedback
- **Background Shapes**: Animated floating background elements for visual appeal

### 🔧 Technical Features

- **API Integration**: Fetches questions from Open Trivia Database API
- **Fallback System**: Uses hardcoded questions when API is unavailable
- **Error Handling**: Graceful error handling for network issues
- **Local Storage**: Remembers user preferences
- **Cross-browser Compatible**: Works on all modern browsers

## 🚀 Installation

1. **Clone or Download** the project files
2. **Open** `index.html` in your web browser
3. **No additional setup required** - the game runs entirely in the browser!

## 🎯 How to Play

### Starting a Game

1. Select your preferred **Category** from the dropdown menu
2. Choose the **Difficulty Level** (Easy, Medium, Hard, or Any)
3. Set the **Number of Questions** (1-20)
4. Click **"Start Game"** to begin

### During the Quiz

- Read each question carefully
- Click on your chosen answer from the multiple-choice options
- Watch the timer countdown (varies by difficulty)
- See your score update in real-time
- Use the **"✖"** button to quit early if needed

### Game Results

- View your final score and performance
- Click **"More Details"** to see each question and your answers
- Click **"Play Again"** to start a new game

## 🎨 Customization

### Categories Available

- **Random**: Mix of all categories
- **General Knowledge**: General trivia questions
- **Science & Nature**: Scientific facts and discoveries
- **History**: Historical events and figures
- **Sports**: Sports trivia and records
- **Entertainment**: Movies, TV shows, and celebrities
- **Geography**: Countries, cities, and landmarks
- **Computers**: Technology and computer science
- **Mathematics**: Math problems and concepts
- **Politics**: Political events and figures
- **Art**: Art history and famous works
- **Animals**: Animal facts and biology
- **Vehicles**: Cars, planes, and transportation

### Difficulty Settings

- **Easy**: 30 seconds per question
- **Medium**: 20 seconds per question
- **Hard**: 12 seconds per question
- **Any**: 20 seconds per question (mixed difficulties)

## 🛠️ Technical Details

### File Structure

```
QuizGame/
├── index.html          # Main HTML file
├── style.css           # CSS styles and animations
├── script.js           # JavaScript game logic
└── README.md           # This file
```

### Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)**: Game logic, API integration, and DOM manipulation
- **Open Trivia Database API**: External question source

### Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🎨 Design Features

### Color Scheme

- **Primary**: Deep blue (#232946)
- **Secondary**: Purple (#6C63FF)
- **Accent**: Yellow (#F4D35E)
- **Success**: Green (#43AA8B)
- **Danger**: Red (#FF6B6B)

### Animations

- **Card Transitions**: Smooth fade-in/fade-out effects
- **Button Interactions**: Scale and color transitions
- **Score Animations**: Pulse effects for correct/incorrect answers
- **Background Shapes**: Floating animation for visual appeal

## 🔧 API Integration

The game uses the [Open Trivia Database API](https://opentdb.com/) to fetch questions. If the API is unavailable, the game falls back to hardcoded questions to ensure uninterrupted gameplay.

### API Endpoints Used

- `https://opentdb.com/api.php?amount={num}&type=multiple`
- Supports category and difficulty parameters

## 🐛 Troubleshooting

### Common Issues

1. **Questions not loading**: Check your internet connection
2. **Game not starting**: Ensure JavaScript is enabled in your browser
3. **Styling issues**: Try refreshing the page or clearing browser cache

### Performance Tips

- Use a modern browser for best performance
- Close unnecessary browser tabs for smoother animations
- Ensure stable internet connection for API questions

## 📱 Mobile Experience

The game is fully responsive and optimized for mobile devices:

- Touch-friendly button sizes
- Optimized layout for small screens
- Smooth touch interactions
- Readable text at all screen sizes

## 🤝 Contributing

Feel free to contribute to this project by:

- Reporting bugs
- Suggesting new features
- Adding new question categories
- Improving the UI/UX
- Optimizing performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com/) for providing the question API
- [Google Fonts](https://fonts.google.com/) for the beautiful typography
- CSS community for glassmorphism design inspiration

---

**Enjoy playing! 🎮✨**
