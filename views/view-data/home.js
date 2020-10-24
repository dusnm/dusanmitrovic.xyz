module.exports = {
    title: 'Home',
    css: [
        '/static/fontawesome-free/css/brands.min.css',
        '/static/fontawesome-free/css/solid.min.css',
        '/static/fontawesome-free/css/fontawesome.min.css',
        '/static/css/homepage.css'
    ],
    openGraph: {
        title: 'Home',
        type: 'website',
        url: process.env.HOST,
        description: `I'm a network engineering student and a professional software developer and a gigantic GNU/Linux enthusiast.`
    },
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
                Despite working as a web developer professionally I still consider programming mostly a hobby.
                As such I built this website to have a platform that is truly my own, but most of all for fun.`,
            links: [
                {
                    url: 'https://github.com/dusnm',
                    icon: 'fab fa-github',
                    text: 'Github'
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
                },
                {
                    url: '/rss',
                    icon: 'fas fa-rss',
                    text: 'RSS'
                }
                ,
                {
                    url: '/static/dusancv.pdf',
                    icon: 'fas fa-file-pdf',
                    text: 'Résumé'
                }
            ]
        },
    ]
};
