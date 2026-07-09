import styles from "./Sidebar.module.css";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>UI Demo AI</h2>

      <nav>
        <ul className={styles.menu}>

          <li>
            <Link href="/chat">Home</Link>
          </li>

          <li>
            <Link href="/chat">Chat</Link>
          </li>

          <li>
            <Link href="/documents">Document</Link>
          </li>
          <li>
            <Link href="/chat">Analyze</Link>
          </li>
          <li>
            <Link href="/chat">Knowledge</Link>
          </li>
          <li>
            <Link href="/chat">Semantic</Link>
          </li>

        </ul>
      </nav>
    </aside>
  );
}
