import React, { useContext, useEffect, useRef, useState } from 'react'
import { storeContext } from '../StoreContext'
import Slider from './Slider'

const Graph = (props) => {
    const [store] = useContext(storeContext)
    const [cordScale, setCordScale] = useState(1)

    const canvas = useRef(null)

    useEffect(() => {
        const ctx = canvas.current.getContext('2d')

        ctx.clearRect(0, 0, 427, 150)

        ctx.beginPath();
        ctx.strokeStyle = '#ccc'
        ctx.moveTo(0, 75)
        ctx.lineTo(427, 75)
        ctx.closePath()
        ctx.stroke()

        ctx.beginPath();
        ctx.strokeStyle = props.color
        ctx.lineWidth = 1
        ctx.moveTo(0, 75);
        store[`${props.name}`].forEach(row => {
            ctx.lineTo(row.x * cordScale, 75 - (row.y * cordScale))
            ctx.fillText(`x: ${row.x} y:${row.y}`, textX(row.x), textY(row.y));
        });
        ctx.stroke();
        ctx.closePath()

        // текст в рамках канваса при лиммитных значениях
        function textY(y) {
            if (y * cordScale >= 70) {
                return 10
            }
            else {
                return 75 - (y * cordScale)
            }
        }
        function textX(x) {
            if (x * cordScale >= 400) {
                return 375
            }
            else {
                return (x * cordScale)
            }
        }

    }, [props.color, store, props.name, cordScale])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid black', margin: 10 }}>
                <canvas width='427px' height='150px' ref={canvas}></canvas>
            </div>
            <Slider setCordScale={setCordScale} />
        </div>
    )
}

export default Graph