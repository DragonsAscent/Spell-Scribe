import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function YamlEditor() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const commentOutDeprecated = (text) => {
    const lines = text.split("\n");
    const seen = new Set();
    const updated = [];

    for (let line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#") || trimmed === "") {
        updated.push(line);
        continue;
      }
      const key = trimmed.split(":")[0];
      if (seen.has(key)) {
        updated.push("# [duplicate removed] " + line);
        continue;
      }
      if (key.includes("deprecated") || key.includes("old_")) {
        updated.push("# [deprecated] " + line);
        continue;
      }
      seen.add(key);
      updated.push(line);
    }
    return updated.join("\n");
  };

  const handleProcess = () => {
    const updated = commentOutDeprecated(inputText);
    setOutputText(updated);
  };

  return (
    <div className="p-4 space-y-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">YAML Modifier</h1>
      <Textarea
        rows={10}
        placeholder="Paste your YAML here..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <Button onClick={handleProcess}>Process YAML</Button>
      <Textarea
        rows={10}
        className="bg-gray-100"
        placeholder="Modified YAML will appear here..."
        value={outputText}
        readOnly
      />
    </div>
  );
}
