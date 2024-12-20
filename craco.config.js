module.exports = {
  style: {
      postcss: {
          plugins: [
              require('tailwindcss'),
              require('autoprefixer'),
          ],
      },
  },
  devServer: {
      port: 3001, // Set the frontend to run on port 8000
  },
};