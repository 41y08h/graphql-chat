import React, { useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Messages from "./Messages";
import { useMutation, gql } from "@apollo/client";
import useLocalStorage from "use-local-storage";

const CHAT = gql`
  mutation chat($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

export default function App() {
  const [currentUser, setCurrentUser] = useLocalStorage("chat-username", "");
  const [sendMessage, chatMutation] = useMutation(CHAT);
  const messageInputRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    await sendMessage({
      variables: { user: currentUser, content: messageInputRef.current.value },
    });
    messageInputRef.current.value = "";
  }

  return (
    <Container className="py-4" style={{ maxWidth: "700px" }}>
      <Messages currentUser={currentUser} />
      <Form onSubmit={handleSubmit}>
        <Row className="no-gutters">
          <Col sm md={3} lg={3}>
            <Form.Control
              required
              className="w-full"
              placeholder="Your name"
              onChange={(e) => setCurrentUser(e.target.value)}
              value={currentUser}
            />
          </Col>
          <Col sm md={9} lg>
            <Form.Control
              ref={messageInputRef}
              required
              placeholder="Send a message..."
              className="w-full"
            />
          </Col>
          <Col sm md lg>
            <Button
              type="submit"
              className="w-100"
              disabled={chatMutation.loading}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
