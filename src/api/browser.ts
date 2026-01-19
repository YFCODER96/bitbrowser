/**
 * 浏览器管理API
 */

import type {
  ApiResponse,
  CreateBrowserOptions,
  OpenBrowserOptions,
  OpenBrowserResult,
  ListBrowserOptions,
  ListBrowserResult,
  WindowBoundsOptions,
} from "../types/index.js";
import { BaseAPI } from "./base.js";

export class BrowserAPI extends BaseAPI {
  /**
   * 创建浏览器窗口
   * @param options 创建参数
   */
  async create(options: CreateBrowserOptions): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/update", options)
      .then((res) => res.data);
  }

  /**
   * 修改窗口与指纹指定字段值，支持批量修改
   * @param ids 窗口ID数组
   * @param options 要修改的字段
   */
  async updatePartial(
    ids: string[],
    options: Partial<CreateBrowserOptions>,
  ): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/update/partial", {
        ids,
        ...options,
      })
      .then((res) => res.data);
  }

  /**
   * 打开浏览器窗口
   * @param options 打开参数
   */
  async open(
    options: OpenBrowserOptions,
  ): Promise<ApiResponse<OpenBrowserResult>> {
    return this.client
      .post<ApiResponse<OpenBrowserResult>>("/browser/open", options)
      .then((res) => res.data);
  }

  /**
   * 关闭浏览器窗口
   * @param id 浏览器窗口ID
   */
  async close(id: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/close", { id })
      .then((res) => res.data);
  }

  /**
   * 通过序号批量关闭窗口
   * @param seqs 窗口序号列表
   */
  async closeBySeqs(seqs: number[]): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/close/byseqs", { seqs })
      .then((res) => res.data);
  }

  /**
   * 关闭所有窗口
   */
  async closeAll(): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/close/all")
      .then((res) => res.data);
  }

  /**
   * 重置浏览器关闭状态
   * @param id 浏览器窗口ID
   */
  async resetClosing(id: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/closing/reset", { id })
      .then((res) => res.data);
  }

  /**
   * 删除浏览器窗口（彻底删除，无法恢复）
   * @param id 浏览器窗口ID
   */
  async delete(id: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/delete", { id })
      .then((res) => res.data);
  }

  /**
   * 批量删除窗口（一次最多100个）
   * @param ids 窗口ID数组
   */
  async deleteMultiple(ids: string[]): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/delete/ids", { ids })
      .then((res) => res.data);
  }

  /**
   * 获取浏览器窗口详情
   * @param id 浏览器窗口ID
   */
  async getDetail(id: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/detail", { id })
      .then((res) => res.data);
  }

  /**
   * 分页获取浏览器窗口列表
   * @param options 查询参数
   */
  async list(
    options: ListBrowserOptions,
  ): Promise<ApiResponse<ListBrowserResult>> {
    return this.client
      .post<ApiResponse<ListBrowserResult>>("/browser/list", options)
      .then((res) => res.data);
  }

  /**
   * 批量修改浏览器窗口分组
   * @param groupId 分组ID
   * @param browserIds 窗口ID数组
   */
  async updateGroup(
    groupId: string,
    browserIds: string[],
  ): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/group/update", {
        groupId,
        browserIds,
      })
      .then((res) => res.data);
  }

  /**
   * 批量修改窗口代理信息
   * @param ids 窗口ID数组
   * @param proxyConfig 代理配置
   */
  async updateProxy(
    ids: string[],
    proxyConfig: {
      ipCheckService?: string;
      proxyMethod: number;
      proxyType: string;
      host: string;
      port: number;
      proxyUserName?: string;
      proxyPassword?: string;
      refreshProxyUrl?: string;
      dynamicIpUrl?: string;
      dynamicIpChannel?: string;
      isDynamicIpChangeIp?: boolean;
      isIpv6?: boolean;
    },
  ): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/proxy/update", {
        ids,
        ...proxyConfig,
      })
      .then((res) => res.data);
  }

  /**
   * 批量修改窗口备注
   * @param browserIds 窗口ID数组
   * @param remark 备注信息
   */
  async updateRemark(
    browserIds: string[],
    remark: string,
  ): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/remark/update", {
        browserIds,
        remark,
      })
      .then((res) => res.data);
  }

  /**
   * 获取已打开窗口的进程PID集合
   * @param ids 窗口ID数组
   */
  async getPids(ids: string[]): Promise<ApiResponse<Record<string, number>>> {
    return this.client
      .post<ApiResponse<Record<string, number>>>("/browser/pids", { ids })
      .then((res) => res.data);
  }

  /**
   * 获取所有活着的已打开的窗口的进程ID
   */
  async getAllPids(): Promise<ApiResponse<Record<string, number>>> {
    return this.client
      .post<ApiResponse<Record<string, number>>>("/browser/pids/all")
      .then((res) => res.data);
  }

  /**
   * 获取活着的给定窗口的PIDs
   * @param ids 窗口ID数组
   */
  async getAlivePids(
    ids: string[],
  ): Promise<ApiResponse<Record<string, number>>> {
    return this.client
      .post<ApiResponse<Record<string, number>>>("/browser/pids/alive", { ids })
      .then((res) => res.data);
  }

  /**
   * 获取所有已打开窗口的调试端口
   */
  async getPorts(): Promise<ApiResponse<Record<string, string>>> {
    return this.client
      .post<ApiResponse<Record<string, string>>>("/browser/ports")
      .then((res) => res.data);
  }

  /**
   * 随机指纹值
   * @param browserId 窗口ID
   */
  async randomFingerprint(browserId: string): Promise<ApiResponse> {
    return this.client
      .post<ApiResponse>("/browser/fingerprint/random", { browserId })
      .then((res) => res.data);
  }
}
