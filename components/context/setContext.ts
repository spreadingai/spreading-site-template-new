import React from "react";

export const SetContext = React.createContext({
  handleLanguageChanged: ({ key: language }) => {},
  handleGroupChanged: ({ key: group }) => {},
  handlePlatformChanged: ({ key: platform }) => {},
  handleVersionChanged: ({ key: version }) => {},
});
