import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./ListContainer.module.css";
import Button from "./components/Button";
import ListItem from "./components/ListItem";
import ListItemLayout from "./components/ListItemLayout";
import ListFilter from "./components/ListFilter";
import Pagination from "./components/Pagination";
import OpenClosedFilters from "./components/OpenClosedFilters";
import { GITHUB_API } from "./api";

export default function ListContainer() {
  const [inputValue, setInputValue] = useState("is:pr is:open");
  const [checked, setChecked] = useState(false);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpenMode, setIsOpenMode] = useState(true);
  const [params, setParams] = useState();
  const maxPage = 10;
  // const MAX_PAGE = getData().totalCount // = 100 / 30 = 3.33333 = 4page

  async function getData(params) {
    const data = await axios.get(`${GITHUB_API}/repos/facebook/react/issues`, {
      params,
    });
    setList(data.data);
  }

  useEffect(() => {
    getData({ page, state: isOpenMode ? "open" : "closed", ...params });
  }, [page, isOpenMode, params]);

  // console.log({ list });

  return (
    <>
      <div className={styles.listContainer}>
        <div className={styles.topSection}>
          <input
            className={styles.input}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Button
            style={{
              fontSize: "14px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            New Issue
          </Button>
        </div>
        <OpenClosedFilters
          isOpenMode={isOpenMode}
          onClickMode={setIsOpenMode}
        />
        <ListItemLayout className={styles.listFilter}>
          <ListFilter
            onChangeFilter={(params) => {
              // 필터링된 요소에 맞게 데이터를 불러오기
              // const data = getData("필터링된 정보");
              setParams(params);
            }}
          />
        </ListItemLayout>
        {list.map((item) => (
          <ListItem
            key={item.id}
            data={item}
            checked={checked}
            onClickCheckBox={() => setChecked((checked) => !checked)}
          />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={page}
          maxPage={maxPage}
          onClickPageButton={(pageNumber) => setPage(pageNumber)}
        />
      </div>
    </>
  );
}
