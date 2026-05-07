import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src")],
    additionalData: `@use "${path.join(process.cwd(), "src/styles/abstracts/variables")}" as *;`,
  },
};

export default nextConfig;
