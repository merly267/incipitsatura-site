import Link from "next/link";
import styles from '../styles/siteTitle.module.css'

const SiteTitle = ({currentSlug}) => {
    return (
        <header>
            {!currentSlug ? 
            <h1 className={styles.heading}>{process.env.NEXT_PUBLIC_SITE_TITLE}</h1> : 
            <Link href='/' className={styles.heading}>{process.env.NEXT_PUBLIC_SITE_TITLE}</Link>}   
        </header>
    )
}

export default SiteTitle