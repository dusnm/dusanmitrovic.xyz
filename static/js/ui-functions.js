/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary A collection of functions that modify the UI
 */

/**
 * Animates the navbar on mobile view
 *
 * @returns {void}
 */
const navbarSlider = () => {
    const burger = document.querySelector('.navbar-nav-area');
    const navigation = document.querySelector('.navbar');

    burger.addEventListener('click', () => {
        navigation.classList.toggle('navbar-active');
    });
};

/**
 * Appends an active css class to a currently active navigation link
 *
 * @returns {void}
 */
const determineActiveNavigation = () => {
    const currentPath = window.location.pathname;

    const navigationLinks = document.querySelectorAll('.navbar-link');
    navigationLinks.forEach(navigationLink => {
        const navigationLinkPath = navigationLink.getAttribute('href');

        if (currentPath === navigationLinkPath) {
            navigationLink.classList.add('active');
        }
    });
};
