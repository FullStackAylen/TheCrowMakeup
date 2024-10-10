import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
const UsuarioForm = () => {
    const { usuario } = useParams(); 
    const navigate = useNavigate();
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 
    const [marcas, setMarcas] = useState([]); 
    const [marcaId, setMarcaId] = useState(''); 

    useEffect(() => {
        if (usuario) {
            setIsEditMode(true);
            const fetchUsuario = async () => {
                try {
                    const response = await fetch(`http://localhost:5168/api/User/GetUser/${usuario}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setNombreUsuario(data.nombreUsuario);
                } catch (error) {
                    console.error('Error fetching user:', error);
                    setError('Error al cargar la usuario.');
                }
            };

            fetchUsuario();
        }
    }, [usuario]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { nombreUsuario };

        setLoading(true); 
        setError(null); 

        try {
            if (isEditMode) {
                await fetch(`http://localhost:5168/api/User/EditUser/${usuario}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
            } else {
                await fetch(`http://localhost:5168/api/User/AddUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                });
            }

            navigate('/dashboard/usuario'); 
        } catch (error) {
            console.error('Error saving user:', error);
            setError('Error al guardar la usuario.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="title">{isEditMode ? 'Editar usuario' : 'Crear usuario'}</h2>
            {error && <p className="text-danger">{error}</p>} 
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUserName">
                    <Form.Label className='d-flex justify-content-start m-1'>Nombre de la Usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre de la usuario"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUserName">
                    <Form.Label className='d-flex justify-content-start m-1'>Email</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese el email del usuario"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUserName">
                    <Form.Label className='d-flex justify-content-start m-1'>Email</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingrese la contraseña del usuario"
                        value={nombreUsuario}
                        onChange={(e) => setNombreUsuario(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formProductoId">
                    <Form.Label className='d-flex justify-content-start m-1'>Rol</Form.Label>
                    <Form.Control
                        as="select"
                        value={marcaId}
                        onChange={(e) => setMarcaId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un rol</option>
                        {marcas.map((marca) => (
                            <option key={marca.marcaId} value={marca.marcaId}>
                                {marca.nombreMarca}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <button
                        className='btnAcep mt-4'
                        variant="secondary"
                        type="button"
                        onClick={() => navigate('/dashboard/usuario')}
                    >
                        Cancelar
                    </button>
                    <button className='btnAcep mt-4' variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear usuario')}
                    </button>
                </div>
            </Form>
        </Container>
    );
}
export default UsuarioForm;