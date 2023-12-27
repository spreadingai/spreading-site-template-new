const config = {
  title: "My Site",
  favicon: "image/favicon.ico",
  // logo: "image/logo.png",
  logo: null,
  //   logo: {
  //     dark: "image/logo.png",
  //     light: "image/logo.png",
  //   },
  baseUrl: "/", // TODO:No need?
  // The following 1.2 is not implemented
  metadata: [],
  // This file does not exist by default
  instances: [
    {
      id: "main",
      label: "docs",
      path: "docs",
      routeBasePath: "docs",
    },
    {
      id: "callkit",
      label: "callkit",
      path: "callkit_docs",
      routeBasePath: "callkit",
    },
  ],
  themeConfig: {
    navbar: {
      title: "My Site",
      logo: "image/logo.png",
      //   logo: {
      //     dark: "image/logo.png",
      //     light: "image/logo.png",
      //   },
      items: [
        {
          type: "default",
          href: "https://www.spreading.ai/blog",
          label: "博客",
          position: "left", // 'left' | 'right'
        },
        {
          type: "docSidebar",
          // sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
          label: "价格",
          href: "https://www.spreading.ai/pricing",
          position: "left", // 'left' | 'right'
          docsInstanceId: "callkit",
        },
        // {
        //   type: "docSidebar",
        //   sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
        //   label: "Tools",
        //   position: "left", // 'left' | 'right'
        //   docsInstanceId: "callkit",
        // },
        {
          type: "dropdown",
          label: "工具",
          items: [
            {
              type: "docSidebar",
              sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
              label: "Code Share",
              href: "https://www.spreading.ai/tools/codeshare",
              position: "left", // 'left' | 'right'
              docsInstanceId: "callkit",
            },
            {
              type: "docSidebar",
              sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
              label: "Code Shot",
              href: "https://app.spreading.ai/tools/codeshot",
              position: "left", // 'left' | 'right'
              docsInstanceId: "callkit",
            },
          ],
          position: "left", // 'left' | 'right'
        },
        // The following 1.1 is not implemented
        {
          type: "docsVersionDropdown",
          position: "left", // 'left' | 'right'
          docsInstanceId: "callkit",
        },
        {
          type: "docsInstanceDropdown",
          position: "left", // 'left' | 'right'
        },
        {
          type: "search",
          position: "left", // 'left' | 'center'| 'right'
        },
      ],
    },
    footer: {
      logo: "image/logo.png",
      //   logo: {
      //     dark: "image/logo.png",
      //     light: "image/logo.png",
      //   },
      copyright: "Copyright @2023 SPREADING. All Rights Reserved",
      caption: "",
      links: [
        {
          title: "Products",
          items: [
            {
              label: "Voice call",
              to: "/link1",
            },
            {
              label: "Video call",
              to: "/link2",
            },
            {
              label: "Live Streaming",
              to: "/link2",
            },
          ],
        },
        {
          title: "Solutions",
          items: [
            {
              label: "Social",
              href: "https://www.spreading.ai/link3",
            },
            {
              label: "Education",
              href: "https://www.spreading.ai/link4",
            },
            {
              label: "Telehealth",
              href: "https://www.spreading.ai/link4",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              href: "https://www.spreading.ai/link3",
            },
            {
              label: "Blog",
              href: "https://www.spreading.ai/link4",
            },
            {
              label: "Partners",
              href: "https://www.spreading.ai/link4",
            },
          ],
        },
        {
          title: "Developers",
          items: [
            {
              label: "Documentation",
              href: "https://www.spreading.ai/link3",
            },
            {
              label: "Demo Apps",
              href: "https://www.spreading.ai/link4",
            },
            {
              label: "Code Store",
              href: "https://www.spreading.ai/link4",
            },
          ],
        },
      ],
      socials: [
        {
          logo: "Linkedin",
          href: "https://www.spreading.ai/social1",
        },
        {
          logo: "Twitter",
          href: "https://www.spreading.ai/social2",
        },
        {
          logo: "Facebook",
          href: "https://www.spreading.ai/social2",
        },
        {
          logo: "Youtube",
          href: "https://www.spreading.ai/social2",
        },
        {
          logo: "Github",
          href: "https://www.spreading.ai/social2",
        },
        {
          logo: "Discord",
          href: "https://www.spreading.ai/social2",
        },
      ],
    },
  },
};

export default config;
