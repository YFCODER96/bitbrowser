/**
 * 工具类API
 */

import type { ApiResponse } from "../types/index.js";
import { BaseAPI } from "./base.js";

export class UtilsAPI extends BaseAPI {
  /**
   * 仿真输入（将剪贴板中的文本延迟输入到页面的聚焦输入框）
   * @param browserId 窗口ID
   * @param url 页面URL（必须严格相等）
   */
  async autoPaste(browserId: string, url: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/autopaste", {
        browserId,
        url,
      })
      .then((res) => res.data);
  }

  /**
   * 读取本地Excel文件内容
   * @param filepath 本地Excel文件的绝对路径
   */
  async readExcel(filepath: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/utils/readexcel", { filepath })
      .then((res) => res.data);
  }

  /**
   * 读取文本类文件内容（json, txt等）
   * @param filepath 本地文件的绝对路径
   */
  async readFile(filepath: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/utils/readfile", { filepath })
      .then((res) => res.data);
  }
}
