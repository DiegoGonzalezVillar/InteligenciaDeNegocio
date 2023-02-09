import { Form } from 'react-bootstrap';
import { Button} from '@mui/material'

export default function Modal({show ,handleClose}) {
    return (
<Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
    show={show} onHide={handleClose}>
    <Modal.Header closeButton >
        <Modal.Title>Inicio de sesión</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Usuario</Form.Label>
                <Form.Control type=" text" placeholder="Ingresar Usuario" />
            </Form.Group> <Form.Group controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder=" Ingresar Contraseña" />
            </Form.Group>
        </Form>
    </Modal.Body> <Modal.Footer>
        <Button variant="secundario" onClick={handleClose}>
            Cerrar
        </Button>
        <Button variant="primary">
            Iniciar Sesión
        </Button>
    </Modal.Footer>
</Modal>
)}