/**
 * 代理管理API
 */

import type { ApiResponse, CheckProxyOptions, CheckProxyResult } from "../types/index.js";
import { BaseAPI } from "./base.js";

export class ProxyAPI extends BaseAPI {
  /**
   * 代理检测接口
   * @param options 代理参数
   */
  async check(
    options: CheckProxyOptions,
  ): Promise<ApiResponse<CheckProxyResult>> {
    return this.client
      .post<ApiResponse<CheckProxyResult>>("/checkagent", options)
      .then((res) => res.data);
  }
}
