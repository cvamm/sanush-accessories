"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { ArrowUpRight, Heart, Move3D, Sparkles, X } from "lucide-react";
import * as THREE from "three";
import type { Product } from "@/lib/products";
import { products } from "@/lib/products";

const instagramUrl = "https://www.instagram.com/sanush_accessories/";

type FloatingProductProps = {
  product: Product;
  position: [number, number, number];
  onSelect: (product: Product) => void;
};

function FloatingProduct({ product, position, onSelect }: FloatingProductProps) {
  const groupRef = useMemo(() => ({ current: null as THREE.Group | null }), []);
  const [hovered, setHovered] = useState(false);

  useFrame(({ camera }) => {
    groupRef.current?.lookAt(camera.position);
  });

  const selectProduct = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect(product);
  };

  const setPointer = (event: ThreeEvent<PointerEvent>, isOver: boolean) => {
    event.stopPropagation();
    setHovered(isOver);
    document.body.style.cursor = isOver ? "pointer" : "auto";
  };

  return (
    <group ref={groupRef} position={position}>
      <mesh
        onClick={selectProduct}
        onPointerOver={(event) => setPointer(event, true)}
        onPointerOut={(event) => setPointer(event, false)}
      >
        <planeGeometry args={[2.8, 3.7]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <Html transform center distanceFactor={8} position={[0, 0, 0.015]} style={{ pointerEvents: "none" }}>
        <div
          className="gallery-product-card"
          style={{
            transform: hovered ? "scale(1.055) translateY(-4px)" : "scale(1)",
            boxShadow: hovered
              ? "0 25px 60px rgba(86, 57, 31, .2), 0 0 0 1px rgba(184, 143, 76, .48)"
              : "0 17px 45px rgba(86, 57, 31, .15)",
          }}
        >
          <Image
            src={product.image}
            alt={product.alt}
            width={360}
            height={420}
            sizes="180px"
            draggable={false}
            className="gallery-product-image"
          />
          <div className="gallery-product-caption">
            <span>{product.category}</span>
            <strong>{product.title}</strong>
          </div>
        </div>
      </Html>
    </group>
  );
}

function GoldOrbit() {
  const ringRef = useMemo(() => ({ current: null as THREE.Group | null }), []);

  useFrame((_, delta) => {
    if (ringRef.current) ringRef.current.rotation.z += delta * 0.045;
  });

  return (
    <group ref={ringRef} rotation={[0.82, 0.45, -0.28]}>
      <mesh>
        <torusGeometry args={[4.5, 0.012, 8, 120]} />
        <meshBasicMaterial color="#b9955b" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[0.45, 0.15, 0.2]}>
        <torusGeometry args={[5.35, 0.008, 8, 120]} />
        <meshBasicMaterial color="#d5bd94" transparent opacity={0.38} />
      </mesh>
      <mesh position={[4.5, 0, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#c9a565" metalness={0.78} roughness={0.26} />
      </mesh>
    </group>
  );
}

function CardGalaxy({ onSelect, compact }: { onSelect: (product: Product) => void; compact: boolean }) {
  const positions: [number, number, number][] = compact
    ? [
        [-2.15, 1.6, 0.3],
        [2.15, 1.6, -0.3],
        [-2.15, -1.85, -0.2],
        [2.15, -1.85, 0.35],
      ]
    : [
        [-5.2, 0.25, -0.8],
        [-1.8, -0.4, 0.4],
        [1.8, 0.4, 0.15],
        [5.2, -0.2, -0.65],
      ];

  return (
    <>
      <GoldOrbit />
      {products.map((product, index) => (
        <FloatingProduct key={product.id} product={product} position={positions[index]} onSelect={onSelect} />
      ))}
    </>
  );
}

function CardModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(false);
    if (!product) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="gallery-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="gallery-modal" role="dialog" aria-modal="true" aria-labelledby="gallery-modal-title">
        <button className="gallery-modal-close" type="button" onClick={onClose} aria-label="Close product details">
          <X size={19} />
        </button>
        <div className="gallery-modal-image-wrap">
          <Image src={product.image} alt={product.alt} fill sizes="(max-width: 640px) 90vw, 420px" className="gallery-modal-image" />
        </div>
        <div className="gallery-modal-copy">
          <p className="gallery-eyebrow">{product.category} · 18K gold plated</p>
          <h3 id="gallery-modal-title">{product.title}</h3>
          <p>{product.description} Made for your everyday jewelry rotation.</p>
          <div className="gallery-modal-actions">
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="gallery-order-link">
              Ask about this piece <ArrowUpRight size={16} />
            </a>
            <button
              type="button"
              className={`gallery-save-button${isSaved ? " is-saved" : ""}`}
              onClick={() => setIsSaved((saved) => !saved)}
              aria-label={isSaved ? "Remove from saved pieces" : "Save this piece"}
              aria-pressed={isSaved}
            >
              <Heart size={17} fill={isSaved ? "currentColor" : "none"} />
            </button>
          </div>
          <p className="gallery-dm-note">Price and availability confirmed by DM.</p>
        </div>
      </section>
    </div>
  );
}

export default function StellarCardGallerySingle() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [mounted, setMounted] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    const updateLayout = () => setCompact(mediaQuery.matches);
    updateLayout();
    mediaQuery.addEventListener("change", updateLayout);
    return () => mediaQuery.removeEventListener("change", updateLayout);
  }, []);

  return (
    <section className="jewelry-gallery" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <div>
          <p className="gallery-eyebrow"><Sparkles size={13} /> The Sanush edit</p>
          <h2 id="gallery-title">A little gold, <em>in orbit.</em></h2>
          <p className="gallery-description">Meet the pieces you’ll reach for on repeat. Drag to explore, then tap a favorite to take a closer look.</p>
        </div>
        <div className="gallery-instruction"><Move3D size={15} /> Move to explore</div>
      </div>

      <div className="gallery-stage" role="img" aria-label="Interactive three-dimensional gallery of Sanush everyday jewelry">
        {mounted ? (
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, compact ? 13.5 : 15], fov: compact ? 42 : 40 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => gl.setClearColor(new THREE.Color("#f7f3ec"), 0)}
            fallback={<p className="gallery-canvas-fallback">Explore the jewelry collection below.</p>}
          >
            <ambientLight intensity={1.1} />
            <pointLight position={[5, 7, 8]} intensity={1.5} color="#fff2d4" />
            <pointLight position={[-7, -4, -5]} intensity={0.7} color="#ead7b5" />
            <CardGalaxy onSelect={setSelectedProduct} compact={compact} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate
              autoRotate={!compact}
              autoRotateSpeed={0.24}
              rotateSpeed={0.42}
              target={[0, 0, 0]}
            />
          </Canvas>
        ) : (
          <div className="gallery-loading" aria-hidden="true"><span /><span /><span /></div>
        )}
      </div>

      <CardModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
