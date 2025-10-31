export const copywriting = {
  en: {
    search: {
      translations: {
        button: {
          buttonText: "Search the product documentation",
        },
        modal: {
          startScreen: {
            recentSearchesTitle: "Recent",
            noRecentSearchesText: "No recent searches",
          },
          footer: {
            selectText: "to select",
            navigateText: "to navigate",
            closeText: "to close",
            searchByText: "Search by",
          },
          noResultsScreen: {
            noResultsText: "No results for",
            suggestedQueryText: "Try searching for",
            reportMissingResultsText: "",
            reportMissingResultsLinkText: "Search all products",
          },
        },
      },
      placeholder: "Find or ask what you want",
    },
    toc: {
      title: "On this page",
      backToTopText: "Back to top",
    },
    aiSearch: {
      defaultRemarks: ["Hello", "What can I do for you?"],
      modalTitle: "AI document assistant",
      referenceSource: "Reference source:",
      inputPlaceholder: "Welcome to ask any questions about ZEGOCLOUD products",
      inputPlaceholderM1: "You can ask any questions",
      inputPlaceholderM2: "Questions",
      backToBottomText: "Back to bottom",
      askAI: "Ask AI",
      guessText: "Guess you want to know:",
      unableToReply:
        "Oops, there's a little issue. Please click the regenerate button or try asking me another question!",
      copySuccess: "Successful replication",
      beQuerying:"Thinking, please wait a moment...",
      event: {
        search: 'search',
        list_datasets: 'list datasets',
        set_dataset_ids: 'set dataset ids',
        validate_error_codes: 'validating error codes',
      }
    },

    openapi: {
      content: {
        defaultValueLabel: "Default value",
        requiredTag: "required",
        example: "Example",
        examples: "Examples",
        possibleValuesLabel: "Possible values",
        deprecatedTag: "deprecated",
        description: "Description",
        exampleFromSchema: "Example (from schema)",
        schemaTitle: "Schema"
      },
      request: {
        showOptional: "Show optional parameters",
        hideOptional: "Hide optional parameters",
        fieldRequired: "This field is required",
        collapseAll: "Collapse all",
        expandAll: "Expand all",
        send: "Send",
        responsePlaceholder: "Click the \"Send\" button above and see the response here!",
        clear: "Clear",
        headers: "Headers"
      },
      signature: {
        generate: 'Generate',
        signatureGenerator: 'ZEGO Signature Generator',
        appIdPlaceholder: 'You can get from https://console.zegocloud.com/.',
        serverSecretPlaceholder: 'You can get from https://console.zegocloud.com/.',
      }
    }
  },
  zh: {
    search: {
      translations: {
        button: {
          buttonText: "搜索本产品文档内容",
        },
        modal: {
          startScreen: {
            recentSearchesTitle: "最近",
            noRecentSearchesText: "近期无搜索记录",
          },
          footer: {
            selectText: "选择",
            navigateText: "导航",
            closeText: "关闭",
            searchByText: "Search by",
          },
          noResultsScreen: {
            noResultsText: "没有找到",
            suggestedQueryText: "正在查找",
            reportMissingResultsText: "",
            reportMissingResultsLinkText: "搜索全部产品",
          },
        },
      },
      placeholder: "请输入关键词",
    },
    toc: {
      title: "当前页",
      backToTopText: "返回到顶部",
    },
    aiSearch: {
      defaultRemarks: ["您好", "请问有什么可以帮到您？"],
      modalTitle: "AI 文档助手",
      referenceSource: "参考来源：",
      inputPlaceholder: "欢迎询问任何有关 ZEGO 产品的问题",
      inputPlaceholderM1: "您可以询问任何问题",
      inputPlaceholderM2: "任何问题",
      backToBottomText: "返回底部",
      askAI: "Ask AI",
      guessText: "猜您想了解：",
      unableToReply:
        "噢，出了一点小问题，请点击重新生成按钮或者重新问我其他问题试试吧！",
      copySuccess: "复制成功",
      beQuerying: "正在思考，请稍等...",
      event: {
        search: '搜索',
        list_datasets: '收集知识库列表',
        set_dataset_ids: '选择相关知识库',
        validate_error_codes: '正在校验错误码',
      }
    },
    openapi: {
      content: {
        defaultValueLabel: "默认值",
        requiredTag: "必填",
        example: "示例",
        examples: "示例",
        possibleValuesLabel: "可选值",
        deprecatedTag: "已废弃",
        description: "描述",
        exampleFromSchema: "按数据结构生成的示例",
        schemaTitle: "数据结构"
      },
      request: {
        showOptional: "显示可选参数",
        hideOptional: "隐藏可选参数",
        fieldRequired: "此字段为必填",
        collapseAll: "折叠所有",
        expandAll: "展开所有",
        send: "发送",
        responsePlaceholder: "点击上方 “发送” 按钮，在此处查看响应。",
        clear: "清除",
        headers: "响应头"
      },
      signature: {
        generate: '生成',
        signatureGenerator: 'ZEGO 签名生成器',
        appIdPlaceholder: '您可以从 https://console.zego.im/ 中获取。',
        serverSecretPlaceholder: '您可以从 https://console.zego.im/ 中获取。',
      }
    }
  },
};
