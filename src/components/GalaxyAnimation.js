// The background animation for the webpage

import React, { useRef, useEffect, useContext } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ThemeContext } from './ThemeProvider';

// Main GalaxyAnimation component renders the 3D galaxy animation as a background
const GalaxyAnimation = () => {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Render the animation behind the other elements
      }}
      camera={{ position: [0, 0, 100], fov: 75 }} // Camera setup with field of view and initial position
    >
      <Galaxy />
    </Canvas>
  );
};

// Galaxy component creates and animates particles
const Galaxy = () => {
  const particlesRef = useRef(); // Reference for the particle system
  const { isDarkMode } = useContext(ThemeContext);
  const { camera } = useThree(); // Access to the Three.js camera object

  useEffect(() => {
    const particleCount = 10000; // Number of particles
    const positions = new Float32Array(particleCount * 3); // Array to store particle positions

    for (let i = 0; i < particleCount; i++) {
      // Generate positions using spherical coordinates
      const r = Math.random() * 5; // Radius
      const theta = Math.random() * 2 * Math.PI; // Azimuthal Angle
      const phi = Math.acos(Math.random() * 2 - 1); // Polar Angle

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta); // x-coordinate
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta); // y-coordinate
      positions[i * 3 + 2] = r * Math.cos(phi); // z-coordinate
    }

    // Assign positions to the particle system geometry
    particlesRef.current.geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    // Update the camera's position based on page scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      camera.position.y = scrollY * 0.001; // Adjust the multiplier to control the effect
      camera.lookAt(0, 0, 0); // Camera always looks at origin
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [camera]); // Dependency ensures effect runs when the camera changes

  useFrame(({ clock }) => {
    // Smoothly decrease the z position of the camera from 20 to 5
    if (camera.position.z > 5) {
      const zoomSpeed = (camera.position.z - 5) * 0.02; // Adjust the multiplier for acceleration
      camera.position.z -= zoomSpeed; // Reduce z-position gradually
    }

    // Rotate the particle system over time
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    // Particle system based on Three.js points
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
