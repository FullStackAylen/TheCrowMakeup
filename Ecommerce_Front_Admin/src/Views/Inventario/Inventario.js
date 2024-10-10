import { Table, Container } from 'react-bootstrap'; 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ConfirmDeleteModal from '../../Components/ConfirmDeleteModal';

const Inventario = () => {
    const [inventories, setInventories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1); 
    const [inventoryToDelete, setInventoryToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false); 
    const itemsPerPage = 4; 
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchInventories = async (page = 1) => {
            try {
                const response = await fetch(`http://localhost:5168/api/Inventory/GetInventories?page=${page}&limit=${itemsPerPage}`); // Ajusta la URL a tu API
                const data = await response.json();
                console.log(data);
                setInventories(data.inventories);
                setTotalPages(data.totalPages); 
            } catch (error) {
                console.error('Error fetching inventories:', error);
            }
        };

        fetchInventories(currentPage); 
    }, [currentPage]);

    const handleCreate = () => {
        navigate('/dashboard/inventario/form'); 
    };

    const handleEdit = (id) => {
        navigate(`/dashboard/inventario/form/${id}`); 
    };
    const handleDeleteClick = (inventory) => {
        setInventoryToDelete(inventory);
        setShowDeleteModal(true); 
    };
    const handleConfirmDelete = async () => {
        if (inventoryToDelete) {
            try {
                await fetch(`http://localhost:5168/api/Inventory/DeleteInventory/${inventoryToDelete.inventarioId}`, {
                    method: 'DELETE',
                });
                setInventories(inventories.filter(inv => inv.inventarioId !== inventoryToDelete.inventarioId));
                setShowDeleteModal(false); 
            } catch (error) {
                console.error('Error deleting inventory:', error);
            }
        }
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
            <h2 className="title">Inventarios</h2>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <button className="btnAcep" size="lg" onClick={handleCreate}>Crear</button> 
            </div>

            <Table striped bordered hover className="table-responsive-md">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Cantidad</th>
                        <th>Ubicacion</th>
                        <th>Fecha Ingreso</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                {inventories.length > 0 ? (
    inventories.map(Inventory => (
        <tr key={Inventory.inventarioId}>
            <td>{Inventory.producto ? Inventory.producto.nombre : 'Nombre no disponible'}</td>
            <td>{Inventory.producto && Inventory.producto.marca ? Inventory.producto.marca.nombreMarca : 'Marca no disponible'}</td>
            <td>{Inventory.cantidad}</td>
            <td>{Inventory.ubicacion}</td>
            <td>{Inventory.fechaIngreso}</td>
            <td className='justify-content-between'>
                <button 
                    variant="warning" 
                    className="btnAcep" 
                    onClick={() => handleEdit(Inventory.inventarioId)} 
                >
                    Editar
                </button>
                <button variant="danger" className="btnAcep" onClick={() => handleDeleteClick(Inventory)}>Eliminar</button>
            </td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan="6" className="text-center">No se encontraron inventarios.</td>
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
                        message={`¿Estás seguro de que deseas eliminar el inventario de  "${inventoryToDelete?.producto.nombre}"?`} 
                    />
        </Container>
    );
};

export default Inventario;
