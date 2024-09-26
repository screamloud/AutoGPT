import { BlockIOSubSchema } from "@/lib/autogpt-server-api/types";
import { beautifyString, getTypeBgColor, getTypeTextColor } from "@/lib/utils";
import { FC } from "react";
import { Handle, Position } from "@xyflow/react";
import SchemaTooltip from "./SchemaTooltip";

type HandleProps = {
  keyName: string;
  schema: BlockIOSubSchema;
  isConnected: boolean;
  isRequired?: boolean;
  side: "left" | "right";
};

const NodeHandle: FC<HandleProps> = ({
  keyName,
  schema,
  isConnected,
  isRequired,
  side,
}) => {
  const typeName: Record<string, string> = {
    string: "text",
    number: "number",
    boolean: "true/false",
    object: "object",
    array: "list",
    null: "null",
  };

  const typeClass = `text-sm ${getTypeTextColor(schema.type || "any")} ${side === "left" ? "text-left" : "text-right"}`;

  const label = (
    <div className="flex flex-grow flex-row">
      <span className="text-m pr-2 green text-gray-900 flex items-end">
        {schema.title || beautifyString(keyName)}
        {isRequired ? "*" : ""}
      </span>
      <span className={`${typeClass} flex items-end`}>({typeName[schema.type as keyof typeof typeName] || "any"})</span>
    </div>
  );

  const left_dot = (
    <div
      className={`m-1 -ml-2 mr-2 h-4 w-4 border-2 bg-white ${isConnected ? getTypeBgColor(schema.type || "any") : "border-gray-300"} rounded-full transition-colors duration-100 group-hover:bg-gray-300`}
    />
  );

  const right_dot = (
    <div
      className={`m-1 h-4 w-4 border-2 bg-white ${isConnected ? getTypeBgColor(schema.type || "any") : "border-gray-300"} rounded-full transition-colors duration-100 group-hover:bg-gray-300`}
    />
  );

  if (side === "left") {
    return (
      <div key={keyName} className="handle-container">
        <Handle
          type="target"
          position={Position.Left}
          id={keyName}
          className="background-color: white; border: 2px solid black; width: 15px; height: 15px; border-radius: 50%; bottom: 0px; left: 20%; group -ml-[26px]"
        >
          <div className="pointer-events-none flex items-center">
            {left_dot}
            {label}
          </div>
        </Handle>
        <SchemaTooltip description={schema.description} />
      </div>
    );
  } else {
    return (
      <div key={keyName} className="handle-container justify-end">
        <Handle
          type="source"
          position={Position.Right}
          id={keyName}
          className="group -mr-[26px]"
        >
          <div className="pointer-events-none flex items-center">
            {label}
            {right_dot}
          </div>
        </Handle>
      </div>
    );
  }
};

export default NodeHandle;
