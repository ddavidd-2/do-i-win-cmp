/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    styledComponents: {
      displayName: true,
      ssr: true 
    }
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
}

module.exports = nextConfig
