<script lang="ts" setup>
import { computed } from 'vue';

import { IconifyIcon } from '@vben/icons';
import { getFileNameFromUrl, isImage } from '@vben/utils';

import { Image } from 'antdv-next';

defineOptions({ name: 'BpmTaskEvidence' });

const props = withDefaults(
  defineProps<{
    attachments?: null | string | string[];
    compact?: boolean;
    emptyText?: string;
    reason?: string;
    reasonLabel?: string;
    signPicUrl?: null | string;
  }>(),
  {
    attachments: () => [],
    emptyText: '-',
    reason: '',
    reasonLabel: '审批意见',
    signPicUrl: '',
  },
);

const COMPACT_ATTACHMENT_LIMIT = 2;

const reasonText = computed(() => props.reason?.trim() || '');
const attachmentList = computed(() => normalizeAttachments(props.attachments)); // 附件列表
const visibleAttachments = computed(() =>
  attachmentList.value.slice(0, COMPACT_ATTACHMENT_LIMIT),
); // 紧凑模式下最多展示的附件
const hiddenAttachmentCount = computed(() =>
  Math.max(0, attachmentList.value.length - COMPACT_ATTACHMENT_LIMIT),
); // 紧凑模式下被折叠的附件数量
const hiddenAttachmentTitle = computed(() =>
  attachmentList.value
    .slice(COMPACT_ATTACHMENT_LIMIT)
    .map((item) => getFileNameFromUrl(item))
    .join('、'),
); // 紧凑模式下被折叠附件的文件名
const signPicUrlValue = computed(() => props.signPicUrl?.trim() || ''); // 签名图片地址
const hasEvidence = computed(
  () =>
    !!reasonText.value ||
    attachmentList.value.length > 0 ||
    !!signPicUrlValue.value,
); // 是否存在审批凭证

/** 标准化附件列表 */
function normalizeAttachments(attachments?: null | string | string[]) {
  if (!attachments) {
    return [];
  }
  const list = Array.isArray(attachments)
    ? attachments
    : String(attachments).split(',');
  return list.map((item) => item.trim()).filter(Boolean);
}

/** 判断是否图片附件 */
function isImageAttachment(url: string) {
  return isImage(getFileNameFromUrl(url));
}
</script>

<template>
  <div
    v-if="hasEvidence"
    :class="
      compact
        ? 'flex flex-wrap items-center justify-center gap-1 text-xs text-gray-500'
        : 'mt-1 w-full rounded-md bg-gray-100 p-2 text-sm text-gray-500'
    "
  >
    <template v-if="compact">
      <a
        v-for="attachment in visibleAttachments"
        :key="attachment"
        :href="attachment"
        target="_blank"
        class="inline-flex h-6 max-w-[120px] items-center gap-1 rounded border border-solid border-gray-200 bg-white px-1.5 text-xs text-blue-600 hover:border-blue-400 hover:text-blue-700"
        :title="getFileNameFromUrl(attachment)"
      >
        <img
          v-if="isImageAttachment(attachment)"
          :src="attachment"
          class="size-4 shrink-0 rounded object-cover"
        />
        <IconifyIcon
          v-else
          icon="lucide:file-text"
          class="size-3.5 shrink-0 text-gray-400"
        />
        <span class="truncate">{{ getFileNameFromUrl(attachment) }}</span>
      </a>
      <span
        v-if="hiddenAttachmentCount > 0"
        class="inline-flex h-6 items-center rounded border border-solid border-gray-200 bg-white px-1.5 text-xs text-gray-500"
        :title="hiddenAttachmentTitle"
      >
        +{{ hiddenAttachmentCount }}
      </span>
      <div
        v-if="signPicUrlValue"
        class="inline-flex h-6 items-center gap-1 rounded border border-solid border-gray-200 bg-white px-1"
        title="点击查看签名"
      >
        <Image
          :src="signPicUrlValue"
          :height="20"
          :width="48"
          class="!h-5 !w-12 rounded-sm bg-white object-contain"
        />
        <span class="text-xs text-gray-500">签名</span>
      </div>
    </template>

    <template v-else>
      <div v-if="reasonText" class="w-full">
        {{ reasonLabel }}：{{ reasonText }}
      </div>

      <div
        v-if="attachmentList.length > 0"
        class="w-full"
        :class="{
          'mt-2 border-t border-dashed border-gray-300 pt-2': reasonText,
        }"
      >
        <div class="mb-1 text-xs font-semibold text-gray-400">附件列表：</div>
        <div class="flex flex-wrap gap-1.5">
          <a
            v-for="attachment in attachmentList"
            :key="attachment"
            :href="attachment"
            target="_blank"
            class="inline-flex max-w-[220px] items-center gap-1 rounded border border-solid border-gray-200 bg-white px-2 py-1 text-blue-500 hover:text-blue-600 hover:underline"
            :title="getFileNameFromUrl(attachment)"
          >
            <img
              v-if="isImageAttachment(attachment)"
              :src="attachment"
              class="size-5 rounded object-cover"
            />
            <IconifyIcon v-else icon="lucide:file-text" class="text-gray-400" />
            <span class="truncate">{{ getFileNameFromUrl(attachment) }}</span>
          </a>
        </div>
      </div>

      <div
        v-if="signPicUrlValue"
        class="w-full"
        :class="{
          'mt-2 border-t border-dashed border-gray-300 pt-2':
            reasonText || attachmentList.length,
        }"
      >
        <div class="mb-1 text-xs font-semibold text-gray-400">签名：</div>
        <Image
          :src="signPicUrlValue"
          :height="60"
          class="max-w-[180px] rounded border border-solid border-gray-200 bg-white object-contain"
        />
      </div>
    </template>
  </div>
  <span v-else-if="compact" class="text-gray-400">{{ emptyText }}</span>
</template>
