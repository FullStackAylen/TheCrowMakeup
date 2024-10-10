import { Table, Container } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Producto = () => {
    const [products, setProducts] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 4; 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchProducts = async (page = 1) => {
            try {
                const response = await fetch(`http://localhost:5168/api/Product/GetProducts?page=${page}&limit=${itemsPerPage}`);
                const data = await response.json();
                setProducts(data.products); 
                setTotalPages(data.totalPages); 
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts(currentPage); 
    }, [currentPage]);

    const handleCreate = () => {
        navigate('/dashboard/producto/form'); 
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/producto/form/${id}`); 
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
            <h2 className="title">Productos</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btnAcep" size="lg" onClick={handleCreate}>Crear</button> 
            </div>

            <Table striped bordered hover className="table-responsive-md">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Marca</th>
                        <th>Precio</th>
                        <th>Tipo de piel</th>
                        <th>Stock disponible</th>
                        <th>Fecha creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.productoId}>
                                <td>{product.nombre}</td>
                                <td>{product.descripcion}</td>
                                <td>{product.marca.nombreMarca}</td>
                                <td>${product.precio}</td>
                                <td>{product.tipoPiel}</td>
                                <td>{product.stockDisponible}</td>
                                <td>{product.fechaCreacion}</td>

                                <td className='justify-content-between d-flex align-items-center '>
                                    <button 
                                        variant="warning" 
                                        className="btnAcep" 
                                        onClick={() => handleEdit(product.productoId)} 
                                    >
                                        Editar
                                    </button>
                                    <button variant="danger" className="btnAcep">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12" className="text-center">No se encontraron productos.</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btnAcep">Anterior</button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btnAcep">Siguiente</button>
            </div>
        </Container>
    );
};

export default Producto;
