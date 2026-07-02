
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h2>UI Demo AI</h2>

      <nav>
        <ul>
          <li>Home</li>
          <li>Chat</li>
          <li>Document</li>
          <li>Analyze</li>
          <li>Knowledge</li>
          <li>Semantic</li>
        </ul>
      </nav>
    </aside>
  );
}
