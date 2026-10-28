import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    /** 后端路由模式 */
    accessMode: 'backend',
    name: import.meta.env.VITE_APP_TITLE,
    enableRefreshToken: true,
    preferencesButtonPosition: 'user-dropdown',
  },
  theme: {
    mode: 'light',
  },
  footer: {
    /** 默认关闭 footer 页脚，因为有一定遮挡 */
    enable: false,
    fixed: false,
  },
  copyright: {
    companyName: '达运科技',
    companySiteLink: 'https://www.scdytech.com',
    icp: '川ICP备51024350号',
  },
  widget: {
    languageToggleButtonPosition: 'user-dropdown',
    logoutButtonPosition: 'user-dropdown',
    themeToggleButtonPosition: 'user-dropdown',
    timezoneButtonPosition: 'user-dropdown',
  },
});

// export const preferencesExtension =
//   definePreferencesExtension<WebAntdPreferencesExtension>({
//     tabLabel: 'preferences.antd.tabLabel',
//     title: 'preferences.antd.title',
//     fields: [
//       {
//         component: 'switch',
//         defaultValue: true,
//         key: 'enableFormFullscreen',
//         label: 'preferences.antd.fields.enableFormFullscreen.label',
//         tip: 'preferences.antd.fields.enableFormFullscreen.tip',
//       },
//       {
//         component: 'select',
//         defaultValue: 'single',
//         key: 'tenantMode',
//         label: 'preferences.antd.fields.tenantMode.label',
//         options: [
//           {
//             label: 'preferences.antd.fields.tenantMode.options.single.label',
//             value: 'single',
//           },
//           {
//             label: 'preferences.antd.fields.tenantMode.options.multi.label',
//             value: 'multi',
//           },
//         ],
//       },
//       {
//         component: 'number',
//         componentProps: {
//           max: 200,
//           min: 10,
//           step: 10,
//         },
//         defaultValue: 20,
//         key: 'defaultTableSize',
//         label: 'preferences.antd.fields.defaultTableSize.label',
//       },
//       {
//         component: 'input',
//         defaultValue: '',
//         key: 'reportTitle',
//         label: 'preferences.antd.fields.reportTitle.label',
//         placeholder: 'preferences.antd.fields.reportTitle.placeholder',
//       },
//     ],
//   });
