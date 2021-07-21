import React, { useState, useEffect } from 'react'
import { Button, Form, Col, Modal, Row } from 'react-bootstrap'
import { useTable, usePagination, useGlobalFilter, useColumnOrder, useSortBy } from 'react-table'
import BTable from 'react-bootstrap/Table';
import { columns } from './columns'

import { LinearProgress } from '@material-ui/core'
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import GlobalFilter from './GlobalFilter'
import SortIcon from '@material-ui/icons/Sort';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import EditComponent from './EditComponent';
import DeleteComponent from './DeleteComponent'

import AddSubscriberComponent from '../AddSubscriberComponent';

function TableComponent({ table_data, isMount, setListNumber }){
    const [table_columns, setTableCol] = useState(columns)

    const tableInstance = useTable({ 
        columns: table_columns, 
        data: table_data, 
        initialState: { pageSize: 25 } 
    }, useGlobalFilter, useColumnOrder, useSortBy, usePagination)

    const { 
        getTableProps,  
        headerGroups, 
        page,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        setPageSize,
        prepareRow,
        setGlobalFilter,
        rows,
    } = tableInstance

    const { pageIndex, pageSize } = state
    const { globalFilter } = state

    const [addSubModal, setAddSubModal] = useState(false);
    const [edit, setEdit] = useState(false)
    const [deletePhone, setDeletePhone] = useState(false)
    const [phone, setPhone] = useState('')
    const [location, setLocation] = useState('')

    const handleEditShow = (phone_number, location) => {
        setPhone(phone_number)
        setLocation(location)
        setEdit(true)
    }

    const handleDeleteShow = (phone_number, location) =>{
        setPhone(phone_number)
        setLocation(location)
        setDeletePhone(true)
    }

    useEffect(() => {
        const create_column = [{
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ cell }) => {
                return (
                    <div>
                        <Row>
                            <Col>
                                <Button 
                                    style={{
                                        background: '#4D74C2',
                                        borderColor: '#4D74C2'
                                    }} 
                                    block 
                                    onClick={() => handleEditShow(cell.row.values.phone_number, cell.row.values.location)}><EditIcon /> Edit</Button>
                            </Col>
                            <Col>
                                <Button 
                                    style={{
                                        background: '#E16D7A',
                                        borderColor: '#E16D7A'
                                    }} 
                                    block
                                    onClick={() => handleDeleteShow(cell.row.values.phone_number, cell.row.values.location)}><DeleteIcon /> Delete</Button>
                            </Col>
                        </Row>
                    </div>
                )
            }
        }]

        table_columns.map((table) => create_column.push({
            Header: table.Header,
            accessor: table.accessor
        }))

        setTableCol(create_column)
        
    }, [])

    return (
        <React.Fragment>
            <Modal
                show={edit}
                onHide={() => setEdit(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Subscriber
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditComponent 
                        phone_number={phone} 
                        old_location={location} 
                        setEdit={setEdit} 
                        setListNumber={setListNumber}
                    />
                </Modal.Body>
            </Modal>

            <Modal
                show={deletePhone}
                onHide={() => setDeletePhone(false)}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Subscriber
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteComponent 
                        phone_number={phone} 
                        old_location={location}
                        setDeletePhone={setDeletePhone} 
                        setListNumber={setListNumber}
                    />
                </Modal.Body>
            </Modal>

            {isMount === <LinearProgress /> ? null :
            <div>
                {table_data.length === 0 ? <div>
                    
                    <h4 className="text-center">
                        <p>No available data.</p>
                        <Button 
                            style={{
                                background: '#4D74C2',
                                borderColor: '#4D74C2'
                            }}
                            onClick={() => setAddSubModal(true)}>Add Subscriber</Button>
                    </h4>

                    <Modal
                        show={addSubModal}
                        onHide={() => setAddSubModal(false)}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Subscriber
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <AddSubscriberComponent setListNumber={setListNumber} setAddSubModal={setAddSubModal} />
                        </Modal.Body>
                    </Modal>
                </div> :
                    <div>
                        <div className={"d-flex mb-2"}>
                            <div className={ "mr-auto ml-n2 p-2"}>
                                <div className={"float-left mr-2"}>
                                    <Form.Control  
                                        value={pageSize} 
                                        onChange={(event) => setPageSize(Number(event.target.value))} 
                                        as="select" 
                                        size="md"
                                    >
                                        {
                                            [25, 50, 100].map((pageSize) => (
                                                <option key={pageSize} value={pageSize}>
                                                    Show {pageSize}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </div>
                            </div>  
                            <div className={"mr-n2 p-2"}>   
                                <div className="float-right ml-2">
                                    <Button 
                                        style={{
                                            background: '#E16D7A',
                                            borderColor: '#E16D7A'
                                        }} 
                                        onClick={() => setAddSubModal(true)}>Add Subscriber</Button>
                                    <Modal
                                        show={addSubModal}
                                        onHide={() => setAddSubModal(false)}
                                        size="md"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title id="contained-modal-title-vcenter">
                                                Add Subscriber
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <AddSubscriberComponent setListNumber={setListNumber} setAddSubModal={setAddSubModal} />
                                        </Modal.Body>
                                    </Modal>
                                </div>
                                <div className={"float-right ml-2"}>
                                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                                </div>
                                
                            </div>
                        </div>
                        {rows.length === 0
                        ? <h6 className="text-center">No available data.</h6>
                        : <div>
                                <BTable 
                                    id="project-table" 
                                    striped 
                                    bordered 
                                    hover 
                                    size="md" 
                                    {...getTableProps()} 
                                >
                                    <thead>
                                        {headerGroups.map(headerGroup => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map(column => (
                                            <th 
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                            >
                                                {column.render('Header')}
                                                <span className="ml-2 mt-n1">
                                                    {column.isSorted ? (column.isSortedDesc?  <ExpandMoreIcon /> : <ExpandLessIcon /> ) : <SortIcon />}
                                                </span>
                                            </th>
                                            ))}
                                        </tr>
                                        ))}
                                    </thead>
                                    <tbody>
                                        {page.map((row, i) => {
                                        prepareRow(row)
                                        return (
                                            <tr {...row.getRowProps()}>
                                            {row.cells.map(cell => {
                                                return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                                )
                                            })}
                                            </tr>
                                        )
                                        })}
                                    </tbody>
                                </BTable>
                            <div className="mt-3 h6">
                                <div className="float-left">
                                    Page {' '}
                                    <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                                </div>
                                <div className="float-right">
                                    <Form.Row>
                                        <Col>
                                            <Button style={{
                                                background: '#4D74C2',
                                                borderColor: '#4D74C2'
                                            }} size="md" onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</Button>
                                        </Col>
                                        <Col>
                                            <Button style={{
                                                background: '#E16D7A',
                                                borderColor: '#E16D7A'
                                            }} size="md" onClick={() => nextPage()} disabled={!canNextPage}>Next</Button>
                                        </Col>
                                    </Form.Row>
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                }
            </div>
            }
        </React.Fragment>
    )
}

export default TableComponent