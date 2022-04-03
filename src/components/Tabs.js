import React from 'react'
import Tab from './Tab'

const Tabs = () => {
    return (
        <div className='tabs' style={{ display: 'flex', justifyContent: 'center' }}>
            <Tab
                btnTitle='Add'
                delBtn={true}
                name='first'
            />
            <Tab
                btnTitle='Add'
                delBtn={true}
                name='second'
            />
            <Tab
                btnTitle='Calculate'
                delBtn={false}
                name='third'
            />
        </div>
    )
}

export default Tabs