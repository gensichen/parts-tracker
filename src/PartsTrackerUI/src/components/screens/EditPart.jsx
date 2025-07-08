import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import partsService from '../../services/partsService'
import { Form, Button, Input, DatePicker } from 'antd'
import dayjs from 'dayjs'
import { PageHeader } from '@ant-design/pro-layout'

const EditPart = () => {
    const navigate = useNavigate()
    const { partNumber } = useParams()
    const [newDescription, setNewDescription] = useState('')
    const [newQuantityOnHand, setNewQuantityOnHand] = useState(0)
    const [newLocationCode, setNewLocationCode] = useState('')
    const [newLastStockTake, setNewLastStockTake] = useState('')
    const [newPartNumber, setNewPartNumber] = useState('')

    useEffect(() => {
        partsService
            .getPart({partNumber})
            .then(part => {
                setNewDescription(part.description)
                setNewQuantityOnHand(part.quantityOnHand)
                setNewLocationCode(part.locationCode)
                setNewLastStockTake(part.lastStockTake)
                setNewPartNumber(part.partNumber)
            })
    }, [partNumber])

    const updatePart = (values) => {
        const partObject = {
            partNumber: newPartNumber,
            description: values.Description,
            quantityOnHand: Number(values.QuantityOnHand),
            locationCode: values.LocationCode,
            lastStockTake: values.LastStockTake
                ? values.LastStockTake.toISOString()
                : new Date().toISOString()
        }
        partsService
            .update(newPartNumber, partObject)
            .then(() => {
                navigate(-1)
            })
    }

    return (
        <div>
            <PageHeader
                onBack={() => navigate(-1)}
                title='Edit Part'
            />
            <Form
                style={{ padding: '2%' }}
                onFinish={updatePart}
                autoComplete='off'
                labelCol={{ span: 4 }}
                fields={[
                    { name: ['Description'], value: newDescription },
                    { name: ['QuantityOnHand'], value: newQuantityOnHand },
                    { name: ['LocationCode'], value: newLocationCode },
                    { name: ['PartNumber'], value: newPartNumber },
                    { name: ['LastStockTake'], value: newLastStockTake ? dayjs(newLastStockTake) : null }
                ]}
            >
                <Form.Item
                    name='PartNumber'
                    label='Part Number'
                    rules={[
                        { required: true, message: 'Part Number is required' },
                        { whitespace: true }
                    ]}
                    hasFeedback
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    name='Description'
                    label='Description'
                    rules={[
                        { required: true, message: 'Description is required' },
                        { whitespace: true }
                    ]}
                    hasFeedback
                >
                    <Input placeholder='Input Description' />
                </Form.Item>
                <Form.Item
                    name='QuantityOnHand'
                    label='Quantity On Hand'
                    rules={[
                        { required: true, message: 'Quantity is required' },
                        {
                            validator(_, value) {
                                if (value === undefined || value === '' || isNaN(value) || Number(value) < 0) {
                                    return Promise.reject(new Error('Enter a valid non-negative number'))
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                    hasFeedback
                >
                    <Input type="number" placeholder='Input Quantity' />
                </Form.Item>
                <Form.Item
                    name='LocationCode'
                    label='Location Code'
                    rules={[
                        { required: true, message: 'Location Code is required' },
                        { whitespace: true }
                    ]}
                    hasFeedback
                >
                    <Input placeholder='Input Location Code' />
                </Form.Item>
                <Form.Item
                    name='LastStockTake'
                    label='Last Stock Take'
                    rules={[
                        { required: true, message: 'Last Stock Take is required' }
                    ]}
                    hasFeedback
                >
                    <DatePicker
                        showTime
                        style={{ width: '100%' }}
                        format="YYYY-MM-DDTHH:mm:ss[Z]"
                        placeholder='Select Last Stock Take Date'
                    />
                </Form.Item>
                <Form.Item>
                    <Button block type='primary' htmlType='submit'>
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditPart