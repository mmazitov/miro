<h1 align="center">Miro</h1>

## 🎯 About

This project consists of a web application built with HTML(PUG), CSS (Sass), and JavaScript. The main goal is to provide a responsive user interface with dynamic features like a language switcher, year display, and collapsible menu.

## ✨ Features

**Responsive Layout:**
The design adapts to different screen sizes, ensuring a smooth experience on both desktop and mobile devices.

**Language Switcher:**
The language switcher allows the user to toggle between different languages. The default language is set to English, and it can be dynamically changed by clicking the language options in the dropdown. 3. Year Display
The current year is displayed in the footer, automatically updating each year. This is done using JavaScript to dynamically set the year in the HTML element with the class .cur-year.

**Year Display:**
The current year is displayed in the footer, automatically updating each year. This is done using JavaScript to dynamically set the year in the HTML element with the class .cur-year.

**Collapsible Navbar:**
The navbar collapses on smaller screen sizes, with a hamburger icon appearing to toggle the visibility of the navigation links.

**Custom Styles with SCSS:**
The styles are written in SCSS for better maintainability and structure.

## 🚀 Project structure

- src/images/: Directory for image files.
- src/js/functions.js: JavaScript functions.
- src/pug/: Directory for Pug templates.
  - components/: Reusable Pug components.
  - layouts/: Layout templates.
  - main/: Main Pug files.
  - pages/: Page templates.
  - partials/: Partial templates.
- src/scss/: Directory for SCSS stylesheets.
  - \_forms.scss: SCSS for forms.
  - \_functions.scss: SCSS functions.
  - \_mixins.scss: SCSS mixins.
  - \_normalize&reset.scss: Normalize and reset styles.
  - \_typography.scss: Typography styles.
  - \_variables.scss: SCSS variables.
  - all.scss: Main SCSS file that imports all other SCSS files.

## 🏁 Starting

```
Make sure you have the following tools installed:

Node.js - v14.21.3 (for running build tools if needed).
Sass (for compiling SCSS into CSS).

# Clone this project
$ git clone https://github.com/mmazitov/miro

# Access
$ cd miro

# Install the dependencies using Yarn or npm:
$ $ yarn install or $ npm install

# Run the project
$ $ yarn start or $ npm start

# The server will initialize in the <http://localhost:3000>

# Build project
$ $ yarn build or $ npm build

# Lint project
$ $ yarn lint or $ npm lint

# Pretty project
$ $ yarn format or $ npm format

```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you encounter any bugs or have feature requests.
