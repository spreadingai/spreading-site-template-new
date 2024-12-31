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
} from "@ant-design/x";
import { createStyles } from "antd-style";
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
  Typography,
} from "antd";
import { copywriting } from "@/components/constant/language";
import { ChatMessage, ProChatInstance } from "@ant-design/pro-chat";
import { Question, ScoreType } from "./types";
import chatIDMap from "./chatIDMap.json";
import {
  createSessionsFetch,
  deleteSessionsFetch,
  scoreFetch,
  startConverseFetch,
} from "./fetch";
import outStyles from "./modal.new.module.scss";
import markdownit from "markdown-it";
import { MessageInfo } from "@ant-design/x/es/useXChat";

const md = markdownit({ html: true, breaks: true });

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

const roles: GetProp<typeof Bubble.List, "roles"> = {
  ai: {
    typing: { step: 5, interval: 20 },
    placement: "start",
    avatar: { icon: <UserOutlined />, style: { background: "#fde3cf" } },
    loadingRender: () => (
      <Space>
        <Spin size="small" />
        Custom loading...
      </Space>
    ),
  },
  local: {
    placement: "end",
    avatar: { icon: <UserOutlined />, style: { background: "#87d068" } },
  },
};

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

  const proChatRef = useRef<ProChatInstance>();
  const abortControllerRef = useRef(() => {});
  const customInputAreaRef = useRef<HTMLDivElement>();
  const lastChunkText = useRef<string>("");
  const customIDMap = useRef<Record<string, AnswerData>>({});
  const isSendingRef = useRef<boolean>(false);
  const chatIDRef = useRef<string>("");

  const aiSearchData = copywriting[currentLanguage].aiSearch;
  const [messageApi, contextHolder] = message.useMessage();

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

  // ==================== Method ====================
  const resetConverse = useCallback(() => {
    setConverseStatus(0);

    setContent("");
    abortControllerRef.current();

    if (proChatRef.current) {
      proChatRef.current.stopGenerateMessage();
      proChatRef.current.clearMessage();
    }
    customIDMap.current = {};
    lastChunkText.current = "";
  }, []);

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
      } finally {
        setConversationsItems([]);
        setActiveKey("");
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
      onUpdate({
        type: "ai",
        content: "",
        customID,
      });
      try {
        const response = await startConverseFetch(
          currentGroup,
          currentPlatform,
          chatIDRef.current,
          activeKey,
          true,
          message.content
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
              onError(aiSearchData.unableToReply);
            } else {
              if (data !== true) {
                if (data.answer as string) {
                  onUpdate({
                    type: "ai",
                    content: data.answer,
                    customID,
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
                onSuccess({
                  type: "ai",
                  content: lastChunkText.current,
                  customID,
                });
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
        lastChunkText.current = "";
        onError(aiSearchData.unableToReply);
      }
    },
  });

  const { onRequest, messages, setMessages } = useXChat({
    agent,
    // requestPlaceholder: 'Waiting...',
    // requestFallback: 'Mock failed return. Please try again later.',
    // parser: (agentMessage) => {
    //   const list = agentMessage.content ? [agentMessage] : (agentMessage as AgentAIMessage).list;

    //   return (list || []).map((msg) => ({
    //     role: msg.type,
    //     content: msg.content,
    //   }));
    // },
  });

  // ==================== Event ====================
  const onSubmit = (nextContent: string) => {
    if (!nextContent) return;
    onRequest({
      type: "user",
      content: nextContent,
    });
    setContent("");
  };

  const onPromptsItemClick: GetProp<typeof Prompts, "onItemClick"> = (info) => {
    if (activeKey) {
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

  const renderMarkdown: BubbleProps["messageRender"] = (content) => (
    <Typography>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
      <div dangerouslySetInnerHTML={{ __html: md.render(content) }} />
    </Typography>
  );

  const footerRender = useCallback(
    (messageInfo: MessageInfo<AgentMessage>) => {
      console.log("footerRender", customIDMap.current);
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
            <div className={outStyles["custom-chat-item-doc-agg"]}>
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
          {status !== "loading" ? (
            <div className={`${outStyles["custom-chat-item-operation-wrap"]}`}>
              <div className={outStyles["custom-chat-item-operation"]}>
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
          ) : null}
        </>
      );
    },
    [
      aiSearchData.referenceSource,
      transDocStr,
      regenerateHandle,
      copyHandle,
      scoreHandle,
    ]
  );

  // ==================== useEffect =================
  useEffect(() => {
    const items = messages.map((messageInfo) => {
      const { id, message, status } = messageInfo;
      return {
        key: id,
        loading: status === "loading",
        role: status === "local" ? "local" : "ai",
        typing: status !== "local",
        content: message.content,
        messageRender: renderMarkdown,
        footer: status === "local" ? null : footerRender(messageInfo),
      };
    });
    setBubbleList(items);
  }, [messages, footerRender]);

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
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      abortControllerRef.current();
    };
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
          <Sender
            value={content}
            // header={senderHeader}
            onSubmit={onSubmit}
            onChange={setContent}
            // prefix={attachmentsNode}
            loading={agent.isRequesting()}
            className={styles.sender}
            disabled={!activeKey}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Independent;
