/**
 * RPA任务管理API
 */

import type { ApiResponse } from "../types/index.js";
import { BaseAPI } from "./base.js";

export class RpaAPI extends BaseAPI {
  /**
   * 执行RPA任务
   * @param id RPA任务ID
   */
  async run(id: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/rpa/run", { id })
      .then((res) => res.data);
  }

  /**
   * 停止RPA任务
   * @param id RPA任务ID
   */
  async stop(id: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/rpa/stop", { id })
      .then((res) => res.data);
  }
}
