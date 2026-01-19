/**
 * 比特浏览器SDK入口文件
 * @packageDocumentation
 */

import axios, { type AxiosInstance } from "axios";
import {
  BrowserAPI,
  WindowAPI,
  CookieAPI,
  CacheAPI,
  ProxyAPI,
  RpaAPI,
  UtilsAPI,
} from "./api/index.js";
import type { ApiResponse } from "./types/index.js";

/**
 * 比特浏览器客户端
 * 基于官方API文档：https://doc2.bitbrowser.cn/jiekou/liu-lan-qi-jie-kou.html
 */
export class BitBrowser {
  private client: AxiosInstance;
  private baseURL: string;

  /** 浏览器管理API */
  public readonly browser: BrowserAPI;
  /** 窗口管理API */
  public readonly window: WindowAPI;
  /** Cookie管理API */
  public readonly cookie: CookieAPI;
  /** 缓存管理API */
  public readonly cache: CacheAPI;
  /** 代理管理API */
  public readonly proxy: ProxyAPI;
  /** RPA任务API */
  public readonly rpa: RpaAPI;
  /** 工具类API */
  public readonly utils: UtilsAPI;

  /**
   * 初始化比特浏览器客户端
   * @param baseURL Local Server地址，默认 http://127.0.0.1:54345
   */
  constructor(baseURL: string = "http://127.0.0.1:54345") {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 初始化各个API模块
    this.browser = new BrowserAPI(this.client);
    this.window = new WindowAPI(this.client);
    this.cookie = new CookieAPI(this.client);
    this.cache = new CacheAPI(this.client);
    this.proxy = new ProxyAPI(this.client);
    this.rpa = new RpaAPI(this.client);
    this.utils = new UtilsAPI(this.client);
  }

  /**
   * 健康检查接口，测试Local Server是否连接成功
   */
  async health(): Promise<boolean> {
    try {
      const response = await this.client.post<ApiResponse>("/health");
      return response.data.success;
    } catch (error) {
      return false;
    }
  }

  /**
   * 获取客户端实例（高级用法）
   */
  getClient(): AxiosInstance {
    return this.client;
  }

  /**
   * 获取Base URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }
}

// 导出所有类型定义
export type {
  // 通用类型
  ApiResponse,
  Cookie,
  // 指纹类型
  BrowserFingerPrint,
  // 浏览器类型
  CreateBrowserOptions,
  OpenBrowserOptions,
  OpenBrowserResult,
  ListBrowserOptions,
  ListBrowserResult,
  WindowBoundsOptions,
  BrowserDetail,
  BrowserTag,
  // 代理类型
  CheckProxyOptions,
  CheckProxyResult,
} from "./types/index.js";

// 导出所有API类（供高级用法）
export {
  BrowserAPI,
  WindowAPI,
  CookieAPI,
  CacheAPI,
  ProxyAPI,
  RpaAPI,
  UtilsAPI,
} from "./api/index.js";
