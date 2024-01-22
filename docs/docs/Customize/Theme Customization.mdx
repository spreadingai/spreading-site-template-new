# Theme configuration

## Navbar

Accepted fields:

| Name              | Type           | Default     | Description                                      |
| ----------------- | -------------- | ----------- | ------------------------------------------------ |
| `title`           | `string`       | `undefined` | Title for the navbar.                            |
| `logo`            | _See below_    | `undefined` | Customization of the logo url.                   |
| `iconRedirectUrl` | `string`       | `undefined` | Link to navigate to when the logo is clicked.    |
| `items`           | `NavbarItem[]` | `[]`        | A list of navbar items. See specification below. |

### Navbar logo

The logo can be placed in static folder.

<Tip title="TIP">
docuo 内部默认`static`目录是静态目录，Files under these paths will be copied to the build output as-is，即绝对路径
</Tip>

Example configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "navbar": {
      "title": "Your site title",
      "logo": "image/logo.png"
    }
  }
}
```

</CodeGroup>

### Navbar iconRedirectUrl

Logo URL is set to base URL of your site by default if you don't set it. Although you can specify your own URL for the logo, if it is an external link, it will open in a new tab.

Example configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "navbar": {
      "title": "Your site title",
      "logo": "image/logo.png",
      "iconRedirectUrl": "https://docuo.io"
    }
  }
}
```

</CodeGroup>

### Navbar items

You can add items to the navbar via `themeConfig.navbar.items`.

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "navbar": {
      "items": [
        {
          "type": "docSidebar",
          "label": "Docs",
          "sidebarIds": ["mySidebar"],
          "position": "left"
        },
        {
          "type": "default",
          "label": "Blog",
          "href": "https://spreading.ai/blog",
          "position": "right"
        },
        {
          "type": "dropdown",
          "label": "Dropdown",
          "position": "right",
          "items": [
            {
              "type": "docSidebar",
              "label": "NavItem1",
              "sidebarIds": ["mySidebar"]
            },
            {
              "type": "default",
              "label": "NavItem2",
              "href": "https://spreading.ai/blog"
            }
          ]
        }
      ]
    }
  }
}
```

</CodeGroup>

The items can have different behaviors based on the `type` field. The sections below will introduce you to all the types of navbar items available.

#### Navbar link

By default, Navbar items are regular links (internal or external).

Accepted fields:

| Name       | Type                 | Default      | Description                                                                                                        |
| ---------- | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `type`     | `"default"`          | Optional     | Sets the type of this item to a link.                                                                              |
| `label`    | `string`             | **Required** | The name to be shown for this item.                                                                                |
| `to`       | `string`             | **Required** | Client-side routing, used for navigating within the website.                                                       |
| `href`     | `string`             | **Required** | A full-page navigation, used for navigating outside of the website. **Only one of `to` or `href` should be used.** |
| `position` | `"left"  \| "right"` | `"left"`     | The side of the navbar this item should appear on.                                                                 |

Example configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "navbar": {
      "items": [
        {
          "to": "/introduction",
          // Only one of "to" or "href" should be used
          // "href": "https://spreading.ai/blog",
          "label": "Introduction",
          "position": "left"
        }
      ]
    }
  }
}
```

</CodeGroup>

#### Navbar dropdown

Navbar items of the type `dropdown` has the additional `items` field, an inner array of navbar items.

Navbar dropdown items only accept the following **"link-like" item types**:

- [Navbar link](../customize/theme-customization#navbar-link)
- [Navbar doc sidebar](../customize/theme-customization#navbar-doc-sidebar)

Note that the dropdown base item is a clickable link as well, so this item can receive any of the props of a [plain navbar link](../customize/theme-customization#navbar-link).

Accepted fields:

| Name       | Type                       | Default      | Description                                        |
| ---------- | -------------------------- | ------------ | -------------------------------------------------- |
| `type`     | `"dropdown"`               | Optional     | Sets the type of this item to a dropdown.          |
| `label`    | `string`                   | **Required** | The name to be shown for this item.                |
| `items`    | `LinkLikeItem[]`           | **Required** | The items to be contained in the dropdown.         |
| `position` | `"left"        \| "right"` | `"left"`     | The side of the navbar this item should appear on. |

Example configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "navbar": {
      "items": [
        {
          "type": "dropdown",
          "label": "Dropdown",
          "position": "left",
          "items": [
            {
              "type": "docSidebar",
              "label": "NavItem1",
              "sidebarIds": ["mySidebar"]
            },
            {
              "type": "default",
              "label": "NavItem2",
              "href": "https://spreading.ai/blog"
            }
          ]
        }
      ]
    }
  }
}
```

</CodeGroup>

#### Navbar linked to a sidebar

You can link a navbar item to the first document link (which can be a doc link or a generated category index) of a given sidebar without having to hardcode a doc ID.

Accepted fields:

| Name             | Type                      | Default                             | Description                                                                  |
| ---------------- | ------------------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| `type`           | `"docSidebar"`            | **Required**                        | Sets the type of this navbar item to a sidebar's first document.             |
| `sidebarIds`     | `string[]`                | **Required**                        | The ID list of the sidebar that this item is linked to.目前只支持设置一个 ID |
| `label`          | `string`                  | First document link's sidebar label | The name to be shown for this item.                                          |
| `position`       | `"left"       \| "right"` | `"left"`                            | The side of the navbar this item should appear on.                           |
| `docsInstanceId` | `string`                  | `"default"`                         | The ID of the docs plugin that the sidebar belongs to.                       |

<Tip title="TIP">
Use this navbar item type if your sidebar is updated often and the order is not stable.
</Tip>

Example configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "navbar": {
      "items": [
        {
          "type": "docSidebar",
          "label": "Docs",
          "sidebarIds": ["mySidebar"],
          "position": "left"
        }
      ]
    }
  }
}
```

</CodeGroup>

navbar item 的 sidebarId 对应下面 sidebars 的其中一个 sidebar 选项 key，即 "mySidebar"

<CodeGroup>

```json sidebars
{
  "mySidebar": [
    {
      "type": "autogenerated",
      "dirName": "."
    }
  ]
}
```

</CodeGroup>

## Footer

You can add logo and a copyright to the footer via `themeConfig.footer`. Logo can be placed in static folder. Logo URL works in the same way of the navbar logo.

<Tip title="TIP">
docuo 内部默认`static`目录是静态目录，Files under these paths will be copied to the build output as-is，即绝对路径
</Tip>

Accepted fields:

| Name        | Type           | Default     | Description                                                                                                 |
| ----------- | -------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `logo`      | `Logo`         | `undefined` | Customization of the logo url. See [Navbar logo](../customize/theme-customization#navbar-logo) for details. |
| `copyright` | `string`       | `undefined` | The copyright message to be displayed at the bottom.                                                        |
| `caption`   | `string`       | `undefined` | The caption message to be displayed at the bottom.                                                          |
| `links`     | `FooterLink[]` | `[]`        | The link groups to be present.                                                                              |
| `socials`   | `SocialItem[]` | `[]`        | The social link groups to be present.                                                                       |

Example configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "footer": {
      "logo": "image/logo.png",
      "copyright": "xxx",
      "caption": "xxx"
    }
  }
}
```

</CodeGroup>

### Footer Links

You can add links to the footer via `themeConfig.footer.links`. There are two types of footer configurations: **multi-column footers** and **simple footers**.

Multi-column footer links have a `title` and a list of `FooterItem`s for each column.

| Name    | Type           | Default     | Description                          |
| ------- | -------------- | ----------- | ------------------------------------ |
| `title` | `string`       | `undefined` | Label of the section of these links. |
| `items` | `FooterItem[]` | `[]`        | Links in this section.               |

Accepted fields of each `FooterItem`:

| Name    | Type     | Default      | Description                                                                                                        |
| ------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `label` | `string` | **Required** | Text to be displayed for this link.                                                                                |
| `to`    | `string` | **Required** | Client-side routing, used for navigating within the website.                                                       |
| `href`  | `string` | **Required** | A full-page navigation, used for navigating outside of the website. **Only one of `to` or `href` should be used.** |

Example multi-column configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "footer": {
      "links": [
        {
          "title": "Product",
          "items": [
            {
              "label": "documentation",
              "to": "/"
            }
          ]
        }
      ]
    }
  }
}
```

</CodeGroup>

A simple footer just has a list of `FooterItem`s displayed in a row.

Example simple configuration:

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "footer": {
      "links": [
        {
          "label": "documentation",
          "to": "/"
        }
      ]
    }
  }
}
```

</CodeGroup>

### Footer Socials

You can add socials to the footer via `themeConfig.footer.socials`.

Accepted fields of each `SocialItem`:

| Name   | Type                           | Default      | Description                                                                                                                                     |
| ------ | ------------------------------ | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `logo` | `Logo    \| DefaultSocialName` | **Required** | Customization of the logo url. See [Navbar logo](../customize/theme-customization#navbar-logo) for details.<br />或者内部自带的社交媒体图标名称 |
| `href` | `string`                       | **Required** | A full-page navigation, used for navigating outside of the website.                                                                             |

`DefaultSocialName`的默认值有：“LinkedIn”、“Twitter”、“Facebook”、“Facebook”、“GitHub”、“Discord”

<CodeGroup>

```json docuo.config
{
  "themeConfig": {
    "footer": {
      "socials": [
        {
          "logo": "image/twitter.svg",
          "href": "https://twitter.com/docuo_team"
        },
        {
          "logo": "LinkedIn",
          "href": "https://www.linkedin.com/company/spreadingai"
        },
        {
          "logo": "Discord",
          "href": "https://discord.gg/W8p93wcR"
        },
        {
          "logo": "Github",
          "href": "https://github.com/spreadingai"
        }
      ]
    }
  }
}
```

</CodeGroup>
