/* Reset & base */
* {
  margin: 0; padding: 0; box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  user-select: none;
}

body, html {
  height: 100%;
  overflow: hidden;
  background: #111;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.container {
  background: rgba(10, 10, 20, 0.75);
  border-radius: 20px;
  padding: 40px 50px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 0 40px #8e44ad;
  position: relative;
  z-index: 10;
  text-align: center;
}

h1 {
  font-weight: 900;
  font-size: 2.8rem;
  margin-bottom: 30px;
  color: #ff7fff;
  text-shadow:
    0 0 5px #ff7fff,
    0 0 15px #ff7fff,
    0 0 30px #ff7fff,
    0 0 40px #ff7fff;
}

.mood-select h2 {
  font-weight: 700;
  font-size: 1.6rem;
  margin-bottom: 18px;
  letter-spacing: 1.2px;
  color: #ff6fff;
  text-shadow: 0 0 8px #ff6fffaa;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 30px;
}

.buttons button {
  background: #330033;
  border: 2px solid #ff6fff;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 1.1rem;
  color: #ffb3ff;
  cursor: pointer;
  font-weight: 600;
  box-shadow:
    0 0 10px #ff6fff,
    inset 0 0 8px #cc00cc;
  transition: all 0.3s ease;
  user-select: none;
}

.buttons button:hover {
  background: #ff6fff;
  color: #330033;
  box-shadow:
    0 0 25px #ff6fff,
    inset 0 0 15px #cc00cc;
  transform: scale(1.05);
}

.story-box {
  min-height: 220px;
  background: rgba(50, 0, 50, 0.4);
  border-radius: 14px;
  padding: 22px 26px;
  font-size: 1.2rem;
  line-height: 1.5;
  color: #ffccff;
  box-shadow: 0 0 22px #ff55ffaa;
  position: relative;
  overflow-y: auto;
  user-select: text;
  max-height: 320px;
}

/* Canvas overlay */
#animeCanvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 5;
  width: 100vw;
  height: 100vh;
}

/* Scrollbar for story box */
.story-box::-webkit-scrollbar {
  width: 6px;
}
.story-box::-webkit-scrollbar-thumb {
  background: #ff66ffcc;
  border-radius: 20px;
}
