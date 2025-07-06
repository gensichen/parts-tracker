import { Button } from 'antd'
import React from 'react'
import partsService from '../../services/partsService'

const DeletePartButton = ({partNumber, setParts, parts}) => {

    const deletePart = ([artNumber]) => {
        partsService
            .remove(partNumber)
            .then(response => {
                setBooks(parts.filter(part => part.partNumber !== partNumber))
            })
    }

    return (
        <Button type='primary' onClick={() => deletePart(isbn)}>
            Delete
        </Button>
    )
}

export default DeletePartButton