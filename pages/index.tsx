import client from '../client'
import Seo from '../components/Seo'
import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'

import styles from '../styles/home.module.css'

type Post = {
  _id: string
  title: string
  description: string
  publishedAt: Date
  slug: {
    current: string
  }
}

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Seo
        title={process.env.NEXT_PUBLIC_SITE_TITLE}
        description={process.env.NEXT_PUBLIC_SITE_DESCRIPTION}
        url={`${process.env.NEXT_PUBLIC_SITE_ROOT}/`}
      />
        <p className={styles.site_description}>{process.env.NEXT_PUBLIC_SITE_DESCRIPTION}</p>
        <ul className={styles.blog_roll}>
          {posts ? posts.length > 0 && posts.map(
            ({ _id, title = '', slug = {}, publishedAt = '', description = '' }) =>
                slug && (
                  <li key={_id}>
                    <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                      {title}
                    </Link>
                    <div className={styles.date}>{new Date(publishedAt).toLocaleDateString('en-uk', { day: "numeric", year:"numeric", month:"short" })}</div>
                    <div className={styles.description}>{description}</div>
                  </li>
            )
          ) : ''}
        </ul>
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
