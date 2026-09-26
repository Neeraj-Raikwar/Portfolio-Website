gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("hero-canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Frame configuration
const totalFramesInFolder = 240;
// We assume 30fps. The user requested to skip the first 2.5 to 3 seconds.
// 2.5 seconds * 30 fps = 75 frames. So we start at frame 76.
const startFrame = 76; 
const activeFrames = totalFramesInFolder - startFrame + 1;

const currentFrame = index => (
  `./frames/frame_${(index + startFrame).toString().padStart(4, '0')}.webp`
);

const images = [];
const imageSeq = {
  frame: 0
};

// Preload images
for (let i = 0; i < activeFrames; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// Initial render once the first image is loaded
images[0].onload = render;

function render() {
  if (images[imageSeq.frame]) {
    scaleImage(images[imageSeq.frame], context);
  }
}

function scaleImage(img, ctx) {
  const canvas = ctx.canvas;
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}

// GSAP ScrollTrigger for animating frames based on scroll position
gsap.to(imageSeq, {
  frame: activeFrames - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "+=200%", // Pin for 200% of viewport height
    scrub: 1, // Smooth scrubbing
    pin: true, // Pin the hero section while animating
  },
  onUpdate: render
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});

// Custom Cursor Logic
const cursorRing = document.getElementById("cursor-ring");
const cursorDot = document.getElementById("cursor-dot");

window.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  cursorRing.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
  cursorDot.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
});

// Contact Form Progress Bar Logic
const requiredInputs = document.querySelectorAll('.contact-form input[required]');
const progressFill = document.querySelector('.progress-fill');

function updateProgress() {
    if (!progressFill) return;
    
    let filledCount = 0;
    requiredInputs.forEach(input => {
        if (input.value.trim() !== '') {
            filledCount++;
        }
    });
    
    // Base is 25% (dropdowns and radios are pre-filled). 
    // 3 required text fields * 25% = 75%. Total = 100%.
    let percentage = 25 + (filledCount * 25);
    progressFill.style.width = percentage + '%';
    progressFill.innerText = percentage + '%';
}

requiredInputs.forEach(input => {
    input.addEventListener('input', updateProgress);
});

// Contact Form Backend Submission
const contactForm = document.getElementById("projectForm");
if(contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = "Sending...";
        submitBtn.style.opacity = "0.7";
        
        const formData = {
            fullname: document.getElementById("fullname").value,
            company: document.getElementById("company").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            interestedIn: contactForm.querySelector('select[name="Interested In"]').value,
            websiteType: contactForm.querySelector('select[name="Website Type"]').value,
            pages: contactForm.querySelector('input[name="Pages"]:checked').value
        };

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            
            if(data.success) {
                submitBtn.innerText = "Sent Successfully! 🚀";
                submitBtn.style.backgroundColor = "#22c55e"; // Success green
                submitBtn.style.opacity = "1";
                contactForm.reset();
                updateProgress(); // Reset the progress bar
            } else {
                alert("Failed to send: " + data.message);
                submitBtn.innerText = originalBtnText;
                submitBtn.style.opacity = "1";
            }
        } catch (error) {
            console.error(error);
            alert("Server error. Please ensure backend is running.");
            submitBtn.innerText = originalBtnText;
            submitBtn.style.opacity = "1";
        }
        
        // Reset button state after 5 seconds
        setTimeout(() => {
            if(submitBtn.innerText.includes("Successfully")) {
                submitBtn.innerText = originalBtnText;
                submitBtn.style.backgroundColor = "var(--orange-primary)";
            }
        }, 5000);
    });
}
