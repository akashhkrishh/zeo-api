"use client"; // Ensure the code runs only on the client side
import { useRef, useState } from "react";
import Editor, { Monaco } from "@monaco-editor/react";
import { CloudUploadIcon, FileJson2Icon, Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import * as monaco from "monaco-editor"; // Import Monaco types

export default function JsonEditor() {
  const [value, setValue] = useState<string | undefined>(`
{
  "name": "John Doe"
}`);
  
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null); // Use IStandaloneCodeEditor type

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;

    // Set up JSON validation
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      schemas: [],
      enableSchemaRequest: true,
    });
  };

  const formatJson = () => {
    validateJson();
    
    // Check if editorRef.current is not null
    if (editorRef.current) {
      const action = editorRef.current.getAction("editor.action.formatDocument");
      
      // Ensure action is not null before running it
      if (action) {
        action.run();
      } else {
        console.error("Action not found: editor.action.formatDocument");
      }
    }
  };
  

  const validateJson = () => {
    try {
      if (value) {
        JSON.parse(value);
        // toast("Valid JSON") // Optional: Show toast on valid JSON if desired
      }
    } catch (e: unknown) {
      console.error(e);
      toast.error("Invalid JSON", {
        style: {
          borderRadius: "0px", // Custom border radius
          padding: "10px",
          width: "fit",
        },
      });
    }
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonContent = e.target?.result as string;
          const parsedData = JSON.parse(jsonContent);
          setValue(JSON.stringify(parsedData, null, 2)); // Format JSON for better readability
          toast.success("JSON file successfully loaded", {
            style: {
              borderRadius: "0px", // Custom border radius
              padding: "10px",
              width: "fit",
            },
          });
        } catch (error) {
          console.error(error);
          toast.error("Invalid JSON in file", {
            style: {
              borderRadius: "0px", // Custom border radius
              padding: "10px",
              width: "fit",
            },
          });
        }
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid JSON file", {
        style: {
          borderRadius: "0px", // Custom border radius
          padding: "10px",
          width: "fit",
        },
      });
    }
  };

  return (
    <div className="aspect-[8/5] h-[320px] max-w-full border flex flex-col">
      <div className="border-b w-full pl-4 px-2 py-2 flex justify-between items-center">
        <Label className="text-muted-foreground">Response Editor</Label>
        <div className="flex gap-2">
          {/* File upload button */}
          <input
            type="file"
            accept=".json"
            id="upload-json"
            onChange={handleUpload}
            style={{ display: "none" }} // Hide the default file input
          />
          <Button variant={"outline"} size={"icon"} onClick={() => document.getElementById("upload-json")?.click()}>
            <Upload />
          </Button>
          <Button onClick={formatJson} size={"icon"} variant={"outline"}>
            <FileJson2Icon />
          </Button>
          <Button onClick={formatJson} >
            <CloudUploadIcon />Save
          </Button>
        </div>
      </div>
    
      <Editor
        height="100%"
        width={"100%"}
        defaultLanguage="json"
        value={value}
        onChange={setValue}
        theme="vs-dark"
        beforeMount={(monaco) => {
          monaco.editor.defineTheme("deep-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
              "editor.background": "#000000",
              "editor.lineHighlightBackground": "#101010",
              "editorLineNumber.foreground": "#555555",
              "editorCursor.foreground": "#ffffff",
              "editor.selectionBackground": "#264f78",
              "editor.inactiveSelectionBackground": "#3a3d41",
            },
          });
        }}
        onMount={(editor, monaco) => {
          handleEditorDidMount(editor, monaco);
          monaco.editor.setTheme("deep-dark");
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          selectionHighlight: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 2,
          renderLineHighlight: "all",
          colorDecorators: true,
          lineNumbers: "off",
        }}
        loading={
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      />
    </div>
  );
}
