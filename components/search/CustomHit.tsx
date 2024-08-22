import React, { useEffect, useState } from "react";
import { Result } from "./Results";
import { SelectIcon, SourceIcon } from "./icons";
import { Hit } from "./Hit";

const Hits = ({ hit }) => {
  return (
    <section className="DocSearch-Hits">
      <Result
        hitComponent={Hit}
        item={hit}
        renderIcon={({ item }) => (
          <>
            <div className="DocSearch-Hit-icon">
              <SourceIcon type={item.type} />
            </div>
          </>
        )}
        renderAction={({ item }) => (
          <div className="DocSearch-Hit-action">
            <SelectIcon />
          </div>
        )}
      ></Result>
    </section>
  );
};

export default Hits;
