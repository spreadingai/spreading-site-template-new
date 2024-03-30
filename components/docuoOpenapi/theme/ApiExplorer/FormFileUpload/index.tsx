/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React, { useState } from "react";

import FloatingButton from "@/components/docuoOpenapi/theme/ApiExplorer/FloatingButton";
import MagicDropzone from "react-magic-dropzone";

type PreviewFile = { preview: string } & File;

interface RenderPreviewProps {
  file: PreviewFile;
}

function RenderPreview({ file }: RenderPreviewProps) {
  switch (file.type) {
    case "image/png":
    case "image/jpeg":
    case "image/jpg":
    case "image/svg+xml":
      return (
        <img
          style={{
            borderRadius: "4px",
          }}
          src={file.preview}
          alt=""
        />
      );
    default:
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <span style={{ marginRight: "4px" }}>
            <svg
              width="21"
              height="22"
              viewBox="0 0 21 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="file">
                <path
                  id="Vector"
                  d="M16.8 8.9V17.2947C16.8 17.6858 16.4886 18 16.1046 18H4.89533C4.51142 18 4.19995 17.6892 4.19995 17.3057V4.69426C4.19995 4.31872 4.51281 4 4.89873 4H11.9V8.2C11.9 8.5866 12.2133 8.9 12.6 8.9H16.8ZM16.8 7.5H13.3V4.00223L16.8 7.5ZM7.69995 7.5V8.9H9.79995V7.5H7.69995ZM7.69995 10.3V11.7H13.3V10.3H7.69995ZM7.69995 13.1V14.5H13.3V13.1H7.69995Z"
                  fill="#B6B6B6"
                />
              </g>
            </svg>
          </span>
          <div className="openapi-explorer__file-name">{file.name}</div>
        </div>
      );
  }
}

export interface Props {
  placeholder: string;
  onChange?(file?: File): any;
}

function FormFileUpload({ placeholder, onChange }: Props) {
  const [hover, setHover] = useState(false);
  const [file, setFile] = useState<PreviewFile>();

  function setAndNotifyFile(file?: PreviewFile) {
    setFile(file);
    onChange?.(file);
  }

  function handleDrop(accepted: PreviewFile[]) {
    const [file] = accepted;
    setAndNotifyFile(file);
    setHover(false);
  }

  return (
    <FloatingButton>
      <MagicDropzone
        className={
          hover
            ? "openapi-explorer__dropzone-hover"
            : "openapi-explorer__dropzone"
        }
        onDrop={handleDrop}
        onDragEnter={() => setHover(true)}
        onDragLeave={() => setHover(false)}
        multiple={false}
      >
        {file ? (
          <>
            <button
              className="file-clear-btn"
              onClick={(e) => {
                e.stopPropagation();
                setAndNotifyFile(undefined);
              }}
            >
              Clear
            </button>
            <RenderPreview file={file} />
          </>
        ) : (
          <div className="openapi-explorer__dropzone-content">
            <span className="dropzone-add-icon">
              <svg
                style={{
                  fill: "currentColor",
                  width: "10px",
                  height: "10px",
                }}
                height="16"
                viewBox="0 0 16 16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 7h6a1 1 0 0 1 0 2H9v6a1 1 0 0 1-2 0V9H1a1 1 0 1 1 0-2h6V1a1 1 0 1 1 2 0z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </span>
            {placeholder}
          </div>
        )}
      </MagicDropzone>
    </FloatingButton>
  );
}

export default FormFileUpload;
