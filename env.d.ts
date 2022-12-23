declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GMAP_API: string;
    }
  }
}

export {};
