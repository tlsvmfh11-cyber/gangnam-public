import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 기본 75는 어두운 실내 사진에서 블록이 잘 보입니다.
    qualities: [75, 90],
  },
};

export default nextConfig;
