import React, { useCallback } from "react";
import Form from "react-bootstrap/Form";

interface DeleteConfirmationFormProps {
  keyword: string;
  keywordIsConfirmedHandler: () => void;
  keywordIsNotConfirmedHandler: () => void;
}

function DeleteConfirmationForm({
  keyword,
  keywordIsConfirmedHandler,
  keywordIsNotConfirmedHandler,
}: DeleteConfirmationFormProps) {
  const validateKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value !== keyword) {
        keywordIsNotConfirmedHandler();
        return;
      }
      keywordIsConfirmedHandler();
    },
    [keyword, keywordIsConfirmedHandler, keywordIsNotConfirmedHandler]
  );

  return (
    <Form onSubmit={(e) => {e.preventDefault()}}>
      <Form.Group className="mt-2" controlId="clear-form">
        <Form.Label>
          Please type <b>{keyword}</b> to confirm.
        </Form.Label>
        <Form.Control type="text" onChange={validateKeyword} />
      </Form.Group>
    </Form>
  );
}

export default DeleteConfirmationForm;
