/**
 * 格式化工具
 * @description 提供各种数据格式化功能
 * @module utils/format
 */

import dayjs from 'dayjs';
import { Optional } from '../types';

/**
 * 日期格式化选项
 */
export interface DateFormatOptions {
  format?: string;
  timezone?: string;
}

/**
 * 数字格式化选项
 */
export interface NumberFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  style?: 'decimal' | 'currency' | 'percent';
  currency?: string;
}

/**
 * 格式化日期
 * @param date - 日期
 * @param options - 格式化选项
 */
export function formatDate(
  date: Optional<Date | string | number>,
  options: DateFormatOptions = {}
): string {
  if (!date) return '';
  const { format = 'YYYY-MM-DD HH:mm:ss' } = options;
  return dayjs(date).format(format);
}

/**
 * 格式化数字
 * @param number - 数字
 * @param options - 格式化选项
 */
export function formatNumber(
  number: Optional<number>,
  options: NumberFormatOptions = {}
): string {
  if (number == null) return '';

  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    style = 'decimal',
    currency = 'CNY',
  } = options;

  return new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits,
    maximumFractionDigits,
    style,
    currency,
  }).format(number);
}

/**
 * 格式化金额
 * @param amount - 金额
 * @param currency - 货币代码
 */
export function formatMoney(
  amount: Optional<number>,
  currency: string = 'CNY'
): string {
  if (amount == null) return '';
  return formatNumber(amount, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });
}

/**
 * 格式化百分比
 * @param number - 数字
 * @param decimals - 小数位数
 */
export function formatPercent(
  number: Optional<number>,
  decimals: number = 2
): string {
  if (number == null) return '';
  return formatNumber(number, {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * 文件大小格式化
 * @param bytes - 字节数
 * @param decimals - 小数位数
 */
export function formatFileSize(bytes: Optional<number>, decimals: number = 2): string {
  if (bytes == null) return '';
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

/**
 * 格式化手机号
 * @param phone - 手机号
 */
export function formatPhone(phone: Optional<string>): string {
  if (!phone) return '';
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
}

/**
 * 格式化身份证号
 * @param idCard - 身份证号
 */
export function formatIdCard(idCard: Optional<string>): string {
  if (!idCard) return '';
  return idCard.replace(/(\d{6})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
}

/**
 * 格式化银行卡号
 * @param cardNumber - 银行卡号
 */
export function formatBankCard(cardNumber: Optional<string>): string {
  if (!cardNumber) return '';
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
}
