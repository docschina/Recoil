---
title: 安装
---

Recoil 的 package 已上传至 <a href="https://www.npmjs.com/get-npm" target="_blank">npm</a>。欲下载最新版本，请运行如下命令：

```shell
npm install recoil
```

或者可以使用 <a href="https://classic.yarnpkg.com/en/docs/install/" target="_blank">yarn</a>：

```shell
yarn add recoil
```

## ESLint

If you are using [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks) in your project. For example, with an eslint config like this:

```json
// previous .eslint config
{
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

It is recommended to add [useRecoilCallback](docs/api-reference/core/useRecoilCallback) to the list of `additionalHooks`. With this change, ESLint will warn when the dependencies passed to `useRecoilCallback` are specified incorrectly and suggests a fix.  The format of `additionalHooks` is a regex string.

```json
// modified .eslint config
{
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn", {
        "additionalHooks": "useRecoilCallback"
      }
    ]
  }
}
```
