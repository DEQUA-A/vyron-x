/**
 * HeroScene — Three.js Cinematic Hero
 * VYRON X: Electric Obsidian design direction
 * Features: Particle system, mouse-reactive 3D hypercar geometry,
 *           atmospheric lighting, depth effects
 */
import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

const HeroScene = ({ onReady }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const frameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    targetMouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    targetMouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene Setup ──────────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0A0A0C, 0.035);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 1.5, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Lighting ─────────────────────────────────────────────────
    const ambientLight = new THREE.AmbientLight(0x0A0A1A, 0.4);
    scene.add(ambientLight);

    // Key light — electric blue from front-left
    const keyLight = new THREE.DirectionalLight(0x0066FF, 3.5);
    keyLight.position.set(-5, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    scene.add(keyLight);

    // Fill light — cool white from right
    const fillLight = new THREE.DirectionalLight(0xC8CDD8, 1.2);
    fillLight.position.set(5, 2, 2);
    scene.add(fillLight);

    // Rim light — electric arc from behind
    const rimLight = new THREE.DirectionalLight(0x00AAFF, 2.0);
    rimLight.position.set(0, -1, -6);
    scene.add(rimLight);

    // Ground bounce
    const groundLight = new THREE.PointLight(0x0044AA, 1.5, 12);
    groundLight.position.set(0, -2, 0);
    scene.add(groundLight);

    // ── Hypercar Body (Stylized Geometry) ────────────────────────
    const carGroup = new THREE.Group();
    scene.add(carGroup);

    // Carbon fiber material
    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x0D0D12,
      metalness: 0.85,
      roughness: 0.15,
      envMapIntensity: 1.5,
    });

    // Electric accent material
    const electricMat = new THREE.MeshStandardMaterial({
      color: 0x0066FF,
      metalness: 0.9,
      roughness: 0.05,
      emissive: 0x0033AA,
      emissiveIntensity: 0.8,
    });

    // Titanium material
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x8B8FA8,
      metalness: 0.95,
      roughness: 0.1,
    });

    // Glass material
    const glassMat = new THREE.MeshStandardMaterial({
      color: 0x112244,
      metalness: 0.1,
      roughness: 0.0,
      transparent: true,
      opacity: 0.6,
    });

    // Main body — low wedge shape
    const bodyGeo = new THREE.BoxGeometry(3.8, 0.5, 1.8);
    bodyGeo.translate(0, 0, 0);
    const body = new THREE.Mesh(bodyGeo, carbonMat);
    body.position.set(0, 0.1, 0);
    body.castShadow = true;
    carGroup.add(body);

    // Upper cabin — tapered
    const cabinGeo = new THREE.BoxGeometry(1.6, 0.45, 1.4);
    const cabin = new THREE.Mesh(cabinGeo, carbonMat);
    cabin.position.set(-0.3, 0.47, 0);
    cabin.rotation.z = 0.08;
    cabin.castShadow = true;
    carGroup.add(cabin);

    // Windshield
    const windshieldGeo = new THREE.BoxGeometry(1.2, 0.38, 1.35);
    const windshield = new THREE.Mesh(windshieldGeo, glassMat);
    windshield.position.set(-0.28, 0.48, 0);
    windshield.rotation.z = 0.08;
    carGroup.add(windshield);

    // Front splitter
    const splitterGeo = new THREE.BoxGeometry(3.2, 0.06, 0.4);
    const splitter = new THREE.Mesh(splitterGeo, electricMat);
    splitter.position.set(0, -0.14, -1.1);
    carGroup.add(splitter);

    // Rear diffuser
    const diffuserGeo = new THREE.BoxGeometry(3.0, 0.3, 0.5);
    const diffuser = new THREE.Mesh(diffuserGeo, carbonMat);
    diffuser.position.set(0, -0.06, 1.15);
    diffuser.rotation.x = -0.2;
    carGroup.add(diffuser);

    // Rear wing
    const wingGeo = new THREE.BoxGeometry(2.8, 0.06, 0.5);
    const wing = new THREE.Mesh(wingGeo, carbonMat);
    wing.position.set(0, 0.8, 1.0);
    wing.rotation.x = -0.15;
    carGroup.add(wing);

    // Wing pillars
    [-1.2, 1.2].forEach(x => {
      const pillarGeo = new THREE.BoxGeometry(0.06, 0.5, 0.06);
      const pillar = new THREE.Mesh(pillarGeo, titaniumMat);
      pillar.position.set(x, 0.55, 1.0);
      carGroup.add(pillar);
    });

    // Wheels
    const wheelPositions = [
      [-1.4, -0.22, -0.85],
      [1.4, -0.22, -0.85],
      [-1.4, -0.22, 0.85],
      [1.4, -0.22, 0.85],
    ];
    const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.28, 32);
    const rimGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.3, 16);
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9, metalness: 0.0 });
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x8B8FA8, metalness: 0.95, roughness: 0.05 });

    wheelPositions.forEach(([x, y, z]) => {
      const wheelGroup = new THREE.Group();
      const tire = new THREE.Mesh(wheelGeo, tireMat);
      tire.rotation.z = Math.PI / 2;
      const rim = new THREE.Mesh(rimGeo, rimMat);
      rim.rotation.z = Math.PI / 2;
      wheelGroup.add(tire, rim);
      wheelGroup.position.set(x, y, z);
      wheelGroup.castShadow = true;
      carGroup.add(wheelGroup);
    });

    // Headlight strips — electric blue
    const headlightGeo = new THREE.BoxGeometry(0.6, 0.04, 0.04);
    const headlightMat = new THREE.MeshStandardMaterial({
      color: 0x00AAFF,
      emissive: 0x0066FF,
      emissiveIntensity: 3.0,
    });
    [-0.5, 0.5].forEach(x => {
      const hl = new THREE.Mesh(headlightGeo, headlightMat);
      hl.position.set(x, 0.12, -0.93);
      carGroup.add(hl);
      // Point light for headlight glow
      const hlLight = new THREE.PointLight(0x0066FF, 2.0, 3);
      hlLight.position.set(x, 0.12, -1.1);
      carGroup.add(hlLight);
    });

    // Tail light strips
    const taillightMat = new THREE.MeshStandardMaterial({
      color: 0xFF2200,
      emissive: 0xFF1100,
      emissiveIntensity: 2.0,
    });
    const taillightGeo = new THREE.BoxGeometry(2.4, 0.03, 0.03);
    const taillight = new THREE.Mesh(taillightGeo, taillightMat);
    taillight.position.set(0, 0.08, 0.93);
    carGroup.add(taillight);

    // Side accent lines — electric blue
    const accentGeo = new THREE.BoxGeometry(3.2, 0.02, 0.02);
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x0066FF,
      emissive: 0x0044CC,
      emissiveIntensity: 1.5,
    });
    [-0.9, 0.9].forEach(z => {
      const accent = new THREE.Mesh(accentGeo, accentMat);
      accent.position.set(0, 0.32, z);
      carGroup.add(accent);
    });

    // Ground reflection plane
    const groundGeo = new THREE.PlaneGeometry(20, 20);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x050508,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.57;
    ground.receiveShadow = true;
    scene.add(ground);

    // ── Particle System ──────────────────────────────────────────
    const PARTICLE_COUNT = 1200;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const radius = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

      sizes[i] = Math.random() * 2.5 + 0.5;

      // Mix of electric blue and white particles
      const t = Math.random();
      if (t < 0.6) {
        colors[i3] = 0.0; colors[i3 + 1] = 0.4 + Math.random() * 0.3; colors[i3 + 2] = 1.0;
      } else if (t < 0.85) {
        colors[i3] = 0.0; colors[i3 + 1] = 0.7 + Math.random() * 0.3; colors[i3 + 2] = 1.0;
      } else {
        colors[i3] = 0.8; colors[i3 + 1] = 0.85; colors[i3 + 2] = 1.0;
      }
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Floor Grid ───────────────────────────────────────────────
    const gridHelper = new THREE.GridHelper(30, 30, 0x0033AA, 0x111122);
    gridHelper.position.y = -0.56;
    gridHelper.material.opacity = 0.3;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // ── Animation Loop ───────────────────────────────────────────
    let time = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      time += 0.008;

      // Smooth mouse follow
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.04;

      // Car subtle float + mouse tilt
      carGroup.rotation.y = mouseRef.current.x * 0.3 + Math.sin(time * 0.5) * 0.02;
      carGroup.rotation.x = mouseRef.current.y * 0.08;
      carGroup.position.y = Math.sin(time * 0.8) * 0.04;

      // Particle drift
      particles.rotation.y = time * 0.04;
      particles.rotation.x = time * 0.01;

      // Camera subtle movement
      camera.position.x = mouseRef.current.x * 0.5;
      camera.position.y = 1.5 + mouseRef.current.y * 0.3;
      camera.lookAt(0, 0.2, 0);

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize Handler ───────────────────────────────────────────
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    if (onReady) onReady();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [handleMouseMove, onReady]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default HeroScene;
