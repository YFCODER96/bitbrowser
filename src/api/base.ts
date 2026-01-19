/**
 * 基础API类
 */

import type { AxiosInstance } from "axios";

export class BaseAPI {
  protected client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }
}
