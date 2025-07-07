import { Button } from 'antd'
import React from 'react'
import partsService from '../../services/partsService'

const DeletePartButton = ({parts, setParts, partNumber}) => {

    const deletePart = (partNumber) => {
        partsService
            .remove(partNumber)
            .then(response => {
                setParts(parts.filter(part => part.partNumber !== partNumber))
            })
    }

    return (
        <Button type='primary' onClick={() => deletePart(partNumber)}>
            Delete
        </Button>
    )
}

export default DeletePartButton