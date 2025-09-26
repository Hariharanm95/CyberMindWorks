import localFont from 'next/font/local';

export const satoshi = localFont({
  src: [

    {
      path: '../../public/fonts/Satoshi-Variable.woff2',
      weight: '600',
      style: 'normal',
    },

  ],
  variable: '--font-satoshi',
});
