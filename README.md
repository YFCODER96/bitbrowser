# BitBrowser SDK

<div align="center">

[![npm version](https://badge.fury.io/js/bitbrowser.svg)](https://www.npmjs.com/package/bitbrowser)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

**比特浏览器 SDK** - 用于控制和管理比特浏览器窗口的 TypeScript/JavaScript SDK

[中文文档](#中文文档) | [English Document](#english-document)

</div>

## 中文文档

### 简介

BitBrowser SDK 是一个基于 TypeScript/JavaScript 的比特浏览器自动化控制库。它提供了一套完整的 API 来创建、管理、控制比特浏览器窗口，支持指纹配置、代理管理、Cookie 操作等功能。

### 功能特性

✨ **核心功能**

- 🌐 浏览器窗口的创建、打开、关闭、删除
- 👆 批量操作窗口
- 🔧 指纹配置和随机生成
- 🌍 代理配置和检测
- 🍪 Cookie 管理（获取、设置、清除）
- 📊 窗口布局和排列
- 🏷️ 窗口分组管理
- 💾 缓存管理

### 安装

```bash
npm install bitbrowser
```

或者使用 yarn:

```bash
yarn add bitbrowser
```

或者使用 pnpm:

```bash
pnpm add bitbrowser
```

### 快速开始

#### 基础使用

```typescript
import { BitBrowser } from "bitbrowser";

// 创建实例
const bitbrowser = new BitBrowser("http://127.0.0.1:54345");

// 健康检查
const isHealthy = await bitbrowser.health();
console.log("连接状态:", isHealthy ? "正常" : "失败");

// 创建浏览器窗口
const createResult = await bitbrowser.browser.create({
  name: "My Browser",
  proxyMethod: 2,
  proxyType: "socks5",
  host: "1.2.3.4",
  port: 1080,
  browserFingerPrint: {
    coreVersion: "130",
    ostype: "PC",
    os: "Win32",
  },
});

if (createResult.success) {
  const browserId = createResult.data.id;

  // 打开浏览器窗口
  const openResult = await bitbrowser.browser.open({
    id: browserId,
    queue: true,
  });

  console.log("WebSocket:", openResult.data?.ws);
  console.log("HTTP:", openResult.data?.http);
  console.log("PID:", openResult.data?.pid);
}
```

### 主要 API

#### 窗口管理

| 方法                  | 说明             |
| --------------------- | ---------------- |
| `create(options)`     | 创建浏览器窗口   |
| `open(options)`       | 打开浏览器窗口   |
| `close(id)`           | 关闭浏览器窗口   |
| `delete(id)`          | 删除浏览器窗口   |
| `deleteMultiple(ids)` | 批量删除窗口     |
| `getDetail(id)`       | 获取窗口详情     |
| `list(options)`       | 分页获取窗口列表 |

#### 指纹管理

| 方法                           | 说明         |
| ------------------------------ | ------------ |
| `randomFingerprint(browserId)` | 随机生成指纹 |
| `updatePartial(ids, options)`  | 修改指纹字段 |

#### 代理管理

| 方法                       | 说明           |
| -------------------------- | -------------- |
| `updateProxy(ids, config)` | 批量修改代理   |
| `check(options)`           | 检测代理可用性 |

#### Cookie 管理

| 方法                           | 说明                   |
| ------------------------------ | ---------------------- |
| `get(browserId)`               | 获取窗口的实时 Cookies |
| `set(browserId, cookies)`      | 设置 Cookies           |
| `clear(browserId, saveSynced)` | 清除 Cookies           |

#### 窗口布局

| 方法                         | 说明               |
| ---------------------------- | ------------------ |
| `setBounds(options)`         | 排列窗口和调整尺寸 |
| `setFlexableBounds(seqlist)` | 自适应排列窗口     |

#### 其他功能

| 方法               | 说明             |
| ------------------ | ---------------- |
| `getAllDisplays()` | 获取所有显示器   |
| `getPids(ids)`     | 获取窗口 PID     |
| `getAllPids()`     | 获取所有窗口 PID |
| `clear(ids)`       | 清理缓存         |

### 完整示例

#### 单个窗口的完整工作流

```typescript
import { BitBrowser } from "bitbrowser";

async function main() {
  const bitbrowser = new BitBrowser();

  try {
    // 1. 创建窗口
    const createResult = await bitbrowser.browser.create({
      name: "Test Browser",
      proxyMethod: 2,
      proxyType: "socks5",
      host: "1.2.3.4",
      port: 1080,
      proxyUserName: "user",
      proxyPassword: "pass",
      browserFingerPrint: {
        coreVersion: "130",
        ostype: "PC",
        os: "Win32",
        osVersion: "11",
      },
    });

    if (!createResult.success) {
      console.error("创建失败:", createResult.msg);
      return;
    }

    const browserId = createResult.data.id;
    console.log("✓ 窗口创建成功:", browserId);

    // 2. 打开窗口
    const openResult = await bitbrowser.browser.open({
      id: browserId,
      queue: true,
    });

    if (!openResult.success) {
      console.error("打开失败:", openResult.msg);
      return;
    }

    console.log("✓ 窗口已打开");
    console.log("  - PID:", openResult.data?.pid);
    console.log("  - WebSocket:", openResult.data?.ws);

    // 3. 等待一段时间后获取 Cookies
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const cookiesResult = await bitbrowser.cookie.get(browserId);
    console.log("✓ Cookies 数量:", cookiesResult.data?.length || 0);

    // 4. 获取窗口详情
    const detailResult = await bitbrowser.browser.getDetail(browserId);
    console.log("✓ 窗口详情:", {
      id: detailResult.data.id,
      name: detailResult.data.name,
      status: detailResult.data.status,
    });

    // 5. 关闭窗口
    await bitbrowser.browser.close(browserId);
    console.log("✓ 窗口已关闭");

    // 6. 删除窗口
    await new Promise((resolve) => setTimeout(resolve, 3000));
    await bitbrowser.browser.delete(browserId);
    console.log("✓ 窗口已删除");
  } catch (error) {
    console.error("错误:", error);
  }
}

main();
```

#### 批量操作示例

```typescript
import { BitBrowser } from "bitbrowser";

async function batchOperations() {
  const bitbrowser = new BitBrowser();

  // 创建 5 个浏览器窗口
  const browserIds = [];
  for (let i = 0; i < 5; i++) {
    const result = await bitbrowser.browser.create({
      name: `Browser ${i + 1}`,
      proxyMethod: 2,
      proxyType: "noproxy",
      browserFingerPrint: {},
    });

    if (result.success) {
      browserIds.push(result.data.id);
    }
  }

  // 批量打开
  for (const id of browserIds) {
    await bitbrowser.browser.open({ id, queue: true });
  }

  // 批量排列
  await bitbrowser.window.setBounds({
    type: "box",
    width: 1000,
    height: 800,
    col: 2,
    spaceX: 10,
    spaceY: 10,
    ids: browserIds,
  });

  // 批量关闭
  for (const id of browserIds) {
    await bitbrowser.browser.close(id);
  }

  // 批量删除
  await bitbrowser.browser.deleteMultiple(browserIds);
}

batchOperations();
```

#### 代理检测示例

```typescript
import { BitBrowser } from "bitbrowser";

async function checkProxyExample() {
  const bitbrowser = new BitBrowser();

  const result = await bitbrowser.proxy.check({
    host: "1.2.3.4",
    port: 1080,
    proxyType: "socks5",
    proxyUserName: "user",
    proxyPassword: "pass",
    ipCheckService: "ip-api",
  });

  if (result.success && result.data.success) {
    console.log("IP:", result.data?.data.ip);
    console.log("国家:", result.data?.data.countryName);
    console.log("城市:", result.data?.data.city);
    console.log("时区:", result.data?.data.timeZone);
  } else {
    console.error("代理检测失败:", result.data.message);
  }
}

checkProxyExample();
```

### 类型定义

SDK 导出了所有的 TypeScript 类型，可以直接使用：

```typescript
import {
  type ApiResponse,
  type BrowserFingerPrint,
  type CreateBrowserOptions,
  type OpenBrowserOptions,
  type OpenBrowserResult,
  type CheckProxyOptions,
  type CheckProxyResult,
  type Cookie,
} from "bitbrowser";
```

### 配置对象详解

#### BrowserFingerPrint (浏览器指纹配置)

- `coreProduct`: 浏览器内核，默认 'chrome'
- `coreVersion`: 内核版本，chrome 默认 130，firefox 默认 128
- `ostype`: 操作系统平台 ('PC' | 'Android' | 'IOS')
- `os`: navigator.platform 值
- `osVersion`: 操作系统版本
- `userAgent`: 自定义 UA
- `timeZone`: 时区
- `webRTC`: WebRTC 设置 ('0'=替换, '1'=允许, '2'=禁止, '3'=隐私)
- `position`: 地理位置 ('0'=询问, '1'=允许, '2'=禁止)
- `languages`: 语言列表
- `devicePixelRatio`: 显示缩放比例
- `canvas`: Canvas 指纹 ('0'=随机, '1'=关闭)
- `webGL`: WebGL 图像 ('0'=随机, '1'=关闭)
- 更多配置项，详见 [官方文档](https://doc2.bitbrowser.cn/jiekou/liu-lan-qi-jie-kou.html)

#### CreateBrowserOptions (创建窗口参数)

- `name`: 窗口名称
- `url`: 额外打开的 URL（逗号分隔）
- `browserFingerPrint`: 指纹配置（必传）
- `proxyType`: 代理类型 ('noproxy' | 'http' | 'https' | 'socks5' | 'ssh')
- `host`: 代理主机
- `port`: 代理端口
- `cookie`: Cookie 字符串
- `syncTabs`: 是否同步标签
- `syncCookies`: 是否同步 Cookies
- 更多选项，详见类型定义

### 常见问题

**Q: 如何连接到比特浏览器 Local Server？**

A: 确保比特浏览器客户端已启动，Local Server 默认地址是 `http://127.0.0.1:54345`。如果 Local Server 使用了不同的端口，可以在创建时指定：

```typescript
const bitbrowser = new BitBrowser("http://127.0.0.1:8888");
```

**Q: 如何设置随机指纹？**

A: 在创建窗口时传入空对象或部分配置，SDK 会自动生成随机值：

```typescript
browserFingerPrint: {} // 完全随机
// 或者
browserFingerPrint: {
  ostype: 'PC', // 指定某些字段
  // 其他字段随机
}
```

**Q: 支持并发打开多个窗口吗？**

A: 支持，建议使用 `queue: true` 参数来防止并发问题：

```typescript
for (const id of browserIds) {
  await bitbrowser.browser.open({ id, queue: true });
}
```

**Q: 如何修改已存在的窗口指纹？**

A: 使用 `updatePartial()` 方法：

```typescript
await bitbrowser.browser.updatePartial([browserId], {
  browserFingerPrint: {
    timeZone: "Asia/Shanghai",
    languages: "zh-CN",
  },
});
```

### API 参考

详细的 API 参考文档，请参考 [官方文档](https://doc2.bitbrowser.cn/jiekou/liu-lan-qi-jie-kou.html)。

### 更新日志

#### 1.0.0 (2026-01-19)

- 🎉 首个版本发布
- 完整的浏览器窗口管理 API
- 指纹配置和随机生成
- 代理管理和检测
- Cookie 操作
- 窗口布局排列
- 完整的 TypeScript 类型支持

### 贡献

欢迎提交 Issue 和 Pull Request！

### 许可证

MIT License - 详见 [LICENSE](LICENSE)

---

## English Document

### Introduction

BitBrowser SDK is a TypeScript/JavaScript automation control library for BitBrowser. It provides a complete set of APIs to create, manage, and control BitBrowser windows, with support for fingerprint configuration, proxy management, cookie operations, and more.

### Features

✨ **Core Features**

- 🌐 Create, open, close, and delete browser windows
- 👆 Batch window operations
- 🔧 Fingerprint configuration and random generation
- 🌍 Proxy configuration and detection
- 🍪 Cookie management (get, set, clear)
- 📊 Window layout and arrangement
- 🏷️ Window grouping management
- 💾 Cache management

### Installation

```bash
npm install bitbrowser
```

### Quick Start

```typescript
import { BitBrowser } from "bitbrowser";

const bitbrowser = new BitBrowser("http://127.0.0.1:54345");

// Health check
const isHealthy = await bitbrowser.health();

// Create browser window
const result = await bitbrowser.browser.create({
  name: "My Browser",
  browserFingerPrint: {
    coreVersion: "130",
    ostype: "PC",
    os: "Win32",
  },
});

// Open browser
const openResult = await bitbrowser.browser.open({
  id: result.data.id,
  queue: true,
});
```

### Documentation

For more examples and detailed API documentation, visit [BitBrowser Official Documentation](https://doc2.bitbrowser.cn/jiekou/liu-lan-qi-jie-kou.html).

### License

MIT License - see [LICENSE](LICENSE) for details.
