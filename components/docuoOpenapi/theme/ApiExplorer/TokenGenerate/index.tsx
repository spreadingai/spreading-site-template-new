"use client";

import React, { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import CryptoJS from "crypto-js";
import styles from "./styles.module.scss";
import { createStorage } from "../storage-utils";
import { useTypedSelector } from "@/components/docuoOpenapi/theme/ApiItem/hooks";
import {
  setParam,
} from "@/components/docuoOpenapi/theme/ApiExplorer/ParamOptions/slice";
import { useTypedDispatch } from "@/components/docuoOpenapi/theme/ApiItem/hooks";

export interface SignatureData {
  appId: string;
  serverSecret: string;
  signatureNonce: string;
  timestamp: string;
  signature: string;
}

interface TokenGenerateProps {
  onSignatureGenerated?: (data: SignatureData) => void;
  autoFillRequest?: boolean;
}

const TokenGenerate: React.FC<TokenGenerateProps> = ({
  onSignatureGenerated,
  autoFillRequest = true,
}) => {
  const pathname = usePathname();
  const [appId, setAppId] = useState("");
  const [serverSecret, setServerSecret] = useState("");
  const [signatureNonce, setSignatureNonce] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [signature, setSignature] = useState("");

  const storage = useMemo(() => createStorage("sessionStorage"), []);
  const dispatch = useTypedDispatch();
  const queryParams = useTypedSelector((state: any) => state.params.query);

  const generateSignature = (params: {
    appId: string;
    signatureNonce: string;
    serverSecret: string;
    timestamp: number;
  }): string => {
    const { appId, signatureNonce, serverSecret, timestamp } = params;
    const str = `${appId}${signatureNonce}${serverSecret}${timestamp}`;
    const signature = CryptoJS.MD5(str).toString();
    return signature;
  };

  const generateCommonParams = (
    currentAppId: string,
    currentServerSecret: string
  ): {
    signatureNonce: string;
    timestamp: number;
    signature: string;
  } => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signatureNonce = Math.random().toString(36).substring(2);

    const signature = generateSignature({
      appId: currentAppId,
      signatureNonce,
      serverSecret: currentServerSecret,
      timestamp,
    });

    return {
      signatureNonce,
      timestamp,
      signature,
    };
  };

  /**
   * 更新 Redux 中的参数值，触发 FormTextInput 输入框的值更新
   * 同时更新 storage 中的 openapi_params 数据
   * @param signatureData 新生成的签名数据
   */
  const updateOpenApiParams = (signatureData: SignatureData): void => {
    try {
      // 从 storage 读取 openapi_params
      const openApiParamsStr = storage.getItem("openapi_params");

      // 如果不存在则创建新对象，否则解析现有数据
      let openApiParams = openApiParamsStr ? JSON.parse(openApiParamsStr) : {};

      // 定义字段映射：签名数据字段 -> openapi_params 字段名
      const fieldMappings = [
        { signatureKey: "appId", paramNames: ["query:AppId", "query:appId"] },
        { signatureKey: "signature", paramNames: ["query:Signature", "query:signature"] },
        { signatureKey: "signatureNonce", paramNames: ["query:SignatureNonce", "query:signatureNonce"] },
        { signatureKey: "timestamp", paramNames: ["query:Timestamp", "query:timestamp"] },
      ];

      // 遍历字段映射，更新 Redux 中的参数和 storage 中的数据
      fieldMappings.forEach(({ signatureKey, paramNames }) => {
        const value = signatureData[signatureKey as keyof SignatureData];

        // 更新 storage 中的 openapi_params
        paramNames.forEach((paramName) => {
            openApiParams[paramName] = value;
        });

        // 更新 Redux 中的参数值，触发 FormTextInput 的值更新
        // 查找对应的参数对象并通过 dispatch 更新
        queryParams?.forEach((param: any) => {
          if (paramNames.includes(`query:${param.name}`)) {
            dispatch(
              setParam({
                ...param,
                value: value,
              })
            );
          }
        });
      });

      // 将更新后的数据保存回 storage
      storage.setItem("openapi_params", JSON.stringify(openApiParams));
      storage.setItem("server_secret", signatureData.serverSecret);
    } catch (error) {}
  };

  // Detect route changes and auto-regenerate signature
  useEffect(() => {
    // 优先使用当前 state 中的 appId 和 serverSecret
    // 如果 state 中没有，则从 Redux 中的 queryParams 读取 appId，从 storage 中读取 serverSecret
    let currentAppId = appId;
    let currentServerSecret = serverSecret;

    if (!currentAppId.trim()) {
      // 从 queryParams 中读取 AppId 和 ServerSecret
      queryParams?.forEach((param: any) => {
        if (!currentAppId.trim() && (param.name === "AppId" || param.name === "appId")) {
          currentAppId = (param.value as string) || "";
          if (currentAppId) {
            setAppId(currentAppId);
          }
        }
      });
    }
    if (!currentServerSecret.trim()) {
      // 从 storage 读取 openapi_params
      const serverSecretStr = storage.getItem("server_secret") || "";
      currentServerSecret = serverSecretStr || "";
      if (currentServerSecret) {
        setServerSecret(currentServerSecret);
      }
    }

    // Only regenerate if we have both appId and serverSecret
    if (currentAppId.trim() && currentServerSecret.trim()) {
      const generatedParams = generateCommonParams(currentAppId, currentServerSecret);
      setSignatureNonce(generatedParams.signatureNonce);
      setTimestamp(generatedParams.timestamp.toString());
      setSignature(generatedParams.signature);

      const signatureData: SignatureData = {
        appId: currentAppId,
        serverSecret: currentServerSecret,
        signatureNonce: generatedParams.signatureNonce,
        timestamp: generatedParams.timestamp.toString(),
        signature: generatedParams.signature,
      };

      // Auto-fill request parameters if enabled
      if (autoFillRequest) {
        // update openapi_params
        updateOpenApiParams(signatureData);
      }

      // Notify parent component if callback provided
      if (onSignatureGenerated) {
        onSignatureGenerated(signatureData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleGenerate = () => {
    if (!appId.trim()) {
      alert("请输入 AppId");
      return;
    }

    if (!serverSecret.trim()) {
      alert("请输入 ServerSecret");
      return;
    }

    const generatedParams = generateCommonParams(appId, serverSecret);
    setSignatureNonce(generatedParams.signatureNonce);
    setTimestamp(generatedParams.timestamp.toString());
    setSignature(generatedParams.signature);

    const signatureData: SignatureData = {
      appId,
      serverSecret,
      signatureNonce: generatedParams.signatureNonce,
      timestamp: generatedParams.timestamp.toString(),
      signature: generatedParams.signature,
    };

    // Auto-fill request parameters if enabled
    if (autoFillRequest) {
      // update openapi_params
      updateOpenApiParams(signatureData);
    }

    // Notify parent component if callback provided
    if (onSignatureGenerated) {
      onSignatureGenerated(signatureData);
    }
  };

  return (
    <div className={styles["token-generate-container"]}>
      <div className={styles["token-generate-header"]}>
        <button
            onClick={handleGenerate}
            className={styles["token-generate-generate-button"]}
        >
            生成签名
        </button>
      </div>

      <div className={styles["token-generate-field"]}>
        <label className={styles["token-generate-field-label"]}>AppId</label>
        <div className={styles["token-generate-field-input-group"]}>
          <input
            name="AppId"
            autoComplete="off"
            title="请输入AppId"
            type="text"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="请输入AppId"
            className={styles["token-generate-field-input"]}
          />
        </div>
      </div>

      <div className={styles["token-generate-field"]}>
        <label className={styles["token-generate-field-label"]}>
          ServerSecret
        </label>
        <div className={styles["token-generate-field-input-group"]}>
          <input
            name="ServerSecret"
            autoComplete="off"
            title="请输入ServerSecret"
            type="text"
            value={serverSecret}
            onChange={(e) => setServerSecret(e.target.value)}
            placeholder="请输入ServerSecret"
            className={styles["token-generate-field-input"]}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenGenerate;
