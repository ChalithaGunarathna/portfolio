// DOM Elements
const header = document.querySelector(".header")
const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
const mobileNav = document.querySelector(".mobile-nav")
const themeToggles = document.querySelectorAll(".theme-toggle")
const navLinks = document.querySelectorAll(".nav-link")
const typingText = document.getElementById("typing-text")
const currentYearEl = document.getElementById("current-year")
const tabBtns = document.querySelectorAll(".tab-btn")
const designCards = document.querySelectorAll(".design-card")
const modal = document.getElementById("design-modal")
const modalTitle = document.querySelector(".modal-title")
const modalImage = document.getElementById("modal-image")
const modalDescription = document.getElementById("modal-description")
const modalTools = document.getElementById("modal-tools")
const modalCounter = document.querySelector(".modal-counter")
const modalClose = document.querySelector(".modal-close")
const modalPrev = document.querySelector(".modal-prev")
const modalNext = document.querySelector(".modal-next")
const viewDesignBtns = document.querySelectorAll(".view-design")

// Current state
let currentDesignIndex = 0
let isTyping = true
let typingIndex = 0
let currentTextIndex = 0
let typingTimeout
const texts = ["Graphic Designer", "UI/UX Designer", "Frontend Developer", "Photographer"]

// Set current year in footer
if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear()
}

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 10) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Mobile menu toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active")
    mobileNav.classList.toggle("active")
  })
}

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const href = link.getAttribute("href")

    // Smooth scroll to section
    if (href.startsWith("#")) {
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenuBtn) {
          mobileMenuBtn.classList.remove("active")
        }
        if (mobileNav) {
          mobileNav.classList.remove("active")
        }

        // Scroll to target
        targetElement.scrollIntoView({ behavior: "smooth" })

        // Update URL without page jump
        history.pushState(null, null, href)
      }
    }
  })
})

// Theme toggle
themeToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("theme", document.documentElement.classList.contains("dark") ? "dark" : "light")
  })
})

// Initialize theme from localStorage
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  document.documentElement.classList.toggle("dark", savedTheme === "dark")
}

// Typing animation
function typeText() {
  if (!typingText) return

  const currentText = texts[currentTextIndex]

  if (isTyping) {
    // Typing
    typingText.textContent = currentText.substring(0, typingIndex + 1)
document.getElementById("typing-placeholder").textContent = currentText

    typingIndex++

    if (typingIndex === currentText.length) {
      isTyping = false
      typingTimeout = setTimeout(typeText, 1500) // Pause at the end
    } else {
      typingTimeout = setTimeout(typeText, 100) // Typing speed
    }
  } else {
    // Deleting
    typingText.textContent = currentText.substring(0, typingIndex)
    typingIndex--

    if (typingIndex < 0) {
      isTyping = true
      currentTextIndex = (currentTextIndex + 1) % texts.length
      typingTimeout = setTimeout(typeText, 500) // Pause before typing next text
    } else {
      typingTimeout = setTimeout(typeText, 50) // Deleting speed
    }
  }
}

// Initialize typing animation immediately
if (typingText) {
  // Set initial text to avoid empty space
  typingText.textContent = ""
  // Start typing animation
  typeText()
}

// Design tabs
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    tabBtns.forEach((b) => b.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    const category = btn.dataset.category

    // Show/hide design cards based on category
    designCards.forEach((card) => {
      if (category === "all" || card.dataset.category === category) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  })
})

// Use the designsData from the HTML file
// If it's not defined, use a fallback
let designsData
if (typeof designsData === "undefined") {
  console.warn("designsData not found, using fallback data")
  designsData = [
    {
      id: 1,
      title: "CodeSprint X Phase Reveal Flyer",
      category: "flyer",
      image: "assets/flyers/CX-005.jpg",
      description:
        "A futuristic-themed flyer for CodeSprint X, visualizing the phases of innovation—Ideate, Prototype, Startup, and Grand Finale—set against a cosmic landscape.",
      tools: ["Photoshop"],
    },
    {
      id: 2,
      title: "CodeSpring X Website Launch Flyer",
      category: "flyer",
      image: "assets/flyers/CX-007.png",
      description:
      "A futuristic launch poster announcing the official release of CodeSprint X website, featuring a space-themed command center and a digital mission briefing.",
      tools: ["Photoshop"],
    },
    {
      id: 3,
      title: "Editor's Note for the Nilwala Chronicle Article",
      category: "article",
      image: "assets/article/Editor's Note.png",
      description:
        "Editor's Note for the Nilwala Chronicle, monthly newsletter of Leo Club of Matara Nilwala",
      tools: ["Photoshop"],
    },
    {
      id: 4,
      title: "Leos of the Month",
      category: "article",
      image: "assets/article/Leos of the Month (Haritha).png",
      description:
        "Leo of the Month's article for the Nilwala Chronicle, monthly newsletter of Leo Club of Matara Nilwala",
      tools: ["Photoshop"],
    },
    {
      id: 5,
      title: "One Click",
      category: "article",
      image: "assets/article/One Click.png",
      description:
        "One Click article for the Nilwala Chronicle, monthly newsletter of Leo Club of Matara Nilwala",
      tools: ["Photoshop"],
    },
    {
      id: 6,
      title: "E-commerce Website Concept",
      category: "ui",
      image: "https://via.placeholder.com/800x600?text=Website+UI",
      description:
        "A modern e-commerce website design concept with a focus on product presentation and streamlined checkout process.",
      tools: ["Figma", "Adobe XD"],
    },
  ]
}

// Design modal
function openModal(designId) {
  const id = Number.parseInt(designId, 10)
  const designIndex = designsData.findIndex((design) => design.id === id)

  if (designIndex !== -1) {
    currentDesignIndex = designIndex
    updateModal()
    modal.classList.add("active")
    document.body.style.overflow = "hidden"
  } else {
    console.error("Design not found with ID:", id)
  }
}

function closeModal() {
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

function updateModal() {
  const design = designsData[currentDesignIndex]

  modalTitle.textContent = design.title
  modalImage.src = design.image
  modalImage.alt = design.title
  modalDescription.textContent = design.description

  // Clear and update tools
  modalTools.innerHTML = ""
  design.tools.forEach((tool) => {
    const span = document.createElement("span")
    span.className = "tag"
    span.textContent = tool
    modalTools.appendChild(span)
  })

  // Update counter
  modalCounter.textContent = `${currentDesignIndex + 1} of ${designsData.length}`
}

function prevDesign() {
  currentDesignIndex = (currentDesignIndex - 1 + designsData.length) % designsData.length
  updateModal()
}

function nextDesign() {
  currentDesignIndex = (currentDesignIndex + 1) % designsData.length
  updateModal()
}

// Modal event listeners
viewDesignBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    openModal(btn.dataset.id)
  })
})

if (modalClose) {
  modalClose.addEventListener("click", closeModal)
}

if (modalPrev) {
  modalPrev.addEventListener("click", prevDesign)
}

if (modalNext) {
  modalNext.addEventListener("click", nextDesign)
}

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.classList.contains("active")) {
    closeModal()
  }
})

// Close modal when clicking outside
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal()
    }
  })
}

// Form submission
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value

    console.log("Form submitted:", { name, email, message })

    // Reset form after a delay
    setTimeout(() => {
      contactForm.reset()
    }, 500)

  })
}