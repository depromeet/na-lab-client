namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    WEB_VERSION: string;
    NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
    NEXT_PUBLIC_MIXPANEL_ID: string;
    NEXT_PUBLIC_HOTJAR_ID: string;
    NEXT_PUBLIC_HOTJAR_SV: string;
    NEXT_PUBLIC_KAKAO_CLIENT_ID: string;
    NEXT_PUBLIC_KAKAO_CLIENT_SECRET: string;
    CLOUDFLARE_ENV: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY: string;
  }
}
