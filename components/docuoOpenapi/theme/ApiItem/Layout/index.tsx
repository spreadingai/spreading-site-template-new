/* ============================================================================
 * Copyright (c) Palo Alto Networks
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * ========================================================================== */

import React from "react";
import clsx from "clsx";

import styles from "./styles.module.css";

export default function DocItemLayout({ children }): JSX.Element {
  return (
    <div className="row">
      <div className={clsx("col")}>
        <div className={styles.docItemContainer}>
          <article>
            <>{children}</>
          </article>
        </div>
      </div>
    </div>
  );
}
