import styles from "./Sidebar.module.css";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>UI Demo AI</h2>

      <nav>
        <ul className={styles.menu}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/pages/documents">Document</Link>
          </li>
          <li>
            <Link href="/pages/analyse">Analyze</Link>
          </li>
          <li>
            <Link href="/pages/embeddings">Embeddings</Link>
          </li>
          <li>
            <Link href="/emantic">Semantic</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
