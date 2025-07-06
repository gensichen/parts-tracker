import React, { useEffect } from 'react'
import partsService from '../../services/partsService'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Descriptions } from 'antd'
import { PageHeader } from '@ant-design/pro-layout'


const Part = ({ parts, setParts }) => {
    const navigate = useNavigate()
    const { partNumber } = useParams()

    useEffect(() => {
        partsService
            .getAll()
            .then(partsData => {
                setParts(partsData)
            })
    }, [setParts])

    const part = parts.find(part => part.partNumber === partNumber)

    if (part !== undefined) {
        return (
            <div>
            <PageHeader
            onBack={() => navigate(-1)}
            title='Part Information'
            />
            <Descriptions
            style={{ padding: '2%', textAlign: 'left' }}
            title={part.partNumber}
            bordered
            column={1}
            contentStyle={{ textAlign: 'left' }}
            labelStyle={{ textAlign: 'left' }}
            >
            <Descriptions.Item label='Part Number' contentStyle={{ textAlign: 'left' }} labelStyle={{ textAlign: 'left' }}>
            {part.partNumber}
            </Descriptions.Item>
            <Descriptions.Item label='Description' contentStyle={{ textAlign: 'left' }} labelStyle={{ textAlign: 'left' }}>
            {part.description}
            </Descriptions.Item>
            <Descriptions.Item label='Quantity On Hand' contentStyle={{ textAlign: 'left' }} labelStyle={{ textAlign: 'left' }}>
            {part.quantityOnHand}
            </Descriptions.Item>
            <Descriptions.Item label='Location Code' contentStyle={{ textAlign: 'left' }} labelStyle={{ textAlign: 'left' }}>
            {part.locationCode}
            </Descriptions.Item>
            <Descriptions.Item label='Last Stock Take' contentStyle={{ textAlign: 'left' }} labelStyle={{ textAlign: 'left' }}>
            {new Date(part.lastStockTake).toLocaleString()}
            </Descriptions.Item>
            </Descriptions>
            </div>
        )
    }
    return null
}

export default Part