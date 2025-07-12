import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./TodoList.css";

const SkeletonTodoItem = () => {
  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f7fafc">
      <div className="todo-item">
        <span className="todo-text">
          <Skeleton height={16} width="70%" />
        </span>
        <Skeleton height={32} width={80} />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonTodoItem;
