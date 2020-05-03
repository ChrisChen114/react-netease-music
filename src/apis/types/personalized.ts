export interface IGetPersonalizedSongListRequest {
  limit?: number
}

export interface ISongList {
  alg: string,
  canDislike: boolean,
  copywriter: string,
  highQuality: boolean,
  id: number,
  name: string,
  picUrl: string,
  playCount: number,
  trackCount: number,
  trackNumberUpdateTime: number,
  type: number
}

export interface IArtist {
  albumSize: number,
  id: number,
  img1v1Id: number,
  img1v1Url: string,
  musicSize: number,
  name: string,
  picId: number,
  picUrl: string,
  topicPerson: number
}

export interface IMusic {
  alg: string,
  canDislike: boolean,
  id: number,
  name: string,
  picUrl: string,
  song: {
    artists: IArtist[]
  }
}

export interface IMV {
  alg: string,
  artistId: number,
  artistName: string,
  canDislike: boolean,
  copywriter: string,
  duration: number,
  id: number,
  name: string,
  picUrl: string,
  playCount: number,
  subed: boolean,
  type: number
}