import React from "react";
import styles from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onLoadMore: () => void; 
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <button className={styles.button} onClick={onLoadMore}>
      Load more
    </button>
  );
};

export default LoadMoreBtn;
