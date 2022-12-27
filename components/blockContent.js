import { PortableText } from "@portabletext/react";
import Link from "next/link";

// see https://github.com/portabletext/react-portabletext

const components = {
  marks: {
    customLink: ({ value, children }) => {
      return (
        <>
          {value?.internal ? (
            <Link href={`/post/${value?.slug?.current}`}>{children[0]}</Link>
          ) : value?.external ? (
            <a href={value.external}>{children}</a>
          ) : null}
        </>
      );
    },
  },
};

const BlockContent = ({ blocks }) => (
  <PortableText value={blocks} components={components} />
);

export default BlockContent;