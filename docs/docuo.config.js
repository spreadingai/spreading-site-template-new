const config = {
  title: "My Site",
  favicon: "image/favicon.ico",
  logo: "image/logo.png",
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
          docsInstanceId: "callkit",
        },
        {
          type: "docSidebar",
          sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
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
              sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
              label: "NavItem1",
              position: "left", // 'left' | 'right'
              docsInstanceId: "callkit",
            },
            {
              type: "docSidebar",
              sidebarIds: ["mySidebar"], // Use the "path" attribute of the "instance" field above
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
          title: "Docs",
          items: [
            {
              label: "foo",
              to: "/docs/foo",
              href: "https://app.spreading.ai",
            },
            {
              label: "bar",
              to: "/docs/bar",
              href: "https://app.spreading.ai",
            },
          ],
        },
      ],
      socials: [
        {
          logo: "image/logo.png",
          //   logo: {
          //     dark: "image/logo.png",
          //     light: "image/logo.png",
          //   },
          href: "https://app.spreading.ai",
        },
      ],
    },
  },
};

export default config;
