"use client";

import { useEffect, useRef } from "react";
import { cn } from "@lib/utils";

/**
 * The 3D AS coin: Austin's photo on one face, the AS logo on the other.
 * Flips once, `delay` ms after its faces are drawn, taking `flipMs`;
 * flips again on click, Enter or Space, and
 * tilts gently towards the pointer. Reduced motion flips instantly with
 * no tilt. three.js loads on demand so it stays out of the main bundle.
 */
export default function Coin({
  className,
  delay = 700,
  flipMs = 1400,
  flipOnLoad = true,
  label = "Coin showing Austin's photo on one side and the AS logo on the other. Click to flip.",
  onReady,
}: {
  className?: string;
  delay?: number;
  flipMs?: number;
  flipOnLoad?: boolean;
  label?: string;
  /** Called once, after the first frame is drawn. */
  onReady?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (disposed) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const w = () => Math.max(1, el.clientWidth);
      const h = () => Math.max(1, el.clientHeight);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, w() / h(), 0.1, 1000);
      camera.position.set(0, 0, 2.6);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setSize(w(), h());
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 3));
      renderer.domElement.style.display = "block";
      el.appendChild(renderer.domElement);
      scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 2));

      const loader = new THREE.TextureLoader();
      // Ready means both faces are loaded and drawn (uploading them to
      // the GPU is the heavy part), so the hero intro can start after it.
      let loaded = 0;
      const onTexture = () => loaded++;
      const heads = loader.load("/coin-images/profile%20pic.png", onTexture);
      const tails = loader.load("/coin-images/AS-Coin-1200.png", onTexture);
      heads.colorSpace = THREE.SRGBColorSpace;
      tails.colorSpace = THREE.SRGBColorSpace;
      tails.rotation = Math.PI;
      tails.center.set(0.5, 0.5);

      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 256;
      const ctx = canvas.getContext("2d")!;
      const gradient = ctx.createLinearGradient(0, 0, 0, 256);
      gradient.addColorStop(0, "black");
      gradient.addColorStop(1, "white");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1, 256);
      const side = new THREE.CanvasTexture(canvas);

      const anisotropy = renderer.capabilities.getMaxAnisotropy();
      heads.anisotropy = tails.anisotropy = side.anisotropy = anisotropy;

      const geometry = new THREE.CylinderGeometry(1, 1, 0.12, 64);
      const materials = [
        new THREE.MeshStandardMaterial({ map: side }),
        new THREE.MeshStandardMaterial({ map: tails }),
        new THREE.MeshStandardMaterial({ map: heads }),
      ];
      const coin = new THREE.Group();
      coin.add(new THREE.Mesh(geometry, materials));
      coin.rotation.x = Math.PI / 2;
      const tilt = new THREE.Group();
      tilt.add(coin);
      scene.add(tilt);

      let flipping = false;
      let t0 = 0;
      let duration = 1400;
      let from = 0;
      let to = 0;
      const flip = (ms: number) => {
        if (flipping) return;
        if (reduce) {
          coin.rotation.z += Math.PI;
          return;
        }
        flipping = true;
        duration = ms;
        t0 = performance.now();
        from = coin.rotation.z;
        to = from + Math.PI;
      };

      let loadTimer: ReturnType<typeof setTimeout> | undefined;
      const onClick = () => flip(900);
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          flip(900);
        }
      };
      let tx = 0;
      let ty = 0;
      const onMove = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        tx = ((e.clientY - r.top) / r.height - 0.5) * 0.35;
        ty = ((e.clientX - r.left) / r.width - 0.5) * 0.35;
      };
      const onLeave = () => {
        tx = 0;
        ty = 0;
      };
      el.addEventListener("click", onClick);
      el.addEventListener("keydown", onKey);
      if (!reduce) el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);

      let raf = 0;
      let drawn = false;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (flipping) {
          const p = Math.min((performance.now() - t0) / duration, 1);
          const eased =
            p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          coin.rotation.z = from + (to - from) * eased;
          if (p === 1) flipping = false;
        }
        tilt.rotation.x += (tx - tilt.rotation.x) * 0.08;
        tilt.rotation.y += (ty - tilt.rotation.y) * 0.08;
        renderer.render(scene, camera);
        if (!drawn && loaded === 2) {
          drawn = true;
          readyRef.current?.();
          if (flipOnLoad) loadTimer = setTimeout(() => flip(flipMs), delay);
        }
      };
      loop();

      const ro = new ResizeObserver(() => {
        camera.aspect = w() / h();
        camera.updateProjectionMatrix();
        renderer.setSize(w(), h());
      });
      ro.observe(el);

      cleanup = () => {
        clearTimeout(loadTimer);
        cancelAnimationFrame(raf);
        ro.disconnect();
        el.removeEventListener("click", onClick);
        el.removeEventListener("keydown", onKey);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        geometry.dispose();
        materials.forEach((m) => m.dispose());
        [heads, tails, side].forEach((t) => t.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [delay, flipMs, flipOnLoad]);

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      tabIndex={0}
      className={cn("aspect-square cursor-pointer rounded-full", className)}
    />
  );
}
