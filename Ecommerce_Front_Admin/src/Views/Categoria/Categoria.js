import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/Categoria.css';
import { Table, Container } from 'react-bootstrap';
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal';

const Categoria = () => {
    const [categories, setCategories] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const [loading, setLoading] = useState(true); 
    const itemsPerPage = 4; 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchCategories = async (page = 1) => {
            setLoading(true); 
            try {
                const response = await fetch(`http://localhost:5168/api/Category/GetCategories?page=${page}&limit=${itemsPerPage}`);
                const data = await response.json();
                console.log(data);
                setCategories(data.categories); 
                setTotalPages(data.totalPages); 
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); 
            }
        };

        fetchCategories(currentPage); 
    }, [currentPage]);

    const handleCreate = () => {
        navigate('/dashboard/categoria/form'); 
    };

    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true); 
    };

    const handleConfirmDelete = async () => {
        if (categoryToDelete) {
            try {
                await fetch(`http://localhost:5168/api/Category/DeleteCategory/${categoryToDelete.categoriaId}`, {
                    method: 'DELETE',
                });
                setCategories(categories.filter(cat => cat.categoriaId !== categoryToDelete.categoriaId));
                setShowDeleteModal(false); 
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    const handleEdit = (categoria) => {
        navigate(`/dashboard/categoria/form/${categoria}`); 
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="title">Categorías</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btnAcep" size="lg" onClick={handleCreate}>Crear</button>
            </div>

            {loading ? ( 
                <p>Cargando...</p>
            ) : (
                <>
                    <Table striped bordered hover className="table-responsive-md">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map(category => (
                                    <tr key={category.categoriaId}>
                                        <td>{category.nombreCategoria}</td>
                                        <td className='justify-content-between'>
                                            <button 
                                                variant="warning" 
                                                className="btnAcep" 
                                                onClick={() => handleEdit(category)}
                                            >
                                                Editar
                                            </button>
                                            <button variant="danger" className="btnAcep" onClick={() => handleDeleteClick(category)}>Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No se encontraron categorías.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    <div className="paginate">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btnAcep">Anterior</button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btnAcep">Siguiente</button>
                    </div>

                    <ConfirmDeleteModal 
                        show={showDeleteModal} 
                        onClose={() => setShowDeleteModal(false)} 
                        onConfirm={handleConfirmDelete} 
                        message={`¿Estás seguro de que deseas eliminar la categoría "${categoryToDelete?.nombreCategoria}"?`} 
                    />
                </>
            )}
        </Container>
    );
};

export default Categoria;
