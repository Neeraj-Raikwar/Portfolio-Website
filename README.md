# Neeraj Raikwar — Interactive 3D Cinematic Portfolio

A high-performance, cinematic personal portfolio built with a decoupled architecture. The frontend features a hardware-accelerated, frame-scrubbed interactive canvas hero, GSAP scroll triggers, and sleek editorial glassmorphism. The backend operates as a dedicated Node.js/Express microservice handling secure email dispatch via Nodemailer without exposing SMTP credentials.

---

## 🚀 Live Demo & Project Showcase

- **Portfolio Live Demo:** [View Live Site](https://neerajweb.onrender.com) *(Update with your live URL)*
- **Featured Projects Featured on Portfolio:**
  - **WeMeet:** Real-Time Video Conferencing Platform (WebRTC, Socket.io, MERN) — [Live Demo](https://we-meet-frontend.onrender.com)
  - **Aurelion:** Haute Horlogerie & Timeless Precision Luxury Watch Experience (MERN Stack) — [Live Demo](https://aurelion-frontend-4dfp.onrender.com)
  - **Netflix Clone:** Responsive Landing Page — [Live Demo](https://netflix-landing-page-project.onrender.com)

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Core:** HTML5, CSS3 (Custom Variables & Editorial Typography), JavaScript (ES6+)
- **Animation Engine:** GSAP (GreenSock) & ScrollTrigger
- **Graphics Pipeline:** HTML5 `<canvas>` rendering engine with dynamic aspect-ratio scaling (`Math.max(hRatio, vRatio)`)
- **Interactive UI:** Custom GPU-accelerated cursor (`transform: translate3d`) for zero main-thread lag

### **Backend (Microservice)**
- **Runtime & Framework:** Node.js, Express.js
- **Email Service:** Nodemailer (SMTP transport with environment-gated credentials)
- **Security & Config:** CORS configuration, `dotenv`

---

## 💡 Key Engineering Highlights & Challenges Solved

### 1. Frame-Scrubbed Canvas Hero (Bypassing HTML5 Video Stutter)
- **Problem:** Scrubbing an HTML5 `<video>` element directly via the scrollbar caused severe playback stutter and dropped frames across different browsers.
- **Solution:** Extracted the 3D sequence into 240 optimized `.webp` frames. Preloaded the frames into memory and rendered them directly to an HTML5 `<canvas>` driven by GSAP ScrollTrigger, delivering a silky smooth 60fps scrubbing experience.

### 2. Zero-Lag Hardware-Accelerated Custom Cursor
- **Problem:** Animating mouse follower rings using traditional `top`/`left` properties triggers continuous browser layout repaints and visible lag.
- **Solution:** Bound cursor position to `transform: translate3d(x, y, 0)`, moving the visual rendering load entirely to the GPU.

### 3. Decoupled Microservice for Secure Contact Form Delivery
- **Problem:** Needed a secure, cost-effective way to dispatch form inquiries via email without exposing private SMTP credentials or introducing database overhead.
- **Solution:** Created an isolated backend microservice using Express and Nodemailer. Configured strict CORS handling and environment variables for independent deployment on Render.

---

## 📁 Repository Structure

```text
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── main.js
│   │   └── canvasAnimation.js
│   └── public/
│       ├── frames/          # 240 preloaded .webp sequence frames
│       └── images/          # Project mockups & certificate assets
│
└── backend/
    ├── server.js            # Express server entry point
    ├── routes/
    │   └── contactRoutes.js # Handles POST /api/contact
    ├── controllers/
    │   └── contactController.js
    ├── .env.example
    ├── .gitignore
    └── package.json
