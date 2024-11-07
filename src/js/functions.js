// Add event listener to initialize functions once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	initLangSwitch(); // Initialize language switcher functionality
	initYear(); // Initialize year display functionality
	initCloseMenu(); // Initialize menu closing functionality
});

// Function to set the current year in the `.cur-year` span
const initYear = () => {
	const year = new Date().getFullYear(); // Get the current year
	const yearSpan = document.querySelector(".cur-year"); // Select the span element for the year
	if (yearSpan) {
		// Check if the `.cur-year` element exists
		yearSpan.textContent = year; // Set the text content to the current year
	}
};

// Function to initialize language switcher functionality
const initLangSwitch = () => {
	// Select all elements for current language display and dropdown items in both switchers
	const dropdownItems = document.querySelectorAll(".dropdown-item");
	const currentLangs = document.querySelectorAll(".current-lang");

	// Exit if there are no dropdown items or current language spans
	if (dropdownItems.length === 0 || currentLangs.length === 0) return;

	// Function to set the default language to English on both switchers
	const setDefaultLanguage = () => {
		currentLangs.forEach((currentLang) => {
			if (currentLang) {
				currentLang.textContent = "English".slice(0, 2); // Set default language to 'En'
			}
		});

		// Add 'active' class to the English dropdown item and remove from others
		dropdownItems.forEach((item) => {
			if (item.textContent.trim() === "English") {
				item.classList.add("active"); // Mark 'English' item as active
			} else {
				item.classList.remove("active"); // Remove 'active' class from other items
			}
		});
	};

	// Set the default language when the page loads
	setDefaultLanguage();

	// Function to update the language selection on both switchers
	const updateLanguage = (selectedItem) => {
		const selectedText = selectedItem.textContent.slice(0, 2); // Get the language abbreviation (e.g., 'En', 'Fr')

		// Update all current language spans with the selected language
		currentLangs.forEach((currentLang) => {
			if (currentLang) {
				currentLang.textContent = selectedText; // Set the selected language abbreviation
			}
		});

		// Update active class on all dropdown items, add it to the selected item
		dropdownItems.forEach((item) => {
			item.classList.toggle("active", item === selectedItem); // Toggle 'active' class
		});
	};

	// Add click event listeners to each dropdown item for dynamic language selection
	dropdownItems.forEach((item) => {
		item.addEventListener("click", (event) => {
			event.preventDefault(); // Prevent default behavior
			updateLanguage(item); // Sync both switchers on selection
		});
	});
};

// Function to initialize the menu closing behavior on click and resize
const initCloseMenu = () => {
	const navbarCollapse = document.getElementById("navbarSupportedContent"); // Select the collapsible navbar element
	const navbarToggler = document.querySelector(".navbar-toggler"); // Select the button for toggling the navbar
	const navbarNav = document.querySelector(".navbar-nav"); // Select the navbar items container

	// Function to close the navbar
	function closeNavbar() {
		if (navbarCollapse.classList.contains("show")) {
			navbarCollapse.classList.remove("show"); // Remove the 'show' class to close the navbar
		}
	}

	// Function to set the initial state of the navbar-toggler (collapsed by default)
	function setInitialState() {
		navbarToggler.classList.add("collapsed"); // Add 'collapsed' class to the toggler
	}

	// Close the menu when clicking outside of the navbar-collapse
	document.addEventListener("click", function (event) {
		if (
			!navbarToggler.contains(event.target) &&
			!navbarNav.contains(event.target)
		) {
			closeNavbar(); // Close the navbar
			navbarToggler.classList.add("collapsed"); // Collapse the toggler button
		}
	});

	// Close the menu when resizing to a desktop view
	window.addEventListener("resize", function () {
		if (window.innerWidth >= 992 && navbarCollapse.classList.contains("show")) {
			closeNavbar(); // Close the navbar if it's open
			navbarToggler.classList.add("collapsed"); // Collapse the toggler button
		}
		setInitialState(); // Ensure the correct initial state of the toggler on resize
	});

	// Set the initial state when the page is loaded
	setInitialState();
};
