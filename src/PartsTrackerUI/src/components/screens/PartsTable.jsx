import React, { useEffect } from 'react'
import { Input, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import partsService from '../../services/partsService'
import CreatePartButton from '../Buttons/CreatePartButton'
import { Space } from 'antd'
import DeletePartButton from '../Buttons/DeletePartButton'

const PartsTable = ({ parts, setParts }) => {
    useEffect(() => {
        partsService
            .getAll()
            .then(parts => {
                setParts(parts)
            })
    }, [setParts])

    // Table columns updated to match backend data structure
    const columns = [
        {
            title: 'Part Number',
            dataIndex: 'partNumber',
            key: 'partNumber',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
                <Input
                    autoFocus
                    placeholder='Type text here'
                    value={selectedKeys[0]}
                    onChange={e => {
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                        confirm({ closeDropdown: false })
                    }}
                    onPressEnter={() => confirm()}
                    onBlur={() => confirm()}
                />
            ),
            filterIcon: () => <SearchOutlined />,
            onFilter: (value, record) =>
                record.partNumber
                    ? record.partNumber.toLowerCase().includes(value.toLowerCase())
                    : false,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Quantity On Hand',
            dataIndex: 'quantityOnHand',
            key: 'quantityOnHand',
        },
        {
            title: 'Location Code',
            dataIndex: 'locationCode',
            key: 'locationCode',
        },
        {
            title: 'Last Stock Take',
            dataIndex: 'lastStockTake',
            key: 'lastStockTake',
            render: date => new Date(date).toLocaleString(),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (text, record, index) => (
                <Space>
                    {/* {<ViewMoreButton book={record}/>} */}
                    {<DeletePartButton parts={parts} setParts={setParts} partNumber={record.partNumber} />}
                    {/* {<EditBookButton book={record}/>} */}
                </Space> 
            )
        }
    ]

    // Use backend data structure directly, add a unique key for each row
    const data = parts.map(part => ({
        ...part,
        key: part.partNumber,
    }))

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <h2 style={{ paddingLeft: '1.5%', paddingTop: '1%' }}>
                    Parts Table
                </h2>
            </div>
            <div style={{ marginLeft: 'auto', paddingRight: '1.5%', paddingTop: '1%' }}>
                    {<CreatePartButton />}
            </div>
            <Table
                style={{ padding: '1%' }}
                dataSource={data}
                columns={columns}
            />
        </div>
    )
}

export default PartsTable