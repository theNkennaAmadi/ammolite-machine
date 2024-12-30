export default {
    main: '/path/to/main.js', // The path should be relative to the project root
    build: {
        rollupOptions: {
            input: {
                main: '/main.js', // The path should be relative to the project root
                new: '/main-new.js',
                home: './home.js',
                case: './case.js',
                caseStudies: './case-studies.js',
                contact: './contact.js',
                info: './info.js',
                // Add more files as needed
            }
        }
    }
}
