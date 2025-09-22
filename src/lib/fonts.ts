import localFont from 'next/font/local';

export const satoshi = localFont({
  src: [

    {
      path: '../../public/fonts/Satoshi-Bold.woff2',
      weight: '700', // bold weight
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
});
