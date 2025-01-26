import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pwa: {
    dest: 'public', // Pasta onde o service worker será gerado
    register: true, // Registra o service worker
    skipWaiting: true, // Faz o service worker assumir o controle imediato
  },
}

export default nextConfig
