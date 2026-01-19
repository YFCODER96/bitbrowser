/**
 * 通用类型定义
 */

/** API响应基础结构 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  msg?: string;
}

/** Cookie对象 */
export interface Cookie {
  name: string;
  value: string;
  domain: string;
  path?: string;
  expires?: number;
  httpOnly?: boolean;
  secure?: boolean;
  session?: boolean;
  sameSite?: "Strict" | "Lax" | "None";
  sameParty?: boolean;
}
