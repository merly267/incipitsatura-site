import Img from "next/image";
import client from '../client';
import { useNextSanityImage } from "next-sanity-image";

const Image = (imageContent) => {
    const imageProps = useNextSanityImage(client, imageContent)
    return (
        <Img
            {...imageProps}
            style={{ width: '100%', height: 'auto' }}
            alt={imageContent.caption}
			sizes="(max-width: 800px) 100vw, 800px"
        />
    )
}

export default Image