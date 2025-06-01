import { createTheme } from '@mantine/core';

export const theme = createTheme({
  colors: {
    indigo: [
      '#E8ECFA',
      '#C4CEFD',
      '#A0B0F5',
      '#7C92F0',
      '#5874EA',
      '#3F5BE5',
      '#2C47D8',
      '#1F3AB8',
      '#162E9A',
      '#10247D',
    ],
    yellow: [
      '#FFF8E1',
      '#FFECB3',
      '#FFE082',
      '#FFD54F',
      '#FFCA28',
      '#FFC107',
      '#FFB300',
      '#FFA000',
      '#FF8F00',
      '#FF6F00',
    ],
    teal: [
      '#ccfbf1',
      '#99f6e4',
      '#5eead4',
      '#2dd4bf',
      '#14b8a6',
      '#0d9488',
      '#0f766e',
      '#115e59',
      '#134e4a',
      '#042f2e',
    ],
  },
  primaryColor: 'indigo',
  fontFamily: 'Poppins, Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  defaultRadius: 'md',
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '24px',
  },
  headings: {
    fontWeight: '600', 
    sizes: {
      h1: { fontSize: '32px', lineHeight: '1.2' },  
      h2: { fontSize: '24px', lineHeight: '1.3' },  
      h3: { fontSize: '20px', lineHeight: '1.4' },  
    },
  },
  components: {
    Button: {
      styles: {
        root: {
          fontWeight: '500', // String
          padding: '10px 20px',
        },
      },
    },
    Card: {
      styles: {
        root: {
          overflow: 'visible',
        },
      },
    },
    Modal: {
      styles: {
        title: {
          fontWeight: '600', // String
          fontSize: '20px',
        },
      },
    },
    Container: {
      styles: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});