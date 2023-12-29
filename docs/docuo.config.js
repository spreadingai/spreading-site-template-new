const config = {
  title: "My Site",
  favicon: "image/favicon.ico",
  // logo: "image/logo.png",
  logo: null,
  //   logo: {
  //     dark: "image/logo.png",
  //     light: "image/logo.png",
  //   },
  // The following 1.2 is not implemented
  metadata: [],
  // This file does not exist by default
  instances: [
    {
      id: "default",
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
          to: "/blog",
          href: "https://app.spreading.ai",
          label: "Blog",
          position: "left", // 'left' | 'right'
        },
        {
          type: "docSidebar",
          sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
          label: "NavItem1",
          position: "left", // 'left' | 'right'
          docsInstanceId: "default",
        },
        {
          type: "docSidebar",
          sidebarIds: ["sidebar1"], // Use the "path" attribute of the "instance" field above
          label: "NavItem2",
          position: "left", // 'left' | 'right'
          docsInstanceId: "callkit",
        },
        {
          type: "dropdown",
          label: "Dropdown1",
          items: [
            {
              type: "docSidebar",
              sidebarIds: ["sidebar1"], // Use the "path" attribute of the "instance" field above
              label: "NavItem1",
              position: "left", // 'left' | 'right'
              docsInstanceId: "callkit",
            },
            {
              type: "docSidebar",
              sidebarIds: ["sidebar2"], // Use the "path" attribute of the "instance" field above
              label: "NavItem2",
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
              href: "https://example.com/link3",
            },
            {
              label: "Education",
              href: "https://example.com/link4",
            },
            {
              label: "Telehealth",
              href: "https://example.com/link4",
            },
          ],
        },
        {
          title: "Company",
          items: [
            {
              label: "About",
              href: "https://example.com/link3",
            },
            {
              label: "Blog",
              href: "https://example.com/link4",
            },
            {
              label: "Partners",
              href: "https://example.com/link4",
            },
          ],
        },
        {
          title: "Developers",
          items: [
            {
              label: "Documentation",
              href: "https://example.com/link3",
            },
            {
              label: "Demo Apps",
              href: "https://example.com/link4",
            },
            {
              label: "Code Store",
              href: "https://example.com/link4",
            },
          ],
        },
      ],
      socials: [
        {
          logo: "Linkedin",
          href: "https://example.com/social1",
        },
        {
          logo: "Twitter",
          href: "https://example.com/social2",
        },
        {
          logo: "Facebook",
          href: "https://example.com/social2",
        },
        {
          logo: "Youtube",
          href: "https://example.com/social2",
        },
        {
          logo: "Github",
          href: "https://example.com/social2",
        },
        {
          logo: "Discord",
          href: "https://example.com/social2",
        },
      ],
    },
  },
};

export default config;
