import React, { useEffect } from 'react'
import partsService from '../../services/partsService'
import { useParams, useHistory } from 'react-router-dom'
import { Descriptions, PageHeader } from 'antd'

const Part = ({ parts, setparts }) => {
    const history = useHistory()
    const { partNumber } = useParams()

    useEffect(() => {
        partsService
            .getAll()
            .then(partsData => {
                setparts(partsData)
            })
    }, [setparts])

    const part = parts.find(part => part.partNumber === partNumber)

    if (part !== undefined) {
        return (
            <div>
                <PageHeader
                    onBack={() => history.goBack()}
                    title='Part Information'
                />
                <Descriptions
                    style={{ padding: '2%' }}
                    title={part.partNumber}
                    bordered
                    column={{ sm: 1, xs: 1 }}
                >
                    <Descriptions.Item label='Part Number'>
                        {part.partNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label='Description'>
                        {part.description}
                    </Descriptions.Item>
                    <Descriptions.Item label='Quantity On Hand'>
                        {part.quantityOnHand}
                    </Descriptions.Item>
                    <Descriptions.Item label='Location Code'>
                        {part.locationCode}
                    </Descriptions.Item>
                    <Descriptions.Item label='Last Stock Take'>
                        {new Date(part.lastStockTake).toLocaleString()}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
    return null
}

export default Part