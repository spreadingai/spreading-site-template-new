import {
  Bubble,
  Prompts,
  Sender,
  Welcome,
  useXAgent,
  useXChat,
  XStream,
  BubbleProps,
} from "@ant-design/x";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  CommentOutlined,
  UserOutlined,
  SyncOutlined,
  CopyOutlined,
  LikeOutlined,
  DislikeOutlined,
  ReloadOutlined,
  SendOutlined,
  // @ts-ignore
} from "@ant-design/icons";
import {
  type GetProp,
  message,
  Modal,
  Space,
  Spin,
  Typography,
  theme,
} from "antd";
import { copywriting } from "@/components/constant/language";
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
import { bundledLanguages, createHighlighter } from "shiki";
import MarkdownIt from "markdown-it";
import { MessageInfo } from "@ant-design/x/es/useXChat";
import { v4 as uuidv4 } from "uuid";
import { ThemeProvider } from "antd-style";
import { Markdown } from "@ant-design/pro-editor";

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
  Start = 0, // 开始请求
  Progress, // 接收数据中
  NormalEnd, // 正常接收数据完成
  AbnormalEnd, // 接收中异常结束
  CancelBeforeReceiving, // 接收前取消
  CancelOnReceive, // 接收中取消
  InterfaceError, // 接口报错，错误码非 0
  ServerError, // 接口报错，服务异常
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

  const [chatID, setChatID] = useState(null);
  const [defaultQuestions, setDefaultQuestions] = useState<string[]>([]);
  const [localChatIDMap, setLocalChatIDMap] = useState<any>(chatIDMap);
  const [screenType, setScreenType] = useState<0 | 1 | 2>(0); // 0: > 700, 1: 400 ~ 700, 2: < 400
  const [messageApi, contextHolder] = message.useMessage();

  const abortControllerRef = useRef<AbortController>(null);
  const customInputAreaRef = useRef<HTMLDivElement>();
  const lastChunkText = useRef<string>("");
  const customIDMap = useRef<Record<string, AnswerData>>({});
  const currentGroupRef = useRef<string>("");
  const currentPlatformRef = useRef<string>("");
  const chatIDRef = useRef<string>("");
  const activeKeyRef = useRef<string>("");
  const mdRef = useRef(null);

  const aiSearchData = copywriting[currentLanguage].aiSearch;

  // ==================== State ====================
  const [content, setContent] = React.useState("");

  const [conversationsItems, setConversationsItems] = React.useState<
    ConversationsItem[]
  >([]);

  const [activeKey, setActiveKey] = React.useState(""); // sessionID

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
          <Spin size="small" className={outStyles.queryLoading} />
          <span className={outStyles.queryTips}>{aiSearchData.beQuerying}</span>
        </Space>
      ),
      // onTypingComplete: () => {
      //   console.log("onTypingComplete");
      // },
      classNames: {
        content: outStyles.customBubbleContent,
        footer: outStyles.customBubbleFooter,
      },
    },
    user: {
      placement: "end",
      avatar: (
        <div className={outStyles["user-avatar-wrap"]}>
          <UserOutlined />
        </div>
      ),
      classNames: {
        content: outStyles.customBubbleContent,
      },
    },
  };

  // ==================== Runtime ====================
  const [agent] = useXAgent<AgentMessage>({
    request: async (messageInfo, { onSuccess, onUpdate, onError }) => {
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
          activeKeyRef.current,
          true,
          message.content,
          abortControllerRef.current.signal
        );
        const stream = XStream({
          readableStream: response.body,
        });
        for await (const chunk of stream) {
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
                    session_id: data.session_id,
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
                  requestStatus: RequestStatus.NormalEnd,
                });
                autoInsertHandle(customID);
                updateFooterStyle();
                updateATagAttr();
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
            requestStatus: RequestStatus.AbnormalEnd,
          });
          autoInsertHandle(customID);
          updateFooterStyle();
          updateATagAttr();
        } else {
          if (typeof error === "string" && error === "cancel") {
            onSuccess({
              type: "ai",
              content: aiSearchData.unableToReply,
              customID,
              requestStatus: RequestStatus.CancelBeforeReceiving,
            });
          } else if (error.toString().includes("AbortError")) {
            onSuccess({
              type: "ai",
              content: aiSearchData.unableToReply,
              customID,
              requestStatus: RequestStatus.CancelOnReceive,
            });
          } else {
            onSuccess({
              type: "ai",
              content: aiSearchData.unableToReply,
              customID,
              requestStatus: RequestStatus.ServerError,
            });
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
  });

  // ==================== Method ====================
  const resetConverse = useCallback(() => {
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

  const updateFooterStyle = useCallback(() => {
    setTimeout(() => {
      const docAggDoms = document.querySelectorAll(`.custom-chat-item-doc-agg`);
      const operationDoms = document.querySelectorAll(
        `.custom-chat-item-operation`
      );
      const docAggDom = docAggDoms[docAggDoms.length - 1];
      const operationDom = operationDoms[operationDoms.length - 1];
      console.log("updateFooterStyle", docAggDom, operationDom);
      docAggDom && ((docAggDom as HTMLElement).style.display = "block");
      operationDom && ((operationDom as HTMLElement).style.display = "flex");
      if (docAggDom || operationDom) {
        const scrollContainer = document.querySelector(".ant-bubble-list");
        scrollContainer &&
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
      }
    }, 500);
  }, []);

  const generateCustomAnswerID = useCallback(() => {
    return uuidv4();
  }, []);

  const updateATagAttr = useCallback(() => {
    setTimeout(() => {
      const chatListItems = document.querySelectorAll(
        ".ant-bubble-list .ant-bubble"
      );
      console.log("updateATagAttr chatListItems ", chatListItems);
      chatListItems.forEach((chatListItem) => {
        const aTags = chatListItem.querySelectorAll(
          ".ant-bubble-content-wrapper article a"
        );
        console.log("updateATagAttr aTags ", aTags, chatListItem);
        aTags.forEach((item) => {
          item.setAttribute("target", "_blank");
        });
      });
    }, 2000);
  }, []);

  const autoInsertHandle = useCallback((customID: string) => {
    console.log(
      "autoInsertHandle",
      customIDMap.current,
      currentGroupRef.current,
      currentPlatformRef.current
    );
    const temp = customIDMap.current[customID];
    temp &&
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
  }, []);

  const initMd = useCallback(async () => {
    try {
      const langs = Object.keys(bundledLanguages);
      const highlighter = await createHighlighter({
        themes: ["one-light", "one-dark-pro"],
        langs,
      });
      const md = MarkdownIt({
        highlight: function (str: string, lang: string) {
          if (lang && langs.includes(lang)) {
            try {
              const codeHtml = highlighter.codeToHtml(str, {
                lang,
                theme: currentTheme === "light" ? "one-light" : "one-dark-pro",
              });
              return codeHtml;
            } catch (__) {}
          }
          return "";
        },
      });
      mdRef.current = md;
    } catch (error) {}
  }, [currentTheme]);

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
    if (
      activeKey &&
      !agent.isRequesting() &&
      ((process.env.NODE_ENV === "development" && mdRef.current) ||
        process.env.NODE_ENV !== "development")
    ) {
      onRequest({
        type: "user",
        content: info.data.description as string,
      });
    }
  };

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
      // targetScore !== ScoreType.FIVE && (questionData.answer = answer);
      questionData.answer = answer;
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
      children: defaultQuestions.map((question, index) => ({
        key: `1-${index}`,
        icon: <CommentOutlined />,
        description: question,
      })),
    },
  ];

  const placeholderNode = (
    <Space direction="vertical" className={outStyles.placeholderNode}>
      <Welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title={aiSearchData.defaultRemarks[0]}
        description={aiSearchData.defaultRemarks[1]}
        rootClassName={outStyles.welcomeWrap}
        classNames={{
          icon: outStyles.welcomeIcon,
          title: outStyles.welcomeTitle,
          description: outStyles.welcomeDescription,
        }}
      />
      {defaultQuestions.length ? (
        <Prompts
          title={aiSearchData.guessText}
          items={placeholderPromptsItems}
          classNames={{
            title: outStyles["question-tips"],
            list: outStyles.questionList,
            item: outStyles.questionItem,
            subItem: outStyles.questionSubItem,
          }}
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
      ) : null}
    </Space>
  );

  const renderMarkdown: BubbleProps["messageRender"] = (content) => {
    return process.env.NODE_ENV === "development" ? (
      <Typography>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: used in demo */}
        <div
          className={outStyles.articleWrap}
          dangerouslySetInnerHTML={{
            __html: mdRef.current.render(content),
          }}
        />
      </Typography>
    ) : (
      <Markdown>{content}</Markdown>
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
              className={`${outStyles["custom-chat-item-doc-agg"]} custom-chat-item-doc-agg`}
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
          <div
            className={`${outStyles["custom-chat-item-operation"]} custom-chat-item-operation`}
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
    const items = [];
    messages.forEach((messageInfo) => {
      // export type MessageStatus = 'local' | 'loading' | 'success' | 'error';
      const { id, message, status } = messageInfo;
      if (
        status === "local" ||
        ((message as AgentAIMessage).requestStatus !==
          RequestStatus.CancelBeforeReceiving &&
          (message as AgentAIMessage).requestStatus !==
            RequestStatus.CancelOnReceive)
      ) {
        items.push({
          key: id,
          loading: !message.content,
          role: status === "local" ? "user" : "ai",
          typing: status !== "local" ? { step: 2, interval: 20 } : false,
          content: message.content,
          messageRender: renderMarkdown,
          footer: status !== "success" ? null : footerRender(messageInfo),
        });
      }
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
  }, [currentGroup, currentPlatform, localChatIDMap]);

  useEffect(() => {
    initMd();
  }, [initMd]);

  useEffect(() => {
    //   getChatIDMap().then((chatIDMap) => {
    //     setLocalChatIDMap(chatIDMap);
    //   });

    const sizeChangeHandle = () => {
      console.log("sizeChangeHandle");
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
    typeof window !== "undefined" &&
      window.addEventListener("resize", sizeChangeHandle);
    return () => {
      typeof window !== "undefined" &&
        window.removeEventListener("resize", sizeChangeHandle);
    };
  }, []);

  // Solve closure problems
  useEffect(() => {
    currentGroupRef.current = currentGroup;
    currentPlatformRef.current = currentPlatform;
  }, [currentGroup, currentPlatform]);

  useEffect(() => {
    chatIDRef.current = chatID;
  }, [chatID]);

  useEffect(() => {
    activeKeyRef.current = activeKey;
  }, [activeKey]);

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
      <ThemeProvider
        appearance={currentTheme}
        theme={{
          token: {
            colorText: "var(--docuo-text-color)",
          },
        }}
      >
        <div className={outStyles["converse-wrap"]}>
          <div className={outStyles["converse-content"]}>
            {/* 🌟 消息列表 */}
            <Bubble.List
              items={
                bubbleList.length > 0
                  ? bubbleList
                  : [
                      {
                        content: placeholderNode,
                        variant: "borderless",
                        classNames: {
                          content: outStyles.placeholderContent,
                        },
                      },
                    ]
              }
              roles={roles}
            />
            {/* 🌟 输入框 */}
            <div
              className={`${outStyles["custom-input-area"]} custom-input-area`}
              ref={customInputAreaRef}
            >
              <Sender
                value={content}
                onSubmit={onSubmit}
                onChange={setContent}
                loading={agent.isRequesting()}
                className={outStyles.sender}
                disabled={
                  !activeKey ||
                  (process.env.NODE_ENV === "development" && !mdRef.current)
                }
                onCancel={onCancel}
                placeholder={
                  screenType === 0
                    ? aiSearchData.inputPlaceholder
                    : screenType === 1
                    ? aiSearchData.inputPlaceholderM1
                    : aiSearchData.inputPlaceholderM2
                }
                classNames={{
                  actions: outStyles.senderActions,
                }}
                actions={(_, info) => {
                  const { SendButton, LoadingButton } = info.components;
                  if (agent.isRequesting()) {
                    return <LoadingButton />;
                  } else {
                    return <SendButton icon={<SendOutlined />} />;
                  }
                }}
              />
              {bubbleList.length ? (
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
      </ThemeProvider>
    </Modal>
  );
};

export default Independent;
