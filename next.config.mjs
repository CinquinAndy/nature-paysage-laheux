import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  trailingSlash: false,
	images: {
		remotePatterns: [
			{ protocol: 'https', hostname: '*.andy-cinquin.fr' },
			{ protocol: 'https', hostname: 'cdnjs.cloudflare.com' },
			{ protocol: 'https', hostname: 'cdnjs.cloudflare.com' },
		],
		qualities: [75, 90, 100], // Add quality configurations
	},
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
