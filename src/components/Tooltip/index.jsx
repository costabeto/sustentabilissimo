import React from "react";
import { Container } from "./styles";

const Tooltip = ({ title, children }) => {
  return (
    <Container>
      <span>{title}</span>
      {children}
    </Container>
  );
};

export default Tooltip;
