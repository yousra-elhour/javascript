import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./MovieList.css";

const SkeletonMovieCard = () => {
  return (
    <SkeletonTheme baseColor="#e2e8f0" highlightColor="#f7fafc">
      <div className="movie-card">
        <div className="movie-poster">
          <Skeleton height={200} />
        </div>
        <div className="movie-info">
          <h4>
            <Skeleton height={20} width="80%" />
          </h4>
          <p className="movie-author">
            <Skeleton height={14} width="60%" />
          </p>
          <p className="movie-date">
            <Skeleton height={12} width="40%" />
          </p>
          <p className="movie-overview">
            <Skeleton height={14} count={3} />
          </p>
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonMovieCard;
