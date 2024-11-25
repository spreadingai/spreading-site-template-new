import { Question } from "./types";
import chatIDMap from "./chatIDMap.json";

export const defaultChatID = "ae8051de91e611efaeac0242ac120004";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // http://localhost:3000
    : "https://ai-search.zegocloud.com";
console.log(process.env.NODE_ENV, baseURL);

export const getChatIDMap = () => {
  const url = "https://storage.zego.im/sdk-doc/ai_search_mapping.json";
  return fetch(url, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      // Use local
      return chatIDMap;
    });
};

export const createSessionsFetch = async (
  product: string,
  platform: string,
  chatID: string
) => {
  const url = `${baseURL}/api/v1/chats/sessions`;
  const reqData: any = { product, platform, chatID };
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const deleteSessionsFetch = async (
  product: string,
  platform: string,
  chatID: string,
  ids: string[]
) => {
  const url = `${baseURL}/api/v1/chats/sessions`;
  const reqData: any = { product, platform, chatID, ids };
  return fetch(url, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
};

export const startConverseFetch = async (
  product: string,
  platform: string,
  chatID: string,
  sessionID: string, // ae8051de91e611efaeac0242ac120004
  stream = true,
  question = "",
  signal
) => {
  const reqData: any = {
    product,
    platform,
    chatID,
    question,
    stream,
    sessionID: sessionID || undefined,
  };
  const url = `${baseURL}/api/v1/chats/completions`;
  // const reqData = { question, stream, session_id: sessionID || undefined };
  // const url =
  // "https://ai-service.zegocloud.com/api/v1/chats/ae8051de91e611efaeac0242ac120004/completions";
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ragflow-k0MzlkZjM0OTdmOTExZWZiNjM4MDI0Mm`,
    },
    body: JSON.stringify(reqData),
    signal,
  })
    .then((res) => {
      if (res.ok) return Promise.resolve(res);
    })
    .then((_res) => {
      const reader = _res.body.getReader();
      return reader;
    });
};

export const scoreFetch = (
  product: string,
  platform: string,
  sessionID: string,
  questions: Question[]
) => {
  const url = `${baseURL}/api/v1/feedback/search`;
  const reqData = { product, platform, sessionID, questions };
  return fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reqData),
  })
    .then((res) => {
      if (res.ok) {
        return Promise.resolve(res);
      } else {
        const { status, statusText } = res;
        return Promise.reject(`status: ${status}, statusText: ${statusText}`);
      }
    })
    .then((_res) => {
      return _res.body;
    });
};
