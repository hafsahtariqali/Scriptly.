import React, { useState, useEffect, useRef } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

const VantaEffect = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x720000,
          midtoneColor: 0x7c0000,
          lowlightColor: 0x0,
          baseColor: 0x340101,
          blurFactor: 0.9,
          speed: 4.7,
          zoom: 1.4,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] overflow-hidden"
    ></div>
  );
};

export default VantaEffect;
