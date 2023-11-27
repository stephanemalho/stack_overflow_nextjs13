  "use client";
  import React, { useEffect, useState } from "react";
  import { diffWordsWithSpace } from "diff";
  import { DiffViewerProps } from "@/types";

  import DiffLine from "./Diff/DiffLine";
  import { lineHasChanges, newLinesCount, totalLines } from "@/utils/arrays";

  const DiffViewer: React.FC<DiffViewerProps> = ({ oldText, newText }) => {
    const numberOfModifiedLines = newLinesCount(oldText, newText, lineHasChanges);
    const numberOfTotalNewLines = totalLines(newText);

    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [showAllLines, setShowAllLines] = useState(false);

    const toggleShowAllLines = () => {
      setShowAllLines(!showAllLines);
    };

    useEffect(() => {
      const checkScreenSize = () => {
        setIsSmallScreen(window.matchMedia("(max-width: 1533px)").matches);
      };

      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    const renderDiffElements = () => {
      if (isSmallScreen) {
        return oldText.content.map((oldLine, index) => {
          const newLine = newText.content[index] || "";
          const changes = diffWordsWithSpace(oldLine, newLine);
          const lineNumber = index + 1;
          const fragmentKey = `line-pair-${lineNumber}`;
          return (
            <React.Fragment key={fragmentKey}>
              {lineHasChanges(changes) && (
                <DiffLine
                  key={fragmentKey}
                  changes={changes}
                  lineNum={lineNumber}
                  isOld={true}
                  isVisible={true}
                />
              )}
              <DiffLine
                key={fragmentKey}
                changes={changes}
                lineNum={lineNumber}
                isOld={false}
                isVisible={true}
              />
            </React.Fragment>
          );
        });
      } else {

        const renderLine = (line: string, index: number, isOld: boolean) => {
          const otherLine = isOld ? newText.content[index] : oldText.content[index];
          const changes = diffWordsWithSpace(line, otherLine || "");
          if (lineHasChanges(changes) || showAllLines) {
            return (
              <DiffLine
                key={`${isOld ? 'old' : 'new'}-${index}`}
                changes={changes}
                lineNum={index + 1}
                isOld={isOld}
                isVisible={true}
              />
            );
          }
          return null;
        };

        const oldTextElements = oldText.content.map((line, index) => 
        renderLine(line, index, true)
      );

      const newTextElements = newText.content.map((line, index) => 
        renderLine(line, index, false)
      );
      
        return (
          <>
            <div className="flex h-[86vh] w-full flex-col">
              <div className="sticky top-0 z-10 flex h-[30px] w-full flex-row bg-[rgba(0,0,0,0.8)]">
                <div className="basis-[50%] pr-2 text-[15px] text-[#e4e4e4]">
                  Total of lines: {numberOfTotalNewLines}
                </div>
                <div className="basis-[50%] text-[15px] text-[#6FDC8C]">
                  Total of modified lines: {numberOfModifiedLines}
                </div>
              </div>
              <div className="flex w-full flex-row">
              <div className="flex basis-[50%] flex-col overflow-x-auto overscroll-y-none ">
                {oldTextElements}
              </div>
              <div className="flex basis-[50%] flex-col overflow-x-auto overscroll-y-none">
                {newTextElements}
              </div>
            </div>
            <button onClick={toggleShowAllLines}>
              {showAllLines ? 'hidde none modified lines' : 'Show all lines'}
            </button>
            </div>
          </>
        );
      }
    };

    return (
      <div className={` max-2xl:h-[70vh] ${isSmallScreen && "h-[86vh] overflow-y-scroll"}`}>
        {isSmallScreen && (
          <div className="sticky top-0 flex justify-between bg-[rgba(0,0,0,0.8)]">
            <div className="text-[12px] text-[#f7a8a8]">
              Total of modified lines: {numberOfModifiedLines}, <span className="text-[#6FDC8C]">added lines: {numberOfModifiedLines}</span>
            </div>
            <div className="pr-2 text-[12px] text-[#e4e4e4]">
              Total of lines: {numberOfTotalNewLines}
            </div>
          </div>
        )}
        <div className="flex flex-col truncate">
          <div
            className={`flex ${
              isSmallScreen ? "flex-col" : "flex-row"
            } overflow-x-auto`}
          >
            {renderDiffElements()}
          </div>
        </div>
      </div>
    );
  };
  export default DiffViewer;
