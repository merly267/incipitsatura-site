import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "qg5y6uny", // you can find this in sanity.config.ts (sanity.json prior to v3)
  dataset: "production",
  apiVersion: "2022-12-27", // use current UTC date - see http://sanity.io/docs/api-versioning
  useCdn: true, // `false` if you want to ensure fresh data ie for ISR
});