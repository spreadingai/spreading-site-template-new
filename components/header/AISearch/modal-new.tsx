import {
  Attachments,
  Bubble,
  Conversations,
  Prompts,
  Sender,
  Welcome,
  useXAgent,
  useXChat,
  XStream,
  BubbleProps,
  XProvider,
} from "@ant-design/x";
import { createStyles, ThemeProvider } from "antd-style";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  CloudUploadOutlined,
  CommentOutlined,
  EllipsisOutlined,
  FireOutlined,
  HeartOutlined,
  PaperClipOutlined,
  PlusOutlined,
  ReadOutlined,
  ShareAltOutlined,
  SmileOutlined,
  UserOutlined,
  SyncOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined,
  ReloadOutlined,
  // @ts-ignore
} from "@ant-design/icons";
import {
  Badge,
  Button,
  type GetProp,
  message,
  Modal,
  Space,
  Spin,
  theme,
  Typography,
  ConfigProvider,
} from "antd";
import { copywriting } from "@/components/constant/language";
import { ChatMessage, ProChatInstance } from "@ant-design/pro-chat";
import { Question, ScoreType } from "./types";
import Robot from "@/assets/icons/ai-search/Robot.svg";
import chatIDMap from "./chatIDMap.json";
import {
  createSessionsFetch,
  deleteSessionsFetch,
  scoreFetch,
  startConverseFetch,
} from "./fetch";
import outStyles from "./modal.new.module.scss";
import Shiki from "@shikijs/markdown-it";
import MarkdownIt from "markdown-it";
import { MessageInfo } from "@ant-design/x/es/useXChat";
import { v4 as uuidv4 } from "uuid";
// import type { BundledLanguage } from 'shiki'
// import { codeToHtml } from 'shiki'

const md = MarkdownIt();

interface AnswerData {
  score?: ScoreType;
  answer: string;
  id: string;
  prompt: string;
  session_id: string;
  reference: {
    total: number;
    chunks?: any[];
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

interface ConversationsItem {
  key: string;
  label: string;
}

type AgentUserMessage = {
  type: "user";
  content: string;
};

enum RequestStatus {
  Start = 0,
  Progress,
  End,
  Cancel,
  InterfaceError,
  ServerError,
}

type AgentAIMessage = {
  type: "ai";
  content?: string;
  list?: (
    | {
        type: "text";
        content: string;
      }
    | {
        type: "suggestion";
        content: string[];
      }
  )[];
  customID: string;
  requestStatus?: RequestStatus;
};

type AgentMessage = AgentUserMessage | AgentAIMessage;

const renderTitle = (icon: React.ReactElement, title: string) => (
  <Space align="start">
    {icon}
    <span>{title}</span>
  </Space>
);

const defaultConversationsItems = [
  {
    key: "0",
    label: "What is Ant Design X?",
  },
];

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      min-width: 1000px;
      height: 722px;
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;

      .ant-prompts {
        color: ${token.colorText};
      }
    `,
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
    conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,
    chat: css`
      height: 100%;
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${token.paddingLG}px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,
    logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        font-weight: bold;
        color: ${token.colorText};
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,
  };
});

// const senderPromptsItems: GetProp<typeof Prompts, "items"> = [
//   {
//     key: "1",
//     description: "Hot Topics",
//     icon: <FireOutlined style={{ color: "#FF4D4F" }} />,
//   },
//   {
//     key: "2",
//     description: "Design Guide",
//     icon: <ReadOutlined style={{ color: "#1890FF" }} />,
//   },
// ];

const Independent = (props: Props) => {
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
  const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>([]);
  const [localChatIDMap, setLocalChatIDMap] = useState<any>(chatIDMap);
  const [screenType, setScreenType] = useState<0 | 1 | 2>(0); // 0: > 700, 1: 400 ~ 700, 2: < 400
  const [messageApi, contextHolder] = message.useMessage();

  const proChatRef = useRef<ProChatInstance>();
  const abortControllerRef = useRef<AbortController>(null);
  const customInputAreaRef = useRef<HTMLDivElement>();
  const lastChunkText = useRef<string>("");
  const customIDMap = useRef<Record<string, AnswerData>>({});
  const isSendingRef = useRef<boolean>(false);
  const chatIDRef = useRef<string>("");

  const aiSearchData = copywriting[currentLanguage].aiSearch;

  // ==================== Style ====================
  const { styles } = useStyle();

  // ==================== State ====================
  // const [headerOpen, setHeaderOpen] = React.useState(false);

  const [content, setContent] = React.useState("");

  const [conversationsItems, setConversationsItems] = React.useState<
    ConversationsItem[]
  >([]);

  const [activeKey, setActiveKey] = React.useState(""); // sessionID

  // const [attachedFiles, setAttachedFiles] = React.useState<
  //   GetProp<typeof Attachments, "items">
  // >([]);

  const [bubbleList, setBubbleList] = React.useState<
    GetProp<typeof Bubble.List, "items">
  >([]);

  const roles: GetProp<typeof Bubble.List, "roles"> = {
    ai: {
      typing: { step: 2, interval: 20 },
      placement: "start",
      avatar: (
        <div className={outStyles["user-avatar-wrap"]}>
          {currentTheme === "light" ? <Robot /> : <Robot />}
        </div>
      ),
      loadingRender: () => (
        <Space>
          <Spin size="small" />
          {aiSearchData.beQuerying}
        </Space>
      ),
    },
    user: {
      placement: "end",
      avatar: (
        <div className={outStyles["user-avatar-wrap"]}>
          <UserOutlined />
        </div>
      ),
    },
  };

  // ==================== Runtime ====================
  const [agent] = useXAgent<AgentMessage>({
    request: async (messageInfo, { onSuccess, onUpdate, onError }) => {
      // onUpdate(`Mock success return. You said: ${message}`);
      // setTimeout(() => {
      //   onSuccess(`Mock success return. You said: ${message}`);
      // }, 1000);
      // const fullContent = `Streaming output instead of Bubble typing effect. You typed: ${message}`;
      // let currentContent = "";
      // const id = setInterval(() => {
      //   currentContent = fullContent.slice(0, currentContent.length + 2);
      //   onUpdate(currentContent);
      //   if (currentContent === fullContent) {
      //     clearInterval(id);
      //     onSuccess(fullContent);
      //   }
      // }, 100);

      const { message, messages } = messageInfo;
      const customID = Date.now().toString();
      const customAnswerID = generateCustomAnswerID();
      lastChunkText.current = "";
      try {
        onUpdate({
          type: "ai",
          content: "",
          customID,
          requestStatus: RequestStatus.Start,
        });
        abortControllerRef.current = new AbortController();
        const response = await startConverseFetch(
          currentGroup,
          currentPlatform,
          chatIDRef.current,
          activeKey,
          true,
          message.content,
          abortControllerRef.current.signal
        );
        const stream = XStream({
          readableStream: response.body,
        });
        for await (const chunk of stream) {
          console.log("chunk", chunk);
          try {
            const temp = JSON.parse(chunk.data || "");
            const {
              code,
              data,
              message: msg,
            } = temp as {
              code: number;
              data: true | AnswerData;
              message: string;
            };
            if (code !== 0) {
              console.log(
                `read stream interface error code: ${code}, message: ${msg}`
              );
              console.log("request onSuccess");
              onSuccess({
                type: "ai",
                content: aiSearchData.unableToReply,
                customID,
                requestStatus: RequestStatus.InterfaceError,
              });
              customIDMap.current[customID] = {
                id: customAnswerID,
                answer: aiSearchData.unableToReply,
                reference: {},
                question: message.content,
              } as AnswerData;
            } else {
              if (data !== true) {
                if (data.answer as string) {
                  console.log("request onUpdate");
                  data.answer = data.answer
                    .replaceAll(/\s*##\d+\$\$/g, "") // Handles special characters for hover tips
                    .replaceAll(/(\n)+(?=#)/g, "\n\n")
                    .replaceAll(/\n{2,}/g, "\n\n")
                    // .replaceAll(/\s*```/g, "\n ```")
                    // .replaceAll(/```\n+/g, "```\n\n")
                    .replaceAll(/\*\*\s?。/g, "**。")
                    .replaceAll(/\*\*\s?\./g, "**.");
                  onUpdate({
                    type: "ai",
                    content: data.answer,
                    customID,
                    requestStatus: RequestStatus.Progress,
                  });
                  lastChunkText.current = data.answer;
                  data.reference && delete data.reference.chunks;
                  customIDMap.current[customID] = {
                    id: data.id,
                    answer: data.answer,
                    reference: data.reference || {},
                    question: message.content,
                  } as AnswerData;
                }
              } else {
                console.log("request onSuccess");
                onSuccess({
                  type: "ai",
                  content: lastChunkText.current,
                  customID,
                  requestStatus: RequestStatus.End,
                });
                autoInsertHandle();
              }
            }
          } catch (error) {
            console.log("JSON parse error");
            console.log(error);
          }
        }
      } catch (error) {
        console.log("startConverse error");
        console.log(error);
        if (lastChunkText.current) {
          onSuccess({
            type: "ai",
            content: lastChunkText.current,
            customID,
            requestStatus: RequestStatus.End,
          });
          autoInsertHandle();
        } else {
          if (typeof error === "string" && error === "cancel") {
            onSuccess({
              type: "ai",
              content: aiSearchData.unableToReply,
              customID,
              requestStatus: RequestStatus.Cancel,
            });
          } else if (error.toString().includes("AbortError")) {
            onSuccess({
              type: "ai",
              content: aiSearchData.unableToReply,
              customID,
              requestStatus: RequestStatus.Cancel,
            });
          } else {
            onSuccess({
              type: "ai",
              content: aiSearchData.unableToReply,
              customID,
              requestStatus: RequestStatus.ServerError,
            });
            autoInsertHandle();
          }
        }
        customIDMap.current[customID] = {
          id: customAnswerID,
          answer: aiSearchData.unableToReply,
          reference: {},
          question: message.content,
        } as AnswerData;
      }
    },
  });

  const { onRequest, messages, setMessages } = useXChat({
    agent,
    // requestPlaceholder: "Waiting...",
    // requestFallback: aiSearchData.unableToReply,
    // parser: (agentMessage) => {
    //   const list = agentMessage.content ? [agentMessage] : (agentMessage as AgentAIMessage).list;

    //   return (list || []).map((msg) => ({
    //     role: msg.type,
    //     content: msg.content,
    //   }));
    // },
  });

  // ==================== Method ====================
  const resetConverse = useCallback(() => {
    setConverseStatus(0);

    setMessages([]);

    setContent("");
    onCancel();

    customIDMap.current = {};
    lastChunkText.current = "";
  }, [setMessages]);

  const createSessions = useCallback(async () => {
    if (!chatID || !currentGroup || !currentPlatform) return;
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
        setActiveKey(id);
        setConversationsItems((conversationsItems) => {
          return [
            {
              key: id,
              label: name,
            },
            ...conversationsItems,
          ];
        });
      } else {
        console.log(`createSessions error, code: ${code}, message: ${message}`);
      }
    } catch (error) {
      console.log(`createSessions error`);
      console.log(error);
    }
  }, [chatID, currentGroup, currentPlatform]);

  const deleteSessions = useCallback(
    async (sessionID?: string) => {
      if (!chatID) return;
      try {
        const sessionIDs = conversationsItems.map(
          (conversationsItem) => conversationsItem.key
        );
        if (!sessionID && !sessionIDs.length) return;
        const res = await deleteSessionsFetch(
          currentGroup,
          currentPlatform,
          chatID,
          sessionID ? [sessionID] : sessionIDs
        );
        const { code, message } = res;
        if (code === 0) {
          console.log("deleteSessions success");
        } else {
          console.log(
            `deleteSessions error, code: ${code}, message: ${message}`
          );
        }
      } catch (error) {
        console.log(`deleteSessions error`);
        console.log(error);
      }
    },
    [chatID, conversationsItems, currentGroup, currentPlatform]
  );

  const transDocStr = useCallback((docStr = "") => {
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
  }, []);

  const updateScoreStyle = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
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
    },
    []
  );

  const updateFooterStyle = useCallback((messageID: string | number) => {
    setTimeout(() => {
      const docAggDom = document.querySelector(
        `.${messageID}-item-doc-agg`
      ) as HTMLElement;
      const operationDom = document.querySelector(
        `.${messageID}-item-operation`
      ) as HTMLElement;
      console.log("updateFooterStyle", messageID, docAggDom, operationDom);
      docAggDom && (docAggDom.style.display = "block");
      operationDom && (operationDom.style.display = "flex");
    }, 0);
  }, []);

  const generateCustomAnswerID = useCallback(() => {
    return uuidv4();
  }, []);

  const updateATagAttr = useCallback(() => {
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
  }, []);

  const autoInsertHandle = useCallback(() => {
    console.log("autoInsertHandle", customIDMap.current);
    const keys = Object.keys(customIDMap.current).sort(
      (i: string, j: string) => Number(i) - Number(j)
    );
    if (!keys.length) return;
    const lastKey = keys[keys.length - 1];
    const temp = customIDMap.current[lastKey];
    scoreFetch(currentGroup, currentPlatform, temp.session_id, [
      {
        answerID: temp.id,
        question: temp.question,
        score: ScoreType.ZERO,
        answer: "",
      },
    ]).catch((error) => {
      console.log("auto insert error", error);
    });
  }, [currentGroup, currentPlatform]);

  const initMd = useCallback(async () => {
    const temp = await Shiki({
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    });
    md.use(temp);
  }, []);

  // ==================== Event ====================
  const onSubmit = (nextContent: string) => {
    if (!nextContent) return;
    onRequest({
      type: "user",
      content: nextContent,
    });
    setContent("");
  };

  const onCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort("cancel");
      abortControllerRef.current = null;
    }
  };

  const onPromptsItemClick: GetProp<typeof Prompts, "onItemClick"> = (info) => {
    if (activeKey && !agent.isRequesting()) {
      onRequest({
        type: "user",
        content: info.data.description as string,
      });
    }
  };

  const onAddConversation = () => {
    createSessions();
  };

  const onConversationClick: GetProp<typeof Conversations, "onActiveChange"> = (
    key
  ) => {
    setActiveKey(key);
  };

  // const handleFileChange: GetProp<typeof Attachments, "onChange"> = (info) =>
  //   setAttachedFiles(info.fileList);

  const cancelHandle = () => {
    resetConverse();

    deleteSessions();

    setConversationsItems([]);
    setActiveKey("");

    onCloseHandle();
  };

  const scoreHandle = useCallback(
    (
      e: React.MouseEvent<HTMLElement, MouseEvent>,
      message: AgentAIMessage,
      score: ScoreType
    ) => {
      if (!message.customID) return;
      const answerData = customIDMap.current[message.customID];
      if (!answerData) return;
      updateScoreStyle(e);
      const { id, answer } = answerData;
      const oldScore = answerData.score;
      const targetScore = answerData.score === score ? ScoreType.ZERO : score;
      const questionData: Question = {
        answerID: id,
        question: answerData.question,
        score: targetScore,
        answer: "",
      };
      targetScore !== ScoreType.FIVE && (questionData.answer = answer);
      answerData.score = score;
      scoreFetch(currentGroup, currentPlatform, activeKey, [
        questionData,
      ]).catch((error) => {
        console.log("scoreFetch error", error);
        answerData.score = oldScore;
      });
    },
    [activeKey, currentGroup, currentPlatform, updateScoreStyle]
  );

  const regenerateHandle = useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>, message: AgentAIMessage) => {
      if (agent.isRequesting() || !message.customID) return;
      const answerData = customIDMap.current[message.customID];
      if (!answerData) return;
      setMessages((oldMessages) => {
        return oldMessages.slice(0, oldMessages.length - 2);
      });
      onRequest({
        type: "user",
        content: answerData.question,
      });
      delete customIDMap.current[message.customID];
    },
    [agent, onRequest, setMessages]
  );

  const copyHandle = useCallback(
    async (
      e: React.MouseEvent<HTMLElement, MouseEvent>,
      message: AgentAIMessage
    ) => {
      await navigator.clipboard.writeText(message.content);
      messageApi.open({
        type: "success",
        content: aiSearchData.copySuccess,
      });
    },
    [aiSearchData.copySuccess, messageApi]
  );

  // ==================== Nodes ====================
  const placeholderPromptsItems: GetProp<typeof Prompts, "items"> = [
    {
      key: "1",
      label: renderTitle(
        <FireOutlined style={{ color: "#FF4D4F" }} />,
        "Hot Topics"
      ),
      description: "What are you interested in?",
      children: defaultQuestions.map((question, index) => ({
        key: `1-${index}`,
        icon: <CommentOutlined />,
        description: question,
      })),
    },
    // {
    //   key: "2",
    //   label: renderTitle(
    //     <ReadOutlined style={{ color: "#1890FF" }} />,
    //     "Design Guide"
    //   ),
    //   description: "How to design a good product?",
    //   children: [
    //     {
    //       key: "2-1",
    //       icon: <HeartOutlined />,
    //       description: `Know the well`,
    //     },
    //     {
    //       key: "2-2",
    //       icon: <SmileOutlined />,
    //       description: `Set the AI role`,
    //     },
    //     {
    //       key: "2-3",
    //       icon: <CommentOutlined />,
    //       description: `Express the feeling`,
    //     },
    //   ],
    // },
  ];

  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title={aiSearchData.defaultRemarks[0]}
        description={aiSearchData.defaultRemarks[1]}
        // extra={
        //   <Space>
        //     <Button icon={<ShareAltOutlined />} />
        //     <Button icon={<EllipsisOutlined />} />
        //   </Space>
        // }
      />
      <Prompts
        title={aiSearchData.guessText}
        items={placeholderPromptsItems}
        styles={{
          list: {
            width: "100%",
          },
          item: {
            flex: 1,
          },
        }}
        onItemClick={onPromptsItemClick}
      />
    </Space>
  );

  // const attachmentsNode = (
  //   <Badge dot={attachedFiles.length > 0 && !headerOpen}>
  //     <Button
  //       type="text"
  //       icon={<PaperClipOutlined />}
  //       onClick={() => setHeaderOpen(!headerOpen)}
  //     />
  //   </Badge>
  // );

  // const senderHeader = (
  //   <Sender.Header
  //     title="Attachments"
  //     open={headerOpen}
  //     onOpenChange={setHeaderOpen}
  //     styles={{
  //       content: {
  //         padding: 0,
  //       },
  //     }}
  //   >
  //     <Attachments
  //       beforeUpload={() => false}
  //       items={attachedFiles}
  //       onChange={handleFileChange}
  //       placeholder={(type) =>
  //         type === "drop"
  //           ? { title: "Drop file here" }
  //           : {
  //               icon: <CloudUploadOutlined />,
  //               title: "Upload files",
  //               description: "Click or drag files to this area to upload",
  //             }
  //       }
  //     />
  //   </Sender.Header>
  // );

  const logoNode = (
    <div className={styles.logo}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
        draggable={false}
        alt="logo"
      />
      <span>Ant Design X</span>
    </div>
  );

  const renderMarkdown: BubbleProps["messageRender"] = (content) => {
    return (
      <Typography>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
        <div
          dangerouslySetInnerHTML={{
            // __html: md.render(
            //   '要使用 ZIM SDK 发送单聊消息，可以按照以下步骤进行 ##1$$。以下是发送单聊消息的示例代码： ##0$$\n\n```java\n// 1. 创建 ZIM 实例并登录\nZIMAppConfig appConfig = new ZIMAppConfig();\nappConfig.appID = YOUR_APP_ID; // 替换为你的 AppID\nappConfig.appSign = "YOUR_APP_SIGN"; // 替换为你的 AppSign\nzim = ZIM.create(appConfig, application);\n\n// 2. 设置事件回调\nzim.setEventHandler(new ZIMEventHandler() {\n    @Override\n    public void onReceivePeerMessage(ZIM zim, ArrayList<ZIMMessage> messageList, String fromUserID) {\n        // 处理接收到的消息\n        for (ZIMMessage message : messageList) {\n            // 处理每条消息\n        }\n    }\n});\n\n// 3. 登录 ZIM\nzim.login("USER_ID", "USER_NAME", new ZIMLoginCallback() {\n    @Override\n    public void onLogin(int errorCode, String errorMessage, String userID) {\n        if (errorCode == 0) {\n            // 登录成功\n        } else {\n            // 登录失败，处理错误\n        }\n    }\n});\n\n// 4. 发送单聊消息\nString toUserID = "RECIPIENT_USER_ID"; // 替换为接收方的用户ID\nString messageContent = "Hello, this is a peer-to-peer message."; // 消息内容\n\nZIMTextMessage textMessage = new ZIMTextMessage(messageContent);\n\nZIMMessageSendConfig config = new ZIMMessageSendConfig();\nconfig.priority = ZIMMessagePriority.NORMAL;\n\nzim.sendMessage(textMessage, toUserID, ZIMConversationType.Peer, config, new ZIMMessageSentCallback() {\n    @Override\n    public void onMessageAttached(ZIMMessage zimMessage) {\n        // 消息附加完成\n    }\n\n    @Override\n    public void onMessageSent(ZIMMessage zimMessage, ZIMError error) {\n        if (error == null) {\n            // 消息发送成功\n        } else {\n            // 消息发送失败，处理错误\n        }\n    }\n});\n```\n ##4$$\n\n### 注意事项：\n- **ZIMAppConfig**：需要替换 `YOUR_APP_ID` 和 `YOUR_APP_SIGN` 为实际的值。\n- **用户登录**：确保用户已经成功登录 ZIM。\n- **消息类型**：这里使用的是 `ZIMTextMessage`，如果你需要发送其他类型的消息（如自定义消息），可以使用相应的消息类。\n- **回调处理**：确保在回调中处理消息发送成功或失败的情况 ##2$$。\n\n如果有任何疑问，请联系 ZEGO 技术支持。'
            // ),
            __html: md.render(content),
          }}
        />
      </Typography>
    );
  };

  const footerRender = useCallback(
    (messageInfo: MessageInfo<AgentMessage>) => {
      console.log("footerRender", customIDMap.current);
      // export type MessageStatus = 'local' | 'loading' | 'success' | 'error';
      const { id, message, status } = messageInfo;
      const { type, customID } = message as AgentAIMessage;
      const target = customIDMap.current[customID];
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
          {renderData.length ? (
            <div
              className={`${outStyles["custom-chat-item-doc-agg"]} ${id}-item-doc-agg`}
            >
              <div className={outStyles["custom-chat-item-doc-agg-title"]}>
                {aiSearchData.referenceSource}
              </div>
              {renderData.map((item, index) => {
                return (
                  <div
                    key={item.docID}
                    className={outStyles["custom-chat-item-doc-agg-item"]}
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
          <div className={`${outStyles["custom-chat-item-operation-wrap"]}`}>
            <div
              className={`${outStyles["custom-chat-item-operation"]} ${id}-item-operation`}
            >
              <SyncOutlined
                className={outStyles["custom-chat-item-operation-btn"]}
                onClick={(e) => {
                  regenerateHandle(e, message as AgentAIMessage);
                }}
              />
              <CopyOutlined
                className={outStyles["custom-chat-item-operation-btn"]}
                onClick={(e) => {
                  copyHandle(e, message as AgentAIMessage);
                }}
              />
              <LikeOutlined
                className={outStyles["custom-chat-item-operation-btn"]}
                onClick={(e) => {
                  scoreHandle(e, message as AgentAIMessage, ScoreType.FIVE);
                }}
              />
              <DislikeOutlined
                className={`${outStyles["custom-chat-item-operation-btn"]}`}
                onClick={(e) => {
                  scoreHandle(e, message as AgentAIMessage, ScoreType.ONE);
                }}
              />
            </div>
          </div>
        </>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      aiSearchData.referenceSource,
      customIDMap.current,
      transDocStr,
      regenerateHandle,
      copyHandle,
      scoreHandle,
    ]
  );

  // ==================== useEffect =================
  useEffect(() => {
    const items = messages.map((messageInfo) => {
      // export type MessageStatus = 'local' | 'loading' | 'success' | 'error';
      const { id, message, status } = messageInfo;
      return {
        key: id,
        loading: !message.content,
        role: status === "local" ? "user" : "ai",
        typing: status !== "local" ? { step: 2, interval: 20 } : false,
        content: message.content,
        messageRender: renderMarkdown,
        footer: status !== "success" ? null : footerRender(messageInfo),
        // onTypingComplete: () => {
        //   status === "success" && updateFooterStyle(id);
        // },
      };
    });
    setBubbleList(items);
  }, [messages, footerRender, updateFooterStyle]);

  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey]);

  useEffect(() => {
    if (isModalOpen) {
      createSessions();
    }
  }, [isModalOpen, createSessions]);

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
    chatIDRef.current = currentID;
  }, [currentGroup, currentPlatform, localChatIDMap]);

  useEffect(() => {
    initMd();
    return () => {
      onCancel();
    };
  }, [initMd]);

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

  // ==================== Render =================
  return (
    <Modal
      title={aiSearchData.modalTitle}
      open={isModalOpen}
      onCancel={cancelHandle}
      footer={null}
      className={outStyles["ai-search-dialog"]}
      keyboard={false}
      maskClosable={false}
      rootClassName={outStyles[rootClassName]}
    >
      {contextHolder}
      <XProvider
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
        <div className={styles.layout}>
          <div className={styles.menu}>
            {/* 🌟 Logo */}
            {logoNode}
            {/* 🌟 添加会话 */}
            <Button
              onClick={onAddConversation}
              type="link"
              className={styles.addBtn}
              icon={<PlusOutlined />}
            >
              New Conversation
            </Button>
            {/* 🌟 会话管理 */}
            <Conversations
              items={conversationsItems}
              className={styles.conversations}
              activeKey={activeKey}
              onActiveChange={onConversationClick}
            />
          </div>
          <div className={styles.chat}>
            {/* 🌟 消息列表 */}
            <Bubble.List
              items={
                bubbleList.length > 0
                  ? bubbleList
                  : [{ content: placeholderNode, variant: "borderless" }]
              }
              roles={roles}
              className={styles.messages}
            />
            {/* 🌟 提示词 */}
            {/* <Prompts
              items={senderPromptsItems}
              onItemClick={onPromptsItemClick}
            /> */}
            {/* 🌟 输入框 */}
            <div
              className={`${outStyles["custom-input-area"]} custom-input-area`}
              ref={customInputAreaRef}
            >
              <Sender
                value={content}
                // header={senderHeader}
                onSubmit={onSubmit}
                onChange={setContent}
                // prefix={attachmentsNode}
                loading={agent.isRequesting()}
                className={styles.sender}
                disabled={!activeKey}
                onCancel={onCancel}
                placeholder={
                  screenType === 0
                    ? aiSearchData.inputPlaceholder
                    : screenType === 1
                    ? aiSearchData.inputPlaceholderM1
                    : aiSearchData.inputPlaceholderM2
                }
              />
              {messages.length ? (
                <div
                  className={outStyles["custom-converse-reset"]}
                  onClick={resetConverse}
                >
                  <ReloadOutlined />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </XProvider>
    </Modal>
  );
};

export default Independent;
