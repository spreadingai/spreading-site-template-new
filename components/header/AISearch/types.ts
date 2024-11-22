export enum QuestionType {
  TEXT = "0",
  VOICE = "1",
  IMAGE = "2",
  FILE = "3",
}

export enum ScoreType {
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
}

export interface Question {
  answerID: string; // 对应问题答案的唯一标识，必填
  question: string; // 询问的问题，必填
  formData?: any; // 文件类型下的传输内容，可选，预留
  type?: QuestionType; // 输入内容类型，可选，枚举值 0：文本【预留枚举 1：语音、2：图片、3：文件】，默认 0 文本
  score?: ScoreType; // 评分，可选，枚举值 0：未评分、1-5：好评等级，默认 0
  answer?: string; // 回答，可选，预留
}
