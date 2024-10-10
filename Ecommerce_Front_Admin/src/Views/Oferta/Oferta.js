import { Table, Container } from 'react-bootstrap'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Oferta = () => {
    const [offers, setOffers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 4; 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOffers = async (page = 1) => {
            try {
                const response = await fetch(`http://localhost:5168/api/Offer/GetOffers?page=${page}&limit=${itemsPerPage}`); 
                const data = await response.json();
                setOffers(data.offers); 
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching offers:', error);
            }
        };

        fetchOffers(currentPage); 
    }, [currentPage]);

    const handleCreate = () => {
        navigate('/dashboard/oferta/form'); 
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/oferta/form/${id}`); 
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
            <h2 className="title">Ofertas</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btnAcep" size="lg" onClick={handleCreate}>Crear</button> 
            </div>

            <Table striped bordered hover className="table-responsive-md">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>% de descuento</th>
                        <th>Descripcion</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de fin</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {offers.length > 0 ? (
                        offers.map(offer => (
                            <tr key={offer.ofertaId}> 
                                <td>{offer.producto.nombre}</td>
                                <td>{offer.producto.marca.nombreMarca}</td>
                                <td>{offer.descripcionOferta}</td>
                                <td>{offer.descuentoPorcentaje}</td>
                                <td>{offer.fechaInicio}</td>
                                <td>{offer.fechaFin}</td>
                                <td className='justify-content-between'>
                                    <button 
                                        variant="warning" 
                                        className="btnAcep" 
                                        onClick={() => handleEdit(offer.offerId)} 
                                    >
                                        Editar
                                    </button>
                                    <button variant="danger" className="btnAcep">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">No se encontraron ofertas.</td>
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

export default Oferta;
