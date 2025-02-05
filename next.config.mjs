import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['staging-it-incubator.s3.eu-central-1.amazonaws.com'], // Разрешаем загрузку изображений с указанного хоста
  },
  reactStrictMode: true,
};

export default withNextIntl(nextConfig)
