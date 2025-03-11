/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Netlify-Vary',
                value: 'header=Device-Type',
              },
            ],
          },
        ]
      },
};

module.exports = nextConfig;
