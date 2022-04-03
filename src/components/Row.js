import React, { useContext } from 'react'
import { storeContext } from '../StoreContext'

const Row = (props) => {
    const [, setStore] = useContext(storeContext)

    // меняем инпут
    function changeValue(value, target) {
        setStore(prev => {
            return {
                ...prev,
                [`${props.tabName}`]: prev[`${props.tabName}`].map(row => {
                    if (row.id === props.item.id) {
                        return {
                            ...row,
                            [`${target}`]: value,
                        }
                    } else {
                        return {
                            ...row
                        }
                    }
                })
            }
        })
    }

    // удалем строку
    function deleteRow() {
        setStore(prev => {
            return {
                ...prev,
                [`${props.tabName}`]: prev[`${props.tabName}`].filter(obj => obj.id !== props.item.id)
            }
        })
    }

    return (
        <div style={{ display: 'flex', margin: '5px 0 5px 0' }}>
            <input style={{ width: 40 }} value={props.item.x} onChange={(e) => changeValue(e.target.value, 'x')} />
            <input style={{ width: 40, marginLeft: 5 }} value={props.item.y} onChange={(e) => changeValue(e.target.value, 'y')} />

            {props.delBtn && <button style={{ marginLeft: 5 }} onClick={deleteRow}>Delete</button>}
        </div>
    )
}

export default Row