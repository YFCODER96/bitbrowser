/**
 * 窗口管理API
 */

import type { ApiResponse, WindowBoundsOptions } from "../types/index.js";
import { BaseAPI } from "./base.js";

export class WindowAPI extends BaseAPI {
  /**
   * 排列窗口以及调整窗口尺寸
   * @param options 排列参数
   */
  async setBounds(options: WindowBoundsOptions): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/windowbounds", options)
      .then((res) => res.data);
  }

  /**
   * 一键自适应排列窗口
   * @param seqlist 窗口序号列表，不传则排列全部窗口
   */
  async setFlexableBounds(seqlist?: number[]): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/windowbounds/flexable", { seqlist })
      .then((res) => res.data);
  }

  /**
   * 获取所有显示器列表
   */
  async getAllDisplays(): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/alldisplays")
      .then((res) => res.data);
  }
}
