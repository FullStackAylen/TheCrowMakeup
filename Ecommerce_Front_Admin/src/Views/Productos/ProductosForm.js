import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
const ProductoForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [marcas, setMarcas] = useState([]); 
    const [marcaId, setMarcaId] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [ubicacion, setUbicacion] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5168/api/Product/GetBrands`);
                const data = await response.json();
                setMarcas(data); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); 
    }, []);

    useEffect(() => {
        if (id) {
            const fetchOffer = async () => {
                try {
                    const response = await fetch(`http://localhost:5168/api/Offer/GetOffer/${id}`);
                    const data = await response.json();
                    setMarcaId(data.marcaId); 
                    setCantidad(data.cantidad);
                    setUbicacion(data.ubicacion);
                    setFechaIngreso(data.fechaIngreso);
                } catch (error) {
                    console.error('Error fetching offer:', error);
                }
            };
            fetchOffer();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const offerData = {
            marcaId: parseInt(marcaId), 
            cantidad,
            ubicacion,
            fechaIngreso
        };

        try {
            let response;
            if (id) {
                response = await fetch(`http://localhost:5168/api/Offer/EditOffer`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(offerData),
                });
            } else {
                response = await fetch('http://localhost:5168/api/Offer/AddOffer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(offerData),
                });
            }

            if (!response.ok) {
                throw new Error('Error al guardar el oferta');
            }

            navigate('/dashboard/oferta'); 
        } catch (error) {
            console.error('Error saving offer:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>{id ? 'Editar Oferta' : 'Crear Oferta'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUbicacion">
                    <Form.Label className='d-flex justify-content-start m-1'>Producto</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre del producto"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUbicacion">
                    <Form.Label className='d-flex justify-content-start m-1'>Descripcion</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese descripcion del producto"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formProductoId">
                    <Form.Label className='d-flex justify-content-start m-1'>Marca</Form.Label>
                    <Form.Control
                        as="select"
                        value={marcaId}
                        onChange={(e) => setMarcaId(e.target.value)}
                        required
                    >
                        <option value="">Selecciona un categoria</option>
                        {marcas.map((marca) => (
                            <option key={marca.marcaId} value={marca.marcaId}>
                                {marca.nombreMarca}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formProductoId">
                    <Form.Label className='d-flex justify-content-start m-1'>Categoria</Form.Label>
                    <Form.Control
                        as="select"
                        value={marcaId}
                        onChange={(e) => setMarcaId(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una categoria</option>
                        {marcas.map((marca) => (
                            <option key={marca.marcaId} value={marca.marcaId}>
                                {marca.nombreMarca}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCantidad">
                    <Form.Label className='d-flex justify-content-start m-1'>Precio</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ingrese precio"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUbicacion">
                    <Form.Label className='d-flex justify-content-start m-1'>Tipo de piel</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese tipo de piel"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUbicacion">
                    <Form.Label className='d-flex justify-content-start m-1'>Tono de piel</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese tono de piel"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formCantidad">
                    <Form.Label className='d-flex justify-content-start m-1'>Stock</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ingrese stock disponible"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </Form.Group>
                
                <div className='d-flex justify-content-end'>
                    <button className='btnAcep mt-4'
                        variant="secondary"
                        type="button"
                        onClick={() => navigate('/dashboard/oferta')}
                    >
                        Cancelar
                    </button>
                    <button className='btnAcep mt-4' variant="primary" type="submit">
                        {id ? 'Guardar Cambios' : 'Crear Oferta'}
                    </button>
                </div>
            </Form>
        </Container>
    );
}
export default ProductoForm;