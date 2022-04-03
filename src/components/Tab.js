import React, { useContext } from 'react'
import { storeContext } from '../StoreContext'
import Row from './Row'

const Tab = (props) => {
    const [store, setStore] = useContext(storeContext)

    // создание новой строки
    function createRow() {
        setStore(prev => {
            return {
                ...prev,
                [`${props.name}`]: prev[`${props.name}`].concat([{
                    id: store.id,
                    x: '',
                    y: '',
                }]),
            }
        })

        //increace id
        setStore(prev => {
            return {
                ...prev,
                id: ++prev.id
            }
        })
    }

    function calculate() {
        const min = Math.min(store.first.length, store.second.length)
        let arr = []
        for (let i = 0; i < min; ++i) {
            arr.push({
                id: 'F' + i,
                x: (Number(store.first[i].x) + Number(store.second[i].x)) / 2,
                y: (Number(store.first[i].y) + Number(store.second[i].y)) / 2,
            })
        }
        setStore({ ...store, third: arr })
    }

    return (
        <div style={{ margin: 5 }}>
            <div style={{ display: 'flex' }}>
                <p style={{ margin: 0, width: 44, textAlign: 'center' }}>X</p>
                <p style={{ margin: 0, width: 44, textAlign: 'center', marginLeft: 10 }}>Y</p>
            </div>

            {store[`${props.name}`].map(item => <Row delBtn={props.delBtn} key={item.id} item={item} tabName={props.name} />)}

            <button style={{ width: '100%' }} onClick={props.delBtn ? createRow : calculate}>{props.btnTitle}</button>
        </div>
    )
}

export default Tab