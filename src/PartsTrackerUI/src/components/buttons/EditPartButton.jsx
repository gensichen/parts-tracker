import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const EditPartButton = ({part}) => {
    return (
        <Link to={`/parts/edit/${part.partNumber}`}>
            <Button type='primary'>
                Edit
            </Button>
        </Link>
    )
}

export default EditPartButton