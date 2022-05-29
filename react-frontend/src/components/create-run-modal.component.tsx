import {SyntheticEvent, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import axios from "axios";
import {useMutation, useQueryClient} from "react-query";

function CreateRunButtonModal() {
  const queryClient = useQueryClient();

  const mutation = useMutation((formData: FormData) => {
  console.log(JSON.stringify(Object.fromEntries(formData)));
    return(axios({
      method: "post",
      url: 'http://localhost:8000/api/alignment-runs/',
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(Object.fromEntries(formData))})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.error(response);
      }));
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('runs');
      handleClose();
    },
  });

  const onFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(new FormData(e.currentTarget));
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <div>
      <Button variant="primary" onClick={handleShow}>Create Run</Button>

      <Modal show={show} onHide={handleClose} centered size="lg" fullscreen="md-down">
        <Modal.Header closeButton>
          <Modal.Title>Create Alignment Search Run</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <Form.Group className="mb-3" controlId="formRunName">
              <Form.Label>Run Name</Form.Label>
              <Form.Control name="name" type="text" placeholder="Enter a descriptive name" />
              <Form.Text className="text-muted">
                This will help you track its progress
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRunDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" type="text" placeholder="Any additional information you'd like to add" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRunQuery">
              <Form.Label>Query</Form.Label>
              <Form.Control name="query" as="textarea" rows={3} />
              <Form.Text className="text-muted">
                Must be a DNA sequence
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>

      </Modal>
    </div>
  );
}

export default CreateRunButtonModal;