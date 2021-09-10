import React from "react";
import { Container } from "react-bootstrap";
import Messages from "./Messages";

export default function App() {
  return (
    <Container className="py-4">
      <Messages currentUser="Piyush" />
    </Container>
  );
}
