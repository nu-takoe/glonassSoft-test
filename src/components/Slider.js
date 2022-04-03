import { useRef, useState } from "react"

export default function Slider(props) {
    const slider = useRef(null)
    const thumb = useRef(null)

    const [thumbStyle, setThumbStyle] = useState({
        position: 'relative',
        height: 15,
        width: 10,
        backgroundColor: 'black',
        left: 0,
        top: -3
    })
    const styles = {
        marginBottom: 10,
        backgroundColor: '#ccc',
        width: 100,
        height: 10
    }

    // драг н дроп
    function onDown(e) {
        let shiftX = e.clientX - thumb.current.getBoundingClientRect().left;
        document.addEventListener('mousemove', onMove)
        document.addEventListener('mouseup', onUp)

        function onMove(e) {

            let newLeft = e.clientX - shiftX - slider.current.getBoundingClientRect().left;
            if (newLeft < 0) {
                newLeft = 0;
            }

            let rightEdge = slider.current.offsetWidth - thumb.current.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            setThumbStyle({
                ...thumbStyle,
                left: newLeft
            })

            // скейлим график 
            props.setCordScale(() => {
                if (String(newLeft).length === 1) {
                    return 1
                } else {
                    let num = String(newLeft)[0]
                    if (num % 2 === 0) {
                        return (Number(num) + 2) / 2
                    } else {
                        return (Number(num) + 1) / 2
                    }
                }
            })
        }
        function onUp() {
            document.addEventListener('mouseup', onUp)
            document.removeEventListener('mousemove', onMove)
        }
    }

    return (
        <div ref={slider} style={styles}>
            <div ref={thumb} style={thumbStyle} onMouseDown={(e) => onDown(e)}></div>
        </div>
    )
}