import styles from "./Header.module.css";
import Button from "./components/Button";
import Space from "./components/Space";
import Tab from "./components/Tabs";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.buttonContainer}>
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "tansparent",
            color: "black",
          }}
        >
          Watch
        </Button>
        <Space />
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "tansparent",
            color: "black",
          }}
        >
          Fork <div className={styles.circle}>5</div>
        </Button>
        <Space />
        <Button
          style={{
            fontSize: "14px",
            backgroundColor: "tansparent",
            color: "black",
          }}
        >
          Star
        </Button>
      </div>
      <Tab title="title" number={5} />
    </div>
  );
}
