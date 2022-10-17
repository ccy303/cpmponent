import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "./1024.less";

const App = () => {
    const w = 1000;
    const h = 500;
    // 等边三角形中点画园边长
    const r = Math.sqrt(Math.pow(w / 2, 2) / 3) * 2;
    const [index, setIndex] = useState([2, 1, 0]);
    useEffect(() => {
        setInterval(() => {
            setIndex(v => {
                v = v.map(i => {
                    return i + 1 > 2 ? 0 : i + 1;
                });
                return v;
            });
        }, 10000);
    }, []);

    const _style = [
        {
            width: `${w}px`,
            height: `${h}px`,
            position: "absolute",
            transform: `translateZ(-${r / 4 + 300}px) translateX(${w / 4 + 100}px) rotateY(-60deg)`
        },
        {
            width: `${w}px`,
            height: `${h}px`,
            position: "absolute",
            transform: `translateZ(-${r / 4 + 300}px) translateX(-${w / 4 + 100}px) rotateY(60deg)`
        },
        {
            width: `${w}px`,
            height: `${h}px`,
            position: "absolute",
            transform: `translateZ(${r / 2 + 50}px)`
        }
    ];

    return (
        <div className={style.container}>
            <div style={_style[index[2]]} className={`${style.box} ${style.box1}`}>
                {/* <img src={require('@assets/83ccdc2c86007b662193223aae03a70c.jpeg')} alt="" srcset="" /> */}
            </div>
            <div style={_style[index[1]]} className={`${style.box} ${style.box2}`}>
                {/* <img src={require('@assets/6122f0c04e232b65a446d13a2a1f4ec7.jpeg')} alt="" srcset="" /> */}
            </div>
            <div style={_style[index[0]]} className={`${style.box} ${style.box3}`}>
                {/* <img src={require('@assets/814691e49e7d046a7d5e0a0b471c0e14.jpeg')} alt="" srcset="" /> */}
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
