// Assignment data
const assignments = [
  {
    id: '1',
    title: 'Prosty kalkulator HTML/JS',
    description: 'Utwórz prosty kalkulator wykonujący podstawowe operacje matematyczne przy użyciu HTML, CSS i JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    date: '10.09.2023',
    difficulty: 'easy',
    code: {
      html: `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Prosty Kalkulator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="calculator">
    <div class="display">
      <input type="text" id="result" disabled>
    </div>
    <div class="buttons">
      <button class="btn" onclick="appendValue('7')">7</button>
      <button class="btn" onclick="appendValue('8')">8</button>
      <button class="btn" onclick="appendValue('9')">9</button>
      <button class="btn operator" onclick="appendValue('+')">+</button>
      
      <button class="btn" onclick="appendValue('4')">4</button>
      <button class="btn" onclick="appendValue('5')">5</button>
      <button class="btn" onclick="appendValue('6')">6</button>
      <button class="btn operator" onclick="appendValue('-')">-</button>
      
      <button class="btn" onclick="appendValue('1')">1</button>
      <button class="btn" onclick="appendValue('2')">2</button>
      <button class="btn" onclick="appendValue('3')">3</button>
      <button class="btn operator" onclick="appendValue('*')">×</button>
      
      <button class="btn" onclick="appendValue('0')">0</button>
      <button class="btn" onclick="appendValue('.')">.</button>
      <button class="btn equal" onclick="calculate()">=</button>
      <button class="btn operator" onclick="appendValue('/')">/</button>
      
      <button class="btn clear" onclick="clearDisplay()">C</button>
    </div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.calculator {
  background-color: #333;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 20px;
  width: 300px;
}

.display {
  margin-bottom: 20px;
}

#result {
  width: 100%;
  height: 60px;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
  font-size: 28px;
  text-align: right;
  padding: 0 10px;
  outline: none;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  height: 60px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  background-color: #555;
  color: white;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #666;
}

.operator {
  background-color: #ff9500;
}

.operator:hover {
  background-color: #ffb144;
}

.equal {
  background-color: #2196F3;
}

.equal:hover {
  background-color: #42a5f5;
}

.clear {
  background-color: #f44336;
  grid-column: span 4;
}

.clear:hover {
  background-color: #ef5350;
}`,
      js: `let result = document.getElementById('result');

function appendValue(value) {
  result.value += value;
}

function calculate() {
  try {
    result.value = eval(result.value);
  } catch (error) {
    result.value = 'Error';
  }
}

function clearDisplay() {
  result.value = '';
}`
    }
  },
  {
    id: '2',
    title: 'Responsywna galeria zdjęć',
    description: 'Stwórz responsywną galerię zdjęć z efektami hover i lightbox przy użyciu HTML, CSS i opcjonalnie JavaScript.',
    tags: ['HTML', 'CSS', 'Responsive'],
    date: '25.09.2023',
    difficulty: 'medium',
    code: {
      html: `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsywna Galeria Zdjęć</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <h1>Galeria Zdjęć</h1>
    <p>Przykładowa responsywna galeria z efektem lightbox</p>
  </header>
  
  <div class="gallery">
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?nature,1" alt="Nature 1" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?nature,2" alt="Nature 2" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?nature,3" alt="Nature 3" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?city,1" alt="City 1" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?city,2" alt="City 2" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?city,3" alt="City 3" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?animals,1" alt="Animals 1" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?animals,2" alt="Animals 2" onclick="openLightbox(this.src)">
    </div>
    <div class="gallery-item">
      <img src="https://source.unsplash.com/random/300x300?animals,3" alt="Animals 3" onclick="openLightbox(this.src)">
    </div>
  </div>
  
  <div id="lightbox" class="lightbox">
    <span class="close" onclick="closeLightbox()">&times;</span>
    <img id="lightbox-img" class="lightbox-content">
  </div>
  
  <script src="script.js"></script>
</body>
</html>`,
      css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  line-height: 1.6;
  padding: 20px;
  background-color: #f4f4f4;
}

header {
  text-align: center;
  padding: 20px 0 40px;
}

h1 {
  margin-bottom: 10px;
  color: #333;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px;
  max-width: 1200px;
  margin: 0 auto;
}

.gallery-item {
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.gallery-item img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

.lightbox {
  display: none;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  justify-content: center;
  align-items: center;
}

.lightbox-content {
  display: block;
  max-width: 90%;
  max-height: 80%;
  object-fit: contain;
}

.close {
  position: absolute;
  top: 20px;
  right: 30px;
  color: white;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}

/* Media Queries */
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery {
    grid-template-columns: 1fr;
  }
}`,
      js: `function openLightbox(src) {
  document.getElementById('lightbox').style.display = 'flex';
  document.getElementById('lightbox-img').src = src;
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
  if (e.target !== document.getElementById('lightbox-img')) {
    closeLightbox();
  }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});`
    }
  },
  {
    id: '3',
    title: 'Formularz kontaktowy z walidacją',
    description: 'Zbuduj formularz kontaktowy z walidacją pól w czasie rzeczywistym przy użyciu JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Formularze'],
    date: '12.10.2023',
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Animowana strona landing page',
    description: 'Utwórz animowaną stronę landing page dla fikcyjnego produktu, wykorzystując animacje CSS i interakcje JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Animacje'],
    date: '05.11.2023',
    difficulty: 'hard'
  },
  {
    id: '5',
    title: 'Aplikacja Todo list',
    description: 'Zbuduj prostą aplikację Todo list umożliwiającą dodawanie, usuwanie i oznaczanie zadań jako wykonane.',
    tags: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    date: '20.11.2023',
    difficulty: 'medium'
  },
  {
    id: '6',
    title: 'Gra w zgadywanie liczby',
    description: 'Utwórz prostą grę w zgadywanie liczby z użyciem HTML, CSS i JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Gra'],
    date: '03.12.2023',
    difficulty: 'easy'
  },
  {
    id: '7',
    title: 'Prosta aplikacja pogodowa',
    description: 'Stwórz aplikację pokazującą aktualną pogodę dla wybranego miasta, używając zewnętrznego API.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API'],
    date: '15.12.2023',
    difficulty: 'hard'
  },
  {
    id: '8',
    title: 'Slider zdjęć',
    description: 'Zaimplementuj slider zdjęć z funkcjonalnością przewijania i nawigacją przy użyciu czystego JavaScript.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    date: '10.01.2024',
    difficulty: 'medium'
  }
];
