/**
 * @author Dusan Mitrovic <dusan@dusanmitrovic.xyz>
 * @license GPL-3.0-only https://opensource.org/licenses/GPL-3.0
 *
 * @summary Fetch recent repositories from Github
 */
const GITHUB_API = 'https://api.github.com';
const GITHUB_USERNAME = 'dusnm';
const NUMBER_OF_REPOSITORIES = 4;

/**
 * Fetch the data from Github API and insert it into the DOM tree
 */
const fetchRecentGithubRepositories = () => {
    const githubProjects = document.querySelector('#github-projects');

    // Create a div to store the CSS loader
    const loader = document.createElement('div');
    loader.classList.add('loader');

    // Create a CSS loader div
    const div = document.createElement('div');
    div.classList.add('dot-falling');

    loader.appendChild(div);
    githubProjects.appendChild(loader);

    fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?sort=created_at`, {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => {
            const data = response
                .splice(0, NUMBER_OF_REPOSITORIES)
                .map(item => ({
                    name: item.name,
                    description: item.description,
                    url: item.svn_url
                }));

            githubProjects.removeChild(loader);

            data.forEach(item => {
                githubProjects.innerHTML += `
                    <div class="sidebar-item">
                        <a href="${item.url}" target="_blank">
                            <h3>${item.name}</h3>
                        </a>
                        <p>${item.description}</p>
                    </div>
                `;
            });
        })
        .catch(error => console.error(error));
};
