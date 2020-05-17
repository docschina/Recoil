/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  title: 'Recoil',
  tagline: 'React 状态管理库',
  url: 'https://recoiljs.org',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'facebookexperimental', // Usually your GitHub org/user name.
  projectName: 'Recoil', // Usually your repo name.
  themeConfig: {
    googleAnalytics: {
      trackingID: 'UA-166885839-1',
    },
    image: 'img/og-image.png',
    navbar: {
      title: 'Recoil',
      links: [
        {
          to: 'docs/introduction/installation',
          activeBasePath: 'docs',
          label: '文档',
          position: 'left',
        },
        // {to: 'blog', label: 'Blog', position: 'left'},
        // Please keep GitHub link to the right for consistency.
        {
          href: 'https://github.com/facebookexperimental/Recoil',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学习',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/introduction/getting-started',
            },
            {
              label: '核心概念',
              to: 'docs/introduction/core-concepts',
            },
          ],
        },
        {
          title: '社区',
          items: [
            // {
            //   label: 'Stack Overflow',
            //   href: 'https://stackoverflow.com/questions/tagged/recoil',
            // },
            {
              label: 'Twitter',
              href: 'https://twitter.com/recoiljs',
            },
            // {
            //   label: 'Discord',
            //   href: 'https://discordapp.com/invite/docusaurus',
            // },
          ],
        },
        {
          title: '更多',
          items: [
            // {
            //   label: 'Blog',
            //   to: 'blog',
            // },
            {
              label: 'GitHub',
              href: 'https://github.com/facebookexperimental/Recoil',
            },
          ],
        },
        {
          title: '隐私政策',
          // Please do not remove the privacy and terms, it's a legal requirement.
          items: [
            {
              label: '隐私策略',
              href: 'https://opensource.facebook.com/legal/privacy/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
            {
              label: '条款',
              href: 'https://opensource.facebook.com/legal/terms/',
              target: '_blank',
              rel: 'noreferrer noopener',
            },
          ],
        },
      ],
      logo: {
        alt: 'Facebook Open Source Logo',
        src: 'img/oss_logo.png',
        href: 'https://opensource.facebook.com',
      },
      // Please do not remove the credits, help to publicize Docusaurus :)
      copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc. Built with Docusaurus. Translate by docschina.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/facebookexperimental/Recoil/edit/docs/docs/',
        },
        blog: {
          showReadingTime: true,
          editUrl:
            'https://github.com/facebookexperimental/Recoil/edit/docs/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: ['@docusaurus/plugin-google-analytics'],
};
