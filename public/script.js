// Initialize Particles.js for background animation
document.addEventListener("DOMContentLoaded", function () {
  // Particles.js configuration
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
        polygon: {
          nb_sides: 5,
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
          enable: false,
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
          particles_nb: 4,
        },
      },
    },
    retina_detect: true,
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector("nav ul");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Add style for the active mobile menu
      if (!document.querySelector("#mobile-menu-style")) {
        const style = document.createElement("style");
        style.id = "mobile-menu-style";
        style.textContent = `
          nav ul.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(12, 30, 62, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 0;
            border-bottom: 1px solid rgba(0, 195, 255, 0.2);
            animation: slideDown 0.3s ease;
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
          
          nav ul.active li {
            margin: 0.8rem 5%;
          }
        `;
        document.head.appendChild(style);
      }
    });
  }

  // Contract Address Copy Functionality
  const copyBtn = document.getElementById("copy-ca");
  const contractAddress = document.getElementById("contract-address");
  const copyMessage = document.getElementById("copy-message");

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      // Create a temporary textarea element to copy the text
      const textarea = document.createElement("textarea");
      textarea.value = contractAddress.textContent;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      // Show the copy message
      copyMessage.style.opacity = "1";

      // Hide the message after 2 seconds
      setTimeout(function () {
        copyMessage.style.opacity = "0";
      }, 2000);
    });
  }

  // Animate counter in the reserves section
  const counterValue = document.querySelector(".counter-value");

  // Only run the animation when the section is visible
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  if (counterValue) {
    observer.observe(document.querySelector(".reserves-counter"));
  }

  function animateCounter() {
    const targetValue = parseInt(counterValue.getAttribute("data-target"));
    let currentValue = 0;
    const duration = 2000; // 2 seconds
    const step = targetValue / (duration / 16); // 60fps approx

    const updateCounter = () => {
      currentValue += step;
      if (currentValue < targetValue) {
        counterValue.textContent = Math.floor(currentValue);
        requestAnimationFrame(updateCounter);
      } else {
        counterValue.textContent = targetValue;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  // Initialize Charts
  if (typeof Chart !== "undefined") {
    // Reserves Chart
    const reservesChartElement = document.getElementById("reservesChart");
    if (reservesChartElement) {
      const reservesChart = new Chart(reservesChartElement, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
          datasets: [
            {
              label: "ETH Reserves Growth",
              data: [2000, 2800, 3500, 4200, 5000, 5600, 6200, 6800, 7000],
              borderColor: "#00c3ff",
              backgroundColor: "rgba(0, 195, 255, 0.1)",
              borderWidth: 2,
              pointBackgroundColor: "#00c3ff",
              pointBorderColor: "#0c1e3e",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "rgba(255, 255, 255, 0.7)",
                font: {
                  family: "'Orbitron', sans-serif",
                  size: 12,
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(12, 30, 62, 0.8)",
              titleColor: "#00c3ff",
              bodyColor: "#ffffff",
              borderColor: "#00c3ff",
              borderWidth: 1,
              titleFont: {
                family: "'Orbitron', sans-serif",
                size: 14,
              },
              bodyFont: {
                family: "'Roboto', sans-serif",
                size: 12,
              },
              padding: 12,
            },
          },
          scales: {
            x: {
              grid: {
                color: "rgba(255, 255, 255, 0.05)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
            y: {
              grid: {
                color: "rgba(255, 255, 255, 0.05)",
              },
              ticks: {
                color: "rgba(255, 255, 255, 0.7)",
              },
            },
          },
        },
      });
    }

    // Tokenomics Chart
    const tokenomicsChartElement = document.getElementById("tokenomicsChart");
    if (tokenomicsChartElement) {
      const tokenomicsChart = new Chart(tokenomicsChartElement, {
        type: "doughnut",
        data: {
          labels: [
            "Public Sale & Liquidity",
            "Ecosystem Development",
            "Team & Advisors (Locked)",
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
                "#00ffff",
                "#0d3b7d",
                "#627eea",
                "#0a2d5e",
              ],
              borderColor: "#0c1e3e",
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
                color: "rgba(255, 255, 255, 0.7)",
                font: {
                  family: "'Roboto', sans-serif",
                  size: 12,
                },
                padding: 15,
              },
            },
            tooltip: {
              backgroundColor: "rgba(12, 30, 62, 0.8)",
              titleColor: "#00c3ff",
              bodyColor: "#ffffff",
              borderColor: "#00c3ff",
              borderWidth: 1,
              padding: 12,
              callbacks: {
                label: function (context) {
                  return `${context.label}: ${context.parsed}%`;
                },
              },
            },
          },
          cutout: "70%",
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        },
      });
    }
  }

  // Form Submissions
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulate form submission with animation
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

      setTimeout(function () {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = "#00aa55";

        // Reset form
        contactForm.reset();

        // Restore button after some time
        setTimeout(function () {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
        }, 3000);
      }, 1500);
    });
  }

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';

      setTimeout(function () {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';

        // Reset form
        newsletterForm.reset();

        // Restore button after some time
        setTimeout(function () {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Hide mobile menu if open
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
        }
      }
    });
  });

  // Animation for elements when they come into view
  const fadeInElements = document.querySelectorAll(
    ".about-section, .reserves-section, .features-section, .roadmap-section, .tokenomics-section, .contact-section"
  );

  const fadeObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  fadeInElements.forEach((element) => {
    fadeObserver.observe(element);
  });

  // Add fade-in class with CSS in a style tag
  const style = document.createElement("style");
  style.textContent = `
    .about-section, .reserves-section, .features-section, .roadmap-section, .tokenomics-section, .contact-section {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .feature-card, .roadmap-item, .token-detail-item, .stat-item {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .fade-in .feature-card, .fade-in .roadmap-item, .fade-in .token-detail-item, .fade-in .stat-item {
      opacity: 1;
      transform: translateY(0);
    }
    
    .fade-in .feature-card:nth-child(1), .fade-in .roadmap-item:nth-child(1), .fade-in .token-detail-item:nth-child(1), .fade-in .stat-item:nth-child(1) {
      transition-delay: 0.1s;
    }
    
    .fade-in .feature-card:nth-child(2), .fade-in .roadmap-item:nth-child(2), .fade-in .token-detail-item:nth-child(2), .fade-in .stat-item:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .fade-in .feature-card:nth-child(3), .fade-in .roadmap-item:nth-child(3), .fade-in .token-detail-item:nth-child(3), .fade-in .stat-item:nth-child(3) {
      transition-delay: 0.3s;
    }
    
    .fade-in .feature-card:nth-child(4), .fade-in .roadmap-item:nth-child(4), .fade-in .token-detail-item:nth-child(4) {
      transition-delay: 0.4s;
    }
    
    .fade-in .roadmap-item:nth-child(5) {
      transition-delay: 0.5s;
    }
  `;
  document.head.appendChild(style);
});

// Add some 3D tilt effect to the hero graphics using mouse movement
document.addEventListener("mousemove", function (e) {
  const heroGraphics = document.querySelector(".hero-graphics");
  if (!heroGraphics) return;

  const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

  heroGraphics.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
