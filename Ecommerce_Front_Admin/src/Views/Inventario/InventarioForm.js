import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

const InventarioForm = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [productos, setProductos] = useState([]); 
    const [productoId, setProductoId] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [ubicacion, setUbicacion] = useState('');
    const [fechaIngreso, setFechaIngreso] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:5168/api/Product/GetProductsList`);
                const data = await response.json();
                setProductos(data); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(); 
    }, []);

    useEffect(() => {
        if (id) {
            const fetchInventory = async () => {
                try {
                    const response = await fetch(`http://localhost:5168/api/Inventory/GetInventory/${id}`);
                    const data = await response.json();
                    setProductoId(data.productoId); 
                    setCantidad(data.cantidad);
                    setUbicacion(data.ubicacion);
                    setFechaIngreso(data.fechaIngreso);
                } catch (error) {
                    console.error('Error fetching inventory:', error);
                }
            };
            fetchInventory();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inventoryData = {
            productoId: parseInt(productoId), 
            cantidad,
            ubicacion,
            fechaIngreso
        };

        try {
            let response;
            if (id) {
                response = await fetch(`http://localhost:5168/api/Inventory/EditInventory`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inventoryData),
                });
            } else {
                response = await fetch('http://localhost:5168/api/Inventory/AddInventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(inventoryData),
                });
            }

            if (!response.ok) {
                throw new Error('Error al guardar el inventario');
            }

            navigate('/dashboard/inventario'); 
        } catch (error) {
            console.error('Error saving inventory:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2>{id ? 'Editar Inventario' : 'Crear Inventario'}</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formProductoId">
                    <Form.Label className='d-flex justify-content-start m-1'>Producto</Form.Label>
                    <Form.Control
                        as="select"
                        value={productoId}
                        onChange={(e) => setProductoId(e.target.value)}
                        required
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((producto) => (
                            <option key={producto.productoId} value={producto.productoId}>
                                {producto.nombre} - {producto.marca.nombreMarca}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCantidad">
                    <Form.Label className='d-flex justify-content-start m-1'>Cantidad</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ingrese cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUbicacion">
                    <Form.Label className='d-flex justify-content-start m-1'>Ubicación</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese ubicación"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formFechaIngreso">
                    <Form.Label className='d-flex justify-content-start m-1'>Fecha de Ingreso</Form.Label>
                    <Form.Control
                        type="date"
                        value={fechaIngreso}
                        onChange={(e) => setFechaIngreso(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <button className='btnAcep mt-4'
                        variant="secondary"
                        type="button"
                        onClick={() => navigate('/dashboard/inventario')}
                    >
                        Cancelar
                    </button>
                    <button className='btnAcep mt-4' variant="primary" type="submit">
                        {id ? 'Guardar Cambios' : 'Crear Inventario'}
                    </button>
                </div>
            </Form>
        </Container>
    );
};

export default InventarioForm;
