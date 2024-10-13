import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Avatar, Row, Col, Space, Button, Typography } from "antd";
import { PlayCircleOutlined, EllipsisOutlined } from "@ant-design/icons";
import { fetchAndSetAllSongs } from "../../../apis/apiGetAllSongs";
import { AppDispatch, RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/hooks";
import { TypeSong } from "../../../types/typeSong";
import moment from "moment";
import { fetchAndSetSongGenre } from "../../../apis/apiGetSongGenre";
import { TypeGenre } from "../../../types/typeGenre";
import { TypeUser } from "../../../types/typeUser";
import { apiGetUser } from "../../../apis/apiGetUser";
import { getPlaylistById } from "../../../apis/apiPlayList/apiGetPlaylistById";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../globalContext/GlobalContext";

const { Title, Text } = Typography;

const PlaylistComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = JSON.parse(localStorage.getItem("user")!)?.user;
  const { songLists, songGenre } = useAppSelector((state) => state.song);
  const { playListById } = useAppSelector((state) => state.playlist);
  const [users, setUsers] = useState<TypeUser[]>([]);
  const navigate = useNavigate();

  const { id } = useParams();
  const [users, setUsers] = useState<TypeUser[]>([])
  const { setIdMusic } = useGlobalContext()

  const callApiGetUser = async () => {
    const result = await apiGetUser();
    setUsers(Array.isArray(result) ? result : [result]);
  };
    const result = await apiGetUser()
    setUsers(Array.isArray(result) ? result : [result])
  }
  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
    callApiGetUser();
  }, []);
    callApiGetUser()
  }, [])

  useEffect(() => {
    dispatch(getPlaylistById(id));
    dispatch(fetchAndSetAllSongs());
    dispatch(fetchAndSetSongGenre());
  }, [id, dispatch]);
  }, [dispatch]);


  const columns = [
    {
      title: "STT",
      dataIndex: "number",
      key: "number",
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (_: any, record: any) => {
        const artist = users.find(
          (user: TypeUser) => user.userId === record.artist
        );

        const artist = users.find((user: TypeUser) => user.userId === record.artist)

        return (
          <div className="flex">
            <img
              src={record.image}
              alt={record.title}
              style={{ width: "65px", height: "50px" }}
            />

            <div className="pl-5">
              <div>{record.title}</div>
              <div style={{ fontSize: "14px", color: "gray" }}>
                <Link to={`/detail-artists/${artist?.userId}`} className="hover:text-green-500">
                  {artist ? artist.name : ""}
                </Link>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      key: "genre",
      render: (_: any, record: any) => {
        const genreItem = songGenre.find(
          (genre: TypeGenre) => genre.genreId == record.genre
        ) as TypeGenre | undefined;
        return genreItem ? genreItem.nameGenre : "Unknown";
      },
    },
    {
      title: "Ngày thêm",
      dataIndex: "addedDate",
      key: "addedDate",
      render: (_: any, record: any) => {
        const formattedDate = moment(record.date).format("DD/MM/YYYY");
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: "Thời gian",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const data = songLists.map((song: TypeSong, index) => ({
    key: index + 1,
    number: (index + 1).toString(),
    title: song.songName,
    genre: song.genreId,
    addedDate: song.publicDate,
    duration: song.duration,
    action: <Button className="rounded-full">Thêm</Button>,
    description: song.description,
    image: song.songImage,
    artist: song.userId,
  }));

  return (
    <div
      style={{
        backgroundColor: "#0f1a1a",
        padding: "20px",
        borderRadius: "10px",
        color: "white",
        width: "100%",
      }}
    >
      <Row gutter={16}>
        <Col span={6}>
          <Avatar
            shape="square"
            size={200}
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/de355201-269a-4f25-8aa4-3bd21e2a5117/df6eoa8-c88e8284-3f62-46dc-b090-69883eeb607e.png/v1/fit/w_828,h_496/music_note_symbol___outline_by_orxngecrxsh_df6eoa8-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjQ1NyIsInBhdGgiOiJcL2ZcL2RlMzU1MjAxLTI2OWEtNGYyNS04YWE0LTNiZDIxZTJhNTExN1wvZGY2ZW9hOC1jODhlODI4NC0zZjYyLTQ2ZGMtYjA5MC02OTg4M2VlYjYwN2UucG5nIiwid2lkdGgiOiI8PTQwOTYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.aaUv-5uBzZL54p0zvxi07UVyU0elMO4zqbww1wc2B9Q"
            alt="Playlist cover"
          />
        </Col>
        <Col span={18}>
          <Space direction="vertical">
            <Text type="secondary">Playlist</Text>
            <Title style={{ color: "white", margin: 0 }}>
              {playListById.playlistName}
            </Title>
            <Text style={{ color: "white" }}>
              {user?.name} • {songLists.length} bài hát, tổng thời gian{" "}
              {/* Tính tổng thời gian bài hát */}
            </Text>
          </Space>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }} align="middle">
        <Col>
          <Button
            type="primary"
            shape="circle"
            icon={<PlayCircleOutlined />}
            size="large"
            style={{ backgroundColor: "#1db954", borderColor: "#1db954" }}
          />
        </Col>
        <Col>
          <Button
            type="text"
            shape="circle"
            icon={<EllipsisOutlined />}
            size="large"
            style={{ marginLeft: "10px", color: "white" }}
          />
        </Col>
      </Row>

      <h1 className="text-2xl font-medium mt-10">
        Hãy cùng tìm nội dung cho danh sách phát của bạn
      </h1>

      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
        }}
        style={{
          marginTop: "20px",
          backgroundColor: "#121212",
          color: "white",
        }}
        rowClassName={() => "custom-row"}
      />
    </div>
  );
};

export default PlaylistComponent;
