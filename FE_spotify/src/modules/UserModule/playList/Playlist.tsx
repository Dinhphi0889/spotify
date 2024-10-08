import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Button } from "antd";
import "./Playlist.css";
import playlistApi from "../../../apis/playlistApi";

interface Song {
  id: number;
  title: string;
  album: string;
  duration: string;
  artist: string;
  addedDate: string;
}

const Playlist: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>(); // Lấy `playlistId` từ URL
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState<Playlist | null>(null); // Thông tin playlist
  const [songs, setSongs] = useState<Song[]>([]); // Danh sách bài hát trong playlist
  const [loading, setLoading] = useState(true); // Trạng thái loading khi đang lấy dữ liệu
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (playlistId) {
      // Gọi API để lấy thông tin chi tiết playlist và các bài hát
      playlistApi
        .getSongInPlaylist(Number(playlistId))
        .then((response) => {
          console.log("Playlist Detail Response:", response.data);
          setPlaylist(response.data.playlist || null); // Cập nhật thông tin playlist
          setSongs(response.data.songs || []); // Cập nhật danh sách bài hát
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load playlist detail:", err);
          setError("Failed to load playlist details.");
          setLoading(false);
        });
    }
  }, [playlistId]);

  if (loading) return <Spin size="large" />;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div className="playlist-detail-container">
      {/* Header của Playlist */}
      <div className="playlist-header flex items-center mb-6">
        <img
          src={playlist?.imagePath || "default-image.jpg"}
          alt={playlist?.playlistName}
          className="playlist-cover w-32 h-32 mr-6"
        />
        <div className="playlist-info">
          <h1 className="playlist-title text-3xl text-white">
            {playlist?.playlistName}
          </h1>
          <p className="playlist-description text-lg text-gray-400">
            {playlist?.description || "No description available"}
          </p>
          <p className="playlist-meta text-sm text-gray-500">
            {`Created by: ${playlist?.userId} • ${songs.length} songs`}
          </p>
        </div>
      </div>

      {/* Nút Play */}
      <div className="playlist-action">
        <Button type="primary" className="btn-play">
          <i className="fa-solid fa-play"></i> Play
        </Button>
      </div>

      {/* Danh sách bài hát */}
      <div className="playlist-songs mt-6">
        <table className="song-table w-full text-left">
          <thead className="song-table-header text-gray-500 border-b border-gray-600">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Album</th>
              <th className="p-3">Added</th>
              <th className="p-3">Duration</th>
            </tr>
          </thead>
          <tbody>
            {songs.length > 0 ? (
              songs.map((song, index) => (
                <tr
                  key={song.id}
                  className="song-row hover:bg-gray-700 transition duration-150"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{song.title}</td>
                  <td className="p-3">{song.album}</td>
                  <td className="p-3">
                    {new Date(song.addedDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">{song.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-3">
                  No songs found in this playlist.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Playlist;
