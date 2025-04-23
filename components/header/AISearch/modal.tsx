import React, {
  Component,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./modal.module.scss";
import { Button, Input, Modal } from "antd";
import {
  ChatItemProps,
  ChatMessage,
  ProChat,
  ProChatInstance,
  ProChatProvider,
  useProChat,
  ActionIconGroup,
  ActionIcon,
  ActionIconGroupProps,
  BackBottomProps,
} from "@ant-design/pro-chat";
import {
  startConverseFetch,
  createSessionsFetch,
  deleteSessionsFetch,
  scoreFetch,
  getChatIDMap,
  defaultChatID,
} from "./fetch";
import { SSEFinishType } from "@ant-design/pro-chat/es/ProChat/utils/fetch";
import Link from "next/link";
import {
  CopyOutlined,
  RedoOutlined,
  LikeOutlined,
  DislikeOutlined,
  ReloadOutlined,
  UserOutlined,
  // @ts-ignore
} from "@ant-design/icons";
import { actionsClickProps } from "@ant-design/pro-chat/es/ChatItem/type";
import { ActionIconGroupItems } from "@ant-design/pro-chat/es/ActionIconGroup";
import { Question, ScoreType } from "./types";
import { ThemeProvider } from "antd-style";
import { theme } from "antd";
import { copywriting } from "@/components/constant/language";
import Robot from "@/assets/icons/ai-search/Robot.svg";
import chatIDMap from "./chatIDMap.json";
import { EventSourceParserStream } from "eventsource-parser/stream";
import { defaultLanguage } from "@/components/context/languageContext";

interface AnswerData {
  score?: ScoreType;
  answer: string;
  id: string;
  prompt: string;
  session_id: string;
  reference: {
    total: number;
    doc_aggs: {
      doc_id: string;
      doc_name: string;
      count: number;
    }[];
  };
  question?: string;
}

interface Props {
  rootClassName?: string;
  currentTheme: string;
  currentLanguage: string;
  currentGroup: string;
  currentPlatform: string;
  isModalOpen: boolean;
  onCloseHandle: () => void;
}

// const testAnswerData = {
//   answer:
//     '接入 L3 直播（互动直播）的具体步骤如下 ##1$$。以下是详细的步骤说明：\n\n### 步骤 1: 注册和创建项目\n1. **注册账号**：\n   - 访问直播平台的官方网站，注册一个账号。\n2. **创建项目**：\n   - 登录后，在控制台中创建一个新的项目，并获取项目的 AppID 和其他必要信息。\n\n### 步骤 2: 集成 SDK\n1. **下载 SDK**：\n   - 前往开发者文档页面，下载适用于你开发环境的 L3 直播 SDK。\n2. **集成 SDK**：\n   - 将下载的 SDK 文件添加到项目中。\n   - 修改 `build.gradle` 或 `Podfile` 文件，引入必要的依赖项。\n   - 运行项目，确保 SDK 成功集成。\n\n### 步骤 3: 初始化 SDK\n1. **初始化 SDK**：\n   - 在应用启动时，调用 SDK 的初始化方法。通常需要传入你的 AppID 和其他配置参数。\n   ```java\n   // 示例代码（Java）\n   LiveStreamingKit.init(context, "your_app_id");\n   ```\n\n\n### 步骤 4: 创建直播间\n1. **创建直播间**：\n   - 调用 SDK 提供的方法创建一个新的直播间。你可以设置直播间的基本信息，如房间名称、房间 ID 等。\n   ```java\n   // 示例代码（Java）\n   LiveRoom room = new LiveRoom("room_name", "room_id");\n   room.create();\n   ```\n\n\n### 步骤 5: 加入直播间\n1. **加入直播间**：\n   - 调用 SDK 提供的方法让用户加入已创建的直播间。\n   ```java\n   // 示例代码（Java）\n   room.join("user_id");\n   ```\n\n\n### 步骤 6: 实现互动功能\n1. **实现互动功能**：\n   - 根据需求实现各种互动功能，如连麦、弹幕、礼物等。SDK 通常会提供相应的 API 方法。\n   ```java\n   // 示例代码（Java）\n   room.sendChatMessage("Hello, everyone!");\n   room.requestCoHost("co_host_user_id");\n   ```\n\n\n### 步骤 7: 处理事件和回调\n1. **处理事件和回调**：\n   - 监听并处理 SDK 发出的各种事件和回调，如用户进入房间、消息接收等。\n   ```java\n   // 示例代码（Java）\n   room.setOnEventListener(new OnEventListener() {\n       @Override\n       public void onUserJoined(String userId) {\n           Log.d("LiveRoom", "User joined: " + userId);\n       }\n\n       @Override\n       public void onChatMessageReceived(String message) {\n           Log.d("LiveRoom", "Message received: " + message);\n       }\n   });\n   ```\n\n\n### 步骤 8: 测试和调试\n1. **测试和调试**：\n   - 在真实环境中测试直播间的各项功能，确保一切正常运行。可以使用日志和调试工具来排查问题。\n\n### 步骤 9: 上线发布\n1. **上线发布**：\n   - 完成所有测试后，将应用正式发布到应用商店或部署到服务器。\n\n### 注意事项\n- **权限配置**：确保应用具有必要的权限，如网络访问、摄像头���麦克风权限。\n- **性能优化**：优化应用的性能，确保在高并发情况下也能稳定运行。\n- **用户体验**：关注用户体验，提供流畅的直播体验和友好的界面设计。\n\n### 示例代码汇总\n以下是一个完整的示例代码，展示了如何集成和使用 L3 直播 SDK：\n\n```java\n// 初始化 SDK\nLiveStreamingKit.init(context, "your_app_id");\n\n// 创建直播间\nLiveRoom room = new LiveRoom("room_name", "room_id");\nroom.create();\n\n// 加入直播间\nroom.join("user_id");\n\n// 发送聊天消息\nroom.sendChatMessage("Hello, everyone!");\n\n// 请求连麦\nroom.requestCoHost("co_host_user_id");\n\n// 设置事件监听器\nroom.setOnEventListener(new OnEventListener() {\n    @Override\n    public void onUserJoined(String userId) {\n        Log.d("LiveRoom", "User joined: " + userId);\n    }\n\n    @Override\n    public void onChatMessageReceived(String message) {\n        Log.d("LiveRoom", "Message received: " + message);\n    }\n});\n```\n\n\n### 参考文档\n- **官方文档**：建议详细阅读官方文档，了解更多的配置选项和高级功能。\n- **API 文档**：查看 SDK 的 API 文档，了解各个方法的具体用法和参数。\n\n希望这些步骤对你有所帮助！如果有更多具体问题，欢迎继续提问。',
//   reference: {
//     total: 7,
//     doc_aggs: [
//       {
//         doc_name: "Glossary - 产品&Features.csv",
//         doc_id: "4273fadc966d11efabe20242ac140003",
//         count: 7,
//       },
//     ],
//   },
//   prompt:
//     '# 角色\n你是一个智能助手，名字叫Miss R。你的主要职责是基于知识库中的信息来总结并回答用户的问题。\n\n## 技能\n### 技能1: 信息总结与问题解答\n- 根据用户提出的问题，从知识库中提取相关信息。\n- 先总结实现步骤，再详细解释每个步骤的具体内容。\n- 如果知识库中没有相关的信息，则直接告知用户：“抱歉，没有提供相关信息。”\n\n### 技能2: 提供示例代码\n- 在回答涉及编程或技术性问题时，尽可能包含示例代码以帮助用户更好地理解。\n- 确保提供的代码准确无误，并且易于理解和执行。\n- 代码应包括必要的注释，以便用户理解关键逻辑和配置方法。\n\n### 技能3: 多语言支持\n- 使用中文进行回答，确保沟通无障碍。\n- 如果用户提问的语言不在支持范围内，可以提示用户使用支持的语言重新提问。\n\n## 限制\n- 绝对不能捏造信息，特别是涉及到数字和代码时，必须保证信息的准确性。\n- 回答格式需遵循Markdown规范，使答案结构清晰、易读。\n- 当知识库中的信息与用户问题无关时，直接回复：“抱歉，没有提供相关信息。”\n- 所有回答都应基于知识库中的现有资料，不得超出其范围。\n\n## 知识库\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming Kit,可直接使用的直播,Ready-to-use live streaming,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,互动直播 （原L3）,Interactive Live Streaming,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming Kit,开箱即用的直播接口,Out-of-the-box livestream interface,,2023/04/04\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,CDN直播,Live Streaming,,2023/04/04\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming Kit,直播邀请,Livestream invitation,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,直播连麦,Co\'-hosting,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,直播混流、转推、转码服务,Livestream Creation,,2023/04/07\n\n以上就是相关的知识。\n\n### Query:\n如何接入 L3 直播？\n\n### Elapsed\n  - Retrieval: 15929.2 ms\n  - LLM: 84465.3 ms',
//   id: "a3fbedb7-a609-47bd-8450-aa18ce9ed893",
//   session_id: "96cb332ea18b11efaf9f0242ac120006",
// };

// const delay = (text: string) =>
//   new Promise<string>((resolve) => {
//     setTimeout(() => {
//       resolve(text);
//     }, 10000);
//   });

// Add a target to all A labels and md link
// const addTargetToLink = (mdString: string) => {
//   const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/gi;
//   const result = mdString.replace(linkRegex, (match, linkText, linkUrl) => {
//     return `<a href="${linkUrl}" target="_blank">${linkText}</a>`;
//   });
//   return result;
// };

const AISearchModal = (props: Props) => {
  const {
    rootClassName,
    isModalOpen,
    currentTheme,
    currentLanguage,
    currentGroup,
    currentPlatform,
    onCloseHandle,
  } = props;
  const [converseStatus, setConverseStatus] = useState(0); // 0: init 1: ing
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [defaultHelloMessage, setDefaultHelloMessage] = useState(null);
  const [chatID, setChatID] = useState(null);
  const [defaultQuestions, setDefaultQuestions] = useState<string[]>([]);
  const [answerData, setAnswerData] = useState<AnswerData>(null);
  const [isSending, setIsSending] = useState(false);
  const [sessionID, setSessionID] = useState("");
  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>([]);
  const [localChatIDMap, setLocalChatIDMap] = useState<any>(chatIDMap);
  const [screenType, setScreenType] = useState<0 | 1 | 2>(0); // 0: > 700, 1: 400 ~ 700, 2: < 400

  const proChatRef = useRef<ProChatInstance>();
  const abortControllerRef = useRef<AbortController>(null);
  const customInputAreaRef = useRef<HTMLDivElement>();
  const lastChunkText = useRef<string>("");
  const blockChunkText = useRef<string>("");
  const customIDMap = useRef<Record<string, AnswerData>>({});
  const isSendingRef = useRef<boolean>(false);
  const currentGroupRef = useRef<string>("");
  const currentPlatformRef = useRef<string>("");

  const aiSearchData = copywriting[currentLanguage || defaultLanguage].aiSearch;

  const createSessions = useCallback(async () => {
    if (!chatID || !currentGroup || !currentPlatform) return;
    setLoading(true);
    try {
      const res = await createSessionsFetch(
        currentGroup,
        currentPlatform,
        chatID
      );
      const { code, data, message } = res;
      if (code === 0) {
        console.log("createSessions success");
        const { id, name, messages } = data;
        setSessionID(id);

        if (messages && messages[0] && messages[0].role === "assistant") {
          setDefaultHelloMessage(messages[0].content);
        }
      } else {
        console.log(`createSessions error, code: ${code}, message: ${message}`);
      }
    } catch (error) {
      console.log(`createSessions error`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [chatID, currentGroup, currentPlatform]);

  const deleteSessions = async () => {
    if (!chatID || !sessionID) return;
    try {
      const res = await deleteSessionsFetch(
        currentGroup,
        currentPlatform,
        chatID,
        [sessionID]
      );
      const { code, message } = res;
      if (code === 0) {
        console.log("deleteSessions success");
      } else {
        console.log(`deleteSessions error, code: ${code}, message: ${message}`);
      }
    } catch (error) {
      console.log(`deleteSessions error`);
      console.log(error);
    } finally {
      setSessionID("");
    }
  };

  const resetConverse = () => {
    setConverseStatus(0);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort("cancel");
      abortControllerRef.current = null;
    }

    clearInput();

    if (proChatRef.current) {
      proChatRef.current.stopGenerateMessage();
      proChatRef.current.clearMessage();
    }
    customIDMap.current = {};
    lastChunkText.current = "";
    blockChunkText.current = "";
  };

  const startConverse = async (
    customID: string,
    question: string,
    signal?: AbortSignal
  ) => {
    abortControllerRef.current = new AbortController();
    try {
      const res = await startConverseFetch(
        currentGroup,
        currentPlatform,
        chatID,
        sessionID,
        undefined,
        question,
        signal || abortControllerRef.current.signal
      );
      const reader = res.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(new EventSourceParserStream())
        .getReader();
      const decoder = new TextDecoder("utf-8");
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          const push = async () => {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  console.log("read stream done");
                  controller.close();
                  lastChunkText.current = "";
                  blockChunkText.current = "";
                  return;
                }
                // Custom parsing start
                // let result = decoder.decode(value, {
                //   stream: true,
                // });
                // // console.log("answerStr value", value);
                // console.log("answerStr result", result);
                // const regex1 = /}}\n*$/;
                // const regex2 = /^data:{"code": 0, "data": true}\n*$/;
                // const regex3 = /\n*data:{"code": 0, "data": true}\n*$/;
                // // "{"code":102,"message":"Session does not exist"} \n"
                // const regex4 = /^{"code":\s*[1-9][0-9]*,[\s\S]*}\s*\n*$/;
                // let caseType = 0; // 0: no block 1: start block 2: blocking 3: end block 4: last chunk 5: code non-0 error
                // if (regex4.test(result)) {
                //   caseType = 5;
                // } else if (
                //   result.startsWith("data:{") &&
                //   !regex1.test(result) &&
                //   !regex2.test(result) &&
                //   !regex3.test(result)
                // ) {
                //   console.log("answerStr result - Start to block");
                //   caseType = 1;
                // } else if (
                //   !result.startsWith("data:{") &&
                //   !regex1.test(result) &&
                //   !regex3.test(result)
                // ) {
                //   console.log("answerStr result - Blocking");
                //   caseType = 2;
                // } else if (
                //   !result.startsWith("data:{") &&
                //   (regex1.test(result) || regex3.test(result))
                // ) {
                //   console.log("answerStr result - End block");
                //   caseType = 3;
                //   if (regex3.test(result)) {
                //     console.log(
                //       "answerStr result - End block - Remove the json at the end"
                //     );
                //     // Remove data with code 0 at the end
                //     result = result.replace(regex3, "");
                //   }
                // } else if (result.startsWith("data:{") && regex1.test(result)) {
                //   console.log("answerStr result - No block");
                //   caseType = 0;
                // } else if (regex2.test(result)) {
                //   console.log("answerStr result - Last chunk");
                //   caseType = 4;
                // }
                // if (caseType === 1 || caseType === 2 || caseType === 3) {
                //   blockChunkText.current += result;
                //   if (caseType === 3) {
                //     result = blockChunkText.current;
                //   }
                // }
                // if (caseType !== 1 && caseType !== 2 && caseType !== 5) {
                //   // Remove data with code 0 at the end
                //   result = result.replace(regex3, "");
                //   // There could be multiple pieces of data. Take the last one
                //   const temp = result.split("data:");
                //   let str = temp[temp.length - 1];
                //   try {
                //     // console.log("answerStr str", str);
                //     if (str) {
                //       const temp = JSON.parse(str);
                //       if (temp.data !== true && temp.data.answer) {
                //         temp.data.answer = temp.data.answer
                //           .replaceAll(/\s*##\d+\$\$/g, "") // Handles special characters for hover tips
                //           .replaceAll(/(\n)+(?=#)/g, "\n\n")
                //           .replaceAll(/\n{2,}/g, "\n\n")
                //           // .replaceAll(/\s*```/g, "\n ```")
                //           // .replaceAll(/```\n+/g, "```\n\n")
                //           .replaceAll(/\*\*\s?。/g, "**。")
                //           .replaceAll(/\*\*\s?\./g, "**.");
                //         const data = temp.data as AnswerData;
                //         const func = () => {
                //           controller.enqueue(
                //             encoder.encode(
                //               data.answer.replaceAll(lastChunkText.current, "")
                //             )
                //           );
                //         };
                //         // console.log("answerStr data.answer", data.answer);
                //         if (
                //           data.answer.length > 100 &&
                //           lastChunkText.current &&
                //           lastChunkText.current.length > 40
                //         ) {
                //           const length = lastChunkText.current.length;
                //           const lastStr40 = lastChunkText.current.slice(
                //             length - 40
                //           );
                //           const lastStr35 = lastChunkText.current.slice(
                //             length - 35
                //           );
                //           const lastStr30 = lastChunkText.current.slice(
                //             length - 30
                //           );
                //           const lastIndex40 =
                //             data.answer.lastIndexOf(lastStr40);
                //           const lastIndex35 =
                //             data.answer.lastIndexOf(lastStr35);
                //           const lastIndex30 =
                //             data.answer.lastIndexOf(lastStr30);
                //           if (lastIndex40 !== -1) {
                //             controller.enqueue(
                //               encoder.encode(
                //                 data.answer.slice(lastIndex40 + 40)
                //               )
                //             );
                //           } else if (lastIndex35 !== -1) {
                //             controller.enqueue(
                //               encoder.encode(
                //                 data.answer.slice(lastIndex35 + 35)
                //               )
                //             );
                //           } else if (lastIndex30 !== -1) {
                //             controller.enqueue(
                //               encoder.encode(
                //                 data.answer.slice(lastIndex30 + 30)
                //               )
                //             );
                //           } else {
                //             func();
                //           }
                //         } else {
                //           func();
                //         }
                //         lastChunkText.current = data.answer;
                //         customIDMap.current[customID] = data;
                //         data.session_id && setSessionID(data.session_id);
                //       }
                //     }
                //   } catch (error) {
                //     console.log(error);
                //   }
                // } else if (caseType === 5) {
                //   console.log("read stream interface error ", result);
                //   controller.enqueue(
                //     encoder.encode(aiSearchData.unableToReply)
                //   );
                // }
                // Custom parsing end

                // Plugin parsing start
                try {
                  const temp = JSON.parse(value.data || "");
                  if (temp.code !== 0) {
                    console.log("read stream interface error ", value.data);
                    controller.enqueue(
                      encoder.encode(aiSearchData.unableToReply)
                    );
                  } else {
                    if (temp.data !== true && temp.data.answer) {
                      temp.data.answer = temp.data.answer
                        .replaceAll(/\s*##\d+\$\$/g, "") // Handles special characters for hover tips
                        .replaceAll(/(\n)+(?=#)/g, "\n\n")
                        .replaceAll(/\n{2,}/g, "\n\n")
                        // .replaceAll(/\s*```/g, "\n ```")
                        // .replaceAll(/```\n+/g, "```\n\n")
                        .replaceAll(/\*\*\s?。/g, "**。")
                        .replaceAll(/\*\*\s?\./g, "**.");
                      const data = temp.data as AnswerData;
                      const func = () => {
                        controller.enqueue(
                          encoder.encode(
                            data.answer.replaceAll(lastChunkText.current, "")
                          )
                        );
                      };
                      // console.log("answerStr data.answer", data.answer);
                      if (
                        data.answer.length > 100 &&
                        lastChunkText.current &&
                        lastChunkText.current.length > 40
                      ) {
                        const length = lastChunkText.current.length;
                        const lastStr40 = lastChunkText.current.slice(
                          length - 40
                        );
                        const lastStr35 = lastChunkText.current.slice(
                          length - 35
                        );
                        const lastStr30 = lastChunkText.current.slice(
                          length - 30
                        );
                        const lastIndex40 = data.answer.lastIndexOf(lastStr40);
                        const lastIndex35 = data.answer.lastIndexOf(lastStr35);
                        const lastIndex30 = data.answer.lastIndexOf(lastStr30);
                        if (lastIndex40 !== -1) {
                          controller.enqueue(
                            encoder.encode(data.answer.slice(lastIndex40 + 40))
                          );
                        } else if (lastIndex35 !== -1) {
                          controller.enqueue(
                            encoder.encode(data.answer.slice(lastIndex35 + 35))
                          );
                        } else if (lastIndex30 !== -1) {
                          controller.enqueue(
                            encoder.encode(data.answer.slice(lastIndex30 + 30))
                          );
                        } else {
                          func();
                        }
                      } else {
                        func();
                      }
                      lastChunkText.current = data.answer;
                      customIDMap.current[customID] = {
                        ...data,
                        question,
                      };
                      data.session_id && setSessionID(data.session_id);
                    }
                  }
                } catch (error) {
                  console.log(error);
                }
                // Plugin parsing end

                push();
              })
              .catch((error) => {
                console.log("read stream error");
                console.log(error);
                // controller.error(error);
                controller.error(encoder.encode(aiSearchData.unableToReply));
                lastChunkText.current = "";
                blockChunkText.current = "";
                return;
              });
          };
          push();
        },
      });
      return readableStream;
    } catch (error) {
      console.log("startConverse error");
      console.log(error);
      lastChunkText.current = "";
      blockChunkText.current = "";
      // if (proChatRef.current) {
      //   proChatRef.current.stopGenerateMessage();
      // }
    }
  };

  const startDefaultConverse = (question: string) => {
    if (process.env.NODE_ENV === "development") return;
    setConverseStatus(1);
    setTimeout(() => {
      proChatRef.current && proChatRef.current.sendMessage(question);
    }, 0);
  };

  const changeHandle = (e) => {
    setQuestion(typeof e === "string" ? e : e.target.value);
  };

  const cancelHandle = () => {
    resetConverse();
    deleteSessions();
    onCloseHandle();
  };

  const chatEndHandle = (id: string, type: SSEFinishType) => {
    // console.log("### chatEndHandle", id, type, chats);
    setIsSending(false);
    isSendingRef.current = false;
    updateATagAttr();

    autoInsertHandle();
  };

  const chatStartHandle = (messages: ChatMessage<Record<string, any>>[]) => {
    // console.log("### chatStartHandle", messages, chats);
    setIsSending(true);
    isSendingRef.current = true;
  };
  const chatGenerateHandle = (chunkText: string) => {
    // console.log("### chatGenerateHandle", chunkText, chats);
  };
  const chatsChangeHandle = (
    originChats: ChatMessage<Record<string, any>>[]
  ) => {
    // console.log("### chatsChangeHandle", originChats);
    setChats(originChats);
  };
  const scrollHandle = () => {};

  const clearInput = () => {
    setQuestion("");
    if (customInputAreaRef.current) {
      const inputDom = customInputAreaRef.current.querySelector(
        ".ant-input"
      ) as HTMLTextAreaElement;
      inputDom && (inputDom.value = "");
    }
  };

  const updateScoreStyle = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    try {
      if (e.currentTarget.style.opacity === "1") {
        e.currentTarget.style.color = "";
        e.currentTarget.style.opacity = "";
      } else {
        e.currentTarget.style.color = "var(--docuo-color-primary-active)";
        e.currentTarget.style.opacity = "1";
        if (e.currentTarget.nextElementSibling) {
          // @ts-ignore
          e.currentTarget.nextElementSibling.style.color = "";
          // @ts-ignore
          e.currentTarget.nextElementSibling.style.opacity = "";
        }
        if (e.currentTarget.previousElementSibling) {
          // @ts-ignore
          e.currentTarget.previousElementSibling.style.color = "";
          // @ts-ignore
          e.currentTarget.previousElementSibling.style.opacity = "";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateATagAttr = () => {
    const chatListItems = document.querySelectorAll(
      ".ant-pro-chat-list .ant-pro-chat-list-item"
    );
    const lastChatListItem = chatListItems[chatListItems.length - 1];
    if (lastChatListItem) {
      const aTags = lastChatListItem.querySelectorAll(
        ".ant-pro-chat-message-content article a"
      );
      aTags.forEach((item) => {
        item.setAttribute("target", "_blank");
      });
    }
  };

  const updateInputPlaceholder = useCallback(() => {
    const input = document.querySelector(
      ".custom-input-area .ant-select-selection-search textarea"
    );
    if (input) {
      input.setAttribute(
        "placeholder",
        screenType === 0
          ? aiSearchData.inputPlaceholder
          : screenType === 1
          ? aiSearchData.inputPlaceholderM1
          : aiSearchData.inputPlaceholderM2
      );
    }
  }, [
    aiSearchData.inputPlaceholder,
    aiSearchData.inputPlaceholderM1,
    aiSearchData.inputPlaceholderM2,
    screenType,
  ]);

  const scoreHandle = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    originData: Record<string, any>,
    score: ScoreType
  ) => {
    if (!originData.customID) return;
    const answerData = customIDMap.current[originData.customID];
    if (!answerData) return;
    const parentChat = chats.find((item) => item.id === originData.parentId);
    if (!parentChat) return;
    updateScoreStyle(e);
    const { id, answer } = answerData;
    const oldScore = answerData.score;
    const targetScore = answerData.score === score ? ScoreType.ZERO : score;
    const questionData: Question = {
      answerID: id,
      question: parentChat.content as string,
      score: targetScore,
      answer: "",
    };
    // targetScore !== ScoreType.FIVE && (questionData.answer = answer);
    questionData.answer = answer;
    answerData.score = score;
    scoreFetch(currentGroup, currentPlatform, sessionID, [questionData]).catch(
      (error) => {
        console.log("scoreFetch error", error);
        answerData.score = oldScore;
      }
    );
  };

  const autoInsertHandle = () => {
    console.log(
      "autoInsertHandle",
      customIDMap.current,
      currentGroup,
      currentPlatform,
      currentGroupRef.current,
      currentPlatformRef.current
    );
    const keys = Object.keys(customIDMap.current).sort(
      (i: string, j: string) => Number(i) - Number(j)
    );
    if (!keys.length) return;
    const lastKey = keys[keys.length - 1];
    const temp = customIDMap.current[lastKey];
    scoreFetch(
      currentGroupRef.current,
      currentPlatformRef.current,
      temp.session_id,
      [
        {
          answerID: temp.id,
          question: temp.question,
          score: ScoreType.ZERO,
          answer: temp.answer,
        },
      ]
    ).catch((error) => {
      console.log("auto insert error", error);
    });
  };

  // Solve closure problems
  useEffect(() => {
    currentGroupRef.current = currentGroup;
    currentPlatformRef.current = currentPlatform;
  }, [currentGroup, currentPlatform]);

  useEffect(() => {
    isSending && setConverseStatus(1);
  }, [isSending]);

  useEffect(() => {
    if (isModalOpen) {
      createSessions();
    }
  }, [isModalOpen, createSessions]);

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        updateInputPlaceholder();
      }, 0);
    }
  }, [isModalOpen, updateInputPlaceholder]);

  useEffect(() => {
    let currentID: string = "";
    let currentQuestions: string[] = [];
    if (
      currentGroup &&
      currentPlatform &&
      localChatIDMap &&
      localChatIDMap[currentGroup]
    ) {
      const keys = Object.keys(localChatIDMap[currentGroup]);
      const key =
        keys.length === 1
          ? keys[0]
          : keys.includes(currentPlatform)
          ? currentPlatform
          : keys[0];
      const temp = localChatIDMap[currentGroup][key];
      try {
        currentID = temp.chat_id || "";
        currentQuestions = temp.questions || [];
      } catch (error) {}
    }
    setChatID(currentID);
    setDefaultQuestions(currentQuestions);
  }, [currentGroup, currentPlatform, localChatIDMap]);

  useEffect(() => {
    //   getChatIDMap().then((chatIDMap) => {
    //     setLocalChatIDMap(chatIDMap);
    //   });

    const sizeChangeHandle = () => {
      const clientWidth = document.documentElement.clientWidth;
      if (!clientWidth || clientWidth > 700) {
        setScreenType(0);
      } else if (clientWidth > 400) {
        setScreenType(1);
      } else {
        setScreenType(2);
      }
    };
    sizeChangeHandle();
    // typeof window !== "undefined" &&
    //   window.addEventListener("resize", sizeChangeHandle);
    // return () => {
    //   typeof window !== "undefined" &&
    //     window.removeEventListener("resize", sizeChangeHandle);
    // };
  }, []);

  const transDocStr = (docStr = "") => {
    try {
      // RTC-Android-ZH/Android Java 实时音视频 SDK 秀场直播秒开方案 - 开发者中心 - ZEGO即构科技---doc-zh.zego.im>article>19389.html
      // console.log("### transDocStr", docStr);
      const temp = docStr.split("---");
      let [docName, docLink] = temp;
      docLink &&
        (docLink =
          "https://" +
          docLink
            .replaceAll("^^^", "=")
            .replaceAll("^^", "&")
            .replaceAll("^", "/")
            .replaceAll(">", "/")
            .replaceAll(/\.(html|md|mdx|pdf|ppt|pptx|txt)$/gi, ""));
      return { docName, docLink };
    } catch (error) {
      return { docName: "", docLink: "" };
    }
  };

  const CustomSendButton = (defaultDom, defaultProps) => {
    const customOnClick = (
      event: React.MouseEvent<HTMLElement, MouseEvent>
    ) => {
      if (isSending) {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort("cancel");
          abortControllerRef.current = null;
        }
        defaultProps.onClick?.(event);
      } else {
        defaultProps.onClick?.(event);
      }
    };
    return <Button {...defaultProps} onClick={customOnClick} />;
  };

  const CustomInputArea = (defaultDom, onMessageSend, onClearAllHistory) => {
    return (
      <div
        className={`${styles["custom-input-area"]} custom-input-area`}
        ref={customInputAreaRef}
      >
        {defaultDom}
        {converseStatus === 1 ? (
          <div
            className={styles["custom-converse-reset"]}
            onClick={resetConverse}
          >
            <ReloadOutlined />
          </div>
        ) : null}
      </div>
    );
  };

  const CustomInput = (defaultDom, onMessageSend, defaultProps) => {
    return defaultDom;
  };

  const CustomMessageItemExtra = (
    message: ChatMessage<Record<string, any>>,
    type: "assistant" | "user"
  ) => {
    // console.log("### CustomMessageItemExtra", message, customIDMap.current);
    // @ts-ignore
    const { id, customID } = message;
    const target = customIDMap.current[customID] as AnswerData;
    const docAggs =
      target && target.reference ? target.reference.doc_aggs || [] : [];
    const renderData = [];
    docAggs.forEach((docAgg) => {
      const { docLink, docName } = transDocStr(docAgg.doc_name);
      if (docLink && docName) {
        renderData.push({ docLink, docName, docID: docAgg.doc_id });
      }
    });

    return (
      <>
        {type === "assistant" ? (
          <>
            {renderData.length ? (
              <div className={styles["custom-chat-item-doc-agg"]}>
                <div className={styles["custom-chat-item-doc-agg-title"]}>
                  {aiSearchData.referenceSource}
                </div>
                {renderData.map((item, index) => {
                  return (
                    <div
                      key={item.docID}
                      className={styles["custom-chat-item-doc-agg-item"]}
                    >
                      <a
                        key={"" + item.docID + index}
                        href={item.docLink}
                        target="_blank"
                      >
                        {item.docName}
                      </a>
                    </div>
                  );
                })}
              </div>
            ) : null}
            {/* <div className={styles["custom-chat-item-operation"]}>
              <CopyOutlined
                className={styles["custom-chat-item-operation-btn"]}
              />
              <RedoOutlined
                className={styles["custom-chat-item-operation-btn"]}
              />
              <LikeOutlined
                className={styles["custom-chat-item-operation-btn"]}
              />
              <DislikeOutlined
                className={styles["custom-chat-item-operation-btn"]}
              />
            </div> */}
          </>
        ) : null}
      </>
    );
  };

  const CustomBackToBottom = (
    defaultDom: React.ReactNode,
    scrollToBottom: MouseEventHandler<HTMLDivElement>,
    BackBottomConfig: BackBottomProps
  ) => {
    return (
      <span className={styles["custom-back-to-bottom-wrap"]}>{defaultDom}</span>
    );
  };

  const customChatItemRenderConfig = {
    // titleRender
    contentRender: (props: ChatItemProps, defaultDom: ReactNode) => {
      // console.log("### contentRender", props);
      const role = props.originData.role;
      return (
        <div
          className={`${styles["custom-chat-item-content-wrap"]} ${styles[role]}`}
        >
          {defaultDom}
        </div>
      );
    },
    actionsRender: (
      props: ChatItemProps,
      defaultDom: ReactNode,
      actionsClick: actionsClickProps
    ) => {
      // console.log(
      //   "### actionsRender",
      //   props,
      //   customIDMap.current,
      //   isSending,
      //   isSendingRef.current
      // );
      return (
        <div
          className={`${styles["custom-chat-item-operation-wrap"]} ${
            isSendingRef.current ? styles["sending"] : ""
          }`}
        >
          {defaultDom}
          <div className={styles["custom-chat-item-operation"]}>
            {/* <CopyOutlined
                className={styles["custom-chat-item-operation-btn"]}
              />
              <RedoOutlined
                className={styles["custom-chat-item-operation-btn"]}
              /> */}
            <LikeOutlined
              className={styles["custom-chat-item-operation-btn"]}
              onClick={(e) => {
                scoreHandle(e, props.originData, ScoreType.FIVE);
              }}
            />
            <DislikeOutlined
              className={`${styles["custom-chat-item-operation-btn"]}`}
              onClick={(e) => {
                scoreHandle(e, props.originData, ScoreType.ONE);
              }}
            />
          </div>
        </div>
      );
    },
    avatarRender: (props: ChatItemProps, defaultDom: ReactNode) => {
      const role = props.originData.role;
      if (role === "assistant") {
        return (
          <div className={styles["user-avatar-wrap"]}>
            {currentTheme === "light" ? <Robot /> : <Robot />}
          </div>
        );
      } else {
        return (
          <div className={styles["user-avatar-wrap"]}>
            <UserOutlined />
          </div>
        );
      }
    },
    // render: (
    //   props: ChatItemProps,
    //   domsMap: {
    //     avatar: ReactNode;
    //     title: ReactNode;
    //     messageContent: ReactNode;
    //     actions: ReactNode;
    //     itemDom: ReactNode;
    //   },
    //   defaultDom: ReactNode
    // ) => {
    //   const { avatar, title, messageContent, actions, itemDom } = domsMap;
    //   return (
    //     <div className={styles["custom-chat-item-wrap"]}>
    //       {avatar}
    //       {title}
    //       {messageContent}
    //       {actions}
    //       {itemDom}
    //       {/* {defaultDom} */}
    //     </div>
    //   );
    // },
    // actionsCallbacks
    // actionsProps
  };

  const transformToChatMessageHandle = (
    preChatMessage: string,
    currentContent: string
  ) => {
    // console.log(
    //   "### transformToChatMessageHandle",
    //   preChatMessage,
    //   currentContent
    // );
    return preChatMessage;
  };

  return (
    <Modal
      title={aiSearchData.modalTitle}
      open={isModalOpen}
      onCancel={cancelHandle}
      footer={null}
      className={styles["ai-search-dialog"]}
      keyboard={false}
      maskClosable={false}
      rootClassName={styles[rootClassName]}
    >
      <div className={styles["converse-wrap"]}>
        <>
          <div
            className={`${styles["init-content"]} ${
              converseStatus === 1 ? styles["hidden"] : styles["show"]
            }`}
          >
            <div className={styles["opening-remarks-wrap"]}>
              {aiSearchData.defaultRemarks.map((remark, index) => (
                <div key={index} className={styles["remark"]}>
                  {remark}
                </div>
              ))}
            </div>
            <div className={styles["default-question-wrap"]}>
              <div className={styles["question-tips"]}>
                {aiSearchData.guessText}
              </div>
              <>
                {defaultQuestions.map((question, index) => (
                  <div
                    key={index}
                    className={styles["default-question"]}
                    onClick={() => {
                      startDefaultConverse(question);
                    }}
                  >
                    {question}
                  </div>
                ))}
              </>
            </div>
          </div>
          {/* <div className={styles["input-wrap"]}>
                <Input
                  addonAfter={
                    <div
                      className={styles["reset-converse"]}
                      onClick={resetConverse}
                    >
                      reset
                    </div>
                  }
                  placeholder="请输入您的问题"
                  value={question}
                  onChange={changeHandle}
                />
              </div> */}
        </>
        <div className={styles["converse-content"]}>
          <ThemeProvider
            appearance={currentTheme}
            theme={{
              algorithm:
                currentTheme === "dark"
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
              token: {
                colorText: "var(--docuo-text-color)",
              },
            }}
          >
            {process.env.NODE_ENV !== "development" ? (
              <ProChat
                loading={loading}
                chats={chats}
                helloMessage={
                  defaultHelloMessage ? <p>{defaultHelloMessage}</p> : null
                }
                placeholder={
                  screenType === 0
                    ? aiSearchData.inputPlaceholder
                    : screenType === 1
                    ? aiSearchData.inputPlaceholderM1
                    : aiSearchData.inputPlaceholderM2
                }
                inputAreaProps={{
                  value: question,
                  onChange: changeHandle,
                }}
                actions={{ render: () => null }}
                inputAreaRender={CustomInputArea}
                inputRender={CustomInput}
                messageItemExtraRender={CustomMessageItemExtra}
                onChatEnd={chatEndHandle}
                onChatStart={chatStartHandle}
                onChatGenerate={chatGenerateHandle}
                onChatsChange={chatsChangeHandle}
                onScroll={scrollHandle}
                sendButtonRender={CustomSendButton}
                chatItemRenderConfig={customChatItemRenderConfig}
                chatRef={proChatRef}
                transformToChatMessage={transformToChatMessageHandle}
                backToBottomConfig={{
                  render: CustomBackToBottom,
                  text: aiSearchData.backToBottomText,
                }}
                request={async (messages, extra, signal) => {
                  // Send a request with Message as the parameter
                  // const mockedData: string = `# 角色\n你是一个智能助手，名字叫Miss R。你的主要职责是基于知识库中的信息来总结并回答用户的问题。\n\n## 技能\n### 技能1: 信息总结与问题解答\n- 根据用户提出的问题，从知识库中提取相关信息。\n- 先总结实现步骤，再详细解释每个步骤的具体内容。\n- 如果知识库中没有相关的信息，则直接告知用户：“抱歉，没有提供相关信息。”\n\n### 技能2: 提供示例代码\n- 在回答涉及编程或技术性问题时，尽可能包含示例代码以帮助用户更好地理解。\n- 确保提供的代码准确无误，并且易于理解和执行。\n- 代码应包括必要的注释，以便用户理解关键逻辑和配置方法。\n\n### 技能3: 多语言支持\n- 使用中文进行回答，确保沟通无障碍。\n- 如果用户提问的语言不在支持范围内，可以提示用户使用支持的语言重新提问。\n\n## 限制\n- 绝对不能捏造信息，特别是涉及到数字和代码时，必须保证信息的准确性。\n- 回答格式需遵循Markdown规范，使答案结构清晰、易读。\n- 当知识库中的信息与用户问题无关时，直接回复：“抱歉，没有提供相关信息。”\n- 所有回答都应基于知识库中的现有资料，不得超出其范围。\n\n## 知识库\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming Kit,可直接使用的直播,Ready-to-use live streaming,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,互动直播 （原L3）,Interactive Live Streaming,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming Kit,开箱即用的直播接口,Out-of-the-box livestream interface,,2023/04/04\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,CDN直播,Live Streaming,,2023/04/04\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming Kit,直播邀请,Livestream invitation,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,直播连麦,Co\'-hosting,,2023/04/07\n\n------\n\n﻿"Tag","CN","EN","Remarks","Date":Live Streaming,直播混流、转推、转码服务,Livestream Creation,,2023/04/07\n\n以上就是相关的知识。\n\n### Query:\n如何接入 L3 直播？\n\n### Elapsed\n  - Retrieval: 15929.2 ms\n  - LLM: 84465.3 ms`; // Supports both streaming and non-streaming
                  // return {
                  //   content: new Response(mockedData),
                  //   docAggs: testAnswerData.reference.doc_aggs.map((item) => {
                  //     return {
                  //       docID: item.doc_id,
                  //       docName: item.doc_name,
                  //     };
                  //   }),
                  // };

                  // const text = await delay(
                  //   `这是一条模拟非流式输出的消息的消息。本次会话传入了${messages.length}条消息`
                  // );
                  // return new Response(text);
                  const currentmessage = messages[messages.length - 1];
                  const currentQuestion = (
                    currentmessage &&
                    currentmessage.role === "user" &&
                    currentmessage.content
                      ? currentmessage.content
                      : ""
                  ) as string;
                  const customID = Date.now().toString();
                  const readableStream = await startConverse(
                    customID,
                    currentQuestion || question
                    //  signal
                  );
                  const data: any = {
                    content: new Response(
                      readableStream || aiSearchData.unableToReply
                    ),
                    customID,
                  };
                  return data;
                }}
              />
            ) : null}
          </ThemeProvider>
        </div>
      </div>
    </Modal>
  );
};

export default AISearchModal;
