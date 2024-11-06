document.addEventListener('DOMContentLoaded', () => {
	initLangSwitch();
	initYear();
});

// Function to set the current year in the `.cur-year` span
const initYear = () => {
	const year = new Date().getFullYear();
	const yearSpan = document.querySelector('.cur-year');
	if (yearSpan) { // Check if the `.cur-year` element exists
		yearSpan.textContent = year;
	}
};

// Function to initialize language switcher functionality
const initLangSwitch = () => {
	// Select all elements for current language display and dropdown items in both switchers
	const dropdownItems = document.querySelectorAll('.dropdown-item');
	const currentLangs = document.querySelectorAll('.current-lang');

	// Exit if there are no dropdown items or current language spans
	if (dropdownItems.length === 0 || currentLangs.length === 0) return;

	// Function to set the default language to English on both switchers
	const setDefaultLanguage = () => {
		currentLangs.forEach(currentLang => {
			if (currentLang) {
				currentLang.textContent = 'English'.slice(0, 2); // Set default language to 'En'
			}
		});

		// Add 'active' class to the English dropdown item and remove from others
		dropdownItems.forEach(item => {
			if (item.textContent.trim() === 'English') {
				item.classList.add('active');
			} else {
				item.classList.remove('active');
			}
		});
	};

	// Set the default language when the page loads
	setDefaultLanguage();

	// Function to update the language selection on both switchers
	const updateLanguage = (selectedItem) => {
		const selectedText = selectedItem.textContent.slice(0, 2);

		// Update all current language spans with the selected language
		currentLangs.forEach(currentLang => {
			if (currentLang) {
				currentLang.textContent = selectedText;
			}
		});

		// Update active class on all dropdown items, add it to the selected item
		dropdownItems.forEach(item => {
			item.classList.toggle('active', item === selectedItem);
		});
	};

	// Add click event listeners to each dropdown item for dynamic language selection
	dropdownItems.forEach(item => {
		item.addEventListener('click', event => {
			event.preventDefault();
			updateLanguage(item); // Sync both switchers on selection
		});
	});
};
