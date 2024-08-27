import React from "react";

export const SetContext = React.createContext({
  handleLanguageChanged: ({ key: language }: { key: string }) => {},
  handleGroupChanged: ({ key: group }: { key: string }) => {},
  handlePlatformChanged: ({ key: platform }: { key: string }) => {},
  handleVersionChanged: ({ key: version }: { key: string }) => {},
});