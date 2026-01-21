import { BitBrowser } from "../index.js";

/**
 * 比特浏览器SDK使用示例
 */

async function main() {
  // 1. 创建实例
  const bitBrowser = new BitBrowser("http://127.0.0.1:54345");

  // 2. 健康检查
  console.log("检查连接...");
  const isHealthy = await bitBrowser.health();
  console.log("连接状态:", isHealthy ? "正常" : "失败");

  if (!isHealthy) {
    console.error("无法连接到比特浏览器 Local Server，请确保客户端已启动");
    return;
  }

  // 3. 创建浏览器窗口示例
  console.log("\n创建浏览器窗口...");
  const createResult = await bitBrowser.browser.create({
    name: "Test Browser",
    // 代理配置
    proxyMethod: 2, // 自定义代理
    proxyType: "socks5",
    host: "1.2.3.4",
    port: 1020,
    proxyUserName: "username",
    proxyPassword: "password",
    // 指纹配置（必传，传空对象会随机生成）
    browserFingerPrint: {
      coreVersion: "130",
      ostype: "PC",
      os: "Win32",
      osVersion: "11,10",
    },
  });

  if (!createResult.success || !createResult.data) {
    console.error("创建窗口失败:", createResult.msg);
    return;
  }

  console.log("窗口创建成功:", createResult.data);
  const browserId = createResult.data.id;

  // 4. 打开浏览器窗口
  console.log("\n打开浏览器窗口...");
  const openResult = await bitBrowser.browser.open({
    id: browserId,
    queue: true, // 队列方式打开，防止并发报错
  });

  if (!openResult.success) {
    console.error("打开窗口失败:", openResult.msg);
    return;
  }

  console.log("窗口打开成功:");
  console.log("  - WebSocket:", openResult.data?.ws);
  console.log("  - HTTP:", openResult.data?.http);
  console.log("  - PID:", openResult.data?.pid);

  // 5. 等待一段时间后获取Cookie
  console.log("\n等待5秒...");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("获取Cookie...");
  const cookiesResult = await bitBrowser.cookie.get(browserId);
  if (cookiesResult.success) {
    console.log("Cookie数量:", cookiesResult.data?.length || 0);
  }

  // 6. 查询窗口详情
  console.log("\n查询窗口详情...");
  const detailResult = await bitBrowser.browser.getDetail(browserId);
  if (detailResult.success) {
    console.log("窗口详情:", {
      id: detailResult.data.id,
      seq: detailResult.data.seq,
      name: detailResult.data.name,
      status: detailResult.data.status,
    });
  }

  // 7. 关闭浏览器窗口
  console.log("\n关闭浏览器窗口...");
  const closeResult = await bitBrowser.browser.close(browserId);
  console.log("关闭结果:", closeResult.success ? "成功" : "失败");

  // 8. 等待5秒后删除窗口
  console.log("\n等待5秒后删除窗口...");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const deleteResult = await bitBrowser.browser.delete(browserId);
  console.log("删除结果:", deleteResult.success ? "成功" : "失败");
}

/**
 * 批量操作示例
 */
async function batchExample() {
  const bitBrowser = new BitBrowser();

  // 批量创建窗口
  console.log("批量创建窗口...");
  const browserIds: string[] = [];

  for (let i = 0; i < 3; i++) {
    const result = await bitBrowser.browser.create({
      name: `Batch Browser ${i + 1}`,
      proxyMethod: 2,
      proxyType: "noproxy", // 不使用代理
      browserFingerPrint: {}, // 随机指纹
    });

    if (result.success && result.data) {
      browserIds.push(result.data.id);
      console.log(`  窗口 ${i + 1} 创建成功: ${result.data.id}`);
    }
  }

  // 批量打开窗口
  console.log("\n批量打开窗口...");
  for (const id of browserIds) {
    await bitBrowser.browser.open({ id, queue: true });
    console.log(`  窗口 ${id} 已打开`);
  }

  // 获取所有已打开窗口的PID
  console.log("\n获取所有窗口PID...");
  const pidsResult = await bitBrowser.browser.getAllPids();
  if (pidsResult.success) {
    console.log("窗口PID:", pidsResult.data);
  }

  // 排列窗口
  console.log("\n排列窗口...");
  await bitBrowser.window.setBounds({
    type: "box",
    width: 800,
    height: 600,
    col: 2,
    startX: 0,
    startY: 0,
    ids: browserIds,
  });

  // 等待10秒
  console.log("\n等待10秒...");
  await new Promise((resolve) => setTimeout(resolve, 10000));

  // 批量关闭窗口
  console.log("\n批量关闭窗口...");
  for (const id of browserIds) {
    await bitBrowser.browser.close(id);
  }

  // 等待5秒后批量删除
  console.log("\n等待5秒后批量删除...");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const deleteResult = await bitBrowser.browser.deleteMultiple(browserIds);
  console.log("批量删除结果:", deleteResult.success ? "成功" : "失败");
}

/**
 * 代理检测示例
 */
async function proxyCheckExample() {
  const bitBrowser = new BitBrowser();

  console.log("检测代理...");
  const checkResult = await bitBrowser.proxy.check({
    host: "92.113.112.12",
    port: 21012,
    proxyType: "http",
    proxyUserName: "cqrxy",
    proxyPassword: "Zpaily88",
    ipCheckService: "ip123in",
  });

  if (checkResult.success) {
    console.log("代理检测成功:");
    console.log("  IP:", checkResult.data?.data.ip);
    console.log("  国家:", checkResult.data?.data.countryName);
    console.log("  城市:", checkResult.data?.data.city);
    console.log("  时区:", checkResult.data?.data.timeZone);
  } else {
    console.error("代理检测失败");
  }
}

/**
 * 窗口列表查询示例
 */
async function listBrowsersExample() {
  const bitBrowser = new BitBrowser();

  console.log("查询窗口列表...");
  const listResult = await bitBrowser.browser.list({
    page: 0,
    pageSize: 10,
    sort: "desc",
  });

  if (listResult.success) {
    console.log("窗口列表:");
    listResult.data?.list?.forEach((browser: any, index: number) => {
      console.log(
        `  ${index + 1} - ID: ${browser.id}, Name: ${browser.name}, Status: ${browser.status}`,
      );
    });
  }
}

// 运行示例
// main().catch(console.error);
batchExample().catch(console.error);
// proxyCheckExample().catch(console.error);
// listBrowsersExample().catch(console.error);

console.log("比特浏览器SDK示例文件");
console.log("请取消注释上面的函数调用来运行示例");
