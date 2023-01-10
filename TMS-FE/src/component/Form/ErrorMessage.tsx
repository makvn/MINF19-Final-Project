import * as React from 'react';

type ErrorMessageType = {
  message?: string;
};
export const ErrorMessage = ({ message }: ErrorMessageType) => {
  if (message) {
    return <span className="text-danger">{message}</span>;
  }
  return null;
};
