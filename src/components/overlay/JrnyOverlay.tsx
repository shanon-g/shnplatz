/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

import { useOverlayClose } from '@/hooks/useOverlayClose';
import { useZIdxState } from '@/hooks/useZIdx';
import { clamp } from '@/lib/clamp';
import OverlayFrame from './OverlayFrame';

type Beat = { label: string; t: number };

interface Props {
  winRef: RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
}

interface GLTFResult {
  scene: any;
  scenes: any[];
  animations: any[];
  cameras: any[];
  asset: object;
  userData: object;
}

const MODEL_URL = '/journey/room.glb';

const TOTAL_SECONDS = 80;

const BEATS: Beat[] = [
  { label: 'Door Start', t: 0 },
  { label: 'BINUS Inauguration', t: 1.5 },
  { label: 'FP + Mentor', t: 14 },
  { label: 'HIMTI Whiteboard', t: 27.5 },
  { label: 'Arcade: Lab Assistant', t: 40.2 },
  { label: 'TV: Apple Academy', t: 55.4 },
  { label: 'Chest', t: 71.5 },
  { label: 'Door End', t: 79.5 },
];

const PIC_TITLES: Record<string, string> = {
  arcade_screen: 'Lab Assistant 2024 - 2026',
  tv_screen: 'Apple Developer Academy - Talent Spark Cohort 2025',
  pic_entrance: 'BINUS Inauguration 2023',
  pic_himti1a: 'TECHNO - Bekasi Booth',
  pic_himti1b: 'TECHNO - Committeee',
  pic_himti1c: 'TECHNO - Visualization Div.',
  pic_himti2: 'Seminar @BKS 2024',
  pic_himti3: 'Workshop @BKS 2024',
  pic_himti4: 'SESVENT 2024',
  pic_himti5: 'Exec Board Mem. (Pengurus) 2025/2026',
  pic_himti6a: 'President Title Handover',
  pic_himti6b: 'Exec Board Mem. @BKS',
  pic_himti7: 'HILET 2025',
  pic_himti8a: 'Kunjungan Kerja Ketua Organisasi 2025/2026',
  pic_himti8b: 'HIMTI x BNEC',
  pic_himti9: 'ICPC 2025',
  pic_shelf1: 'Mentor MC',
  pic_shelf2: 'Mentor B27',
  pic_shelf3: 'Mentor B28',
  pic_shelf4: 'FP Session 4',
  pic_shelf5: 'FP Session 12',
  pic_shelf6: 'FP Opening',
};

const PIC_IMAGES: Record<string, string> = {
  arcade_screen: '/journey/gallery/arcade.png',
  tv_screen: '/journey/gallery/tv.png',
  pic_entrance: '/journey/gallery/pic_entrance.png',
  pic_himti1a: '/journey/gallery/pic_himti1a.png',
  pic_himti1b: '/journey/gallery/pic_himti1b.png',
  pic_himti1c: '/journey/gallery/pic_himti1c.png',
  pic_himti2: '/journey/gallery/pic_himti2.png',
  pic_himti3: '/journey/gallery/pic_himti3.png',
  pic_himti4: '/journey/gallery/pic_himti4.png',
  pic_himti5: '/journey/gallery/pic_himti5.png',
  pic_himti6a: '/journey/gallery/pic_himti6a.png',
  pic_himti6b: '/journey/gallery/pic_himti6b.png',
  pic_himti7: '/journey/gallery/pic_himti7.png',
  pic_himti8a: '/journey/gallery/pic_himti8a.png',
  pic_himti8b: '/journey/gallery/pic_himti8b.png',
  pic_himti9: '/journey/gallery/pic_himti9.png',
  pic_shelf1: '/journey/gallery/pic_shelf1.png',
  pic_shelf2: '/journey/gallery/pic_shelf2.png',
  pic_shelf3: '/journey/gallery/pic_shelf3.png',
  pic_shelf4: '/journey/gallery/pic_shelf4.png',
  pic_shelf5: '/journey/gallery/pic_shelf5.png',
  pic_shelf6: '/journey/gallery/pic_shelf6.png',
};

const getPicTitle = (objName: string) => PIC_TITLES[objName] ?? '';
const getPicImage = (objName: string) => PIC_IMAGES[objName] ?? '';

export default function JrnyOverlay({ winRef, onPointerDown, setShow }: Props) {
  const { isClosing, close } = useOverlayClose(setShow);
  const { zStyle, toFront } = useZIdxState();

  const [isLoaded, setIsLoaded] = useState(false);
  const isLoadedRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const hasAutoplayedRef = useRef(false);

  // Speed State
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const playbackSpeedRef = useRef(1);

  const [timeSec, setTimeSec] = useState(0);
  const timeSecRef = useRef(0);

  const [hoverTitle, setHoverTitle] = useState<string | null>(null);

  // Gallery modal state
  const [galleryOpen, setGalleryOpen] = useState(false);
  const galleryOpenRef = useRef(false);

  const [galleryTitle, setGalleryTitle] = useState<string>('');
  const [gallerySrc, setGallerySrc] = useState<string>('');

  // resume behavior
  const resumeAfterGalleryRef = useRef(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  // Playback refs
  const isPlayingRef = useRef(false);
  const isScrubbingRef = useRef(false);

  // Three refs
  const rendererRef = useRef<any>(null);
  const sceneRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const mixerRef = useRef<any>(null);
  const actionRef = useRef<any>(null);
  const clockRef = useRef<any>(null);

  // Interaction refs
  const raycasterRef = useRef<any>(new THREE.Raycaster());
  const mouseNDCRef = useRef<any>(new THREE.Vector2());
  const hoverablesRef = useRef<any[]>([]);
  const hoveredRef = useRef<any>(null);
  const hoveredBaseRef = useRef<{ pos: any; scale: any } | null>(null);

  const isTouchRef = useRef(false);

  const beats = useMemo(() => BEATS, []);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    isLoadedRef.current = isLoaded;
  }, [isLoaded]);

  useEffect(() => {
    galleryOpenRef.current = galleryOpen;
  }, [galleryOpen]);

  // Sync state to ref and update HTML video speeds
  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed;
  }, [playbackSpeed]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    isTouchRef.current = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (hasAutoplayedRef.current) return;

    hasAutoplayedRef.current = true;
    startPlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const setTimeline = (sec: number) => {
    const t = clamp(sec, 0, TOTAL_SECONDS);

    timeSecRef.current = t;
    setTimeSec(t);

    const mixer = mixerRef.current;
    const action = actionRef.current;

    if (mixer && action) {
      action.paused = true;
      action.time = t;
      mixer.update(0);
    }

  };

  const goPrevBeat = () => {
    const t = timeSecRef.current;
    let idx = 0;
    for (let i = 0; i < beats.length; i++) if (beats[i].t <= t + 0.0001) idx = i;
    setTimeline(beats[clamp(idx - 1, 0, beats.length - 1)].t);
  };

  const goNextBeat = () => {
    const t = timeSecRef.current;
    let idx = 0;
    for (let i = 0; i < beats.length; i++) if (beats[i].t <= t + 0.0001) idx = i;
    setTimeline(beats[clamp(idx + 1, 0, beats.length - 1)].t);
  };

  const updateLabelPosition = () => {
    const labelEl = labelRef.current;
    const viewportEl = viewportRef.current;
    const cam = cameraRef.current;
    const hovered = hoveredRef.current;

    if (!labelEl || !viewportEl || !cam || !hovered) return;

    const rect = viewportEl.getBoundingClientRect();

    const box = new THREE.Box3().setFromObject(hovered);
    const topCenter = new THREE.Vector3(
      (box.min.x + box.max.x) * 0.5,
      box.max.y,
      (box.min.z + box.max.z) * 0.5
    );

    topCenter.project(cam);

    let x = (topCenter.x * 0.5 + 0.5) * rect.width;
    let y = (-topCenter.y * 0.5 + 0.5) * rect.height;

    const pad = 10;
    x = Math.max(pad, Math.min(rect.width - pad, x));
    y = Math.max(pad, Math.min(rect.height - pad, y));

    labelEl.style.left = `${x}px`;
    labelEl.style.top = `${y}px`;
  };

  const applyHoverEffect = (obj: any | null) => {
    const prev = hoveredRef.current;
    const prevBase = hoveredBaseRef.current;
    if (prev && prevBase) {
      prev.position.copy(prevBase.pos);
      prev.scale.copy(prevBase.scale);
    }

    hoveredRef.current = null;
    hoveredBaseRef.current = null;
    setHoverTitle(null);

    if (!obj) return;

    hoveredRef.current = obj;
    hoveredBaseRef.current = {
      pos: obj.position.clone(),
      scale: obj.scale.clone(),
    };

    obj.scale.multiplyScalar(1.06);

    const parent = obj.parent;
    if (parent) {
      const q = new THREE.Quaternion();
      obj.getWorldQuaternion(q);

      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(q).normalize();
      const worldPos = new THREE.Vector3();
      obj.getWorldPosition(worldPos);

      const newWorld = worldPos.clone().add(normal.multiplyScalar(0.02));
      parent.worldToLocal(newWorld);
      obj.position.copy(newWorld);
    }

    const title = getPicTitle(obj.name);
    setHoverTitle(title || null);
  };

  const startPlayback = async () => {
    if (galleryOpenRef.current) return;

    isPlayingRef.current = true;
    setIsPlaying(true);

    clockRef.current?.getDelta();
  };

  const stopPlayback = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
  };

  const togglePlay = async () => {
    if (!isLoadedRef.current) return;
    if (galleryOpenRef.current) return;

    setIsPlaying((v) => !v);
  };

  // Gallery open/close
  const openGalleryFor = (picName: string) => {
    const title = getPicTitle(picName);
    const src = getPicImage(picName);
    if (!src) return;

    const action = actionRef.current;
    const exactT = action ? clamp(action.time, 0, TOTAL_SECONDS) : timeSecRef.current;
    setTimeline(exactT);

    resumeAfterGalleryRef.current = isPlayingRef.current;

    stopPlayback();

    galleryOpenRef.current = true;
    setGalleryTitle(title || 'Gallery');
    setGallerySrc(src);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    galleryOpenRef.current = false;
    setGalleryOpen(false);
    setGalleryTitle('');
    setGallerySrc('');

    const shouldResume = resumeAfterGalleryRef.current;

    if (shouldResume) {
      setTimeout(() => {
        const action = actionRef.current;
        const exactT = action ? clamp(action.time, 0, TOTAL_SECONDS) : timeSecRef.current;
        setTimeline(exactT);
        startPlayback();
      }, 0);
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && galleryOpen) closeGallery();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [galleryOpen]);


  useEffect(() => {
    const viewportEl = viewportRef.current;
    const canvas = canvasRef.current;
    if (!viewportEl || !canvas) return;

    let raf = 0;
    let disposed = false;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, 16 / 9, 0.01, 2000);
    camera.position.set(0, 1.5, 4);
    cameraRef.current = camera;

    const clock = new THREE.Clock();
    clockRef.current = clock;

    const gltfLoader = new GLTFLoader();

    const draco = new DRACOLoader();
    draco.setDecoderPath('/draco/');
    draco.setDecoderConfig({ type: 'wasm' });
    gltfLoader.setDRACOLoader(draco);

    const ktx2 = new KTX2Loader();
    ktx2.setTranscoderPath('/basis/');
    ktx2.detectSupport(renderer);
    gltfLoader.setKTX2Loader(ktx2);

    const resize = () => {
      const camNow = cameraRef.current;
      if (!camNow) return;

      const rect = viewportEl.getBoundingClientRect();
      const w = Math.max(2, Math.floor(rect.width));
      const h = Math.max(2, Math.floor(rect.height));

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h, false);

      camNow.aspect = w / h;
      camNow.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(viewportEl);
    resize();

    gltfLoader.load(
      MODEL_URL,
      (gltf: GLTFResult) => {
        if (disposed) return;

        scene.add(gltf.scene);
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));

        const maxAniso = renderer.capabilities.getMaxAnisotropy();
        gltf.scene.traverse((obj: any) => {
          if (obj.isMesh) {
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            for (const m of mats) {
              const map = m.map;
              if (map) {
                map.anisotropy = maxAniso;
                map.needsUpdate = true;
              }
            }
          }
        });

        gltf.scene.traverse((obj: any) => {
          if (!obj.isMesh) return;

          const name = obj.name || '';
          if (!name.startsWith('pic_') && name !== 'arcade_screen' && name !== 'tv_screen') return;

          const oldMat = obj.material;
          const map = oldMat?.map ?? null;

          if (map) {
            map.colorSpace = THREE.SRGBColorSpace;
            map.needsUpdate = true;
          }

          const m = new THREE.MeshBasicMaterial({
            map: map ?? undefined,
            transparent: true,
            side: THREE.DoubleSide,
          });

          m.toneMapped = false;
          obj.material = m;
        });

        // Camera Logic
        let exportedCam: any = null;
        if (gltf.cameras && gltf.cameras.length > 0) {
            exportedCam = gltf.cameras[0];
        } else {
            const camObj = gltf.scene.getObjectByName('Camera');
            if (camObj && (camObj as any).isCamera) {
                exportedCam = camObj;
            }
        }

        if (exportedCam && exportedCam.isPerspectiveCamera) {
          cameraRef.current = exportedCam;
          requestAnimationFrame(() => resize());
        }

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(gltf.scene);
          mixerRef.current = mixer;

          const clip = gltf.animations[0];
          const action = mixer.clipAction(clip);
          actionRef.current = action;

          action.play();
          action.paused = true;
          action.time = 0;
          mixer.update(0);
        }

        const hoverables: any[] = [];
        const hoverRoot = gltf.scene.getObjectByName('HOVER');

        if (hoverRoot) {
          hoverRoot.traverse((o: any) => {
            if (o.isMesh) hoverables.push(o);
          });
        } else {
          gltf.scene.traverse((o: any) => {
            if (o.isMesh) {
              const name = o.name || '';
              if (name.startsWith('pic_') || name === 'arcade_screen' || name === 'tv_screen') {
                hoverables.push(o);
              }
            }
          });
        }
        hoverablesRef.current = hoverables;

        setIsLoaded(true);
        setTimeline(0);
      },
      undefined,
      (err: any) => console.error('Failed to load GLB:', err)
    );

    const pickPic = (obj: any) => {
      let o = obj;
      while (o) {
        if (o.isMesh && (o.name?.startsWith('pic_') || o.name === 'arcade_screen' || o.name === 'tv_screen')) {
          return o;
        }
        o = o.parent;
      }
      return null;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isTouchRef.current) return;
      if (galleryOpenRef.current) return;

      const camNow = cameraRef.current;
      const raycaster = raycasterRef.current;
      const mouse = mouseNDCRef.current;
      if (!camNow) return;

      const rect = viewportEl.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camNow);

      const hits = raycaster.intersectObjects(hoverablesRef.current, true);
      let found: any = null;
      for (const h of hits) {
        const cand = pickPic(h.object);
        if (cand) {
          found = cand;
          break;
        }
      }

      if (found) {
        if (found !== hoveredRef.current) applyHoverEffect(found);
      } else {
        if (hoveredRef.current) applyHoverEffect(null);
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!isLoadedRef.current) return;
      if (galleryOpenRef.current) return;

      const camNow = cameraRef.current;
      const raycaster = raycasterRef.current;
      const mouse = mouseNDCRef.current;
      if (!camNow) return;

      const rect = viewportEl.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(mouse, camNow);

      const hits = raycaster.intersectObjects(hoverablesRef.current, true);
      let found: any = null;
      for (const h of hits) {
        const cand = pickPic(h.object);
        if (cand) {
          found = cand;
          break;
        }
      }
      if (!found) return;

      const key = found.name as string;
      const src = getPicImage(key);
      if (src) openGalleryFor(key);
    };

    viewportEl.addEventListener('pointermove', onPointerMove);
    viewportEl.addEventListener('pointerdown', onPointerDown);

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const camNow = cameraRef.current;
      const sceneNow = sceneRef.current;
      if (!camNow || !sceneNow) return;

      const mixer = mixerRef.current;
      const action = actionRef.current;
      const clockNow = clockRef.current;

      const shouldRun =
        isPlayingRef.current &&
        !isScrubbingRef.current &&
        !galleryOpenRef.current;

      if (mixer && action && clockNow) {
        const dt = clockNow.getDelta();

        if (shouldRun) {
          action.paused = false;
          action.timeScale = playbackSpeedRef.current;
          mixer.update(dt);

          const t = clamp(action.time, 0, TOTAL_SECONDS);

          if (Math.abs(t - timeSecRef.current) > 1 / 24) {
            timeSecRef.current = t;
            setTimeSec(t);
          }

          if (t >= TOTAL_SECONDS - 0.0001) {
            stopPlayback();
            action.paused = true;
            action.time = TOTAL_SECONDS;
            mixer.update(0);
          }
        } else {
          action.paused = true;
        }
      }

      if (hoveredRef.current) updateLabelPosition();
      renderer.render(sceneNow, camNow);
    };

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();

      viewportEl.removeEventListener('pointermove', onPointerMove);
      viewportEl.removeEventListener('pointerdown', onPointerDown);

      applyHoverEffect(null);

      renderer.dispose();

      draco.dispose();
      ktx2.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScrubStart = async () => {
    if (!isLoadedRef.current) return;
    if (galleryOpenRef.current) return;

    isScrubbingRef.current = true;
    stopPlayback();
  };

  const onScrubEnd = () => {
    isScrubbingRef.current = false;
  };

  const onScrubChange = (v: number) => {
    setTimeline(v);
  };

  return (
    <OverlayFrame
      winRef={winRef}
      zStyle={zStyle}
      toFront={toFront}
      onBarPointerDown={onPointerDown}
      onClose={close}
      title="Journey Player"
      isClosing={isClosing}
      outerCls="fixed flex items-center justify-center
                w-[94vw]
                max-w-none sm:max-w-[1088px] lg:max-w-[1088px]
                max-h-[92vh]
                left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      stageCls="relative w-full max-h-full"
      panelCls="bg-[#e4cdac] border-[6px] border-[#36312C] rounded-xl w-full max-h-full flex flex-col relative z-10 overflow-hidden"
      barBg="bg-[#cd9647]"
      overlayExtra={galleryOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-3 py-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeGallery();
          }}
          onTouchStart={(e) => {
            if (e.target === e.currentTarget) closeGallery();
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-4xl rounded-xl bg-[#F9F2E4] border-[6px] border-[#36312C]
                       shadow-[10px_10px_0_0_#36312C] overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 bg-[#efeea4] border-b-[4px] border-[#36312C] px-4 py-2">
              <div className="min-w-0">
                <div className="font-extrabold text-xs sm:text-base truncate">{galleryTitle}</div>
              </div>

              <button
                onClick={closeGallery}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F9F2E4] border-[3.5px] border-[#36312C]
                           text-[#36312C] text-base font-extrabold hover:bg-[#c4576e] transition-colors duration-200"
                title="Close"
              >
                ✕
              </button>
            </div>

            <div className="p-3 sm:p-4 bg-[#e4cdac]">
              <div className="w-full max-h-[70vh] overflow-auto rounded-lg border-[4px] border-[#36312C] bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gallerySrc}
                  alt={galleryTitle}
                  className="block w-full h-auto object-contain"
                  draggable={false}
                />
              </div>

              <div className="mt-2 text-[10px] sm:text-xs font-bold text-[#36312C] opacity-80">
                Click ✕ / press ESC to close
              </div>
            </div>
          </div>
        </div>
      )}
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="p-2 sm:p-4 pt-2 sm:pt-2">
          <div
            ref={viewportRef}
            className={`relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden border-[3px] sm:border-[4px] border-[#36312C]
                        ${galleryOpen ? 'blur-[2px] brightness-75' : ''}`}
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            <div
              ref={labelRef}
              className={`absolute pointer-events-none px-3 py-1 text-[10px] sm:text-sm font-bold
                         bg-[#F9F2E4] border-[3px] border-[#36312C] rounded-md
                         shadow-[4px_4px_0_0_#36312C]
                         -translate-x-1/2 -translate-y-[120%]
                         ${hoverTitle ? 'opacity-100' : 'opacity-0'}`}
            >
              {hoverTitle ?? ''}
            </div>

            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center text-[#F9F2E4] font-bold">
                Loading Journey :D ...
              </div>
            )}

            {galleryOpen && <div className="absolute inset-0 bg-black/35" />}
          </div>
        </div>

        <div className="px-2 sm:px-4 pb-2 sm:pb-3">
          <div className="bg-[#deb170] border-[2px] sm:border-[3px] border-[#36312C] rounded-xl p-2 sm:p-3 shadow-[6px_6px_0_0_#36312C]">

            <div className="flex flex-wrap items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={goPrevBeat}
                  disabled={!isLoaded || galleryOpen}
                  className="px-3 py-2 text-xs sm:text-base rounded-lg bg-[#F9F2E4] border-[3px] border-[#36312C] font-extrabold hover:bg-[#b8d9d7] disabled:opacity-50"
                  title="Previous beat"
                >
                  ⏮
                </button>

                <button
                  onClick={togglePlay}
                  disabled={!isLoaded || galleryOpen}
                  className="px-3 py-2 text-xs sm:text-base rounded-lg bg-[#F9F2E4] border-[3px] border-[#36312C] font-extrabold hover:bg-[#b8d9d7] disabled:opacity-50"
                  title="Play / Pause"
                >
                  {isPlaying ? '⏸ Pause' : '▶ Play'}
                </button>

                <button
                  onClick={goNextBeat}
                  disabled={!isLoaded || galleryOpen}
                  className="px-3 py-2 text-xs sm:text-base rounded-lg bg-[#F9F2E4] border-[3px] border-[#36312C] font-extrabold hover:bg-[#b8d9d7] disabled:opacity-50"
                  title="Next beat"
                >
                  ⏭
                </button>
              </div>

              {galleryOpen && (
                <div className="text-[10px] sm:text-xs font-bold text-[#36312C]">
                  Gallery open • video paused
                </div>
              )}
            </div>

            {/* Speed */}
            <div className="mt-1 flex items-center justify-between">
              <div className="text-[8px] sm:text-xs font-bold text-[#36312C] opacity-80">
                Hover to see titles, click to enhance pictures!
              </div>

              <div className="flex gap-1 sm:gap-2">
                {[1, 2, 4].map((speed) => (
                  <button
                    key={speed}
                    onClick={() => setPlaybackSpeed(speed)}
                    disabled={!isLoaded || galleryOpen}
                    className={`px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-md border-[2px] border-[#36312C] transition-colors disabled:opacity-50
                      ${playbackSpeed === speed
                        ? 'bg-[#c4576e] text-[#F9F2E4]'
                        : 'bg-[#F9F2E4] text-[#36312C] hover:bg-[#b8d9d7]'}`}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
            </div>

            <div className={`mt-2 ${galleryOpen ? 'opacity-40 pointer-events-none' : ''}`}>
              <input
                type="range"
                min={0}
                max={TOTAL_SECONDS}
                step={0.01}
                value={timeSec}
                onPointerDown={onScrubStart}
                onPointerUp={onScrubEnd}
                onChange={(e) => onScrubChange(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="mt-0.1 flex items-center justify-between font-bold text-[#36312C] text-[10px] sm:text-xs">
                <span>{timeSec.toFixed(2)}s</span>
                <span>{TOTAL_SECONDS}s</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </OverlayFrame>
  );
}
