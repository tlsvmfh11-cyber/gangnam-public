import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    // 기본 75는 어두운 실내 사진에서 블록이 잘 보입니다.
    qualities: [75, 90],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "gnpublics.com" }],
        destination: "https://www.gnpublics.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
