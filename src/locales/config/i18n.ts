import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {locales} from '@/config/i18n';

export default getRequestConfig(async ({locale}) => {
  // 验证 locale 是否有效
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (await import(`./locale/lang/${locale}/common.json`)).default
  };
});