'use client'
import React, { useEffect, useRef } from 'react';

const VantaEffect = () => {
    const vantaRef = useRef(null);

    useEffect(() => {
        const VANTA = window.VANTA; // Access Vanta from the global window object
        const THREE = window.THREE; // Access THREE from the global window object

        if (VANTA && THREE) {
            const vantaEffect = VANTA.FOG({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                highlightColor: 0x2c4066,
                midtoneColor: 0x7c0000,
                lowlightColor: 0x0,
                baseColor: 0x340101,
                blurFactor: 0.72,
                speed: 3.10,
                zoom: 1.10
            });

            return () => {
                // Clean up the effect when the component unmounts
                if (vantaEffect) vantaEffect.destroy();
            };
        }
    }, []);

    return (
        <div ref={vantaRef} style={{ height: '100vh', width: '100%' }}>
            {/* Your content goes here */}
        </div>
    );
};

export default VantaEffect;
