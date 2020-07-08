module.exports = {
    title: 'Home',
    css: [
        '/static/fontawesome-free/css/brands.min.css',
        '/static/fontawesome-free/css/solid.min.css',
        '/static/fontawesome-free/css/fontawesome.min.css'
    ],
    js: ['/static/js/ui-functions.js'],
    cards: [
        {
            title: 'Dušan Mitrović',
            image: {
                url: '/static/images/me_alternate.jpg',
                alt: 'A picture of me.',
                rounded: true
            },
            content: `I'm a network engineering student and a professional software developer and a gigantic GNU/Linux enthusiast.
                My interests are broad, anything from technology to human behavior and psychology.
                I believe in the promise of the human spirit, kindness, hard work, love and compassion.`,
            links: [
                {
                    url: 'https://github.com/dusnm',
                    icon: 'fab fa-github',
                    text: 'Github'
                },
                {
                    url:
                        'https://www.linkedin.com/in/du%C5%A1an-mitrovi%C4%87-763b62171/',
                    icon: 'fab fa-linkedin',
                    text: 'LinkedIn'
                },
                {
                    url: 'https://mastodon.technology/@duxontraitor',
                    icon: 'fab fa-mastodon',
                    text: 'Mastodon'
                },
                {
                    url: 'mailto:dusan@dusanmitrovic.xyz',
                    icon: 'fas fa-envelope',
                    text: 'Email'
                }
            ]
        },
        {
            title: 'My GNU/Linux setup',
            content: `Like I mentioned, I'm an avid fan of GNU/Linux.
                      I use it for software development and as my main daily operating system.
                      I'm a vocal Free Software advocate.
                      I believe that software should be free to obtain and modify as one sees fit.
                      You can get my configuration by checking out this link:`,
            image: {
                alt: 'My GNU/Linux setup',
                url: '/static/images/linux.png',
                rounded: false
            },
            links: [
                {
                    url: 'https://github.com/dusnm/dotfiles',
                    icon: 'fab fa-github',
                    text: 'Get dotfiles'
                }
            ]
        },
        {
            title: 'Other links',
            content:
                'If you wish to take a look at my CV or download the source code for this website, take a look at one of these links:',
            links: [
                {
                    url: '/static/dusancv.pdf',
                    icon: 'fas fa-file-pdf',
                    text: 'Get CV'
                },
                {
                    url: 'https://github.com/dusnm/dusanmitrovic.xyz',
                    icon: 'fab fa-github',
                    text: 'Get source'
                }
            ]
        }
    ]
};