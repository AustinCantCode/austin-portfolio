import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old routes from the previous version of the site.
  async redirects() {
    return [
      { source: "/homepage", destination: "/", permanent: true },
      { source: "/coding", destination: "/work?filter=dev", permanent: true },
      {
        source: "/designing",
        destination: "/work?filter=design",
        permanent: true,
      },
      {
        source: "/achievements",
        destination: "/about/certificates",
        permanent: true,
      },
      {
        source: "/participation",
        destination: "/about/events",
        permanent: true,
      },
    ];
  },
};

export default withNextVideo(nextConfig);
