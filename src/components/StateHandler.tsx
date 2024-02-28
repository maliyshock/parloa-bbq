import { Empty, Spin } from "antd";
import React, { PropsWithChildren } from "react";

interface StateHandlerProps {
  error: boolean;
  isLoading: boolean;
}
export function StateHandler({
  error,
  isLoading,
  children,
}: PropsWithChildren<StateHandlerProps>) {
  if (error) {
    return <Empty />;
  }

  if (isLoading) {
    return <Spin />;
  }

  return <>{children}</>;
}
