declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SITE_TITLE: string;
      NEXT_PUBLIC_SITE_DESCRIPTION: string;
      NEXT_PUBLIC_SITE_ROOT: string;
      NEXT_PUBLIC_SITE_CREATED_DATE: number;

      NEXT_PUBLIC_SANITY_PROJECT_ID: string;
      NEXT_PUBLIC_SANITY_DATASET: string;

    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}