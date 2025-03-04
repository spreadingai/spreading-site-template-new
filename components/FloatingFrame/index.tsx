"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Popover } from "antd";
import classNames from "classnames";
import styles from "./index.module.scss";
import {
  CloudDownloadOutlined,
  ContactsOutlined,
  ArrowUpOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import { useSearchParams } from "next/navigation";

interface FloatingFrameProps {
  locale?: string;
}

const FloatingFrame = ({ locale = "zh" }: FloatingFrameProps) => {
  const searchParams = useSearchParams();
  const [isScrolledTop, setIsScrolledTop] = useState(true);
  const [isShowQrCode, setIsShowQrCode] = useState(false);
  const saveSource = useCallback(() => {
    const source = searchParams.get("source");
    if (source) sessionStorage.setItem("source", source);
  }, [searchParams]);

  const getCurrSourceUrl = useCallback(() => {
    let curUrl = location.href;
    const source = sessionStorage.getItem("source");
    if (source && !curUrl.includes("source")) {
      curUrl =
        curUrl +
        (curUrl.includes("?") ? "&" : "?") +
        `${source ? `source=${source}` : ""}`;
    }

    return curUrl;
  }, []);

  const toLoginRegister = useCallback(
    (lang = "zh", isLogin = false) => {
      const keyword = isLogin ? "login" : lang === "zh" ? "register" : "signup";
      const consoleSignPageDomain =
        lang === "zh" ? "https://console.zego.im" : "https://www.zegocloud.com";
      let url =
        lang === "zh"
          ? `${consoleSignPageDomain}/account/${keyword}?lang=${lang}`
          : `${consoleSignPageDomain}/account/${keyword}`;
      const curUrl = getCurrSourceUrl();
      if (curUrl)
        url =
          url +
          `${url.includes("?") ? "&" : "?"}marketSource=${encodeURIComponent(
            curUrl
          )}`;
      window.open(url);
    },
    [getCurrSourceUrl]
  );

  const handleGoToRegisterLogin = useCallback(
    (
      lang: string,
      isLogin = false,
      accountInfo: any = null,
      path: string = ""
    ) => {
      if (accountInfo) {
        const consoleMainPageDomain =
          lang === "zh"
            ? "https://console.zego.im"
            : "https://console.zegocloud.com";
        const keyPath = path || "dashboard";
        const url =
          lang === "zh"
            ? `${consoleMainPageDomain}/${keyPath}`
            : `${consoleMainPageDomain}/${keyPath}`;
        window.open(url);
      } else {
        toLoginRegister(lang, isLogin);
      }
    },
    [toLoginRegister]
  );

  const workOrderClick = useCallback(() => {
    handleGoToRegisterLogin(locale, false, null, "workorder/list");
  }, [handleGoToRegisterLogin, locale]);

  const phoneConsult = useCallback(() => {
    if (window.innerWidth <= 750) {
      location.href = "tel:400 1006 604";
    }
  }, []);

  const qrCodeClick = useCallback(() => {
    if (window.innerWidth <= 750) {
      setIsShowQrCode(true);
    }
  }, []);

  const contactContent = useMemo(() => {
    return (
      <div className={styles.contactContent}>
        {/* 提交工单 */}
        <div className={styles.contactItem} onClick={workOrderClick}>
          <FileTextOutlined className={styles.contactIcon} />
          <div className={styles.contactInfo}>
            <div className={styles.contactTitle}>提交工单</div>
            <div className={styles.contactDesc}>咨询集成、功能及报价等问题</div>
          </div>
        </div>

        {/* 电话咨询 */}
        <div className={styles.contactItem} onClick={phoneConsult}>
          <PhoneOutlined className={styles.contactIcon} />
          <div className={styles.contactInfo}>
            <div className={styles.contactTitle}>电话咨询</div>
            <div className={styles.contactDesc}>400 1026 604</div>
          </div>
        </div>

        {/* 咨询客服 */}
        <div className={styles.contactItem} onClick={qrCodeClick}>
          <MessageOutlined className={styles.contactIcon} />
          <div className={styles.contactInfo}>
            <div className={styles.contactTitle}>咨询客服</div>
            <div className={styles.contactDesc}>微信扫码，24小时在线</div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              "https://zego-public-develop-center.oss-cn-shanghai.aliyuncs.com/homePageData/image/sale-code.jpeg"
            }
            alt="QR Code"
            className={styles.qrCode}
            width={60}
            height={60}
          />
        </div>
      </div>
    );
  }, [phoneConsult, qrCodeClick, workOrderClick]);

  useEffect(() => {
    const handleScroll = () => {
      const isTop =
        document.documentElement.scrollTop === 0 &&
        document.body.scrollTop === 0;
      setIsScrolledTop(isTop);
    };

    document.body.addEventListener("scroll", handleScroll);

    return () => document.body.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    saveSource();
  }, [saveSource]);

  return (
    <>
      <ul className={styles.floatingWrapper}>
        {locale === "zh" ? (
          <>
            {/* 免费试用按钮 */}
            <li className={classNames(styles.floatingItem, styles.freeTrial)}>
              <div
                className={styles.floatingButton}
                onClick={() => handleGoToRegisterLogin(locale)}
              >
                <CloudDownloadOutlined className={styles.buttonIcon} />
                <span className={styles.buttonText}>免费试用</span>
              </div>
            </li>

            {/* 联系我们按钮 */}
            <li className={classNames(styles.floatingItem, styles.contactUs)}>
              <Popover
                placement="left"
                trigger="hover"
                content={contactContent}
                classNames={{
                  root: styles.contactPopover,
                }}
              >
                <div className={styles.floatingButton}>
                  <ContactsOutlined className={styles.buttonIcon} />
                  <span className={styles.buttonText}>联系我们</span>
                </div>
              </Popover>
            </li>
          </>
        ) : null}

        {/* 返回顶部按钮 */}
        <li
          className={classNames(
            styles.floatingItem,
            {
              [styles.hidden]: isScrolledTop,
            },
            styles.returnTop
          )}
          onClick={() => document.body.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className={styles.floatingButton}>
            <ArrowUpOutlined className={styles.buttonIcon} />
          </div>
        </li>
      </ul>
      {isShowQrCode ? (
        <div
          className={styles.qrCodeModal}
          onClick={(e) => {
            // @ts-ignore
            if (e.target.className.includes("qrCodeModal")) {
              setIsShowQrCode(false);
            }
          }}
        >
          <div className={styles.qrCodeWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                "https://zego-public-develop-center.oss-cn-shanghai.aliyuncs.com/homePageData/image/sale-code.jpeg"
              }
              alt="QR Code"
              width={208}
              height={208}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FloatingFrame;
