namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    WEB_VERSION: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
    NEXT_PUBLIC_MIXPANEL_ID: string;
    NEXT_PUBLIC_HOTJAR_ID: string;
    NEXT_PUBLIC_HOTJAR_SV: string;
  }
}
