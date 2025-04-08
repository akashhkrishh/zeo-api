"use client"
 // Make sure you have this imported correctly
import JsonEditor from "../MonocoEditor"; // Same here, ensure one of these is being used appropriately
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {  SparklesIcon,   } from "lucide-react"; 
import { RequestSelect } from "@/components/request-type-select"; // Check if the path is correct
import { toast } from "sonner";

// Assuming the handleClipboard function is to copy to clipboard
const handleClipboard = () => {
  navigator.clipboard.writeText("https://zeoapi.akashhkrishh.in/c/").then(() => {
    toast.success("URL copied to clipboard!",{
      style: {
        borderRadius: "0px", // Custom border radius
        padding: "10px",
        width:"auto",
      },
    });
  });
};

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl flex-1 w-screen px-4 lg:px-8 p-4 md:py-8 flex flex-col items-center gap-8">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-primary text-2xl md:text-4xl font-semibold">Custom Response</h1>
        <h6 className="text-center text-muted-foreground max-w-3xl">
          Looking for a free mock REST API for your custom JSON data? 
        </h6>
      </div>

      <div className="flex flex-col max-w-full gap-4">
        <div className="max-w-full flex-col flex gap-2">
          {/* URL Label with Clipboard Copy */}
 
          <div className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <Label className="text-muted-foreground">Request Type :</Label>
              <RequestSelect />
            </div>
            <Button>
              <SparklesIcon /> Generate
            </Button>
          </div>
          <Label 
            className="border p-4 text-primary text-center cursor-pointer" 
            onDoubleClick={handleClipboard}
          >
            {"https://zeoapi.akashhkrishh.in/c/"}
          </Label>
        </div>

        {/* Response Editor Section */}
      
      
          <JsonEditor />
       
      </div>
    </div>
  );
}
