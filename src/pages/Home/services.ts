
//顶部Tab中的视频的类别
export enum VideoCategoryEnum {
  RECOMMENDED = 'RECOMMENDED',  //推荐的
  CONCERNED = 'CONCERNED',      //关注的
}

//【假设的】视频作者数据传输结构
interface AuthorDTO {
  id: number,  //id号
  name: string,  //用户名
  type: string,  //类别组别
  avatar: string,  //头像地址
  [props: string]: any,  //其他
}

//【假设的】小视频数据传输结构
export interface VideoDTO {
  id: number,  //id
  uri: string,  //视频资源地址
  author: AuthorDTO,  //作者信息
  intro: string,  //简介
  liveId: number,  //直播ID

}

export const Services = {
  //todo 数据交互
};
