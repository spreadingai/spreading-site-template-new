import React from "react";
export interface NodeViewProps {
    editor: any;
    node: any;
    decorations: any[];
    selected: boolean;
    extension: Node & {
        options: {
            isToolsPage?: boolean;
        };
    };
    getPos: () => number;
    updateAttributes: (attributes: Record<string, any>) => void;
    deleteNode: () => void;
    children?: React.ReactNode;
    editable?: boolean;
}
export interface CodeTabProps extends NodeViewProps {
    disabled?: boolean;
    codes: {
        filename?: string;
        focus?: number[];
        language?: string;
        tabid?: number;
    }[];
    showSetting: (code: {
        filename?: string;
        focus?: number[];
        language?: string;
        tabid?: number;
    }) => void;
    aiCodeSwitchChanged: (open: boolean) => void;
    addTab?: () => void;
}
export interface CodeBlockProps extends NodeViewProps {
    filename?: string;
    focus?: number[];
    language?: string;
    tabid?: number;
    autoWrap?: boolean;
    theme?: string;
    showLineNumber?: boolean;
    totalLineNumber?: string;
    onCopiedSuccess?: () => void;
    onCopiedFailed?: () => void;
}
export interface HeadingProps extends NodeViewProps {
    level: number;
    linkSymbol?: string;
    id?: string;
}
export interface ImageProps extends NodeViewProps {
    src: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
    inline?: boolean;
    caption?: string;
}
export interface VideoProps extends NodeViewProps {
    src: string;
    width?: number;
    height?: number;
    type?: string;
}
export interface TitleProps extends NodeViewProps {
    placeholder?: string;
}
export interface CalloutHeaderProps extends NodeViewProps {
    type?: string;
}
