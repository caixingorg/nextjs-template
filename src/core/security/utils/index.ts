/**
 * 安全工具
 * @description 提供加密、解密、哈希等安全相关功能
 * @module utils/security
 */

import CryptoJS from 'crypto-js';
import { Optional } from '../types';

/**
 * 加密配置
 */
export interface EncryptConfig {
  key: string;
  iv?: string;
}

/**
 * AES加密
 * @param data - 待加密数据
 * @param config - 加密配置
 */
export function aesEncrypt(data: any, config: EncryptConfig): string {
  const { key, iv } = config;
  const cipher = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    CryptoJS.enc.Utf8.parse(key),
    {
      iv: iv ? CryptoJS.enc.Utf8.parse(iv) : undefined,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return cipher.toString();
}

/**
 * AES解密
 * @param cipherText - 密文
 * @param config - 加密配置
 */
export function aesDecrypt(cipherText: string, config: EncryptConfig): any {
  const { key, iv } = config;
  const cipher = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(key), {
    iv: iv ? CryptoJS.enc.Utf8.parse(iv) : undefined,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return JSON.parse(cipher.toString(CryptoJS.enc.Utf8));
}

/**
 * MD5哈希
 * @param data - 待哈希数据
 */
export function md5(data: any): string {
  return CryptoJS.MD5(JSON.stringify(data)).toString();
}

/**
 * SHA256哈希
 * @param data - 待哈希数据
 */
export function sha256(data: any): string {
  return CryptoJS.SHA256(JSON.stringify(data)).toString();
}

/**
 * Base64编码
 * @param data - 待编码数据
 */
export function base64Encode(data: string): string {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data));
}

/**
 * Base64解码
 * @param data - 待解码数据
 */
export function base64Decode(data: string): string {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
}

/**
 * 生成UUID
 */
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 生成随机字符串
 * @param length - 长度
 * @param chars - 字符集
 */
export function generateRandomString(
  length: number,
  chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  let result = '';
  const charactersLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * 敏感信息脱敏
 * @param value - 待脱敏的值
 * @param start - 开始保留的位数
 * @param end - 结束保留的位数
 */
export function maskSensitiveInfo(
  value: Optional<string>,
  start: number = 3,
  end: number = 4
): string {
  if (!value) return '';
  const length = value.length;
  if (length <= start + end) return value;
  return (
    value.slice(0, start) +
    '*'.repeat(length - start - end) +
    value.slice(length - end)
  );
}
