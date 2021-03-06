import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SEO } from "@components/SEO";
import { AnimateSection } from "@components/AnimateText";

import { RoleNav } from "@components/RoleNav";
import { Counter, CountersContainer } from "@components/Counter";
import styles from "styles/Page.module.css";
import { data } from "@lib/role";

const Page: NextPage = () => {
  const router = useRouter();
  const [stat, setStat] = useState({ label: "", value: 0, href: "" });

  useEffect(() => {
    const stats = data[router.asPath as keyof typeof data];
    setStat(stats.stat);
  }, [router.asPath]);

  return (
    <main className={`${styles.container} ${styles.relative}`}>
      <SEO />
      
      <header className={styles.header}>
        <AnimateSection as="h1" className={styles.title}>
          JARVIS MERCER
        </AnimateSection>
        <AnimateSection delay={0.1}>
          <RoleNav />
        </AnimateSection>
      </header>
      <CountersContainer>
        <Counter text={stat.value} />
        {stat.href ? (
          <a href={stat.href} target="_blank" rel="noopener noreferrer">
            {stat.label[0] === "+" ? "" : <>&nbsp;</>}
            {stat.label}
          </a>
        ) : (
          <span>
            {stat.label[0] === "+" ? "" : <>&nbsp;</>}
            {stat.label}
          </span>
        )}
      </CountersContainer>
    </main>
  );
};

export default Page;
