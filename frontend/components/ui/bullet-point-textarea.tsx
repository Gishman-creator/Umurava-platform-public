"use client";

import { useRef, type KeyboardEvent, type FocusEvent } from "react";
import { Textarea } from "@/components/ui/textarea";

export function BulletPointTextarea({
  value,
  onChange,
}: {
  value: string[];
  onChange: (newValue: string[]) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      const currentContent = e.currentTarget.value;

      const beforeCursor = currentContent.substring(0, cursorPosition);
      const afterCursor = currentContent.substring(cursorPosition);

      const currentLineStart = beforeCursor.lastIndexOf("\n") + 1;
      const currentLine = beforeCursor.substring(currentLineStart);
      const hasBullet = currentLine.trimStart().startsWith("• ");

      let newContent;
      if (hasBullet && currentLine.trim() === "• ") {
        newContent = beforeCursor.substring(0, currentLineStart) + afterCursor;
      } else {
        newContent = beforeCursor + "\n• " + afterCursor;
      }

      // Extract bullet points
      const bulletPoints = newContent
        .split("\n")
        .filter((line) => line.trim().startsWith("•"))
        .map((line) => line.trim().slice(2).trim());

      onChange(bulletPoints); // Update parent state

      setTimeout(() => {
        if (textareaRef.current) {
          const newPosition = cursorPosition + 3;
          textareaRef.current.setSelectionRange(newPosition, newPosition);
        }
      }, 0);
    }
  };

  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    if (value.length === 0) {
      onChange([""]);
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.setSelectionRange(2, 2);
        }
      }, 0);
    }
  };

  const handleBlur = () => {
    if (value.length === 1 && value[0] === "") {
      onChange([]);
    }
  };

  return (
    <Textarea
      ref={textareaRef}
      value={value.map((item) => `• ${item}`).join("\n")}
      onChange={(e) => {
        const updatedBullets = e.target.value
          .split("\n")
          .filter((line) => line.trim().startsWith("•"))
          .map((line) => line.trim().slice(2).trim());

        onChange(updatedBullets);
      }}
      onKeyDown={handleKeyDown}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder="Enter text here..."
      className="min-h-[200px]"
    />
  );
}
