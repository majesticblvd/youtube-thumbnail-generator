import React from 'react';
import { Canvas } from '@react-three/fiber'; // Assuming you're using react-three-fiber
import Spline from '@splinetool/react-spline';

function Background() {
    return (
        <Spline scene="https://prod.spline.design/AsrIJu6ovRbgcRIN/scene.splinecode" />
    );
}

export { Background };


{/* <Canvas>
            <mesh>
                <boxGeometry attach="geometry" args={[1, 1]} />
                <meshBasicMaterial attach="material" color="hotpink" />
            </mesh>
        </Canvas> */}