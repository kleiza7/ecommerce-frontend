import * as Tooltip from "@radix-ui/react-tooltip";
import React from "react";

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <Tooltip.Provider delayDuration={300}>{children}</Tooltip.Provider>;
};

export default TooltipProvider;
