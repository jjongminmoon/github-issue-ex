import styles from "./ListFilter.module.css";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import { GITHUB_API } from "../api";

export default function ListFilter({ onChangeFilter }) {
  const [showModal, setShowModal] = useState();
  const [list, setList] = useState([]);
  const filterList = ["Label", "Milestone", "Assignee"];

  async function getData(apiPath) {
    const data = await axios.get(
      `${GITHUB_API}/repos/facebook/react/${apiPath}`,
    );

    let result = [];
    switch (apiPath) {
      case "assignees":
        result = data.data.map((d) => ({
          name: d.login,
        }));
        break;
      case "milestones":
        result = data.data.map((d) => ({
          name: d.title,
        }));
        break;
      case "labels":
      default:
        result = data.data;
    }

    console.log({ result });

    // 데이터 가공 name, title, login -> name
    setList(result);
  }

  useEffect(() => {
    if (showModal) {
      const apiPath = `${showModal.toLowerCase()}s`;
      getData(apiPath);
    }
  }, [showModal]);

  return (
    <div className={styles.filterLists}>
      {filterList.map((filter) => (
        <ListFilterItem
          searchDataList={list}
          key={filter}
          onClick={() => setShowModal(filter)}
          onClose={() => setShowModal()}
          showModal={showModal === filter}
          onChangeFilter={onChangeFilter}
        >
          {filter}
        </ListFilterItem>
      ))}
    </div>
  );
}

function ListFilterItem({
  children,
  placeholder,
  searchDataList,
  showModal,
  onClick,
  onClose,
  onChangeFilter,
}) {
  const [list, setList] = useState(searchDataList);

  useEffect(() => {
    setList(searchDataList);
  }, [searchDataList]);

  return (
    <div className={styles.filterItem}>
      <span role="button" onClick={onClick}>
        {children} ▼
      </span>
      <div className={styles.modalContainer}>
        <Modal
          title={children}
          opened={showModal}
          onClose={onClose}
          placeholder={placeholder}
          searchDataList={list}
          onClickCell={(params) => {
            // 클릭된 정보를 통해서 리스트 필터링
            onChangeFilter(params);
          }}
        />
      </div>
    </div>
  );
}
