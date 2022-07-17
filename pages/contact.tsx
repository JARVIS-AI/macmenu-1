import type { NextPage } from "next";
import { SEO } from "@components/SEO";
import { AnimateText, AnimateSection } from "@components/AnimateText";
import { Link } from "@components/Link";
import { socialLinks } from "@lib/social";
import styles from "styles/Page.module.css";

const social = Object.values(socialLinks).map((r) => r.link);

const Page: NextPage = () => {
    return (
        <main className={styles.container}>
            <SEO title="Contact" />
            <header className={styles.header}>
                <AnimateText
                className={styles.title}
                rotate={["code", "pixels", "limits"]}
                >
                Contact
                </AnimateText>
            </header>
            <AnimateSection as="p" delay={0.1}>
                I’m always open to discussing new opportunities.
            </AnimateSection>
            <section className={styles.grid}>
                <div>
                    <AnimateSection as="h2" className={styles.caption} delay={0.2}>
                        Contact
                    </AnimateSection>
                    <ul className={`${styles.list} ${styles.contactList}`}>
                        <AnimateSection as="li" delay={0.4}>
                        <Link href="mailto:ams.h4ck3r@gmail.com">Email</Link>
                        </AnimateSection>
                        {/* <AnimateSection as="li" delay={0.45}>
                        <Link href="https://twitter.com/ams_h4ck3r">Twitter</Link>
                        </AnimateSection>
                        <AnimateSection as="li" delay={0.5}>
                        <Link href="https://www.linkedin.com/in/ams-h4ck3r/">LinkedIn</Link>
                        </AnimateSection> */}
                    </ul>
                    <AnimateSection as="p" delay={0.6}>
                    You can also find me on the social network apps that I have.{'\n'}
                    {'\n'}Sometimes I am online sometimes I am not.
                    {"\n"}Depends on the situation and other realted stuff, also for private question you can email me directly.
                    The priority is to get back to you as soon as possible by emails then other social apps.
                    I will not answer all mails so keep this in mind too only private and important stuff.
                    </AnimateSection>
                </div>
                <div>
                    <AnimateSection as="h2" className={styles.caption} delay={0.7}>
                        Social
                    </AnimateSection>
                    <ul className={`${styles.list} ${styles.contactList}`}>
                        {social.map(({ name, url, icon }, index) => (
                        <AnimateSection as="li" delay={0.9}>
                        <Link href={url}>{name}</Link><span>{icon}</span>
                        </AnimateSection>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    ); 
};

export default Page;
