import { NavLink, useNavigate } from "react-router-dom";
import { Button, Popover, Spin } from "antd";
import { useModal } from "../../../globalContext/ModalContext";
import { useAppSelector } from "../../../redux/hooks";
import "./sidebar.css";
import { useEffect, useState } from "react";
import { Playlist } from "../../../types/typePlaylist";
import playlistApi from "../../../apis/playlistApi";

export default function Sidebar() {
  const { openModal, openPopover, popover } = useModal();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.currentUser);

  // State lưu danh sách playlist, trạng thái loading và lỗi nếu có
  const [playlists, setPlaylists] = useState<Playlist[]>([]); // Danh sách playlist
  const [loading, setLoading] = useState<boolean>(true); // Trạng thái hiển thị loading
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser || !currentUser.user || !currentUser.user.userId) {
      console.warn("User not logged in or user ID is missing.");
      setLoading(false);
      setError("User ID is missing or not logged in.");
      return;
    }

    const userId = currentUser.user.userId;

    setLoading(true);
    setError(null);

    // Gọi API lấy danh sách playlist
    playlistApi
      .getPlaylistOfUser(userId)
      .then((response) => {
        console.log("Full API Response:", response.data);
        if (response.data.statusCode === 200) {
          setPlaylists(response.data.content || []);
        } else {
          setError("Failed to fetch playlists. Please try again.");
        }
      })
      .catch((err) => {
        console.error("Failed to fetch playlists:", err);
        setError("Failed to load playlists. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentUser]);

  return (
    <div className="sidebar mt-3 pl-3 mr-2">
      {/* Sidebar Header */}
      <div className="sidebar-top mb-2">
        <button className="logo-spotify">
          <i className="fa-brands fa-spotify mr-1"></i>
          <span>Spotify</span>
        </button>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "my-active btn-home" : "btn-home"
          }
        >
          <i className="fa-solid fa-house"></i> Home
        </NavLink>
        <NavLink
          to={"search"}
          className={({ isActive }) =>
            isActive ? "my-active btn-search" : "btn-search"
          }
        >
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </NavLink>
      </div>

      {/* Sidebar Content */}
      <div className="sidebar-bottom">
        <div>
          {/* Thư Viện Playlist */}
          <div className="flex justify-between items-center library mb-7">
            <div>
              <i className="fa-solid fa-lines-leaning"></i>Your Library
            </div>
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {/* Nút Tạo Playlist */}
          <div className="create-playlist">
            <p className="font-bold">Create your first playlist</p>
            <p className="font-medium">It's easy, we'll help you</p>
            {!currentUser ? (
              <Popover
                style={{ backgroundColor: "blue", left: "10%" }}
                content={<a onClick={popover}>Close</a>}
                title={
                  <>
                    <p className="text-lg font-bold">Create a playlist</p>
                    <p>Log in to create and share playlists.</p>
                    <br />
                    <Button onClick={openModal}>Login</Button>
                  </>
                }
                trigger="click"
                open={openPopover}
                placement="rightTop"
                onOpenChange={popover}
              >
                <Button
                  type="primary"
                  className="btn-createPlaylist"
                  onClick={popover}
                >
                  Create playlist
                </Button>
              </Popover>
            ) : (
              <Button
                type="primary"
                className="btn-createPlaylist"
                onClick={() => navigate("/play-list")}
              >
                Create playlist
              </Button>
            )}
          </div>

          {/* Hiển Thị Danh Sách Playlist */}
          <div className="playlist-list">
            <p className="font-bold text-lg mb-2">Your Playlists</p>
            {loading ? (
              <Spin size="large" />
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : playlists.length > 0 ? (
              playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="playlist-item hover:bg-gray-700 transition duration-200 ease-in-out p-3 rounded-md mb-2 cursor-pointer"
                  onClick={() => navigate(`/play-list/${playlist.id}`)}
                >
                  <div className="playlist-info flex items-center">
                    <img
                      src={playlist.imagePath || "default-image.jpg"}
                      alt={playlist.playlistName}
                      className="playlist-img w-12 h-12 rounded-sm mr-4"
                    />
                    <div>
                      <p className="playlist-name font-semibold text-white">
                        {playlist.playlistName}
                      </p>
                      <p className="playlist-description text-gray-400 text-sm">
                        {playlist.description || "No description available"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Playlists Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
