// Grab DOM elements
const storyBox = document.getElementById('storyText');
const buttons = document.querySelectorAll('.buttons button');
const canvas = document.getElementById('animeCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// On window resize, update canvas and clear
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Stories data
const stories = {
  happy: [
    `🌸 On a radiant spring morning, {name} woke up with a heart full of hope.\n
The birds sang melodies that danced through the warm air.\n
With a smile, {name} stepped outside to embrace the day's endless possibilities.\n
The sunlight kissed the flowers and the gentle breeze whispered promises.\n
Friends gathered beneath the sakura tree, laughter filling the air.\n
Every moment felt like a dream woven with joy and warmth.\n
{name} felt unstoppable, as if the whole world was a canvas.\n
Together, they painted memories that sparkled like stars.\n
In their hearts, happiness was not just a feeling—it was a way of life.\n
And as the day ended, a soft glow wrapped around them like a blessing.`
  ],
  dark: [
    `🌑 The night was silent except for the whispers of shadows.\n
{name} walked through deserted streets, haunted by echoes of the past.\n
Every step was a battle, but in the darkness, a flicker of light remained.\n
Cold winds pierced through broken windows, carrying secrets untold.\n
Memories clawed at the edges of sanity, testing the strength within.\n
Yet amidst the abyss, {name} held on to a fragile hope.\n
The stars above blinked in silent encouragement.\n
Even in the deepest darkness, light can find a way.\n
And when dawn finally broke, it promised a new beginning.\n
A chance to rise, to heal, and to rewrite the story.`
  ],
  fantasy: [
    `🧙‍♂️ In the ancient forest where magic thrived, {name} found a glowing rune.\n
It pulsed with power, awakening forgotten spells and legends.\n
The air shimmered with enchantment as the trees whispered secrets.\n
A silver dragon emerged, wings spread wide against the twilight.\n
{name} mounted the majestic creature, heart pounding with destiny.\n
Mystic winds carried them above enchanted mountains and crystal lakes.\n
The lost kingdom awaited their courage and wisdom.\n
Ancient prophecies stirred, weaving fate and hope.\n
With every beat of the dragon’s wings, the world seemed alive.\n
And in that moment, {name} became the hero of legend.`
  ],
  scifi: [
    `🚀 Amidst the endless stars, {name} piloted the last starship.\n
Galaxies blurred as they raced toward a new frontier.\n
Neon lights flickered on the control deck, humming with life.\n
AI companions whispered calculations and warnings.\n
In the vast void, hope was the fuel that kept them going.\n
Secrets of the universe unfolded in shimmering holograms.\n
Every discovery was a puzzle piece in the grand design.\n
{name} faced cosmic storms and alien mysteries with resolve.\n
The future belonged to those brave enough to reach for it.\n
And beyond the stars, a new dawn was waiting to be born.`
  ],
  mystery: [
    `🕵️‍♂️ The clock struck midnight as {name} uncovered the cryptic note.\n
Every clue led deeper into a web of secrets.\n
Shadows stretched long across foggy alleyways.\n
Whispers echoed of hidden truths and forgotten lies.\n
Time was running out, but the mind was sharper than ever.\n
{name} pieced together fragments of a story untold.\n
The city's heartbeat quickened with suspense.\n
Every step was a dance with danger and revelation.\n
In the end, truth was the only light in the darkness.\n
And when the mystery unraveled, nothing was as it seemed.`
  ],
};

// Configuration for particles
const bgConfigs = {
  happy: { particleCount: 40, color: '#ffb6c1', shape: 'petal' },
  dark: { particleCount: 30, color: '#555555', shape: 'smoke' },
  fantasy: { particleCount: 50, color: '#7b68ee', shape: 'sparkle' },
  scifi: { particleCount: 60, color: '#00ffff', shape: 'neon' },
  mystery: { particleCount: 40, color: '#aaaaff', shape: 'mist' },
};

let particles = [];
let animationFrameId;
let currentMood = null;
let typingSpeed = 30;

// Particle class
class Particle {
  constructor(x, y, color, shape) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.shape = shape;
    this.size = Math.random() * 6 + 4;
    this.opacity = 1;
    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;
    this.life = 100 + Math.random() * 50;
    this.angle = Math.random() * 2 * Math.PI;
    this.spin = (Math.random() - 0.5) * 0.1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    this.opacity = Math.max(this.life / 150, 0);
    this.angle += this.spin;

    if (
      this.life <= 0 ||
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height
    ) {
      // Respawn the particle
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.life = 100 + Math.random() * 50;
      this.opacity = 1;
      this.speedX = (Math.random() - 0.5) * 0.6;
      this.speedY = (Math.random() - 0.5) * 0.6;
      this.size = Math.random() * 6 + 4;
      this.angle = Math.random() * 2 * Math.PI;
      this.spin = (Math.random() - 0.5) * 0.1;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;

    switch (this.shape) {
      case 'petal':
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size / 2, this.size, 0, 0, 2 * Math.PI);
        ctx.fill();
        break;

      case 'smoke':
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, 2 * Math.PI);
        ctx.fill();
        break;

      case 'sparkle':
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
          ctx.lineTo(0, this.size);
          ctx.translate(0, this.size);
          ctx.rotate((Math.PI * 2) / 10);
          ctx.lineTo(0, -this.size);
          ctx.translate(0, -this.size);
          ctx.rotate(-(Math.PI * 6) / 10);
        }
        ctx.closePath();
        ctx.fill();
        break;

      case 'neon':
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 1.5, 0, 2 * Math.PI);
        ctx.fill();
        break;

      case 'mist':
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size * 1.5, this.size / 2, 0, 0, 2 * Math.PI);
        ctx.fill();
        break;

      default:
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 2, 0, 2 * Math.PI);
        ctx.fill();
        break;
    }

    ctx.restore();
  }
}

// Create initial particles for a mood
function createParticles(mood) {
  particles = [];
  const config = bgConfigs[mood];
  for (let i = 0; i < config.particleCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    particles.push(new Particle(x, y, config.color, config.shape));
  }
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Animation loop
function animate() {
  clearCanvas();
  particles.forEach(p => {
    p.update();
    p.draw(ctx);
  });
  animationFrameId = requestAnimationFrame(animate);
}

// Stop the animation
function stopAnimation() {
  cancelAnimationFrame(animationFrameId);
  clearCanvas();
}

// ✅ The improved typeStory using innerHTML and <br>
function typeStory(text, element, speed = typingSpeed) {
  return new Promise(resolve => {
    element.innerHTML = '';  // IMPORTANT: clear using innerHTML
    let i = 0;

    function typing() {
      if (i < text.length) {
        if (text.charAt(i) === '\n') {
          element.innerHTML += '<br>';
          i++;
          setTimeout(typing, speed + 300);  // extra pause at new line
        } else {
          element.innerHTML += text.charAt(i);
          i++;
          setTimeout(typing, speed);
        }
      } else {
        element.innerHTML += `<br><br><span style="color:#ff99ff; font-weight:700; text-shadow: 0 0 10px #ff66ff;">✨ The End ✨</span>`;
        resolve();
      }
    }

    typing();
  });
}

// Generate story (choose random from array and replace {name})
function generateStory(mood) {
  if (!stories[mood]) return "No story available.";
  const storyTemplate = stories[mood][Math.floor(Math.random() * stories[mood].length)];
  const animeNames = ['Akira', 'Hikari', 'Ren', 'Yuki', 'Sora', 'Kaori', 'Kaito', 'Mika', 'Haruki', 'Ayame'];
  const name = animeNames[Math.floor(Math.random() * animeNames.length)];
  return storyTemplate.replace(/\{name\}/g, name);
}

// Start showing story and animation
async function startStory(mood) {
  currentMood = mood;
  stopAnimation();
  createParticles(mood);
  animate();
  // Clear using innerHTML too
  storyBox.innerHTML = ''; 
  const story = generateStory(mood);
  await typeStory(story, storyBox, typingSpeed);
}

// Bind buttons
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mood = btn.getAttribute('data-mood');
    startStory(mood);
  });
});
