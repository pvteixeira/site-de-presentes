import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '192.168.1.8',
    '192.168.1.*',
    '192.168.0.*',
    '192.168.*.*',
    '10.*.*.*',
    '172.*.*.*',
    'localhost:3000'
  ],
};

export default nextConfig;
