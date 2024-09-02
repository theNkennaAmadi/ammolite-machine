export default {
    main: '/path/to/main.js', // The path should be relative to the project root
    build: {
        rollupOptions: {
            input: {
                main: '/main.js', // The path should be relative to the project root
                new: '/main-new.js',
                // Add more files as needed
            }
        }
    }
}