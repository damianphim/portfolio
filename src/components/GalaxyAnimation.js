// src/components/GalaxyAnimation.js
import React, { useRef, useEffect, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ThemeContext } from './ThemeProvider';

const GalaxyAnimation = () => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
      camera={{ position: [0, 0, 100], fov: 75 }} // Start camera at z=20
    >
      <Galaxy />
    </Canvas>
  );
};

const Galaxy = () => {
  const particlesRef = useRef();
  const { isDarkMode } = useContext(ThemeContext);
  const { camera } = useThree();

  useEffect(() => {
    const particleCount = 10000;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const r = Math.random() * 5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    particlesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.y = scrollY * 0.001;
      camera.lookAt(0, 0, 0) // Adjust the multiplier to control the effect
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [camera]);

  useFrame(({ clock }) => {
    // Smoothly decrease the z position of the camera from 20 to 5
    if (camera.position.z > 5) {
      const zoomSpeed = (camera.position.z - 5) * 0.02; // Adjust the multiplier for acceleration
      camera.position.z -= zoomSpeed;
    }

    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.01}
        color={isDarkMode ? '#ffffff' : '#000000'}
      />
    </points>
  );
};

export default GalaxyAnimation;
