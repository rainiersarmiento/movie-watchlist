"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { DetailedMovie, imdbID } from "@/app/lib/definitions";
import { FaStar, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useWatchlistContext } from "@/app/providers";

export const MovieElement = ({
  Genre,
  imdbID,
  imdbRating,
  Plot,
  Poster,
  Runtime,
  Title,
}: Partial<DetailedMovie>) => {
  const { list, setWatchList } = useWatchlistContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const path = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const imageUrl = Poster === "N/A" ? "/Icon.png" : Poster;
  const imageStyle =
    Poster !== "N/A"
      ? {
          borderRadius: "5px",
          border: "1px solid #fff",
          display: "block",
        }
      : {
          border: "none",
        };

  // Watchlist Button function
  const handleWatchlistButton = (movieID: imdbID) => {
    if (list.find((imdbId) => imdbId === movieID)) {
      // Find search params and remove from URL
      setWatchList((prevWatchlist) =>
        prevWatchlist.filter((id) => id !== movieID)
      );
      if (path === "/watchlist") {
        console.log(`Removing ${movieID} from path.`);
        const params = new URLSearchParams(searchParams);
        params.delete("id", movieID);
        replace(`${path}?${params}`);
      }
    } else {
      setWatchList((prevWatchlist) => [...prevWatchlist, movieID]);
    }
  };

  // Read More Button function
  const showReadMore = (Plot: string | undefined) => {
    if (Plot) {
      if (Plot === "N/A") {
        return <p className="plot">Plot: N/A</p>;
      } else {
        if (Plot?.length > 300) {
          return (
            <>
              {isExpanded ? (
                <p className="plot">{Plot}</p>
              ) : (
                <p>{`${Plot?.slice(0, 300)}...`}</p>
              )}
              <button className="read-more" onClick={toggleReadMore}>
                {isExpanded ? `Read less` : "Read more"}
              </button>
            </>
          );
        } else if (Plot?.length <= 300) {
          return <p className="plot">{Plot}</p>;
        }
      }
    }
  };

  return (
    <>
      {Poster === "N/A" ? (
        <Image
          src={`${imageUrl}`}
          width={200}
          height={200}
          style={imageStyle}
          alt={`Reels replacement image`}
        />
      ) : (
        <Image
          src={`${imageUrl}`}
          width={200}
          height={300}
          style={imageStyle}
          alt={`${Title} poster`}
        />
      )}
      <div className="movie-detail-data">
        <div className="title-line">
          <h1>{Title}</h1>
          <div className="star-rating">
            <FaStar className="star-icon" />
            <p>{imdbRating === "N/A" ? `Rating: ${imdbRating}` : imdbRating}</p>
          </div>
        </div>
        <div className="line-2">
          <p className="detail-line">
            {Runtime === "N/A" ? `Runtime: ${Runtime}` : Runtime}
          </p>
          <p className="detail-line">
            {Genre === "N/A" ? `Genre: ${Genre}` : Genre}
          </p>
          {list.find((id) => id === imdbID) ? (
            <button
              className="addBtn"
              onClick={() => (imdbID ? handleWatchlistButton(imdbID) : null)}
            >
              <FaMinusCircle /> Remove
            </button>
          ) : (
            <button
              className="addBtn"
              onClick={() => (imdbID ? handleWatchlistButton(imdbID) : null)}
            >
              <FaPlusCircle /> Watchlist
            </button>
          )}
        </div>
        <div className="plot-container">{showReadMore(Plot)}</div>
      </div>
    </>
  );
};
