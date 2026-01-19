/**
 * 缓存管理API
 */

import type { ApiResponse } from "../types/index.js";
import { BaseAPI } from "./base.js";

export class CacheAPI extends BaseAPI {
  /**
   * 清理窗口缓存（本地和云端）
   * @param ids 窗口ID数组
   */
  async clear(ids: string[]): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/cache/clear", { ids })
      .then((res) => res.data);
  }

  /**
   * 保留扩展数据，删除窗口缓存
   * @param ids 窗口ID数组
   */
  async clearExceptExtensions(ids: string[]): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/cache/clear/exceptExtensions", { ids })
      .then((res) => res.data);
  }
}
