# Universal Theme for Hugo

[![Code Climate](https://codeclimate.com/github/devcows/hugo-universal-theme/badges/gpa.svg)](https://codeclimate.com/github/devcows/hugo-universal-theme)

Universal is a clean and stylish website template built with [Bootstrap](https://getbootstrap.com/docs/3.4/getting-started/). It stands out with its clean design and elegant typography.

Demo site: [https://devcows.github.io/hugo-universal-theme](https://devcows.github.io/hugo-universal-theme/)

Sponsor this project:

- [https://paypal.me/ryanfox1985](https://paypal.me/ryanfox1985)
- [https://www.patreon.com/ryanfox1985](https://www.patreon.com/ryanfox1985)
- BTC wallet
  
  ```
  1My6zRZA4YKdX78aiZKZhWUWfFmCSDafZ6
  ```

## Table of Contents

## 目录

- [Hugo 通用主题](#universal-theme-for-hugo)

- [目录](#table-of-contents)

- [功能](#features)

- [安装](#installation)

- [配置](#configuration)

- [语言](#language)

- [样式](#style)

- [评论](#comments)

- [Google Analytics](#google-analytics)

- [Logo](#logo)

- [联系表单](#contact-form)

- [菜单](#menu)

- [侧边栏小部件](#sidebar-widgets)

- [顶部栏](#top-bar)

- [博客文章缩略图](#blog-post-thumbnails)

- [着陆页](#landing-page)

- [轮播](#carousel)

- [功能](#features-1)

- [用户评价](#testimonials)

- [查看更多](#see-more)

- [客户](#clients)

- [最新帖子](#recent-posts)

- [页脚](#footer)

- [关于我们](#about-us)

- [最新帖子](#recent-posts-1)

- [联系方式](#contact)

- [元标签](#meta-tags)

- [使用方法](#usage)

- [贡献](#contributing)

- [许可协议](#license)

- [致谢](#thanks)
  
  ## Features
* Responsive design 

* Customizable landing page
  
  * Carousel
  * Testimonials
  * Features
  * Customers
  * Recent posts

* Contact form by Formspree

* Google search

* Disqus comments

* Google Analytics

## Installation

Go to the directory where you have your Hugo site and run:

```
$ mkdir themes
$ cd themes
$ git clone https://github.com/devcows/hugo-universal-theme
```

For more information read the official [setup guide](https://gohugo.io/installation/) of Hugo.

## Configuration

After installing the Universal theme successfully, we recommend you to take a look at the [exampleSite](//github.com/devcows/hugo-universal-theme/tree/master/exampleSite) directory. You will find a working Hugo site configured with the Universal theme that you can use as a starting point for your site.

First, let's take a look at the [config.toml](//github.com/devcows/hugo-universal-theme/tree/master/exampleSite/config.toml). It will be useful to learn how to customize your site. Feel free to play around with the settings.
首先，让我们查看 [config.toml](//github.com/devcows/hugo-universal-theme/tree/master/exampleSite/config.toml)。学习如何自定义站点将非常有用。您可以随意尝试这些设置。

### Language

Available translations are in the `/i18n` directory. You can configure the language modifying the following key.

```toml
defaultContentLanguage = "en"
```

### Style

You can change the color of the theme by modifying the following key.

```toml
style = "default"
```

Available options are: `default` (light-blue), `blue`, `green`, `marsala`, `pink`, `red`, `turquoise`, `violet`.
There is the possibility to override the CSS and set your custom styles, override this file `static/css/custom.css` in your site.
可用选项包括：`default`（浅蓝色）、`blue`、`green`、`marsala`、`pink`、`red`、`turquoise`、`violet`。
您可以覆盖 CSS 并设置自定义样式，请在您的网站中覆盖此文件 `static/css/custom.css`。

### Comments 评论

The optional comments system is powered by [Disqus](https://disqus.com). If you want to enable comments, create an account in Disqus and write down your shortname.
可选的评论系统由 [Disqus](https://disqus.com) 提供支持。如果您想启用评论功能，请在 Disqus 中创建一个帐户并写下您的短名称。

```toml
[services]
[services.disqus]
Shortname = "devcows"
```

You can disable the comments system by leaving the `Shortname` empty. 您可以将 `Shortname` 留空以禁用评论系统。

### Google Analytics

You can optionally enable Google Analytics. Type your tracking code in the ``.您可以选择启用 Google Analytics。在 `` 中输入您的跟踪代码。

```toml
[services]
[services.googleAnalytics]
id = "UA-XXXXX-X"
```

Leave the `id` key empty to disable it.将 `id` 键留空即可禁用它。

### Logo

A logo can be selected, two parameters `logo` and `logo_small` can be defined. By default `logo` is used for medium and big screens and the `logo_small` value will be used when the site is rendered on small screens. Also there is the possibility to disable the logo and render a alternative text.
您可以选择徽标，并定义两个参数 `logo` 和 `logo_small`。默认情况下，`logo` 用于中大屏幕，而 `logo_small` 值用于网站在小屏幕上渲染。此外，您还可以禁用徽标并渲染替代文本。

```toml
[params]
    disabled_logo = false
    logo_text = "Universal"

    logo = "img/logo.png"
    logo_small = "img/logo-small.png"
```

### Contact form  联系表单

You can optionally create a contact page and include a contact form.

A contact page is just like a regular Hugo page. But it must include the field `id` with the value `contact`.

```toml
+++
title = "Contact"
id = "contact"
+++
```

Since Hugo sites are static, the contact form uses [Formspree](https://formspree.io/) as a proxy. The form makes a POST request to their servers to send the actual email. Formspree and the submissions for the free plan are limited, [checkout the plans for details](https://formspree.io/plans).
由于 Hugo 网站是静态的，因此联系表单使用 [Formspree](https://formspree.io/) 作为代理。表单会向其服务器发送 POST 请求以发送实际的电子邮件。Formspree 和免费版的提交次数有限，[查看套餐详情](https://formspree.io/plans)。

To enable the form in the contact page, just type your Formspree email in the `config.toml` file, and specify whether to use ajax(paid) to send request or plain HTTP POST(free). Also there is the possibility to enable a captcha using recaptcha.
要在联系页面中启用表单，只需在 `config.toml` 文件中输入您的 Formspree 邮箱地址，并指定是使用 Ajax（付费）发送请求还是使用普通的 HTTP POST（免费）发送请求。此外，您还可以使用 recaptcha 启用验证码。

```toml
[params]
    email = "your@email.com"
    contact_form_ajax = false

    enableRecaptchaInContactForm = true
    googleRecaptchaKey = "site_key_for_google_recaptcha"
```

### Menu  菜单

You can also define the menu items that will appear in the top bar. Edit the `[[params.menu]]` entries to create your menu.

```toml
[[params.menu]]
    name = "Contact"
    url  = "/contact"
    weight = 4
```

The `weight` parameter will determine the order of the menu entries. A top level menu item can contain a dropdown with an optional image, sections and multiple columns of menu items.
`weight` 参数将决定菜单项的顺序。顶级菜单项可以包含一个下拉菜单，其中包含可选图片、部分和多列菜单项。

To create a single list of menu items in the dropdown, first give your top level menu item unique identifier:
要在下拉菜单中创建单个菜单项列表，首先需要为顶级菜单项指定唯一标识符：

```toml
[[menu.main]]
    name       = "Home"
    identifier = "menu.home"
    url        = "/"
    weight     = 1
```

Now create additional menu items and use the above unique identifier as the value for the parent attribute:

```
[[menu.main]]
    name       = "Option 1: Default Page"
    url        = "/"
    weight     = 1
    parent     = "menu.home"

[[menu.main]]
    name       = "Option 2: Application"
    url        = "/"
    weight     = 2
    parent     = "menu.home"
```

It is also possible to display a dropdown menu with 4 columns. This theme supports 2 variations:

* 4 columns of menu items with sections
* 2 column wide image + 2 columns of menu items with sections
  To display 4 columns of menu items, start using sections. Sections are menu items treated special by this theme:
  也可以显示 4 列的下拉菜单。此主题支持两种变体：
* 4 列菜单项，包含多个分区
* 2 列宽图片 + 2 列菜单项，包含多个分区
  要显示 4 列菜单项，请使用分区。版块是此主题特殊处理的菜单项：

```
[[menu.main]]
    name       = "All Pages"
    identifier = "menu.allpages"
    url        = ""
    weight     = 4

[[menu.main]]
    name       = "Home"
    identifier = "section.ap-home"
    url        = ""
    weight     = 1
    parent     = "menu.allpages"
    post       = 1

[[menu.main]]
    name       = "Portfolio"
    identifier = "section.ap-portfolio"
    url        = ""
    weight     = 1
    parent     = "menu.allpages"
    post       = 2

[[menu.main]]
    name       = "Shop"
    identifier = "section.ap-shop"
    url        = ""
    weight     = 1
    parent     = "menu.allpages"
    post       = 3

[[menu.main]]
    name       = "Blog"
    identifier = "section.ap-blog"
    url        = ""
    weight     = 3
    parent     = "menu.allpages"
    post       = 4

[[menu.main]]
    name       = "Blog Listing Big"
    url        = "/blog/"
    weight     = 1
    parent     = "section.ap-blog"
```

The above example shows a reduced version of the *All Pages* menu item from the example site. As you can see,
we first create menu items with an identifier starting with `section.`. If you create entries like this, these
will appear as section headers in your drop down. 

Each of these entries contain values for both the `weight` and `post` attribute. The `post` attribute is hijacked
to indicate in which column a section will be put in. Within a column, the `weight` value is respected to show the
sections top to bottom.

Use to the unique section identifier (e.g. `section.ap-blog`) as the `parent` value to add a menu item to a specific
section. Using `weight` and `post` on the sections allow you to balance the columns with approximately the same
amount of entries.

To display a 2 column wide image and 2 columns of menu items, the process is similar as above. However, we hijack
the `url` field of the top level menu item to link the image from our static assets:

```
[[menu.main]]
    name       = "Portfolio"
    identifier = "menu.portfolio"
    url        = "/img/template-homepage.png"
    weight     = 3
```

When a `url` is filled in, only column 1 and 2 (the `post` value in the section menu items) will be displayed.
When using an image, don't configure section menu items in column 3 or 4. **These will not be rendered.**

**Important:** Do not change the `identifier` key of existing menu entries!

### Sidebar widgets 侧边栏

You can enable/disable the sidebar widgets that will be shown in the blog section. The following widgets are currently available:

* Search bar (powered by Google)
* Categories list
* Tags list

You can enable/disable them under `params.widgets`.

```toml
[params.widgets]
    search = true
    categories = true
    tags = true
```

### Top bar

The top bar is typically used to provide contact information and social links. It is disabled by default, and it can be enabled inside the `params.topbar` settings.
顶部栏通常用于提供联系信息和社交链接。默认情况下，它处于禁用状态，您可以在 `params.topbar` 设置中启用它。

```toml
[params.topbar]
    enable = true
    text = "<p>Contact us on +420 777 555 333 or hello@universal.com.</p>"
```

The `text` shows up on the left side and accepts HTML. `text` 显示在左侧，并接受 HTML 格式。

The social links on the right side are configured as a top-level menu. 右侧的社交链接配置为顶级菜单。

```toml
[[menu.topbar]]
    weight = 1
    name = "GitHub"
    url = "https://github.com/devcows/hugo-universal-theme"
    pre = "<i class='fas fa-2x fa-github'></i>"

[[menu.topbar]]
    weight = 2
    name = "Facebook"
    url = "http://facebook.com"
    pre = "<i class='fas fa-2x fa-facebook'></i>"
```

### Menu behavior 菜单行为

The dropdown menu is displayed by default when the user clicks on the menu item. However, you can also use the `dropdown_mouse_over` setting to change this behavior and use the mouse over instead.
当用户点击菜单项时，下拉菜单默认显示。但是，您也可以使用 `dropdown_mouse_over` 设置来更改此行为，改为使用鼠标悬停。

```toml
[params]
    dropdown_mouse_over = true
```

### Blog post thumbnails 博客缩略图

After creating a new post you can define a banner by entering the relative path to the image.
创建新文章后，您可以通过输入图片的相对路径来定义横幅。

```toml
banner = "img/banners/banner-4.jpg"
```

It must contain a relative path to the banner inside the `static` directory.

### Landing page  落地页

The landing page consists in many sections that can be activated and configured individually. Let's go through all sections from top to bottom.

#### Carousel  轮播

The carousel content is configured in the data directory.轮播内容在数据目录中配置。

```
data
└── carousel
    ├── customizable.yaml
    ├── design.yaml
    ├── features.yaml
    └── multipurpose.yaml
```

Each carousel entry is represented as a YAML file inside `data/carousel`. Let's see the `customizable.yaml` as an example of a carousel entry.
每个轮播条目都表示为 `data/carousel` 目录中的一个 YAML 文件。我们以 `customizable.yaml` 为例，看看轮播条目。

```yaml
weight: 4
title: "Easy to customize"
description: >
  <ul class="list-style-none">
    <li>7 preprepared colour variations.</li>
    <li>Easily to change fonts</li>
  </ul>
image: "img/carousel/template-easy-code.png"
href: "https://devcows.github.io/hugo-universal-theme/"
```

The `weight` field determines the position of the entry. `title` is a text-only field. The `description` field accepts HTML code. The `image` must contain the relative path to the image inside the `static` directory. The optional `href` field contains a relative or absolute url that the user will be redirected to when clicking the carousel (specific to each carousel item).
`weight` 字段决定了条目的位置。`title` 为纯文本字段。`description` 字段接受 HTML 代码。`image` 必须包含 `static` 目录中图片的相对路径。可选的 `href` 字段包含相对或绝对 URL，用户点击轮播图时将被重定向到该 URL（每个轮播图项都指定）。

Once the carousel is configured, some options can be defined like: auto play, speed, etc. in the `config.toml` file.
配置轮播后，可以在 `config.toml` 文件中定义一些选项，例如：自动播放、速度等。

```toml
[params.carouselHomepage]
    enable = true
    auto_play = true
    slide_speed = 2000
    pagination_speed = 1000
```

#### Features   功能

Features are also defined in the `data` directory just like the carousel:

```
data
└── features
    ├── consulting.yaml
    ├── email.yaml
    ├── print.yaml
    ├── seo.yaml
    ├── uiux.yaml
    └── webdesign.yaml
```

The content of the `consulting.yaml` example feature file looks like this:

```yaml
weight: 4
name: "Consulting"
icon: "fas fa-lightbulb"
url: ""
description: "Fifth abundantly made Give sixth hath. Cattle creature i be don't them behold green moved fowl Moved life us beast good yielding. Have bring."
```

The meaning of the individual YAML keys is as follows:  各个 YAML 键的含义如下：

| Key      | Description                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `weight` | A means to set the order of multiple features; features with a lower `weight` are displayed first (left to right, top to bottom) |
| `weight` | 用于设置多个功能顺序的方法；`weight` 较低的功能优先显示（从左到右，从上到下）                                                                                      |

| `name` | The title text below the feature icon; Markdown is supported |
| `name` | 功能图标下方的标题文本；支持 Markdown 格式 |

| `icon` | The CSS class of the feature icon; in this example we have used icons powered by [FontAwesome](http://fontawesome.io/icons/) |
| `icon` | 功能图标的 CSS 类；在本例中，我们使用了由 [FontAwesome](http://fontawesome.io/icons/) 支持的图标 |

| `url` | An optional URL the feature icon should point to; if specified, the icon will become a clickable hyperlink |
| `url` | 功能图标指向的可选 URL；如果指定，图标将变为可点击的超链接 |

| `description` | A short text below the title text to describe the feature; Markdown is supported |
| `description` | 标题文本下方的简短文本，用于描述功能；支持 Markdown 格式 |

Once you have completed your features, enable them in the `config.toml` file. Also the number of elements per row can be defined, by default is 3 (choose a divisor of 12 like 2, 3, 4 or 6).
完成功能后，请在 `config.toml` 文件中启用它们。您还可以定义每行的元素数，默认值为 3（可以选择 12 的除数，例如 2、3、4 或 6）。

```toml
[params.features]
    enable = true
    cols = 3
```

#### Testimonials  推荐

Testimonials are defined in the `data` directory.

```
data
└── testimonials
    ├── 1.yaml
    ├── 2.yaml
    ├── 3.yaml
    ├── 4.yaml
    └── 5.yaml
```

You can add as many testimonials files as you want. Be sure you fill in all fields as in the following example.

```yaml
text: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections."
name: "John McIntyre"
position: "CEO, TransTech"
avatar: "img/testimonials/person-1.jpg"
```

Then, enable it in the configuration file and add a title and subtitle.
然后，在配置文件中启用它，并添加标题和副标题。

```toml
[params.testimonials]
    enable = true
    title = "Testimonials"
    subtitle = "We have worked with many clients and we always like to hear they come out from the cooperation happy and satisfied. Have a look what our clients said about us."
```

#### See more  查看更多

This section is used to provide a link to another place. It can be an external site, or a page or post within your Hugo site.
此部分用于提供指向其他位置的链接。它可以是外部网站，也可以是 Hugo 网站内的页面或帖子。
You can enable it in the configuration file.
您可以在配置文件中启用它。

```toml
[params.see_more]
    enable = true
    icon = "far fa-file-alt"
    title = "Do you want to see more?"
    subtitle = "We have prepared for you more than 40 different HTML pages, including 5 variations of homepage."
    link_url = "http://your-site.com/more"
    link_text = "Check other homepages"
```

#### Recent posts

The recent posts sections shows the four latest published blog posts, with their featured image and an optional summary. It defaults to show recent posts from all [main sections](https://gohugo.io/functions/where/#mainsections). This is either the section with the most posts or can be set explicitly in the configuration file (see linked docs).
最近帖子部分显示最近发布的四篇博客文章，并包含其特色图片和可选的摘要。默认显示所有[主要部分](https://gohugo.io/functions/where/#mainsections) 中的最近帖子。该部分可以是包含最多文章的部分，也可以在配置文件中明确设置（参见链接文档）。

You can enable it in the configuration file.

```toml
summaryLength = 70

[params.recent_posts]
    enable = true
    title = "From our blog"
    subtitle = "Pellen"
    hide_summary = false
```

Recent posts use `.Summary` property and by default, Hugo automatically takes the first 70 words of your content as its summary and stores it into the `.Summary` page variable for use in your templates. You may customize the summary length by setting summaryLength in your site configuration.
When setting the `hide_summary` configuration property to `true` the summary will be hidden on the recent posts as well as the blogs list page.
最近帖子使用 `.Summary` 属性，默认情况下，Hugo 会自动将内容的前 70 个字作为摘要，并将其存储在 `.Summary` 页面变量中，以供模板使用。您可以通过在站点配置中设置 summaryLength 来自定义摘要长度。
当将“hide_summary”配置属性设置为“true”时，摘要将隐藏在最近的帖子以及博客列表页面上。

#### Footer

In the footer there are three blocks customizables: `About us`, `Recent posts` and `contact`. Each block can be set via parameters.
页脚中有三个可自定义的区块：“关于我们”、“最新帖子”和“联系方式”。每个区块都可以通过参数进行设置。

##### About us

A text can be defined, in case there is no text defined the entire block will be hidden:

```toml
[params]
    about_us = "<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>"
```

##### Recent posts

Recent posts block can be enabled or disabled (hidden).

```toml
[params.footer.recent_posts]
    enable = true
```

##### Contact

In contact section there is a button to redirect to contact page, there is the possibility to customize the url also a contact text can be defined, in case there is no text defined the entire block will be hidden:

```toml
[params]
    contact_url = "/contact"
    address = """<p class="text-uppercase"><strong>Universal Ltd.</strong>
        <br>13/25 New Avenue
        <br>Newtown upon River
        <br>45Y 73J
        <br>England
        <br>
        <strong>Great Britain</strong>
      </p>
      """
```

### Meta tags

The following [HTML metadata](https://www.w3schools.com/tags/tag_meta.asp) can be set for every page. While the default value for some of them can be defined in `config.toml`, all of these properties can also be set through the respective [Hugo front matter variables](https://gohugo.io/content-management/front-matter/#front-matter-variables):

| HTML meta `name`/`property`                              | Hugo front matter variable | Default variable in `config.toml` |
|:-------------------------------------------------------- |:-------------------------- |:--------------------------------- |
| `article:author`                                         | `facebook_author`          | -                                 |
| `article:publisher`                                      | `facebook_site`            | `facebook_site`                   |
| `author`                                                 | `author`                   | -                                 |
| `description` / `og:description` / `twitter:description` | `description`              | `defaultDescription`              |
| `keywords`                                               | `keywords`                 | `defaultKeywords`                 |
| `og:image` / `twitter:image`                             | `banner`                   | `default_sharing_image`           |
| `title` / `og:title` / `twitter:title`                   | `title`                    | -                                 |
| `twitter:creator`                                        | `twitter_author`           | -                                 |
| `twitter:site`                                           | `twitter_site`             | `twitter_site`                    |

Besides, certain [Open Graph](http://ogp.me/) metadata is automatically set:

- `article:published_time`, `article:modified_time`, `og:updated_time` and `article:expiration_time` are set based on [Hugo's (predefined) front matter variables `date`, `publishDate`, `lastmod` and `expiryDate`](https://gohugo.io/content-management/front-matter/#predefined).
- `article:section` and `article:tag` are set based on [Hugo's `categories` and `tags` taxonomies](https://gohugo.io/content-management/taxonomies/#default-taxonomies). Since there can only be one `article:section`, only the first element of the `categories` array is used as `article:section`.

You can set default values for all pages in the `config.toml` file as below:

```toml
[params]
    defaultKeywords = ["devcows", "hugo", "go"]
    defaultDescription = "Site template made by Devcows using Hugo"
    default_sharing_image = "img/sharing-default.png"
    facebook_site = "https://www.facebook.com/GolangSociety/"
    twitter_site = "GoHugoIO"
```

The resulting HTML will be the following:

```html
<meta name="keywords" content="devcows, hugo, go">
<meta name="description" content="Site template made by Devcows using Hugo">
<meta property="og:description" content="Site template made by Devcows using Hugo">
<meta property="og:image" content="img/sharing-default.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="800">
<meta property="og:image:height" content="420">
<meta property="article:publisher" content="https://www.facebook.com/GolangSociety/">
<meta name="twitter:description" content="Site template made by Devcows using Hugo">
<meta name="twitter:site" content="@GoHugoIO">
```

You can also override the default values from the `config.toml` by setting the respective keys in the individual pages front matter. As an example, here's the front matter from the [`faq.md` file](exampleSite/content/faq.md) in the [`exampleSite` directory](exampleSite):
您还可以通过在各个页面的前置内容中设置相应的键来覆盖 `config.toml` 中的默认值。例如，以下是 [`exampleSite` 目录](exampleSite) 中 [`faq.md` 文件](exampleSite/content/faq.md) 的前置内容：

```yaml
+++
title = "FAQ"
description = "Frequently asked questions"
keywords = ["FAQ","How do I","questions","what if"]
+++
```

Which results in the following HTML:

```html
<title>FAQ</title>
<meta name="keywords" content="FAQ,How do I,questions,what if">
<meta name="description" content="Frequently asked questions">
<meta property="og:description" content="Frequently asked questions">
<meta name="twitter:description" content="Frequently asked questions">
```

If your site needs a custom Javascript library or CSS style you can override this file `layouts/partials/custom_headers.html` with the proper content like:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
```

## Usage

In order to see your site in action, run Hugo's built-in local server.

```
$ hugo server -w
```

Now enter [`localhost:1313`](http://localhost:1313) in the address bar of your browser.

For more information check out the official [Hugo documentation](http://gohugo.io/overview/usage/).

## Contributing

Did you find a bug or do you have an idea for a new feature? Feel free to use the [issue tracker](https://github.com/devcows/hugo-universal-theme/issues) to let us know. Or make a [pull request](https://github.com/devcows/hugo-universal-theme/pulls) directly.

## License

This port is released under the MIT License. Check the [original theme license](http://bootstrapious.com/p/universal-business-e-commerce-template) for additional licensing information.

## Thanks

Thanks to [Steve Francia](https://github.com/spf13) for creating Hugo and the awesome community around the project. And also thanks to [Bootstrapious](http://bootstrapious.com/) for creating this awesome theme.
