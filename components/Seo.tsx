import Head from "next/head";

type SeoProps = {
    title: string | undefined
    description: string | undefined
    url: string
}

const Seo = ({ title, description, url }: SeoProps) => {
    if (!url) {
        return null
    }
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <link rel="canonical" href={url} />

            <meta property="og:url" content={url} key="ogurl" />
            <meta property="og:title" content={title} key="ogtitle" />
            <meta property="og:description" content={description} key="ogdesc" />
            <meta property="og:site_name" content={process.env.NEXT_PUBLIC_SITE_TITLE} key="ogsitename" />
            <meta property="og:type" content="website" key="ogtype" />

            <meta name="twitter:title" content={title} key="twtitle" />
            <meta name="twitter:description" content={description} key="twdesc" />
            <meta name="twitter:card" content="summary" key="twcard" />
        </Head>
    )
}

export default Seo