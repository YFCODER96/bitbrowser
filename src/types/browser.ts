/**
 * 浏览器相关类型定义
 */

import type { BrowserFingerPrint } from "./fingerprint.js";

/** 创建/更新浏览器窗口参数 */
export interface CreateBrowserOptions {
  /** 窗口ID（更新时必传） */
  id?: string;
  /** 窗口名称 */
  name?: string;
  /** 分组ID */
  groupId?: string;
  /** 账号平台URL */
  platform?: string;
  /** 额外打开的url，多个用逗号分隔 */
  url?: string;
  /** 备注信息 */
  remark?: string;
  /** 平台账号用户名 */
  userName?: string;
  /** 平台账号密码 */
  password?: string;
  /** 是否允许多开 */
  isSynOpen?: boolean;
  /** 2FA密钥 */
  faSecretKey?: string;
  /** cookie字符串 */
  cookie?: string;
  /** 代理方式，2自定义，3提取IP */
  proxyMethod?: 2 | 3;
  /** 代理类型 */
  proxyType?: "noproxy" | "http" | "https" | "socks5" | "ssh";
  /** 代理主机 */
  host?: string;
  /** 代理端口 */
  port?: number;
  /** IP信息查询库 */
  ipCheckService?: "ip-api" | "ip123in" | "luminati";
  /** 是否是IPv6 */
  isIpv6?: boolean;
  /** 代理账号 */
  proxyUserName?: string;
  /** 代理密码 */
  proxyPassword?: string;
  /** 代理刷新URL */
  refreshProxyUrl?: string;
  /** 是否开启UDP协议 */
  enableSocks5Udp?: boolean;
  /** 国家地区code */
  country?: string;
  /** 州/省code */
  province?: string;
  /** 城市code */
  city?: string;
  /** 浏览器工作台页面 */
  workbench?: "localserver" | "disable";
  /** 禁止加载图片 */
  abortImage?: boolean;
  /** 禁止加载固定大小以上的图片 */
  abortImageMaxSize?: number;
  /** 禁止视频自动播放 */
  abortMedia?: boolean;
  /** 浏览器静音 */
  muteAudio?: boolean;
  /** 网络不通停止打开 */
  stopWhileNetError?: boolean;
  /** IP发生变化停止打开 */
  stopWhileIpChange?: boolean;
  /** IP对应国家发生变化停止打开 */
  stopWhileCountryChange?: boolean;
  /** 提取IP链接 */
  dynamicIpUrl?: string;
  /** 提取链接服务商 */
  dynamicIpChannel?: "rola" | "doveip" | "cloudam" | "common";
  /** 提取IP，每次打开都提取新IP */
  isDynamicIpChangeIp?: boolean;
  /** 提取IP校验重复 */
  duplicateCheck?: 0 | 1;
  /** 是否使用全局的动态代理信息 */
  isGlobalProxyInfo?: boolean;
  /** 是否同步浏览器tabs */
  syncTabs?: boolean;
  /** 同步Cookie */
  syncCookies?: boolean;
  /** 同步IndexedDB */
  syncIndexedDb?: boolean;
  /** 同步Local Storage */
  syncLocalStorage?: boolean;
  /** 同步书签 */
  syncBookmarks?: boolean;
  /** 同步已保存的密码 */
  syncAuthorization?: boolean;
  /** 禁止保存密码弹窗 */
  credentialsEnableService?: boolean;
  /** 同步历史记录 */
  syncHistory?: boolean;
  /** 同步扩展应用数据 */
  syncExtensions?: boolean;
  /** 根据平台用户名密码校验重复 */
  isValidUsername?: boolean;
  /** 允许google账号登录浏览器 */
  allowedSignin?: boolean;
  /** 启动前清理缓存文件 */
  clearCacheFilesBeforeLaunch?: boolean;
  /** 启动前清理缓存文件(保留扩展数据) */
  clearCacheWithoutExtensions?: boolean;
  /** 启动前清理cookie */
  clearCookiesBeforeLaunch?: boolean;
  /** 启动前清理历史记录 */
  clearHistoriesBeforeLaunch?: boolean;
  /** 每次启动均随机指纹 */
  randomFingerprint?: boolean;
  /** 是否关闭GPU硬件加速 */
  disableGpu?: boolean;
  /** 禁止浏览器弹出谷歌翻译 */
  disableTranslatePopup?: boolean;
  /** 禁止弹出消息通知弹窗 */
  disableNotifications?: boolean;
  /** 禁止网站读取剪贴板内容 */
  disableClipboard?: boolean;
  /** 省内存模式 */
  memorySaver?: boolean;
  /** 指纹对象（必传） */
  browserFingerPrint: BrowserFingerPrint;
}

/** 创建浏览器窗口返回数据*/
export interface CreateBrowserResult {
  id: string;
  seq: number;
  code: string;
  groupId: string;
  platform: string;
  platformIcon: string;
  url: string;
  name: string;
  userName: string;
  password: string;
  cookie: string;
  otherCookie: string;
  isGlobalProxyInfo: boolean;
  isIpv6: boolean;
  proxyMethod: number; // 2自定义，3提取IP
  proxyType: string;
  agentId: string;
  ipCheckService: string;
  host: string;
  port: number;
  proxyUserName: string;
  proxyPassword: string;
  enableSocks5Udp: boolean;
  lastIp: string;
  lastCountry: string;
  isIpNoChange: boolean;
  ip: string;
  country: string;
  province: string;
  city: string;
  dynamicIpUrl: string;
  isDynamicIpChangeIp: boolean;
  remark: string;
  status: number;
  operUserName: string;
  isDelete: number;
  delReason: string;
  isMostCommon: number;
  isRemove: number;
  tempStr: null | string;
  createdBy: string;
  userId: string;
  createdTime: string;
  recycleBinRemark: string;
  mainUserId: string;
  abortImage: boolean;
  abortMedia: boolean;
  stopWhileNetError: boolean;
  stopWhileCountryChange: boolean;
  syncTabs: boolean;
  syncCookies: boolean;
  syncIndexedDb: boolean;
  syncBookmarks: boolean;
  syncAuthorization: boolean;
  syncHistory: boolean;
  syncGoogleAccount: boolean;
  allowedSignin: boolean;
  syncSessions: boolean;
  workbench: string;
  clearCacheFilesBeforeLaunch: boolean;
  clearCookiesBeforeLaunch: boolean;
  clearHistoriesBeforeLaunch: boolean;
  randomFingerprint: boolean;
  muteAudio: boolean;
  disableGpu: boolean;
  enableBackgroundMode: boolean;
  abortImageMaxSize: number | null;
  syncExtensions: boolean;
  syncUserExtensions: boolean;
  syncLocalStorage: boolean;
  credentialsEnableService: boolean;
  disableTranslatePopup: boolean;
  stopWhileIpChange: boolean;
  disableClipboard: boolean;
  disableNotifications: boolean;
  memorySaver: boolean;
  browserFingerPrint: {
    id: string;
    seq: number;
    coreVersion: string;
    browserId: string;
    ostype: string;
    os: string;
    architecture: string;
    osVersion: string;
    platformVersion: string;
    version: string;
    userAgent: string;
    isIpCreateTimeZone: boolean;
    timeZone: string;
    timeZoneOffset: number;
    ignoreHttpsErrors: boolean;
    webRTC: string;
    position: string;
    isIpCreatePosition: boolean;
    isIpCreateDisplayLanguage: boolean;
    displayLanguages: string;
    isIpCreateLanguage: boolean;
    resolutionType: string;
    resolution: string;
    openWidth: number;
    openHeight: number;
    fontType: string;
    font: string;
    canvas: string;
    canvasValue: string;
    webGL: string;
    webGLValue: string;
    webGLMeta: string;
    webGLManufacturer: string;
    webGLRender: string;
    audioContext: string;
    audioContextValue: string;
    mediaDevice: string;
    speechVoices: string;
    speechVoicesValue: string;
    hardwareConcurrency: string;
    deviceMemory: string;
    deviceInfoEnabled: boolean;
    computerName: string;
    macAddr: string;
    clientRectNoiseEnabled: boolean;
    clientRectNoiseValue: number;
    doNotTrack: string;
    flash: string;
    portScanProtect: string;
    portWhiteList: string;
    isDelete: number;
    colorDepth: number;
    totalDiskSpace: string;
    devicePixelRatio: number;
    disableSslCipherSuitesFlag: boolean;
    disableSslCipherSuites: null;
    plugins: string;
    enablePlugins: boolean;
    windowSizeLimit: boolean;
    webglparameterscode: string;
    createdBy: string;
    createdTime: string;
    isValidUsername: boolean;
    abortImage: boolean;
    abortImageMaxSize: null;
    abortMedia: boolean;
    stopWhileNetError: boolean;
    stopWhileCountryChange: boolean;
    syncTabs: boolean;
    syncCookies: boolean;
    syncIndexedDb: boolean;
    syncBookmarks: boolean;
    syncAuthorization: boolean;
    syncHistory: boolean;
    syncGoogleAccount: boolean;
    allowedSignin: boolean;
    syncSessions: boolean;
    workbench: string;
    clearCacheFilesBeforeLaunch: boolean;
    clearCookiesBeforeLaunch: boolean;
    clearHistoriesBeforeLaunch: boolean;
    randomFingerprint: boolean;
    muteAudio: boolean;
    disableGpu: boolean;
    enableBackgroundMode: boolean;
    syncExtensions: boolean;
    syncUserExtensions: boolean;
    syncLocalStorage: boolean;
    credentialsEnableService: boolean;
    disableTranslatePopup: boolean;
    stopWhileIpChange: boolean;
    disableClipboard: boolean;
    disableNotifications: boolean;
    memorySaver: boolean;
    coreProduct: string;
    webgpu: {
      driver: null;
      vendor: string;
      description: null;
      device: null;
      architecture: string;
    };
    batchRandom: false;
    batchUpdateFingerPrint: boolean;
    firefoxVersionMap: { [key: string]: string };
    launchArgs: null | string;
    uamodel: string;
    hostIP: string;
    extendOptions: null | unknown;
    randomPlatformVersion: number;
    defaultAccuracy: null;
    navigatorVendor: string;
    browserTagRelVo: null;
  };
  createdName: null;
  belongUserName: null;
  updateName: null;
  agentIpCount: null;
  belongToMe: false;
  seqExport: null;
  groupIDs: null;
  browserShareID: null;
  share: null;
  shareUserName: null;
  isShare: number;
  isValidUsername: false;
  createNum: number;
  isRandomFinger: true;
  remarkType: 1;
  refreshProxyUrl: null;
  duplicateCheck: number;
  ossExtend: null;
  randomKey: null;
  randomKeyUser: null;
  syncBrowserAccount: null;
  cookieBak: string;
  passwordBak: null;
  manual: number;
  proxyPasswordBak: null;
  proxyAgreementType: null;
  clearCacheWithoutExtensions: false;
  syncPaymentsAndAddress: false;
  extendIds: [];
  isSynOpen: 1;
  faSecretKey: null;
  coreProduct: null;
  ostype: null;
  os: null;
  coreVersion: null;
  sort: number;
  checkPassword: null;
  authenticationType: null;
  pinnedExtensions: [];
  removedPinnedExtensions: [];
  browserTagRelVo: null;
}

/** 打开浏览器窗口参数 */
export interface OpenBrowserOptions {
  /** 浏览器窗口ID */
  id: string;
  /** 浏览器启动参数 */
  args?: string[];
  /** 是否以队列方式打开 */
  queue?: boolean;
  /** 打开窗口时，忽略已同步的url */
  ignoreDefaultUrls?: boolean;
  /** 指定打开的url */
  newPageUrl?: string;
}

/** 打开浏览器窗口返回数据 */
export interface OpenBrowserResult {
  /** WebSocket连接地址 */
  ws: string;
  /** HTTP调试地址 */
  http: string;
  /** 内核版本 */
  coreVersion: string;
  /** ChromeDriver路径 */
  driver: string;
  /** 窗口序号 */
  seq: number;
  /** 窗口名称 */
  name: string;
  /** 备注 */
  remark: string;
  /** 分组ID */
  groupId: string;
  /** 进程ID */
  pid: number;
}

/** 浏览器窗口列表查询参数 */
export interface ListBrowserOptions {
  /** 分页，从0开始 */
  page: number;
  /** 分页数量，最大100 */
  pageSize?: number;
  /** 分组ID */
  groupId?: string;
  /** 窗口名称，模糊匹配 */
  name?: string;
  /** 备注，模糊匹配 */
  remark?: string;
  /** 窗口序号，精确查询 */
  seq?: number;
  /** 最小序号，范围查询 */
  minSeq?: number;
  /** 最大序号，范围查询 */
  maxSeq?: number;
  /** 排序参数 desc倒序，asc正序 */
  sort?: "desc" | "asc";
}

/** 排列窗口参数 */
export interface WindowBoundsOptions {
  /** 排列方式，宫格box，对角线diagonal */
  type: "box" | "diagonal";
  /** 起始X位置 */
  startX?: number;
  /** 起始Y位置 */
  startY?: number;
  /** 宽度，最小500 */
  width: number;
  /** 高度，最小200 */
  height: number;
  /** 宫格每行列数 */
  col?: number;
  /** 宫格横向间距 */
  spaceX?: number;
  /** 宫格纵向间距 */
  spaceY?: number;
  /** 对角线横向偏移量 */
  offsetX?: number;
  /** 对角线纵向偏移量 */
  offsetY?: number;
  /** 按序号排列 */
  orderBy?: "asc" | "desc";
  /** 要排列的窗口ID数组 */
  ids?: string[];
  /** 要排列的窗口序号数组 */
  seqlist?: number[];
  /** 显示器屏幕ID */
  screenId?: number;
}

/** 窗口标签 */
export interface BrowserTag {
  id: string;
  tagName: string;
  tagColor: string;
  mainUserId: string;
  createdBy: string;
}

/** 列表窗口详情 */
export interface BrowserDetail {
  id: string;
  seq: number;
  code: string;
  groupId: string;
  platform: string;
  platformIcon: string;
  url: string;
  name: string;
  userName: string;
  password: string;
  cookie: string;
  otherCookie: string;
  isGlobalProxyInfo: boolean;
  isIpv6: boolean;
  proxyMethod: number;
  proxyType: string;
  agentId: string;
  ipCheckService: string;
  host: string;
  proxyUserName: string;
  proxyPassword: string;
  enableSocks5Udp: boolean;
  lastIp: string;
  lastCountry: string;
  isIpNoChange: boolean;
  ip: string;
  country: string;
  province: string;
  city: string;
  dynamicIpChannel: string;
  dynamicIpUrl: string;
  isDynamicIpChangeIp: boolean;
  remark: string;
  status: number;
  operUserName: string;
  isDelete: number;
  delReason: string;
  isMostCommon: number;
  isRemove: number;
  tempStr: null | string;
  createdBy: string;
  userId: string;
  createdTime: string;
  recycleBinRemark: string;
  mainUserId: string;
  syncSessions: boolean;
  groupName: string;
  createdName: string;
  belongUserName: null | string;
  updateName: null | string;
  agentIpCount: null | number;
  belongToMe: boolean;
  seqExport: null | number;
  groupIDs: null | string;
  browserShareID: null | string;
  share: null | string;
  shareUserName: null | string;
  isShare: number;
  isValidUsername: boolean;
  createNum: number;
  isRandomFinger: boolean;
  remarkType: number;
  refreshProxyUrl: null | string;
  duplicateCheck: number;
  ossExtend: null | string;
  randomKey: null | string;
  randomKeyUser: null | string;
  syncBrowserAccount: null | string;
  cookieBak: string;
  passwordBak: null | string;
  manual: number;
  proxyPasswordBak: null | string;
  proxyAgreementType: null | string;
  extendIds: unknown[];
  isSynOpen: number;
  faSecretKey: null | string;
  coreProduct: string;
  ostype: string;
  os: string;
  coreVersion: string;
  sort: number;
  checkPassword: null | string;
  authenticationType: null | string;
  pinnedExtensions: unknown[];
  removedPinnedExtensions: unknown[];
  browserTags: BrowserTag[];
  browserTagRelVo: null | string;
  voRemark: null | string;
}

/** 窗口列表返回数据 */
export interface ListBrowserResult {
  list: BrowserDetail[];
  total: number;
}
