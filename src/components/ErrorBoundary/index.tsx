import type { ErrorInfo, ReactNode } from "react";
import React from "react";
import styled from "styled-components";

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
  info: ErrorInfo | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    error: null,
    info: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo): void {
    this.setState({ error, info });
  }

  render(): ReactNode {
    if (this.state.error) {
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-size: 70px;
  color: red;

  > span {
    font-size: 70px;
  }
`;

const FallbackComponent = () => (
  <Wrapper>
    <span className="material-icons">error_outline</span>
    Something Went Wrong
  </Wrapper>
);
