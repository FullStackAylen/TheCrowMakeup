import { Table, Container } from 'react-bootstrap'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Usuario = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const itemsPerPage = 4; 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchUsers = async (page = 1) => {
            try {
                const response = await fetch(`http://localhost:5168/api/User/GetUsers?page=${page}&limit=${itemsPerPage}`); // Ajusta la URL a tu API
                const data = await response.json();
                setUsers(data.users); 
                setTotalPages(data.totalPages); 
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers(currentPage);
    }, [currentPage]);

    const handleCreate = () => {
        navigate('/dashboard/usuario/form'); 
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/usuario/form/${id}`);
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
            <h2 className="title">Usuarios</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btnAcep" size="lg" onClick={handleCreate}>Crear</button> 
            </div>

            <Table striped bordered hover className="table-responsive-md">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Fecha de registro</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user.usuarioId}>
                                <td>{user.nombre}</td>
                                <td>{user.email}</td>
                                <td>{user.rol.nombre}</td>
                                <td>{user.fechaRegistro}</td>
                                <td className='justify-content-between'>
                                    <button 
                                        variant="warning" 
                                        className="btnAcep" 
                                        onClick={() => handleEdit(user.usuarioId)} 
                                    >
                                        Editar
                                    </button>
                                    <button variant="danger" className="btnAcep">Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No se encontraron usuarios.</td>
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

export default Usuario;
