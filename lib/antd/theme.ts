import type { ThemeConfig } from 'antd'

const theme: ThemeConfig = {
  token: {
    // Màu chủ đạo - xanh tươi mới
    colorPrimary: '#10b981', // emerald-500
    colorSuccess: '#22c55e', // green-500
    colorWarning: '#f59e0b', // amber-500
    colorError: '#ef4444', // red-500
    colorInfo: '#3b82f6', // blue-500
    
    // Typography
    fontSize: 16,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    
    // Border radius
    borderRadius: 12,
    borderRadiusLG: 16,
    borderRadiusSM: 8,
    
    // Spacing
    padding: 16,
    margin: 16,
    
    // Colors
    colorBgContainer: '#ffffff',
    colorBgLayout: '#f8fafc',
    colorBorder: '#e2e8f0',
    colorText: '#1e293b',
    colorTextSecondary: '#64748b',
    
    // Shadows
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    boxShadowSecondary: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  },
  components: {
    Layout: {
      headerBg: '#ffffff',
      headerHeight: 72,
      headerPadding: '0 48px',
      bodyBg: '#f8fafc',
    },
    Card: {
      borderRadiusLG: 16,
      boxShadowTertiary: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
    },
    Button: {
      borderRadius: 10,
      controlHeight: 42,
      paddingContentHorizontal: 24,
    },
    Input: {
      borderRadius: 10,
      controlHeight: 42,
      paddingBlock: 10,
    },
    Tag: {
      borderRadiusSM: 6,
    },
  },
}

export default theme

