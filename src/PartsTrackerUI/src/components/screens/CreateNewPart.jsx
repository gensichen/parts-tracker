import React from 'react'
import partsService from '../../services/partsService'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Input } from 'antd'
import { PageHeader } from '@ant-design/pro-layout'
import TextArea from 'antd/lib/input/TextArea'

const CreateNewPart = ({ parts, setParts }) => {
    const navigate = useNavigate()
    const partNumbers = parts.map(part => part.partNumber)

    const addPart = (values) => {
        const partObject = {
            partNumber: values.partNumber,
            description: values.description,
            quantityOnHand: Number(values.quantityOnHand),
            locationCode: values.locationCode,
            lastStockTake: new Date().toISOString()
        }
        partsService
            .create(partObject)
            .then(newPart => {
                setParts(prev => [...prev, newPart])
                history.goBack()
            })
    }

    return (
        <div>
            <PageHeader
                onBack={() => history.goBack()}
                title='Create New Part'
            />
            <Form
                style={{ padding: '2%' }}
                onFinish={addPart}
                autoComplete='off'
                labelCol={{ span: 4 }}
            >
                <Form.Item
                    name='partNumber'
                    label='Part Number'
                    rules={[
                        { required: true, message: 'Part Number is required' },
                        { whitespace: true },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value) return Promise.resolve()
                                if (partNumbers.includes(value)) {
                                    return Promise.reject(new Error('Part Number already exists'))
                                }
                                return Promise.resolve()
                            }
                        })
                    ]}
                    hasFeedback
                >
                    <Input placeholder='Input Part Number' />
                </Form.Item>
                <Form.Item
                    name='description'
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
                    name='quantityOnHand'
                    label='Quantity On Hand'
                    rules={[
                        { required: true, message: 'Quantity is required' },
                        {
                            validator(_, value) {
                                if (!value || isNaN(value) || Number(value) < 0) {
                                    return Promise.reject(new Error('Enter a valid non-negative number'))
                                }
                                return Promise.resolve()
                            }
                        }
                    ]}
                    hasFeedback
                >
                    <Input placeholder='Input Quantity' />
                </Form.Item>
                <Form.Item
                    name='locationCode'
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
                    name='lastStockTake'
                    label='Last Stock Take'
                    initialValue={new Date().toISOString()}
                    hidden
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button block type='primary' htmlType='submit'>
                        Add New
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default CreateNewPart