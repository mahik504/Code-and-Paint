// ─────────────────────────────────────────────────────────────
//  Code&Paint 3D Object Input Engine
//  Interactive three.js viewport rendered into a continuous stream for
//  algorithmic stroke generation.
//  Drag on the stage to turn the object (mouse or touch), scroll/pinch to zoom;
//  smooth auto-rotation resumes when idle. Supports .glb, .gltf, .obj, .stl, .ply.
//  open(fileOrNull, dragElement) -> { video, canvas, name, dispose() }
// ─────────────────────────────────────────────────────────────
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { PLYLoader } from 'three/addons/loaders/PLYLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

const SIZE = 1024;

// Luminous iridescent demo knot for Code&Paint
function demo() {
  const g = new THREE.TorusKnotGeometry(1, 0.35, 400, 56, 2, 3);
  const m = new THREE.MeshPhysicalMaterial({
    color: 0x9d4edd,
    roughness: 0.14,
    metalness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    iridescence: 1.0,
    iridescenceIOR: 1.75,
    sheen: 0.6,
    sheenColor: 0x00f59b,
    reflectivity: 0.95
  });
  return new THREE.Mesh(g, m);
}

async function loadModel(file) {
  const url = URL.createObjectURL(file), ext = file.name.split('.').pop().toLowerCase();
  const plain = () => new THREE.MeshStandardMaterial({ color: 0xf0ece6, roughness: 0.4, metalness: 0.1 });
  try {
    if (ext === 'glb' || ext === 'gltf') return (await new GLTFLoader().loadAsync(url)).scene;
    if (ext === 'obj') {
      const o = await new OBJLoader().loadAsync(url);
      o.traverse(c => { if (c.isMesh && (!c.material || c.material.type === 'MeshPhongMaterial')) c.material = plain(); });
      return o;
    }
    if (ext === 'stl' || ext === 'ply') {
      const geo = await (ext === 'stl' ? new STLLoader() : new PLYLoader()).loadAsync(url);
      if (!geo.attributes.normal) geo.computeVertexNormals();
      const mat = geo.attributes.color ? new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.45 }) : plain();
      return new THREE.Mesh(geo, mat);
    }
    throw new Error('Please select a .glb, .gltf, .obj, .stl or .ply file');
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
}

export async function open(file, dragEl) {
  const obj = file ? await loadModel(file) : demo();
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = SIZE;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
  renderer.setSize(SIZE, SIZE, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0b0e);
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
  keyLight.position.set(-3, 4, 5);
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x9d4edd, 1.4);
  rimLight.position.set(4, -1, -3);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0x00f59b, 0.8);
  fillLight.position.set(-4, -2, -2);
  scene.add(fillLight);

  // Normalize and center model
  const box = new THREE.Box3().setFromObject(obj);
  const size = box.getSize(new THREE.Vector3());
  const centre = box.getCenter(new THREE.Vector3());
  const k = 2.2 / Math.max(size.x, size.y, size.z, 1e-6);

  const holder = new THREE.Group();
  obj.position.sub(centre);
  holder.add(obj);
  holder.scale.setScalar(k);
  scene.add(holder);

  const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
  camera.position.set(0.6, 0.5, 4.2);

  const controls = new OrbitControls(camera, dragEl);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.35;
  controls.minDistance = 1.2;
  controls.maxDistance = 12;

  let idle = 0;
  controls.addEventListener('start', () => { controls.autoRotate = false; idle = 0; });
  controls.addEventListener('end', () => { idle = performance.now(); });

  renderer.setAnimationLoop(() => {
    if (!controls.autoRotate && idle && performance.now() - idle > 2600) controls.autoRotate = true;
    controls.update();
    renderer.render(scene, camera);
  });

  const video = document.createElement('video');
  video.muted = true;
  video.playsInline = true;
  video.srcObject = canvas.captureStream(30);
  await video.play();
  await new Promise(r => { if (video.videoWidth) r(); else video.onloadedmetadata = r; });
  dragEl.style.cursor = 'grab';

  return {
    video,
    canvas,
    name: file ? file.name.replace(/\.[^.]+$/, '') : 'Code&Paint 3D Knot',
    dispose() {
      renderer.setAnimationLoop(null);
      controls.dispose();
      dragEl.style.cursor = '';
      if (video.srcObject) video.srcObject.getTracks().forEach(t => t.stop());
      renderer.dispose();
      pm.dispose();
    }
  };
}
