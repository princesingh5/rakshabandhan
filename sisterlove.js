let currentSection = 0;
const sections = document.querySelectorAll("section");
const boxClosed = document.getElementById("boxClosed");
const arrow = document.querySelector(".arrow");
const popupMsg = document.getElementById("popupMsg");
const thankYouMsg = document.getElementById("thankYouMsg");
const slides = document.querySelectorAll("#slideshow img");
const video = document.getElementById("mainVideo");
const bgMusic = document.getElementById("bgMusic");

function nextSection() {
  sections[currentSection].classList.remove("active");
  currentSection++;
  if (sections[currentSection]) {
    sections[currentSection].classList.add("active");
    if (sections[currentSection].id === "videoSec") {
      if (bgMusic) bgMusic.pause();
    }
  }
}

function showSkipPopup() {
  alert("Itna mehnat kiya hu coding me — skip to na karo, pura dekh to lo 😫😫");
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

let slideIndex = 0;
function showSlide(index) {
  slides.forEach((img, i) => {
    img.style.display = (i === index) ? "block" : "none";
  });
  if (index === slides.length - 1) {
    setTimeout(() => nextSection(), 1000);
  }
}

if (slides.length > 0) showSlide(slideIndex);

function showSkip() {
  video.pause();
  nextSection();
}

video?.addEventListener("ended", nextSection);

// PASSWORD
function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  const error = document.getElementById("passwordError");
  if (input === "Prince Singh") {
    error.textContent = "";
    nextSection();
  } else {
    error.textContent = "❌ Wrong Password!";
  }
}

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("passwordInput");
togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁️" : "🙈";
});

// MAIN GIFT BOX + HEART ANIMATION
function openBox() {
  boxClosed.style.display = "none";
  arrow.style.display = "none";

  const path = document.querySelector("path");
  const length = path.getTotalLength();
  const vertices = [];
  const timeline = gsap.timeline({ paused: true });

for (let i = 0; i < length; i += 1.5) {
    const point = path.getPointAtLength(i);
    const vector = new THREE.Vector3(point.x, -point.y, 0);
    vector.x += (Math.random() - 0.5) * 15;
    vector.y += (Math.random() - 0.5) * 15;
    vector.z += (Math.random() - 0.5) * 40;
    vertices.push(vector);

    timeline.from(vector, {
      x: 600 / 2,
      y: -552 / 2,
      z: 0,
      ease: "power2.inOut",
      duration: "random(0.5, 1.2)"
    }, i * 0.002);
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
  camera.position.z = 500;

  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("canvas") });
  renderer.setSize(window.innerWidth, window.innerHeight);
  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
  const material = new THREE.PointsMaterial({ color: 0xee5282, blending: THREE.AdditiveBlending, size: 3 });
  const particles = new THREE.Points(geometry, material);
  particles.position.x -= 600 / 2;
  particles.position.y += 552 / 2;
  scene.add(particles);

  gsap.fromTo(scene.rotation, { y: -0.2 }, {
    y: 0.2, repeat: -1, yoyo: true, ease: "power2.inOut", duration: 3
  });

  function render() {
    requestAnimationFrame(render);
    geometry.setFromPoints(vertices);
    renderer.render(scene, camera);
  }
  render();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const iphone = document.getElementById("iphoneHand");
  const text = document.getElementById("giftText");

timeline.eventCallback("onComplete", () => {
  iphone.classList.add("show");

  setTimeout(() => {
    text.classList.add("show");

    // After 5 sec, hide iPhone and text
    setTimeout(() => {
      text.classList.remove("show");
      iphone.classList.remove("show");

      gsap.to(vertices, {
        x: () => (Math.random() - 0.5) * 3000,
        y: () => (Math.random() - 0.5) * 3000,
        z: () => (Math.random() - 0.5) * 3000,
        duration: 4,
        ease: "power4.inOut"
      });

      // Step 1: Show Popup Msg (for 4 sec)
    //   setTimeout(() => {
        // popupMsg.style.display = "block";
    //   }, 1000);
// 
    //   setTimeout(() => {
        // popupMsg.style.display = "none";
        // thankYouMsg.style.display = "block";
    //   }, 5000); // 4 sec msg
// 
    //   setTimeout(() => {
        // thankYouMsg.style.display = "none";
        // const final = document.getElementById("finalWish");
        // final.style.display = "block";
        // document.body.style.backgroundColor = "#f883a7";
// 
        // const canvas = document.querySelector("canvas");
        // if (canvas) canvas.style.display = "block";
// 
        // sections.forEach(sec => {
        //   if (!sec.contains(final)) {
            // sec.style.display = "none";
        //   }
        // });
// 
    //   }, 10000); // 5 sec thank you
    // Step 1: Show popupMsg for 3 seconds
setTimeout(() => {
  popupMsg.style.display = "block";
}, 1000);

setTimeout(() => {
  popupMsg.style.display = "none";
  thankYouMsg.style.display = "block";
}, 4000); // after 3 seconds

setTimeout(() => {
  thankYouMsg.style.display = "none";
  const final = document.getElementById("finalWish");
  final.style.display = "block";
  document.body.style.backgroundColor = "#f883a7";

  const canvas = document.querySelector("canvas");
  if (canvas) canvas.style.display = "block";

  sections.forEach(sec => {
    if (!sec.contains(final)) {
      sec.style.display = "none";
    }
  });

  // document.body.classList.add("confetti");
}, 7000); // after another 3 seconds


    }, 9000); // iPhone & giftText delay

  }, 1800); // after iPhone appears
});





  timeline.play();
}
// ...existing animation and popup code...

// 👇 Paste this at very end
document.querySelectorAll("section video").forEach(vid => {
  vid.addEventListener("ended", () => {
    nextSection();
  });
});