import Link from "next/link";
import { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import useRaf from "@rooks/use-raf";
import { ThemeToggle } from "@components/ThemeToggle";
import styles from "./Dock.module.css";
import { useRouter } from "next/router";

const spring = {
  type : "spring",
  stiffness : 300,
  damping : 50,
};

const iconAttrs = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round" as "round",
  strokeLinejoin: "round" as "round",
  ["aria-hidden"]: true,
  //["class"]:  styles.pulse,
};

const links = [
  {
    href: "/",
    label: "Home",
    tooltip: "Home",
    icon: (
      <svg {...iconAttrs}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    href: "/about",
    label: "About",
    tooltip: "About",
    icon: (
      <svg {...iconAttrs}>
        
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  {
    href: "/projects",
    label: "Projects",
    tooltip: "Projects",
    icon: (
      <svg {...iconAttrs}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    href: "/contact",
    label: "Contact",
    tooltip: "Contact",
    icon: (
      <svg {...iconAttrs}>
        <path d="M20 4H4" />
        <path d="M20 4L4 20" />
      </svg>
    ),
  },
  {
    href: "/resume",
    label: "Resume",
    tooltip: "Resume",
    icon: (
      <svg {...iconAttrs}>
        <path d="M20 21V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2zM8.5 6H4v10h4.5a2.5 2.5 0 0 1 0 5H4V6h4.5a2.5 2.5 0 0 1 0 5z" />
      </svg>
    ),
  },
  {
    href: "/writing",
    label: "Writing",
    tooltip: "Writing",
    icon: (
      <svg {...iconAttrs}>
        <path d="M4 4h16v2H4z" />
        <path d="M20 4h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
      </svg>
    ),
  },
];

export const Dock = () => {
  const mouseX = useMotionValue<null | number>(null);
  const router = useRouter();

  return (
    <nav className={styles.container}>
      <ul
        className={styles.list}
        onMouseMove={(event) => mouseX.set(event.nativeEvent.x)}
        onMouseLeave={() => mouseX.set(null)}
      >
        {links.map(({ href, label, icon }) => (
          <DockItem key={href} mouseX={mouseX}>
            <Link href={href}>
              <a className={styles.link} title={label} aria-label={label}>
                {icon}
              </a>
            </Link>
            {router.asPath === href && (
              <motion.div
                layoutId="underline_dock"
                className={styles.underline_dock}
                // className={[styles.underline_dock, styles.pulse].join(" ")}
                initial={false}
                transition={spring}
              />
            )}
          </DockItem>
        ))}
        <DockItem mouseX={mouseX}>
          <ThemeToggle />
        </DockItem>
      </ul>
    </nav>
  );
};

const baseWidth = 48;
const distanceLimit = baseWidth * 2;
const beyondTheDistanceLimit = distanceLimit + 1;

const distanceInput = [
  -distanceLimit,
  -distanceLimit / 0.10,
  -distanceLimit / 0.15,
  -distanceLimit / 0.25,
  -distanceLimit / 0.50,
  -distanceLimit / 0.75,
  -distanceLimit / 1.00,
  -distanceLimit / 1.15,
  -distanceLimit / 1.25,
  -distanceLimit / 1.35,
  -distanceLimit / 1.50,
  -distanceLimit / 1.65,
  -distanceLimit / 1.75,
  -distanceLimit / 2.00,
  0,
  distanceLimit / 2.00,
  distanceLimit / 1.75,
  distanceLimit / 1.65,
  distanceLimit / 1.50,
  distanceLimit / 1.35,
  distanceLimit / 1.25,
  distanceLimit / 1.15,
  distanceLimit / 1.00,
  distanceLimit / 0.75,
  distanceLimit / 0.50,
  distanceLimit / 0.25,
  distanceLimit / 0.15,
  distanceLimit / 0.10,
  distanceLimit,
];

const sizeOutput = [
  baseWidth,
  baseWidth * 0.50,
  baseWidth * 0.75,
  baseWidth * 0.90,
  baseWidth * 0.95,
  baseWidth * 1.0,
  baseWidth * 1.10,
  baseWidth * 1.15,
  baseWidth * 1.20,
  baseWidth * 1.25,
  baseWidth * 1.30,
  baseWidth * 1.35,
  baseWidth * 1.40,
  baseWidth * 1.45,
  baseWidth * 1.50,
  baseWidth * 1.45,
  baseWidth * 1.40,
  baseWidth * 1.35,
  baseWidth * 1.30,
  baseWidth * 1.25,
  baseWidth * 1.20,
  baseWidth * 1.15,
  baseWidth * 1.10,
  baseWidth * 1.0,
  baseWidth * 0.95,
  baseWidth * 0.90,
  baseWidth * 0.75,
  baseWidth * 0.50,
  baseWidth,
];

const DockItem = ({
  children,
  mouseX,
}: {
  children: React.ReactNode;
  mouseX: MotionValue;
}) => {
  const distance = useMotionValue(beyondTheDistanceLimit);
  const size = useSpring(useTransform(distance, distanceInput, sizeOutput), {
    damping: 74,
    stiffness: 750,
  });

  const ref = useRef<HTMLLIElement>(null);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();
    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();

      // get the x coordinate of the img DOMElement's center
      // the left x coordinate plus the half of the width
      const imgCenterX = rect.left + rect.width / 2;

      // difference between the x coordinate value of the mouse pointer
      // and the img center x coordinate value
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return (
    <motion.li
      ref={ref}
      className={styles.item}
      style={{ width: size, height: size }}
    >
      {children}
    </motion.li>
    
  );
};
