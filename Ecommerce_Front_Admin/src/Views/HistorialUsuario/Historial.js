
import { Table, Container } from 'react-bootstrap'; 
import React, { useEffect, useState } from 'react';
const HistorialUsuario = () => {
    const [historyusers, setHistoryUserHistorys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 10; 
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
    

    useEffect(() => {
        const fetchHistoryUserHistorys = async (page = 1) => {
            try {
                const response = await fetch(`http://localhost:5168/api/UserHistory/GetHistoryUsers?page=${page}&limit=${itemsPerPage}`);
                const data = await response.json();
                setHistoryUserHistorys(data.historyUsers); 
                setTotalPages(data.totalPages); 
            } catch (error) {
                console.error('Error fetching historyusers:', error);
            }
        };
    
        fetchHistoryUserHistorys(currentPage); 
    }, [currentPage]);
    

    return (
        <Container className="mt-5 ">
            <h2 className="title">Registros de sesión</h2>
            <Table striped bordered hover className=" editheight">
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Email</th>
                        <th>Ingreso</th>
                        <th>Salida</th>
                    </tr>
                </thead>
                <tbody>
                    {historyusers.length > 0 ? (
                        historyusers.map(HistoryUserHistorys => (
                            <tr key={HistoryUserHistorys.historialUsuarioId} className='fila'>
                                <td>{HistoryUserHistorys.usuario.nombre}</td>
                                <td>{HistoryUserHistorys.usuario.email}</td>
                                <td>{HistoryUserHistorys.inicioSesion}</td>
                                <td>{HistoryUserHistorys.finSesion}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">No se encontraron registro de usuario.</td>
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

export default HistorialUsuario;