import React from "react";

export const SetContext = React.createContext({
  handleLanguageChanged: ({
    key: language,
    initChild,
  }: {
    key: string;
    initChild?: boolean;
  }) => {},
  handleGroupChanged: ({
    key: group,
    initChild,
  }: {
    key: string;
    initChild?: boolean;
  }) => {},
  handlePlatformChanged: ({
    key: platform,
    initChild,
  }: {
    key: string;
    initChild?: boolean;
  }) => {},
  handleVersionChanged: ({
    key: version,
    initChild,
  }: {
    key: string;
    initChild?: boolean;
  }) => {},
  handleTabChanged: ({
    key: tab,
    defaultLink,
    initChild,
  }: {
    key: string;
    defaultLink: string;
    initChild?: boolean;
  }) => {},
});
