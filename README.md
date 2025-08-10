# Digital Qur'anic Dictionary

A modern, responsive web application for exploring Arabic root words from the Qur'an, based on the dictionary by Late Lutfur Rahman Khan Sb.

## Features

- **Interactive Root Word Explorer**: Scroll through Arabic letters to build root words
- **Verb Conjugation Display**: Shows past, present, imperative, and masdar forms
- **Comprehensive Dictionary**: Detailed explanations with Qur'anic references
- **Mobile-First Design**: Optimized for all devices with responsive layout
- **Progressive Web App**: Installable on mobile devices (Android/iOS)
- **Offline Support**: Works without internet connection once cached
- **Modern Architecture**: Modular code structure for easy maintenance

## Project Structure

```
arabic-dictionary/
├── index.html              # Main HTML file
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker for offline functionality
├── css/                    # Stylesheets
│   ├── base.css           # Base styles and layout
│   ├── header.css         # Header and navigation styles
│   ├── components.css     # Component-specific styles
│   ├── modals.css         # Modal dialog styles
│   └── responsive.css     # Mobile responsiveness
├── js/                     # JavaScript modules
│   ├── app.js             # Main application controller
│   ├── audio.js           # Audio feedback functionality
│   ├── dictionary.js      # Dictionary data and logic
│   ├── modals.js          # Modal management
│   └── navigation.js      # Navigation menu functionality
├── data/                   # Data files
│   ├── verbs.json         # Verb conjugation database
│   └── dictionary-content.json # Dictionary content
├── images/                 # Images and icons
│   ├── QuranicDictionary.jpg
│   └── icon-*.png         # PWA icons (various sizes)
└── assets/                 # Other assets
    └── HowToUseQuranicDictionary.mp4
```

## Key Improvements

### 1. **Responsive Design**
- Removed fixed gold border for better mobile experience
- Optimized height and layout for all screen sizes
- Improved touch interactions for mobile devices

### 2. **Modern Navigation**
- Replaced info button with hamburger menu
- Slide-out navigation with smooth animations
- Better organization of app features

### 3. **Enhanced UX**
- Custom scrollbar styling in modals
- Improved modal content layout
- Better typography and spacing

### 4. **Progressive Web App**
- Installable on mobile devices
- Offline functionality with service worker
- App-like experience with proper icons and splash screens

### 5. **Modular Architecture**
- Separated CSS into logical modules
- JavaScript organized into functional modules
- External data files for easy content management

## Installation

### For Users
1. Visit the website on your mobile device
2. Look for "Add to Home Screen" prompt
3. Follow the installation instructions
4. Launch the app from your home screen

### For Developers
1. Clone the repository
2. Serve the files using a local web server
3. Open in browser and test functionality

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile**: iOS Safari, Chrome Mobile, Samsung Internet
- **PWA Features**: Supported in Chrome, Edge, Safari (iOS 11.3+)

## Contributing

To add new dictionary content:
1. Edit `data/dictionary-content.json` for detailed word explanations
2. Edit `data/verbs.json` for verb conjugations
3. Follow the existing JSON structure

## Credits

- **Original Dictionary**: Late Lutfur Rahman Khan Sb
- **Publisher**: Al Balagh Foundation, Lahore, Pakistan
- **Digital Version**: Khuddam-ul-Quran NZ © 2021
- **Restructuring**: Modern web development best practices

## License

This digital dictionary is provided free of cost for the purpose of sadaqah-e-jariyah (continuous charity).

## Contact

For feedback and suggestions:
- Email: khudaamulqurannz@gmail.com
- Website: https://khuddam.co.nz/
