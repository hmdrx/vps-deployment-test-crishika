declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      LOCAL_DATABASE: string;
      CLOUD_DATABASE: string;
      JWT_SECRETE: string;
      CLOUD_DATABASE_PASSWORD: string;
      JWT_EXPIRES_IN: string;
      EMAIL_ID: string;
      EMAIL_PASSWORD: string;
      OTPLESS_API_CLIENT_ID: string;
      OTPLESS_API_CLIENT_SECRETE: string;
    }
  }
}

export {};
