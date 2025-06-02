// Wait for DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize particles.js
  initParticles();

  // Initialize counter animations
  initCounters();

  // Initialize Charts
  initCharts();

  // Setup copy functionality
  setupCopyAddress();

  // Setup mobile menu
  setupMobileMenu();

  // Setup form submissions
  setupForms();
});

// Initialize particles.js with fallback
function initParticles() {
  try {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#00c3ff",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00c3ff",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5,
            },
          },
          push: {
            particles_nb: 3,
          },
        },
      },
      retina_detect: true,
    });
  } catch (e) {
    console.error("Particles.js initialization failed:", e);
    // Apply a dark background as fallback
    document.querySelector(".particles-container").style.opacity = "1";
  }
}

// Initialize counter animations
function initCounters() {
  const counters = document.querySelectorAll(".counter-value");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const startValue = 0;

    function updateCounter() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration) {
        const value = Math.floor((elapsedTime / duration) * target);
        counter.textContent = value;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

// Initialize Charts
function initCharts() {
  // Configure Chart.js defaults for dark theme
  try {
    Chart.defaults.color = "rgba(255, 255, 255, 0.7)";
    Chart.defaults.scale.grid.color = "rgba(255, 255, 255, 0.1)";

    // Reserves Chart
    const reservesChartElem = document.getElementById("reservesChart");
    if (reservesChartElem) {
      const reservesChart = new Chart(reservesChartElem, {
        type: "line",
        data: {
          labels: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2"],
          datasets: [
            {
              label: "ETH Reserves",
              data: [2000, 3500, 5000, 6200, 7000, 7500],
              borderColor: "#00c3ff",
              backgroundColor: "rgba(0, 195, 255, 0.1)",
              borderWidth: 2,
              pointBackgroundColor: "#00c3ff",
              pointRadius: 4,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "rgba(12, 30, 62, 0.9)",
              titleColor: "#ffffff",
              bodyColor: "#ffffff",
              borderColor: "rgba(0, 195, 255, 0.3)",
              borderWidth: 1,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  return value + " ETH";
                },
              },
            },
          },
        },
      });
    }

    // Tokenomics Chart
    const tokenomicsChartElem = document.getElementById("tokenomicsChart");
    if (tokenomicsChartElem) {
      const tokenomicsChart = new Chart(tokenomicsChartElem, {
        type: "doughnut",
        data: {
          labels: [
            "Public Sale & Liquidity",
            "Ecosystem Development",
            "Team & Advisors",
            "Strategic Partnerships",
            "Marketing & Community",
            "Reserve Fund",
          ],
          datasets: [
            {
              data: [35, 25, 15, 10, 10, 5],
              backgroundColor: [
                "#00c3ff",
                "#0077ff",
                "#0046e2",
                "#3366ff",
                "#0a2d5e",
                "#0c1e3e",
              ],
              borderColor: "rgba(12, 30, 62, 0.8)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
              labels: {
                boxWidth: 15,
                padding: 15,
                font: {
                  size: 12,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(12, 30, 62, 0.9)",
              titleColor: "#ffffff",
              bodyColor: "#ffffff",
              borderColor: "rgba(0, 195, 255, 0.3)",
              borderWidth: 1,
              callbacks: {
                label: function (context) {
                  return context.label + ": " + context.raw + "%";
                },
              },
            },
          },
        },
      });
    }
  } catch (e) {
    console.error("Chart initialization failed:", e);
    // Fallback for charts - show text description
    const chartContainers = document.querySelectorAll(".chart-container");
    chartContainers.forEach((container) => {
      container.innerHTML =
        '<div class="chart-fallback">Chart visualization not available on your browser.</div>';
      container.style.display = "flex";
      container.style.alignItems = "center";
      container.style.justifyContent = "center";
      container.style.height = "100%";
    });
  }
}

// Setup contract address copy functionality
function setupCopyAddress() {
  const copyBtn = document.getElementById("copy-ca");
  const contractAddress = document.getElementById("contract-address");
  const copyMessage = document.getElementById("copy-message");

  if (copyBtn && contractAddress) {
    copyBtn.addEventListener("click", function () {
      try {
        // Modern approach
        navigator.clipboard
          .writeText(contractAddress.textContent.trim())
          .then(() => showCopyMessage())
          .catch((err) => {
            console.error("Clipboard API failed:", err);
            fallbackCopy();
          });
      } catch (e) {
        console.error("Clipboard API not supported:", e);
        fallbackCopy();
      }
    });

    // Fallback copy method
    function fallbackCopy() {
      const textArea = document.createElement("textarea");
      textArea.value = contractAddress.textContent.trim();
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand("copy");
        if (successful) {
          showCopyMessage();
        } else {
          console.error("Failed to copy");
        }
      } catch (err) {
        console.error("Failed to copy:", err);
      }

      document.body.removeChild(textArea);
    }

    function showCopyMessage() {
      copyMessage.style.opacity = "1";
      setTimeout(() => {
        copyMessage.style.opacity = "0";
      }, 2000);
    }
  }
}

// Setup mobile menu
function setupMobileMenu() {
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const nav = document.querySelector("nav");

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      nav.classList.toggle("active");
      document.body.classList.toggle("menu-open");

      // Create mobile menu styles dynamically if not present
      if (!document.getElementById("mobile-menu-styles")) {
        const styleSheet = document.createElement("style");
        styleSheet.id = "mobile-menu-styles";
        styleSheet.textContent = `
          body.menu-open {
            overflow: hidden;
          }
          
          @media screen and (max-width: 992px) {
            nav.active ul {
              display: flex;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background: rgba(12, 30, 62, 0.95);
              padding: 1rem 0;
              z-index: 1000;
              border-bottom: 1px solid rgba(0, 195, 255, 0.2);
              animation: slideDown 0.3s ease forwards;
            }
            
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-10px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            nav.active ul li {
              margin: 0.8rem 5%;
              width: 90%;
            }
            
            nav.active ul li a {
              display: block;
              padding: 0.8rem;
              width: 100%;
              text-align: center;
            }
          }
        `;
        document.head.appendChild(styleSheet);
      }
    });

    // Close menu when clicking anywhere on the page
    document.addEventListener("click", function (event) {
      if (
        nav.classList.contains("active") &&
        !nav.contains(event.target) &&
        event.target !== menuBtn
      ) {
        nav.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (window.innerWidth <= 992) {
          nav.classList.remove("active");
          document.body.classList.remove("menu-open");
        }
      });
    });

    // Add smooth scrolling for navigation links
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");

        if (targetId.startsWith("#") && targetId !== "#") {
          e.preventDefault();
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            const headerHeight = document.querySelector("header").offsetHeight;
            const targetPosition =
              targetElement.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      });
    });
  }
}

// Setup form submissions
function setupForms() {
  const contactForm = document.getElementById("contact-form");
  const newsletterForm = document.getElementById("newsletter-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Show submission confirmation
      const formElements = contactForm.elements;
      for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== "submit") {
          formElements[i].disabled = true;
        }
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Message Sent!";
      submitBtn.disabled = true;

      setTimeout(() => {
        // Reset form
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        for (let i = 0; i < formElements.length; i++) {
          if (formElements[i].type !== "submit") {
            formElements[i].disabled = false;
          }
        }
      }, 3000);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');

      emailInput.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Subscribed!";
      submitBtn.disabled = true;

      setTimeout(() => {
        newsletterForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        emailInput.disabled = false;
      }, 3000);
    });
  }
}

// Add some 3D tilt effect to the hero graphics using mouse movement
document.addEventListener("mousemove", function (e) {
  const heroGraphics = document.querySelector(".hero-graphics");
  if (!heroGraphics) return;

  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

  heroGraphics.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
