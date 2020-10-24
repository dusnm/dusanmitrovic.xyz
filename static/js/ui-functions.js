/**
 * @licstart  The following is the entire license notice for the
 *  JavaScript code in this page.
 *
 * Copyright (C) 2020 Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version. The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
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