/**
 * Cookie管理API
 */

import type { ApiResponse, Cookie } from "../types/index.js";
import { BaseAPI } from "./base.js";

export class CookieAPI extends BaseAPI {
  /**
   * 对已打开窗口设置实时Cookie
   * @param browserId 窗口ID
   * @param cookies Cookie数组
   */
  async set(browserId: string, cookies: Cookie[]): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/cookies/set", {
        browserId,
        cookies,
      })
      .then((res) => res.data);
  }

  /**
   * 清空Cookie
   * @param browserId 窗口ID
   * @param saveSynced 是否保留已同步的Cookie
   */
  async clear(
    browserId: string,
    saveSynced: boolean = true,
  ): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/cookies/clear", {
        browserId,
        saveSynced,
      })
      .then((res) => res.data);
  }

  /**
   * 获取已打开窗口的实时Cookies
   * @param browserId 窗口ID
   */
  async get(browserId: string): Promise<ApiResponse<Cookie[]>> {
    return this.client
      .post<ApiResponse<Cookie[]>>("/browser/cookies/get", { browserId })
      .then((res) => res.data);
  }

  /**
   * 格式化给定Cookie
   * @param cookie Cookie数据
   * @param hostname Cookie的domain值
   */
  async format(cookie: any, hostname: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/cookies/format", {
        cookie,
        hostname,
      })
      .then((res) => res.data);
  }
}
