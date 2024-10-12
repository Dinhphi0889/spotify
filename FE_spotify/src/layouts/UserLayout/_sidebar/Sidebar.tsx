import { NavLink, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { Avatar, Button, Col, Popover, Row, Space, Typography } from "antd";
import { useModal } from "../../../globalContext/ModalContext";
import { useAppSelector } from "../../../redux/hooks";
import { TypePlaylistPost } from "../../../types/typePlaylist";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { createPlayList } from "../../../apis/apiPlayList/apiCreatePlayList";
import { useEffect } from "react";
import { getPlaylistByUser } from "../../../apis/apiPlayList/apiGetPlayListByUser";
const { Title, Text } = Typography;

export default function Sidebar() {
  const { openModal, openPopover, popover } = useModal();
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const dispatch = useDispatch<AppDispatch>();
  const playlists = useAppSelector((state) => state.playlist.playLists);
  const playlistCount = playlists.length;

  console.log(playlists);

  useEffect(() => {
    dispatch(getPlaylistByUser(currentUser?.user.userId));
  }, []);

  const handleCreatePlayList = async () => {
    const newPlaylist: TypePlaylistPost = {
      userId: currentUser.user.userId,
      imagePath: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/de355201-269a-4f25-8aa4-3bd21e2a5117/df6eoa8-c88e8284-3f62-46dc-b090-69883eeb607e.png/v1/fit/w_828,h_496/music_note_symbol___outline_by_orxngecrxsh_df6eoa8-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjQ1NyIsInBhdGgiOiJcL2ZcL2RlMzU1MjAxLTI2OWEtNGYyNS04YWE0LTNiZDIxZTJhNTExN1wvZGY2ZW9hOC1jODhlODI4NC0zZjYyLTQ2ZGMtYjA5MC02OTg4M2VlYjYwN2UucG5nIiwid2lkdGgiOiI8PTQwOTYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.aaUv-5uBzZL54p0zvxi07UVyU0elMO4zqbww1wc2B9Q",
      playlistName: `Danh sách phát của tôi #${playlistCount + 1}`,
      songsId: 0,
      description: "Your description here",
      createDate: new Date().toISOString(),
      songName: "",
      playlistId: Date.now(),
    };

    const result = await dispatch(createPlayList(newPlaylist));
    if (result) {
      navigate(`/play-list/${Date.now()}`);
      dispatch(getPlaylistByUser(currentUser?.user.userId));
    } else {
      console.log("Failed to create playlist.");
    }
  };

  return (
    <div className="sidebar mt-3 pl-3 mr-2" style={{ width: "300px" }}>
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
          <i className="fa-solid fa-house"></i>
          Home
        </NavLink>
        <NavLink
          to={"search"}
          className={({ isActive }) =>
            isActive ? "my-active btn-search" : "btn-search"
          }
        >
          <i className="fa-solid fa-magnifying-glass"></i>
          Search
        </NavLink>
      </div>
      <div className="sidebar-bottom">
        <div>
          <div className="flex justify-between items-center library mb-7">
            <div>
              <i className="fa-solid fa-lines-leaning"></i>Your Library
            </div>
            <button>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <div className="create-playlist ">
            {!currentUser ? (
              <div>
                <p className="font-bold">Create your first playlist</p>
                <p className="font-medium">It's easy, we'll help you</p>

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
              </div>
            ) : (
              <div>
                <p className="font-bold mt-2 mb-4">Your Playlists</p>
                <ul>
                  {playlists.map((playlist:any) => (
                    <li
                      key={playlist.id}
                      onClick={() => {
                        navigate(`./play-list/${playlist.id}`);
                      }}
                    >
                      <Row align="middle" style={{ marginBottom: "10px" }}>
                        <Col span={6}>
                          <Avatar
                            shape="square"
                            size={45}
                            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/de355201-269a-4f25-8aa4-3bd21e2a5117/df6eoa8-c88e8284-3f62-46dc-b090-69883eeb607e.png/v1/fit/w_828,h_496/music_note_symbol___outline_by_orxngecrxsh_df6eoa8-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjQ1NyIsInBhdGgiOiJcL2ZcL2RlMzU1MjAxLTI2OWEtNGYyNS04YWE0LTNiZDIxZTJhNTExN1wvZGY2ZW9hOC1jODhlODI4NC0zZjYyLTQ2ZGMtYjA5MC02OTg4M2VlYjYwN2UucG5nIiwid2lkdGgiOiI8PTQwOTYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.aaUv-5uBzZL54p0zvxi07UVyU0elMO4zqbww1wc2B9Q"
                            alt="Playlist cover"
                          />
                        </Col>
                        <Col span={18}>
                          <Space direction="vertical">
                            <Title
                              style={{
                                color: "white",
                                margin: "0",
                                fontSize: "13px",
                                fontWeight: "bold",
                                lineHeight: "0.5",
                              }}
                            >
                              {playlist.playlistName}
                            </Title>
                            <Text
                              style={{
                                color: "gray",
                                fontSize: "10px",
                                margin: "0",
                                lineHeight: "1",
                              }}
                            >
                              Danh sách phát • {currentUser.user?.name}
                            </Text>
                          </Space>
                        </Col>
                      </Row>
                    </li>
                  ))}
                </ul>
                <Button
                  type="primary"
                  className="btn-createPlaylist"
                  onClick={handleCreatePlayList}
                >
                  Create new playlist
                </Button>
              </div>
            )}
          </div>
          <div className="footer-sidebar-bottom">
            <span>Legal</span>
            <span>Safety & Privacy Center</span>
            <span>Privacy Policy</span>
            <span>Cookies</span>
            <span>About Ads</span>
            <span>Accessibility</span>
            <span>Cookies</span>
          </div>
          <div className="languages">
            <button className="btn-languages">
              <i className="fa-solid fa-earth-americas mr-2"></i>English
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
