import { useQuery, gql } from "@apollo/client";
import React from "react";
import { Alert, Spinner, Card } from "react-bootstrap";

const Message = ({ message, currentUser }) => {
  return (
    <div
      className={currentUser === message.user && "ml-auto"}
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

export default function Messages({ currentUser }) {
  const { loading, error, data } = useQuery(
    gql`
      {
        messages {
          id
          user
          content
        }
      }
    `,
    { pollInterval: 2000 }
  );

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error.message}</Alert>;

  return data.messages.map((message) => (
    <Message key={message.id} message={message} currentUser={currentUser} />
  ));
}
