import client from '../client'
import Seo from '../components/Seo'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'

type Post = {
  _id: string
  title: string
  description: string
  publishedAt: Date
  slug: {
    current: string
  }
}

const inter = Inter({ subsets: ['latin'] })

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo
        title={process.env.NEXT_PUBLIC_SITE_TITLE}
        description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        url={`${process.env.NEXT_PUBLIC_SITE_ROOT}/`}
      />
      <main className={styles.main}>
        <h1>{process.env.NEXT_PUBLIC_SITE_TITLE}</h1>
        <p>{process.env.NEXT_PUBLIC_SITE_DESCRIPTION}</p>
        {posts ? posts.length > 0 && posts.map(
          ({ _id, title = '', slug = {}, publishedAt = '', description = '' }) =>
              slug && (
                <li key={_id}>
                  <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                    {title}
                  </Link>{' '}
                  ({new Date(publishedAt).toDateString()})
                  {description}
                </li>
          )
        ) : ''}
      </main>
    </>
  )
}

export async function getStaticProps() {
  const posts: Post[] = await client.fetch(`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)`)
  return {
    props: {
      posts
    }
  }
}

export default Index
