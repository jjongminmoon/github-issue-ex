import dayjs from "dayjs";
import Badge from "./Badge";
import styles from "./ListItem.module.css";
import ListItemLayout from "./ListItemLayout";

export default function ListItem({
  checked,
  onChangeCheckBox,
  onClickTitle,
  data,
}) {
  const badges = data.labels;
  const state = data.state === "open" ? "opened" : "closed";
  const date = data.state === "open" ? data.created_at : data.closed_at;

  return (
    <ListItemLayout>
      <div>
        <div role="button" onClick={onClickTitle} className={styles.title}>
          {data.title}
          {badges.length > 0 &&
            badges.map((badgeProps, idx) => (
              <Badge key={idx} {...badgeProps} />
            ))}
        </div>
        <div className={styles.description}>
          #{data.number} {state} {dayjs(date).fromNow()} by {data.user.login}
        </div>
      </div>
    </ListItemLayout>
  );
}
