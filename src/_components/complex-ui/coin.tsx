"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function Coin(props: {
  className: string;
  onLoad?: boolean;
  onHover?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /** ----------------------------
     *  SCENE SETUP
     * ---------------------------- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 2.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /** ----------------------------
     *  LIGHTING
     * ---------------------------- */
    const hemi = new THREE.HemisphereLight(0xffffff, 0xffffff, 2);
    scene.add(hemi);

    /** ----------------------------
     *  COIN GEOMETRY + TEXTURES
     * ---------------------------- */
    const coinGroup = new THREE.Group();
    const coinGeometry = new THREE.CylinderGeometry(1, 1, 0.12, 64);

    const textureLoader = new THREE.TextureLoader();
    const headsTexture = textureLoader.load("/Coin/profile pic.png");
    const tailsTexture = textureLoader.load("/Coin/AS-Coin.png");

    headsTexture.colorSpace = THREE.SRGBColorSpace;
    tailsTexture.colorSpace = THREE.SRGBColorSpace;
    tailsTexture.rotation = Math.PI;
    tailsTexture.center.set(0.5, 0.5);

    // Side gradient
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createLinearGradient(0, 0, 0, size);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(1, "white");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, size);
    const sideTexture = new THREE.CanvasTexture(canvas);
    sideTexture.wrapS = THREE.RepeatWrapping;
    sideTexture.wrapT = THREE.ClampToEdgeWrapping;

    const coinMaterials = [
      new THREE.MeshStandardMaterial({ map: sideTexture }),
      new THREE.MeshStandardMaterial({ map: tailsTexture }),
      new THREE.MeshStandardMaterial({ map: headsTexture }),
    ];

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    headsTexture.anisotropy = maxAnisotropy;
    tailsTexture.anisotropy = maxAnisotropy;
    sideTexture.anisotropy = maxAnisotropy;

    const coinMesh = new THREE.Mesh(coinGeometry, coinMaterials);
    coinGroup.add(coinMesh);

    // Align coin to face forward
    coinGroup.rotation.x = Math.PI / 2;
    scene.add(coinGroup);

    /** ----------------------------
     *  ORBIT CONTROLS
     * ---------------------------- */
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = false;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.3;

    /** ----------------------------
     *  FLIP LOGIC
     * ---------------------------- */
    let flipping = false;
    let flipStart = 0;
    let flipDuration;
    let flipStartRotationZ = 0;
    let flipEndRotationZ = 0;

    const flipCoin = () => {
      if (flipping) return;
      flipping = true;
      flipStart = performance.now();
      flipStartRotationZ = coinGroup.rotation.z;
      flipEndRotationZ = coinGroup.rotation.z + Math.PI; // flip 180°
      controls.enableRotate = true;
    };

    setTimeout(() => {
      if (props.onLoad) {
        flipDuration = 1400;
        flipCoin();
      }
    }, 2900);

    container.addEventListener("mouseenter", () => {
      if (props.onHover) {
        flipDuration = 300;
        flipCoin();
      }
    });
    container.addEventListener("mouseleave", () => {
      if (props.onHover) {
        flipDuration = 300;
        flipCoin();
      }
    });

    /** ----------------------------
     *  ANIMATION LOOP
     * ---------------------------- */
    const animate = () => {
      requestAnimationFrame(animate);

      if (flipping) {
        const elapsed = performance.now() - flipStart;
        const progress = Math.min(elapsed / flipDuration, 1);

        // Smooth easing
        const eased =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        coinGroup.rotation.z =
          flipStartRotationZ + (flipEndRotationZ - flipStartRotationZ) * eased;

        if (progress === 1) flipping = false;
      }

      renderer.render(scene, camera);
    };
    animate();

    /** ----------------------------
     *  RESIZE HANDLER
     * ---------------------------- */
    const resize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", resize);

    /** ----------------------------
     *  CLEANUP
     * ---------------------------- */
    return () => {
      window.removeEventListener("resize", resize);
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [props.onHover, props.onLoad]);

  return (
    <div ref={containerRef} className={`${props.className} cursor-pointer`} />
  );
}
