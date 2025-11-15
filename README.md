# Portfolio Website

A modern, animated portfolio website showcasing projects, skills, and experience.

## Features

- ✨ **Modern Design**: Beautiful gradient backgrounds and smooth animations
- 🎨 **Project Images**: Each project has a dedicated image area with hover effects
- 🚀 **Smooth Animations**: Fluid transitions and staggered animations throughout
- 📱 **Fully Responsive**: Works perfectly on all devices
- 🎯 **Interactive Elements**: Hover effects, parallax scrolling, and animated overlays

## Adding Project Images

To add actual project images:

1. Create an `images` folder in the project root
2. Add your project images (recommended size: 800x600px or similar aspect ratio)
3. Replace the gradient divs in `index.html` with `<img>` tags:

```html
<!-- Before -->
<div class="project-image" style="background: linear-gradient(...);">
    <i class="fas fa-microphone-alt"></i>
</div>

<!-- After -->
<img src="images/aivocal-assistant.jpg" alt="AI Vocal Health Assistant" class="project-image">
```

4. Update the CSS if needed - the `.project-image` class will work with both divs and images.

## Project Structure

```
.
├── index.html      # Main HTML file
├── styles.css      # All styling and animations
├── script.js       # Interactive functionality
└── images/         # Project images (create this folder)
```

## Customization

- **Colors**: Edit CSS variables in `:root` section of `styles.css`
- **Animations**: Adjust timing and easing functions in CSS
- **Content**: Update project information in `index.html`

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge).

