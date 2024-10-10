import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../Styles/ConfirmDeleteModal.css'; // Ajusta los estilos según prefieras

const ConfirmDeleteModal = ({ show, onClose, onConfirm, message }) => {
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Eliminar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default ConfirmDeleteModal;
