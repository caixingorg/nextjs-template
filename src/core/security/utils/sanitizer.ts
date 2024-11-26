import DOMPurify from 'dompurify';

export const sanitize = {
  // 基本HTML清理
  html: (dirty: string) => DOMPurify.sanitize(dirty),
  
  // 清理并移除脚本标签
  noScript: (dirty: string) => DOMPurify.sanitize(dirty, {
    FORBID_TAGS: ['script'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick'],
  }),
  
  // 只允许基本的文本格式化
  textOnly: (dirty: string) => DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'span'],
    ALLOWED_ATTR: [],
  }),
};
