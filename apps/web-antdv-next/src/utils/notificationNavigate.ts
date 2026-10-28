import { isOpenableUrl } from '@vben/utils';

import { router } from '#/router';

/**
 * 按站内信跳转链接（NotifyMessage.url）导航
 *
 * - http(s):// 开头：外部链接，新标签页打开
 * - / 开头：内部路由；必须显式拆分 path 与 query 后再 router.push，
 *   避免 vue-router 对 path 携带 `?a=1` 的解析差异导致 query 丢失（如流程详情页拿不到 id 白屏）
 * - 其余（javascript: 等）协议：经 isOpenableUrl 白名单校验后拒绝
 */
export async function navigateByNotificationLink(
  link?: null | string,
): Promise<boolean> {
  if (!link || !isOpenableUrl(link)) {
    return false;
  }
  if (link.startsWith('http://') || link.startsWith('https://')) {
    window.open(link, '_blank');
    return true;
  }
  const parsed = new URL(link, window.location.origin);
  const query: Record<string, string> = {};
  parsed.searchParams.forEach((value, key) => {
    query[key] = value;
  });
  await router.push({ path: parsed.pathname, query });
  return true;
}
