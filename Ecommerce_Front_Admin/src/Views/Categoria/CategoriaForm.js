import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form } from 'react-bootstrap';
import '../../Styles/Categoria.css';

const CategoriaForm = () => {
    const { categoria } = useParams(); 
    const navigate = useNavigate();
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 

    useEffect(() => {
        if (categoria) {
            setIsEditMode(true);
            const fetchCategoria = async () => {
                try {
                    const response = await fetch(`http://localhost:5168/api/Category/GetCategory/${categoria}`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setNombreCategoria(data.nombreCategoria);
                } catch (error) {
                    console.error('Error fetching category:', error);
                    setError('Error al cargar la categoría.');
                }
            };

            fetchCategoria();
        }
    }, [categoria]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryData = { nombreCategoria };

        setLoading(true); 
        setError(null); 

        try {
            if (isEditMode) {
                await fetch(`http://localhost:5168/api/Category/EditCategory/${categoria}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categoryData),
                });
            } else {
                await fetch(`http://localhost:5168/api/Category/AddCategory`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categoryData),
                });
            }

            navigate('/dashboard/categoria'); 
        } catch (error) {
            console.error('Error saving category:', error);
            setError('Error al guardar la categoría.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="title">{isEditMode ? 'Editar Categoría' : 'Crear Categoría'}</h2>
            {error && <p className="text-danger">{error}</p>} 
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCategoryName">
                    <Form.Label className='d-flex justify-content-start m-1'>Nombre de la Categoría</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese nombre de la categoría"
                        value={nombreCategoria}
                        onChange={(e) => setNombreCategoria(e.target.value)}
                        required
                    />
                </Form.Group>
                <div className='d-flex justify-content-end'>
                    <button
                        className='btnAcep mt-4'
                        variant="secondary"
                        type="button"
                        onClick={() => navigate('/dashboard/categoria')}
                    >
                        Cancelar
                    </button>
                    <button className='btnAcep mt-4' variant="primary" type="submit" disabled={loading}>
                        {loading ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Categoría')}
                    </button>
                </div>
            </Form>
        </Container>
    );
};

export default CategoriaForm;
