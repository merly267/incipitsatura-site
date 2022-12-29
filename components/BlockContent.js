import { PortableText } from "@portabletext/react";
import Link from "next/link";
import Image from "./Image";

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
    types: {
        imageContent: ({value}) => {
            return (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image {...value} />
            )
        }
    }
};

const BlockContent = ({ blocks }) => (
  <PortableText value={blocks} components={components} />
);

export default BlockContent;