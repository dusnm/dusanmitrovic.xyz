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

    for (navigationLink of navigationLinks) {
        const navigationLinkPath = navigationLink.getAttribute('href');

        if (navigationLinkPath === '/' && currentPath === '/') {
            navigationLink.classList.add('active');
            return;
        }

        if (
            navigationLinkPath !== '/' &&
            currentPath.includes(navigationLinkPath)
        ) {
            navigationLink.classList.add('active');
            return;
        }
    }
};
