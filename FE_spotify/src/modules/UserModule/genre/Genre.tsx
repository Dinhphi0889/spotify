import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./genre.css";
import { useAppSelector } from "../../../redux/hooks";
import { AppDispatch } from "../../../redux/store";
import { fetchAndSetSongGenre } from "../../../apis/apiGetSongGenre";
import { TypeGenre } from "../../../types/typeGenre";
import { useNavigate } from "react-router-dom";

export default function Genre() {
  const dispatch = useDispatch<AppDispatch>();
  const { songGenre } = useAppSelector((state) => state.song);
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchAndSetSongGenre());
  }, [dispatch]);

  const renderGenre = () => {
    return songGenre?.map((genre: TypeGenre, index: number) => (
      <div
        key={genre.genreId}
        className={`genre-box color-${index % 10}`}
        onClick={() => navigate(`/genre/${genre.genreId}`)}
      >
        {genre.nameGenre}
      </div>
    ));
  };

  return (
    <div className="genre-page">
      <h1 className="genre-title">Genres All</h1>
      <div className="genre-grid">
        {/* Example of a hardcoded genre box */}
        <div
          key='1' // Ensure unique keys for each item in a list
          className={`genre-box color-${0 % 10}`} // Make sure the color index logic is correct
          onClick={() => navigate(`/genre/1`)} // Define what happens when this is clicked
        >
          Genre 1
        </div>
        <div
          key='2' // Ensure unique keys for each item in a list
          className={`genre-box color-${1 % 10}`} // Make sure the color index logic is correct
          onClick={() => navigate(`/genre/2`)} // Define what happens when this is clicked
        >
          Genre 2
        </div>
      </div>
    </div>
  );
}
