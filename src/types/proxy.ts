/**
 * 代理相关类型定义
 */

/** 代理检测参数 */
export interface CheckProxyOptions {
  /** 代理主机 */
  host: string;
  /** 代理端口 */
  port: number;
  /** 代理类型 */
  proxyType: "http" | "socks5" | "ssh";
  /** 代理用户名 */
  proxyUserName?: string;
  /** 代理密码 */
  proxyPassword?: string;
  /** IP检测渠道 */
  ipCheckService?: "ip123in" | "ip-api";
  /** 检测IP是否已使用 */
  checkExists?: 0 | 1;
}

/** 代理检测结果 */
export interface CheckProxyResult {
  success: boolean;
  data: {
    ip: string;
    countryName: string;
    stateProv: string;
    countryCode: string;
    region: string;
    city: string;
    languages: string;
    timeZone: string;
    offset: string;
    longitude: string;
    latitude: string;
    zip: string;
    status: number;
    used: boolean;
    usedTime: string | null;
  };
  message?: string;
}
