import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
const MarcaForm = () => {
    const { marca } = useParams(); 
    const navigate = useNavigate();
    const [nombreMarca, setNombreMarca] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (marca) {
            setIsEditMode(true);
            const fetchMarca = async () => {
                try {
                    const response = await fetch(`http://localhost:5168/api/Brand/GetBrand/${marca}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setNombreMarca(data.nombreMarca);
                } catch (error) {
                    console.error('Error fetching brand:', error);
                    setError('Error al cargar la marca.');
                }
            };

            fetchMarca();
        }
    }, [marca]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const brandData = { nombreMarca };

        setLoading(true); 
        setError(null); 

        try {
            if (isEditMode) {
                await fetch(`http://localhost:5168/api/Brand/EditBrand/${marca}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(brandData),
                });
            } else {
                await fetch(`http://localhost:5168/api/Brand/AddBrand`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(brandData),
                });
            }

            navigate('/dashboard/marca'); 
        } catch (error) {
            console.error('Error saving brand:', error);
            setError('Error al guardar la marca.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="title">{isEditMode ? 'Editar marca' : 'Crear marca'}</h2>
            {error && <p className="text-danger">{error}</p>} 
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBrandName">
                    <Form.Label className='d-flex justify-content-start m-1'>Nombre de la Marca</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre de la marca"
                        value={nombreMarca}
                        onChange={(e) => setNombreMarca(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <button
                        className='btnAcep mt-4'
                        variant="secondary"
                        type="button"
                        onClick={() => navigate('/dashboard/marca')}
                    >
                        Cancelar
                    </button>
                    <button className='btnAcep mt-4' variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear marca')}
                    </button>
                </div>
            </Form>
        </Container>
    );
}
export default MarcaForm