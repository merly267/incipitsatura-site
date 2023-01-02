import { Palanquin, PT_Serif } from '@next/font/google'
import styles from '../styles/layout.module.css'

import SiteTitle from '../components/SiteTitle'
import Footer from '../components/Footer'

const bodyFont = Palanquin({
  // need to specify weight if font is not variable
  weight: '400', 
  subsets: ['latin'],
  variable: '--bodyfont',
})

const headingFont = PT_Serif({ 
    // need to specify weight if font is not variable
    weight: '400', 
    subsets: ['latin'],
    variable: '--headingfont',
  })

export default function Layout({ children }) {
    return (
        <div className={`${bodyFont.variable} ${headingFont.variable} ${styles.container}`}>
            <SiteTitle currentSlug={children.props.currentSlug}></SiteTitle>
            <main className={styles.main}>{children}</main>
            <Footer></Footer>
        </div>
    )
}