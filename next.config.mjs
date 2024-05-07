/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true
        }
    },

    env: {
        tokenBearer: "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDQxMjRkMjgxNTliOTNjMTg1OWYzMDEzMzdlNjVhMyIsInN1YiI6IjY0NTkyNzE0YWUzODQzMDE3MmRkYjdiZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnbQvCvQnvV7n3cuKTbZoHwrvq2FBWWpn322wuoZpDs"
    },

    
};

export default nextConfig;
