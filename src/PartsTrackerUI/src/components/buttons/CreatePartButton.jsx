import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const CreatePartButton = () => {
    return (
        <Link to='/parts/create'>
            <Button type='primary'>
                Add New
            </Button>
        </Link>
    )
}

export default CreatePartButton