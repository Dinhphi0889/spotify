
export interface TypePlaylistPost {
    userId: number;          
    imagePath: string;       
    playlistName: string;            
    description: string;     
    createDate: Date;       
}
  
export interface Playlist {
  id: number;
  userId: number;
  imagePath: string;
  playlistName: string;
  description: string;
  createDate: string;
}

export interface GetPlaylistsResponse {
  content: Playlist[];
  message: string;
  date: string;
  statusCode: number;
}

