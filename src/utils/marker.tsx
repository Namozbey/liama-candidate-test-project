import React, { ReactNode } from "react";

export default function marker(text: string, search: string): ReactNode {
  const replacement = "$#@str@#$";
  const texts = text.replace(search, replacement).split(replacement);

  if (texts.length === 1) return text;

  return (
    <span>
      {texts[0]}
      <span style={{ backgroundColor: "yellow" }}>{search}</span>
      {texts[1]}
    </span>
  );
}
