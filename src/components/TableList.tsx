import React, {useRef, useState} from 'react';
import {SearchOutlined} from '@ant-design/icons';
import type {InputRef, TableColumnsType, TableColumnType} from 'antd';
import {Button, Input, Space, Table, TableProps} from 'antd';
import type {FilterDropdownProps} from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import {useAppSelector} from "../app/hooks/redux";
import {BeerType} from "../app/reducer/beerStore-reducer";


type OnChange = NonNullable<TableProps<BeerType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type DataIndex = keyof BeerType;


export const TableList = () => {
    const beerStore = useAppSelector(state => state.beerStore.items)

    const [filteredBrands, setFilteredBrands] = useState<Filters>({});
    const [filteredAlchool, setFilteredAlchool] = useState<Filters>({});
    const [filteredCountry, setFilteredCountry] = useState<Filters>({});

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleChange: OnChange = (pagination, filters) => {
        setFilteredBrands(filters)
        setFilteredAlchool(filters);
        setFilteredCountry(filters)
    };

    const resetBrandsFilters = () => {
        setFilteredBrands({})
        setSearchText('');
    }

    const resetAlchoolFilters = () => {
        setFilteredAlchool({});
        setSearchText('');
    };

    const resetCountryFilters = () => {
        setFilteredCountry({})
        setSearchText('');
    }

    const resetAllFilters = () => {
        setFilteredBrands({})
        setFilteredCountry({})
        setFilteredAlchool({});
        setSearchText('');
    }

    const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void, confirm: FilterDropdownProps['confirm']) => {
        clearFilters();
        setSearchText('');
        confirm();
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<BeerType> => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}} onKeyDown={(e) => e.stopPropagation()}>

                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />

                <Space>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleSearch(selectedKeys as string[], confirm, dataIndex);
                        }}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>

                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters, confirm);
                        }}
                        size="small"
                        style={{width: 90}}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),

        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{color: filtered ? '#1677ff' : undefined}}/>
        ),

        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: TableColumnsType<BeerType> = [
        {
            title: 'BRANDS',
            dataIndex: 'title',
            key: 'title',
            width: '30%',
            ...getColumnSearchProps('title'),
            filteredValue: filteredBrands.title || null,
        },

        {
            title: 'Alchool %',
            dataIndex: 'alchool',
            key: 'alchool',
            width: '20%',
            ...getColumnSearchProps('alchool'),
            filteredValue: filteredAlchool.alchool || null,
        },

        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            ...getColumnSearchProps('country'),
            sortDirections: ['descend', 'ascend'],
            filteredValue: filteredCountry.country || null,
        },
    ];

    return (
        <>
            <Space style={{marginBottom: 16}}>
                <Button onClick={resetBrandsFilters}>Clear filter brands</Button>
                <Button onClick={resetAlchoolFilters}>Clear filter alchool %</Button>
                <Button onClick={resetCountryFilters}>Clear filter country</Button>
                <Button onClick={resetAllFilters}>Clear filter all</Button>
            </Space>

            <Table
                columns={columns}
                dataSource={beerStore}
                onChange={handleChange}
                scroll={{y: '54vh'}}
                expandable={{
                    expandedRowRender: (record) => <p style={{margin: 0}}>{record.description}</p>
                }}
            />
        </>
    );
};
