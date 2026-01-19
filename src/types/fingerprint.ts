/**
 * 浏览器指纹相关类型定义
 */

/** 浏览器指纹配置 */
export interface BrowserFingerPrint {
  /** 内核，chrome | firefox，默认chrome */
  coreProduct?: "chrome" | "firefox";
  /** chrome内核默认130，firefox内核默认128 */
  coreVersion?: string;
  /** 操作系统平台 PC | Android | IOS */
  ostype?: "PC" | "Android" | "IOS";
  /** navigator.platform值 Windows=>Win32, macOS=>MacIntel, Linux=>Linux x86_64 */
  os?: "Win32" | "MacIntel" | "Linux x86_64" | "iPhone" | "Linux armv81";
  /** 操作系统版本，windows: '11,10', Android: '14,13,12', iOS: '17.0,16.6' */
  osVersion?: string;
  /** 浏览器版本，建议与coreVersion保持一致 */
  version?: string;
  /** UA，不填则自动生成 */
  userAgent?: string;
  /** 基于IP生成对应的时区 */
  isIpCreateTimeZone?: boolean;
  /** 时区 */
  timeZone?: string;
  /** 时区偏移量 */
  timeZoneOffset?: number;
  /** webrtc 0=>替换, 1=>允许, 2=>禁止, 3=>隐私 */
  webRTC?: "0" | "1" | "2" | "3";
  /** 忽略https证书错误 */
  ignoreHttpsErrors?: boolean;
  /** 地理位置 0=>询问, 1=>允许, 2=>禁止 */
  position?: "0" | "1" | "2";
  /** 是否基于IP生成对应的地理位置 */
  isIpCreatePosition?: boolean;
  /** 纬度 */
  lat?: string;
  /** 经度 */
  lng?: string;
  /** 精度米 */
  precisionData?: string;
  /** 是否基于IP生成对应国家的浏览器语言 */
  isIpCreateLanguage?: boolean;
  /** 语言列表 */
  languages?: string;
  /** 是否基于IP生成对应国家的浏览器界面语言 */
  isIpCreateDisplayLanguage?: boolean;
  /** 浏览器界面语言 */
  displayLanguages?: string;
  /** 窗口宽度 */
  openWidth?: number;
  /** 窗口高度 */
  openHeight?: number;
  /** 分辨率类型 0=>跟随电脑, 1=>自定义 */
  resolutionType?: "0" | "1";
  /** 自定义分辨率 */
  resolution?: string;
  /** 约束窗口最大尺寸不超过分辨率 */
  windowSizeLimit?: boolean;
  /** 显示缩放比例 */
  devicePixelRatio?: number;
  /** 字体生成类型 0=>系统默认 | 2=>随机 */
  fontType?: "0" | "2";
  /** canvas 0随机｜1关闭 */
  canvas?: "0" | "1";
  /** webGL图像，0随机｜1关闭 */
  webGL?: "0" | "1";
  /** webgl元数据 0自定义｜1关闭 */
  webGLMeta?: "0" | "1";
  /** webGL厂商值 */
  webGLManufacturer?: string;
  /** webGL渲染值 */
  webGLRender?: string;
  /** audioContext值，0随机｜1关闭 */
  audioContext?: "0" | "1";
  /** 媒体设备，0随机 | 1关闭 */
  mediaDevice?: "0" | "1";
  /** Speech Voices，0随机｜1关闭 */
  speechVoices?: "0" | "1";
  /** 硬件并发数 */
  hardwareConcurrency?: string;
  /** 设备内存 */
  deviceMemory?: string;
  /** doNotTrack 1开启｜0关闭 */
  doNotTrack?: "0" | "1";
  /** ClientRects */
  clientRectNoiseEnabled?: boolean;
  /** 端口扫描保护 0开启｜1关闭 */
  portScanProtect?: "0" | "1";
  /** 端口白名单 */
  portWhiteList?: string;
  /** 自定义设备信息 */
  deviceInfoEnabled?: boolean;
  /** 计算机名 */
  computerName?: string;
  /** MAC地址 */
  macAddr?: string;
  /** 主机IP */
  hostIP?: string;
  /** ssl是否禁用特性 */
  disableSslCipherSuitesFlag?: boolean;
  /** ssl禁用特性 */
  disableSslCipherSuites?: any;
  /** 是否启用插件指纹 */
  enablePlugins?: boolean;
  /** 插件指纹值 */
  plugins?: string;
  /** 启动参数 */
  launchArgs?: string;
}
