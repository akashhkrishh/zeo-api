import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem, 
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RequestSelect() {
  return (
    <Select defaultValue="GET"> {/* Set the default value to "GET" */}
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Select a Request Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="GET">GET</SelectItem> {/* Changed label for clarity */}
          <SelectItem value="POST">POST</SelectItem> {/* Changed label for clarity */}
          <SelectItem value="PATCH">PATCH</SelectItem> {/* Changed label for clarity */}
          <SelectItem value="DELETE">DELETE</SelectItem> {/* Changed label for clarity */}
          <SelectItem value="PUT">PUT</SelectItem> {/* Changed label for clarity */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
