import { Platform } from 'react-native';

export const colors = {
  ink: '#0D1720',
  surface: '#152332',
  surface2: '#1C2E42',
  surface3: '#24384F',
  gold: '#C9A24B',
  goldDim: '#8C7638',
  goldBright: '#E4C378',
  text: '#EDEEEF',
  textDim: '#8FA0B2',
  textFaint: '#5E7085',
  ok: '#5C9A6E',
  okBg: 'rgba(92,154,110,0.14)',
  bad: '#C2564A',
  badBg: 'rgba(194,86,74,0.14)',
  line: 'rgba(255,255,255,0.09)',
};

// System fonts only — keeps the app dependency-free (no custom font loading).
export const fonts = {
  serif: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
  sans: Platform.select({ ios: 'System', android: 'sans-serif', default: 'System' }),
  mono: Platform.select({ ios: 'Courier New', android: 'monospace', default: 'monospace' }),
};
