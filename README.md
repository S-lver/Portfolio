
---

# Sifiso Mokgata — Python Developer Portfolio

> A modern, interactive portfolio website showcasing Python development skills, API integration expertise, and project work.

![Portfolio Screenshot](https://via.placeholder.com/1200x630/0B0F14/FFFFFF?text=Sifiso+Mokgata+Portfolio)

## 🚀 Live Demo

[View Live Site](https://your-username.github.io/portfolio) *(Update this with your GitHub Pages URL)*

## 📋 Overview

This is my personal developer portfolio built to showcase my work as a Python developer specializing in web applications and API integration. The site features a clean, dark/light theme with interactive elements including:

- Dynamic network particle animation in the hero section
- Terminal-style code display with typing effect
- Interactive project cards with 3D tilt
- Rotating skill tags
- Contact form with email integration
- Smooth scroll reveals
- Theme toggle with circular transition effect

## 🛠️ Technologies Used

### Frontend
- **HTML5** — Semantic markup
- **CSS3** — Custom properties, fluid typography, animations
- **JavaScript (Vanilla)** — Interactive features, animations, form handling
- **Canvas API** — Network particle animation

### Fonts
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) — Headings
- [Inter](https://fonts.google.com/specimen/Inter) — Body text
- [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — Code snippets

### Features
- Dark/Light theme with system preference detection
- Responsive design (mobile-first)
- Reduced motion support for accessibility
- View Transitions API for smooth theme switching

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── style.css           # All styles and theming
├── script.js           # Interactive functionality
└── README.md           # This file
```

## ✨ Features

### 1. Dynamic Hero Section
- Animated network canvas background
- Rotating text cycle showing skills
- Scroll-to-content indicator

### 2. About Section
- Terminal-style code display with typing animation
- Clean, readable layout

### 3. Skills Display
- Organized into categories: Core, Integration, Tooling
- Interactive pill tags with hover effects

### 4. Project Showcase
- 3D tilt effect on hover
- Glow effect following cursor
- Direct links to live projects
- Technology tags for each project

### 5. Contact Form
- Client-side validation with real-time feedback
- Opens email client with pre-filled message
- Loading and success states
- Social media links

### 6. Theme System
- Dark/Light mode toggle
- Circular reveal transition
- Persistent preference storage
- System preference detection

## 🚦 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- (Optional) A code editor for customization

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/S-lver/portfolio.git
   cd portfolio
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server (recommended)
   python -m http.server 8000
   # Visit http://localhost:8000
   ```

3. **Customize**
   - Update content in `index.html`
   - Modify colors in `style.css` CSS variables
   - Adjust animations in `script.js`

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `style.css`:

```css
:root {
  --bg: #FAF8F4;        /* Light background */
  --text: #1B1F24;      /* Text color */
  --accent: #E8890C;    /* Primary accent */
  --accent-2: #1B8FA6;  /* Secondary accent */
}
```

### Updating Projects
Modify the project cards in `index.html`:

```html
<div class="project-card">
  <h3>Your Project Name</h3>
  <p>Project description</p>
  <a href="https://your-project-link.com">View Project</a>
  <div class="tag-row">
    <span class="tag">Python</span>
    <span class="tag">Flask</span>
  </div>
</div>
```

### Changing the Terminal Code
Edit the `termHTML` variable in `script.js`:

```javascript
var termHTML =
  'def your_function():\n' +
  '    return "Your code here"';
```

### Rotating Words
Modify the `words` array in `script.js`:

```javascript
var words = ['REST APIs', 'Django & Flask apps', 'Third-party integrations'];
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktops (1024px+)
- 📺 Large screens (1440px+)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Focus indicators for keyboard navigation
- Reduced motion support
- Color contrast compliance
- Screen reader friendly

## 🔧 Performance

- Optimized animations using `requestAnimationFrame`
- Lazy-loaded content with Intersection Observer
- Minimal external dependencies
- Efficient CSS with custom properties
- Lightweight JavaScript

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📬 Contact

- **Email**: [sifiso.dev@gmail.com](mailto:sifiso.dev@gmail.com)
- **GitHub**: [github.com/S-lver](https://github.com/S-lver)
- **LinkedIn**: [linkedin.com/in/sifiso-mokgata](https://www.linkedin.com/in/sifiso-mokgata-5b42532bb/)

## 🙏 Acknowledgments

- Fonts by [Google Fonts](https://fonts.google.com/)
- Icons designed by [Heroicons](https://heroicons.com/)
- Inspiration from modern developer portfolios

---

**Built with ❤️ by Sifiso Mokgata**

---

## 🚀 Deployment to GitHub Pages

1. Push your code to GitHub:
   ```powershell
   git add .
   git commit -m "Add portfolio website"
   git push origin main
   ```

2. Go to your repository on GitHub

3. Click **Settings** → **Pages**

4. Under "Branch", select `main` and `/ (root)`

5. Click **Save**

6. my  site will be live at: `https://S-lver.github.io/portfolio/`

---

