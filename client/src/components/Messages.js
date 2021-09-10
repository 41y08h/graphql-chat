import { useQuery, gql } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { Alert, Spinner, Card } from "react-bootstrap";

const Message = ({ message, currentUser }) => {
  return (
    <div
      className={currentUser === message.user ? "ml-auto" : undefined}
      style={{ maxWidth: "60%", width: "fit-content" }}
    >
      <small className="mb-1">{message.user}</small>
      <p
        className={`rounded px-3 py-2 ${
          currentUser === message.user ? "bg-dark text-white" : "shadow-sm"
        }`}
      >
        {message.content}
      </p>
    </div>
  );
};

const MESSAGES = gql`
  {
    messages {
      id
      user
      content
    }
  }
`;

export default function Messages({ currentUser }) {
  const { loading, error, data } = useQuery(MESSAGES, { pollInterval: 2000 });
  const bottomRef = useRef();

  useEffect(() => {
    const bottom = bottomRef.current;
    if (bottom) bottom.scrollIntoView();
  }, [data]);

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

  return (
    <div
      style={{ maxHeight: "400px", overflow: "auto" }}
      className="hide-scrollbar smooth-scroll"
    >
      {data.messages.map((message) => (
        <Message key={message.id} message={message} currentUser={currentUser} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
