import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import * as THREE from "three";
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

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.querySelector("#three").appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    }, []);

    return (
        <div className={style.container}>
            <div id='three'></div>
            {/* <div style={_style[index[2]]} className={`${style.box} ${style.box1}`}></div>
            <div style={_style[index[1]]} className={`${style.box} ${style.box2}`}></div>
            <div style={_style[index[0]]} className={`${style.box} ${style.box3}`}></div> */}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
