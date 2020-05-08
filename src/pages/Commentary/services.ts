
//评论的层级
export enum CommentaryLevelEnum {
  MAIN,  //主要的（第一级）
  SECONDARY,  //次要的（第二级）
}

//【假设的】评论数据传输格式
export interface CommentaryDTO {
  id: number,  //id编号
  avatar: string,  //头像uri
  name: string,  //评论人名称
  content: string,  //评论内容
  date: string,  //评论日期
  hearts: number,  //点赞数
  isLike: boolean,  //是否点赞
  aiTeName?: string,  //被艾特人的姓名 （可能应该是一个完整的人员数据结构）
  replyList?: Array<CommentaryDTO>,  //二级评论
}

//伪造一个评论数组
export const mockCommList: CommentaryDTO[] = [
  {
    id: 1,
    avatar: '',
    name: '大老虎',
    content: '森林之王就是我，这是无可反驳的，如果谁要有半句质疑，那就等待我的利爪和尖牙，哀鸣吧',
    date: '5-10',
    hearts: 6666,
    isLike: true,
    replyList: [
      {
        id: 1111,
        avatar: '',
        name: '小猴子',
        content: '大王您说得对，我们从此鞍前马后',
        date: '5-11',
        hearts: 200,
        isLike: false,
      }
    ]
  },
];

export const services = {
  //todo 数据交互
};
