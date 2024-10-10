import { Table, Container } from 'react-bootstrap'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Marca = () => {
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 4; 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async (page = 1) => {
            try {
                const response = await fetch(`http://localhost:5168/api/Brand/GetBrands?page=${page}&limit=${itemsPerPage}`); 
                const data = await response.json();
                console.log(data);
                setBrands(data.brands); 
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands(currentPage); 
    }, [currentPage]);

    const handleCreate = () => {
        navigate('/dashboard/marca/form'); 
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/marca/form/${id}`); 
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
            <h2 className="title">Marcas</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btnAcep" size="lg" onClick={handleCreate}>Crear</button> 
            </div>

            <Table striped bordered hover className="table-responsive-md">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {brands.length > 0 ? (
                        brands.map(Brand => (
                            <tr key={Brand.marcaId}>
                                <td>{Brand.nombreMarca}</td>
                                <td className='justify-content-between'>
                                    <button 
                                        variant="warning" 
                                        className="btnAcep" 
                                        onClick={() => handleEdit(Brand.marcaId)} 
                                    >
                                        Editar
                                    </button>
                                    <button variant="danger" className="btnAcep">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2" className="text-center">No se encontraron marcas.</td>
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

export default Marca;
