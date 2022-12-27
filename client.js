import sanityClient from "@sanity/client";

const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID, // you can find this in sanity.config.ts (sanity.json prior to v3)
    dataset: process.env.SANITY_DATASET,
    apiVersion: "2022-12-27", // use current UTC date - see http://sanity.io/docs/api-versioning
    useCdn: true, // `false` if you want to ensure fresh data ie for ISR
  });

  export default client