(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ColorBleedBackground.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorBleedBackground",
    ()=>ColorBleedBackground
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const ColorBleedBackground = ({ darkMode })=>{
    _s();
    const [mousePos, setMousePos] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        x: -200,
        y: -200
    });
    const [isPointerActive, setIsPointerActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Smooth mouse-follow trail
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ColorBleedBackground.useEffect": ()=>{
            let animationFrameId;
            let targetX = -200;
            let targetY = -200;
            let currentX = -200;
            let currentY = -200;
            const handleMouseMove = {
                "ColorBleedBackground.useEffect.handleMouseMove": (e)=>{
                    targetX = e.clientX;
                    targetY = e.clientY;
                    if (!isPointerActive) setIsPointerActive(true);
                }
            }["ColorBleedBackground.useEffect.handleMouseMove"];
            const handleMouseLeave = {
                "ColorBleedBackground.useEffect.handleMouseLeave": ()=>{
                    setIsPointerActive(false);
                }
            }["ColorBleedBackground.useEffect.handleMouseLeave"];
            const updateLoop = {
                "ColorBleedBackground.useEffect.updateLoop": ()=>{
                    // Lerp movement for fluid water-like drift
                    currentX += (targetX - currentX) * 0.08;
                    currentY += (targetY - currentY) * 0.08;
                    setMousePos({
                        x: currentX,
                        y: currentY
                    });
                    animationFrameId = requestAnimationFrame(updateLoop);
                }
            }["ColorBleedBackground.useEffect.updateLoop"];
            window.addEventListener('mousemove', handleMouseMove, {
                passive: true
            });
            document.addEventListener('mouseleave', handleMouseLeave);
            animationFrameId = requestAnimationFrame(updateLoop);
            return ({
                "ColorBleedBackground.useEffect": ()=>{
                    window.removeEventListener('mousemove', handleMouseMove);
                    document.removeEventListener('mouseleave', handleMouseLeave);
                    cancelAnimationFrame(animationFrameId);
                }
            })["ColorBleedBackground.useEffect"];
        }
    }["ColorBleedBackground.useEffect"], [
        isPointerActive
    ]);
    // Cố định mức độ loang màu "Êm dịu" (subtle: opacity 0.6)
    const opacityMultiplier = 0.6;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-hidden": "true",
        className: "pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-700",
        style: {
            opacity: opacityMultiplier
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-32 -left-32 w-[520px] h-[520px] sm:w-[780px] sm:h-[780px] rounded-full blur-[90px] sm:blur-[130px] animate-bleed-drift-1 transition-all duration-1000",
                style: {
                    background: darkMode ? 'radial-gradient(circle at 40% 40%, rgba(244, 182, 194, 0.22) 0%, rgba(255, 127, 107, 0.16) 45%, transparent 72%)' : 'radial-gradient(circle at 40% 40%, rgba(255, 127, 107, 0.32) 0%, rgba(244, 182, 194, 0.24) 45%, transparent 72%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute -top-24 -right-28 w-[500px] h-[500px] sm:w-[750px] sm:h-[750px] rounded-full blur-[95px] sm:blur-[140px] animate-bleed-drift-2 transition-all duration-1000",
                style: {
                    background: darkMode ? 'radial-gradient(circle at 60% 35%, rgba(251, 146, 60, 0.18) 0%, rgba(244, 182, 194, 0.12) 50%, transparent 72%)' : 'radial-gradient(circle at 60% 35%, rgba(251, 191, 36, 0.28) 0%, rgba(254, 215, 170, 0.22) 50%, transparent 72%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[35%] -left-40 w-[550px] h-[550px] sm:w-[820px] sm:h-[820px] rounded-full blur-[100px] sm:blur-[150px] animate-bleed-drift-3 transition-all duration-1000",
                style: {
                    background: darkMode ? 'radial-gradient(circle at 45% 55%, rgba(168, 85, 247, 0.18) 0%, rgba(236, 72, 153, 0.14) 50%, transparent 72%)' : 'radial-gradient(circle at 45% 55%, rgba(216, 180, 254, 0.3) 0%, rgba(244, 182, 194, 0.24) 50%, transparent 72%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-[55%] -right-36 w-[560px] h-[560px] sm:w-[860px] sm:h-[860px] rounded-full blur-[100px] sm:blur-[150px] animate-bleed-drift-4 transition-all duration-1000",
                style: {
                    background: darkMode ? 'radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.17) 0%, rgba(255, 127, 107, 0.13) 48%, transparent 72%)' : 'radial-gradient(circle at 50% 50%, rgba(255, 127, 107, 0.28) 0%, rgba(253, 164, 175, 0.22) 48%, transparent 72%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-16 left-1/2 -translate-x-1/2 w-[650px] h-[550px] sm:w-[1000px] sm:h-[700px] rounded-full blur-[110px] sm:blur-[160px] animate-bleed-pulse transition-all duration-1000",
                style: {
                    background: darkMode ? 'radial-gradient(ellipse at center, rgba(244, 182, 194, 0.16) 0%, rgba(168, 85, 247, 0.13) 45%, transparent 72%)' : 'radial-gradient(ellipse at center, rgba(244, 182, 194, 0.34) 0%, rgba(255, 127, 107, 0.22) 45%, transparent 72%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            isPointerActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute rounded-full blur-[75px] sm:blur-[95px] transition-transform duration-75 pointer-events-none",
                style: {
                    width: '380px',
                    height: '380px',
                    left: `${mousePos.x - 190}px`,
                    top: `${mousePos.y - 190}px`,
                    background: darkMode ? 'radial-gradient(circle, rgba(244, 182, 194, 0.22) 0%, rgba(255, 127, 107, 0.15) 38%, transparent 68%)' : 'radial-gradient(circle, rgba(255, 127, 107, 0.28) 0%, rgba(251, 191, 36, 0.2) 40%, transparent 68%)'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "absolute inset-0 w-full h-full opacity-[0.032] dark:opacity-[0.022] mix-blend-overlay pointer-events-none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("filter", {
                        id: "bleedGrainFilter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feTurbulence", {
                                type: "fractalNoise",
                                baseFrequency: "0.8",
                                numOctaves: "3",
                                stitchTiles: "stitch"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("feColorMatrix", {
                                type: "saturate",
                                values: "0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ColorBleedBackground.tsx",
                        lineNumber: 138,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        width: "100%",
                        height: "100%",
                        filter: "url(#bleedGrainFilter)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ColorBleedBackground.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ColorBleedBackground.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ColorBleedBackground.tsx",
        lineNumber: 60,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ColorBleedBackground, "mjJMTCDurtu755F+BxguZRBVIQM=");
_c = ColorBleedBackground;
var _c;
__turbopack_context__.k.register(_c, "ColorBleedBackground");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PawBubbleLayer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PawBubbleLayer",
    ()=>PawBubbleLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$pawBubbles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/pawBubbles.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const PawBubbleLayer = ({ darkMode, inFooter = false, reducedOpacity = false })=>{
    _s();
    const [enabled, setEnabled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PawBubbleLayer.useState": ()=>{
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            try {
                const saved = localStorage.getItem('animora_paw_bubbles_enabled');
                if (saved !== null) {
                    return saved === 'true';
                }
                const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                return !prefersReduced;
            } catch  {
                return true;
            }
        }
    }["PawBubbleLayer.useState"]);
    const [prefersReducedMotion, setPrefersReducedMotion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "PawBubbleLayer.useState": ()=>{
            return ("TURBOPACK compile-time value", "object") !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    }["PawBubbleLayer.useState"]);
    const bubblesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animFrameRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const lastTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(performance.now());
    const mousePosRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: -999,
        y: -999
    });
    const isPointerInsideRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const lastScrollYRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const scrollOffsetRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const isFastScrollingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const scrollTimerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Sync toggle state from custom events (when user clicks footer toggle)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PawBubbleLayer.useEffect": ()=>{
            const handleToggle = {
                "PawBubbleLayer.useEffect.handleToggle": (e)=>{
                    setEnabled(e.detail.enabled);
                }
            }["PawBubbleLayer.useEffect.handleToggle"];
            window.addEventListener('animora_bubble_toggle', handleToggle);
            return ({
                "PawBubbleLayer.useEffect": ()=>{
                    window.removeEventListener('animora_bubble_toggle', handleToggle);
                }
            })["PawBubbleLayer.useEffect"];
        }
    }["PawBubbleLayer.useEffect"], []);
    // Listen to prefers-reduced-motion changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PawBubbleLayer.useEffect": ()=>{
            const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            const handleChange = {
                "PawBubbleLayer.useEffect.handleChange": (e)=>{
                    setPrefersReducedMotion(e.matches);
                }
            }["PawBubbleLayer.useEffect.handleChange"];
            mediaQuery.addEventListener('change', handleChange);
            return ({
                "PawBubbleLayer.useEffect": ()=>mediaQuery.removeEventListener('change', handleChange)
            })["PawBubbleLayer.useEffect"];
        }
    }["PawBubbleLayer.useEffect"], []);
    // Initialize bubbles
    const initBubbles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "PawBubbleLayer.useCallback[initBubbles]": ()=>{
            const width = window.innerWidth;
            const height = inFooter ? 600 : window.innerHeight;
            const count = inFooter ? 8 : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$pawBubbles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getBubbleCount"])(width, prefersReducedMotion);
            const seeds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$pawBubbles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateBubbleSeeds"])(count);
            bubblesRef.current = seeds.map({
                "PawBubbleLayer.useCallback[initBubbles]": (s)=>{
                    const speed = (height + 100) / s.riseDuration; // px/sec
                    return {
                        id: s.id,
                        pawStyle: s.pawStyle,
                        size: s.size,
                        x: s.initialXPercent / 100 * width,
                        y: s.initialYPercent / 100 * height,
                        speed,
                        swayDuration: s.swayDuration,
                        swayAmplitude: s.swayAmplitude,
                        swayPhase: Math.random() * Math.PI * 2,
                        rotDuration: 5 + Math.random() * 3,
                        rotAmplitude: s.rotationAmplitude,
                        rotPhase: Math.random() * Math.PI * 2,
                        colorType: s.colorType,
                        pushX: 0,
                        pushY: 0,
                        popping: false,
                        popProgress: 0,
                        respawnTimer: 0,
                        particles: []
                    };
                }
            }["PawBubbleLayer.useCallback[initBubbles]"]);
        }
    }["PawBubbleLayer.useCallback[initBubbles]"], [
        inFooter,
        prefersReducedMotion
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PawBubbleLayer.useEffect": ()=>{
            initBubbles();
            const handleResize = {
                "PawBubbleLayer.useEffect.handleResize": ()=>{
                    initBubbles();
                }
            }["PawBubbleLayer.useEffect.handleResize"];
            window.addEventListener('resize', handleResize);
            return ({
                "PawBubbleLayer.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["PawBubbleLayer.useEffect"];
        }
    }["PawBubbleLayer.useEffect"], [
        initBubbles
    ]);
    // Pointer move tracking for cursor avoidance
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PawBubbleLayer.useEffect": ()=>{
            const handlePointerMove = {
                "PawBubbleLayer.useEffect.handlePointerMove": (e)=>{
                    mousePosRef.current = {
                        x: e.clientX,
                        y: e.clientY
                    };
                    isPointerInsideRef.current = true;
                }
            }["PawBubbleLayer.useEffect.handlePointerMove"];
            const handlePointerLeave = {
                "PawBubbleLayer.useEffect.handlePointerLeave": ()=>{
                    isPointerInsideRef.current = false;
                    mousePosRef.current = {
                        x: -999,
                        y: -999
                    };
                }
            }["PawBubbleLayer.useEffect.handlePointerLeave"];
            window.addEventListener('pointermove', handlePointerMove, {
                passive: true
            });
            document.addEventListener('mouseleave', handlePointerLeave);
            return ({
                "PawBubbleLayer.useEffect": ()=>{
                    window.removeEventListener('pointermove', handlePointerMove);
                    document.removeEventListener('mouseleave', handlePointerLeave);
                }
            })["PawBubbleLayer.useEffect"];
        }
    }["PawBubbleLayer.useEffect"], []);
    // Click / tap detection for popping bubbles
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PawBubbleLayer.useEffect": ()=>{
            if (!enabled || prefersReducedMotion) return;
            const handlePointerDown = {
                "PawBubbleLayer.useEffect.handlePointerDown": (e)=>{
                    const clickX = e.clientX;
                    const clickY = e.clientY;
                    for(let i = 0; i < bubblesRef.current.length; i++){
                        const b = bubblesRef.current[i];
                        if (b.popping) continue;
                        // Check proximity
                        const bubbleScreenX = b.x + b.pushX;
                        const bubbleScreenY = b.y + b.pushY - scrollOffsetRef.current;
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$pawBubbles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isPointNearBubble"])(clickX, clickY, bubbleScreenX, bubbleScreenY, b.size / 2)) {
                            // Pop this bubble!
                            b.popping = true;
                            b.popProgress = 0;
                            const burstColor = inFooter ? '#FFF4E8' : darkMode ? b.colorType === 'coral' ? '#FF7F6B' : '#F4B6C2' : b.colorType === 'coral' ? '#FF7F6B' : '#F4B6C2';
                            b.particles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$pawBubbles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateBurstParticles"])(burstColor);
                            b.respawnTimer = 1200 + Math.random() * 800; // 1.2s - 2.0s
                            break; // pop one per click
                        }
                    }
                }
            }["PawBubbleLayer.useEffect.handlePointerDown"];
            window.addEventListener('pointerdown', handlePointerDown);
            return ({
                "PawBubbleLayer.useEffect": ()=>window.removeEventListener('pointerdown', handlePointerDown)
            })["PawBubbleLayer.useEffect"];
        }
    }["PawBubbleLayer.useEffect"], [
        enabled,
        prefersReducedMotion,
        darkMode,
        inFooter
    ]);
    // Scroll parallax & fast-scroll pausing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PawBubbleLayer.useEffect": ()=>{
            let ticking = false;
            const handleScroll = {
                "PawBubbleLayer.useEffect.handleScroll": ()=>{
                    const currentScrollY = window.scrollY;
                    const delta = currentScrollY - lastScrollYRef.current;
                    lastScrollYRef.current = currentScrollY;
                    // Parallax offset: 0.15x scroll speed
                    scrollOffsetRef.current += delta * 0.15;
                    // Soft clamp / decay
                    scrollOffsetRef.current *= 0.92;
                    // Detect fast scroll on mobile
                    if (Math.abs(delta) > 50) {
                        isFastScrollingRef.current = true;
                        if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
                        scrollTimerRef.current = window.setTimeout({
                            "PawBubbleLayer.useEffect.handleScroll": ()=>{
                                isFastScrollingRef.current = false;
                            }
                        }["PawBubbleLayer.useEffect.handleScroll"], 150);
                    }
                    ticking = false;
                }
            }["PawBubbleLayer.useEffect.handleScroll"];
            const onScroll = {
                "PawBubbleLayer.useEffect.onScroll": ()=>{
                    if (!ticking) {
                        window.requestAnimationFrame(handleScroll);
                        ticking = true;
                    }
                }
            }["PawBubbleLayer.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            return ({
                "PawBubbleLayer.useEffect": ()=>{
                    window.removeEventListener('scroll', onScroll);
                    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
                }
            })["PawBubbleLayer.useEffect"];
        }
    }["PawBubbleLayer.useEffect"], []);
    // Animation RAF loop
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PawBubbleLayer.useEffect": ()=>{
            if (!enabled || prefersReducedMotion) return;
            let isTabVisible = !document.hidden;
            const handleVisibilityChange = {
                "PawBubbleLayer.useEffect.handleVisibilityChange": ()=>{
                    isTabVisible = !document.hidden;
                    if (isTabVisible) {
                        lastTimeRef.current = performance.now();
                    }
                }
            }["PawBubbleLayer.useEffect.handleVisibilityChange"];
            document.addEventListener('visibilitychange', handleVisibilityChange);
            const updateLoop = {
                "PawBubbleLayer.useEffect.updateLoop": (now)=>{
                    const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1); // cap dt at 100ms
                    lastTimeRef.current = now;
                    if (isTabVisible && !isFastScrollingRef.current && containerRef.current) {
                        const height = inFooter ? 600 : window.innerHeight;
                        const width = window.innerWidth;
                        const bubbles = bubblesRef.current;
                        for(let i = 0; i < bubbles.length; i++){
                            const b = bubbles[i];
                            if (b.popping) {
                                // Advance pop progress (0.25s duration)
                                b.popProgress += dt / 0.25;
                                b.respawnTimer -= dt * 1000;
                                if (b.respawnTimer <= 0) {
                                    // Respawn bubble at bottom
                                    b.popping = false;
                                    b.popProgress = 0;
                                    b.particles = [];
                                    b.y = height + b.size + 20;
                                    b.x = Math.random() * (width - b.size * 2) + b.size;
                                    b.pushX = 0;
                                    b.pushY = 0;
                                }
                            } else {
                                // Rise upward
                                b.y -= b.speed * dt;
                                // Recycle if floats past top of screen
                                if (b.y < -b.size - 40) {
                                    b.y = height + b.size + 10;
                                    b.x = Math.random() * (width - b.size * 2) + b.size;
                                    b.pushX = 0;
                                    b.pushY = 0;
                                }
                                // Cursor push calculation (within 90px)
                                if (isPointerInsideRef.current) {
                                    const currentScreenX = b.x + b.pushX;
                                    const currentScreenY = b.y + b.pushY - scrollOffsetRef.current;
                                    const pushResult = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$pawBubbles$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCursorPush"])(currentScreenX, currentScreenY, mousePosRef.current.x, mousePosRef.current.y, 90);
                                    // Lerp push
                                    b.pushX += (pushResult.pushX - b.pushX) * 0.1;
                                    b.pushY += (pushResult.pushY - b.pushY) * 0.1;
                                } else {
                                    b.pushX *= 0.95;
                                    b.pushY *= 0.95;
                                }
                            }
                            // Update DOM element directly with translate3d for GPU performance
                            const domEl = containerRef.current.children[i];
                            if (domEl) {
                                if (b.popping) {
                                    const scale = 1 + b.popProgress * 0.3; // scale up to 1.3
                                    const opacity = Math.max(0, 1 - b.popProgress);
                                    const tx = b.x + b.pushX;
                                    const ty = b.y + b.pushY - scrollOffsetRef.current;
                                    domEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${scale})`;
                                    domEl.style.opacity = `${opacity}`;
                                } else {
                                    const sway = Math.sin(now / 1000 / b.swayDuration * Math.PI * 2 + b.swayPhase) * b.swayAmplitude;
                                    const rot = Math.sin(now / 1000 / b.rotDuration * Math.PI * 2 + b.rotPhase) * b.rotAmplitude;
                                    const breathing = 0.97 + Math.sin(now / 1000 * 1.8 + b.id) * 0.04; // 0.95 - 1.05
                                    const tx = b.x + b.pushX + sway;
                                    const ty = b.y + b.pushY - scrollOffsetRef.current;
                                    domEl.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg) scale(${breathing})`;
                                    domEl.style.opacity = '1';
                                }
                            }
                        }
                    }
                    animFrameRef.current = requestAnimationFrame(updateLoop);
                }
            }["PawBubbleLayer.useEffect.updateLoop"];
            animFrameRef.current = requestAnimationFrame(updateLoop);
            return ({
                "PawBubbleLayer.useEffect": ()=>{
                    document.removeEventListener('visibilitychange', handleVisibilityChange);
                    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
                }
            })["PawBubbleLayer.useEffect"];
        }
    }["PawBubbleLayer.useEffect"], [
        enabled,
        prefersReducedMotion,
        inFooter
    ]);
    if (!enabled) {
        return null;
    }
    // Reduced motion: 6 static paw bubbles
    if (prefersReducedMotion) {
        const staticPositions = [
            {
                x: '12%',
                y: '18%',
                size: 36,
                rot: -10
            },
            {
                x: '82%',
                y: '24%',
                size: 48,
                rot: 12
            },
            {
                x: '25%',
                y: '52%',
                size: 28,
                rot: 8
            },
            {
                x: '78%',
                y: '65%',
                size: 42,
                rot: -14
            },
            {
                x: '16%',
                y: '84%',
                size: 52,
                rot: 6
            },
            {
                x: '88%',
                y: '88%',
                size: 32,
                rot: -8
            }
        ];
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": "true",
            role: "presentation",
            className: inFooter ? 'absolute inset-0 pointer-events-none overflow-hidden z-10' : 'fixed inset-0 pointer-events-none overflow-hidden z-0',
            children: staticPositions.map((p, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute opacity-40 transition-opacity duration-300",
                    style: {
                        left: p.x,
                        top: p.y,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        transform: `rotate(${p.rot}deg)`
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PawBubbleSVG, {
                        size: p.size,
                        style: "cat",
                        colorType: "pink",
                        darkMode: darkMode,
                        inFooter: inFooter
                    }, void 0, false, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 396,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, idx, false, {
                    fileName: "[project]/src/components/PawBubbleLayer.tsx",
                    lineNumber: 385,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)))
        }, void 0, false, {
            fileName: "[project]/src/components/PawBubbleLayer.tsx",
            lineNumber: 375,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        "aria-hidden": "true",
        role: "presentation",
        className: inFooter ? 'absolute inset-0 pointer-events-none overflow-hidden z-[1] transition-opacity duration-300' : 'fixed inset-0 pointer-events-none overflow-hidden z-[1] transition-opacity duration-300',
        style: {
            width: inFooter ? '100%' : '100vw',
            height: inFooter ? '100%' : '100vh',
            opacity: reducedOpacity ? 0.45 : 0.85,
            ...reducedOpacity ? {
                // Keep bubbles strictly in left/right viewport margins, out of header, tabs, and cards
                clipPath: 'polygon(0% 0%, calc(50% - 620px) 0%, calc(50% - 620px) 100%, calc(50% + 620px) 100%, calc(50% + 620px) 0%, 100% 0%, 100% 100%, 0% 100%)'
            } : {}
        },
        children: bubblesRef.current.map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 left-0 will-change-transform",
                style: {
                    width: `${b.size}px`,
                    height: `${b.size}px`,
                    transform: `translate3d(${b.x}px, ${b.y}px, 0)`
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PawBubbleSVG, {
                        size: b.size,
                        style: b.pawStyle,
                        colorType: b.colorType,
                        darkMode: darkMode,
                        inFooter: inFooter
                    }, void 0, false, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 442,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    b.popping && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 pointer-events-none",
                        children: b.particles.map((p)=>{
                            const px = b.size / 2 + p.dx * b.popProgress * 2;
                            const py = b.size / 2 + p.dy * b.popProgress * 2;
                            const popOpacity = Math.max(0, 1 - b.popProgress);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute rounded-full",
                                style: {
                                    width: `${p.size}px`,
                                    height: `${p.size}px`,
                                    backgroundColor: p.color,
                                    left: `${px}px`,
                                    top: `${py}px`,
                                    opacity: popOpacity,
                                    transform: 'translate(-50%, -50%)'
                                }
                            }, p.id, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 458,
                                columnNumber: 19
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 452,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, b.id, true, {
                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                lineNumber: 433,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)))
    }, void 0, false, {
        fileName: "[project]/src/components/PawBubbleLayer.tsx",
        lineNumber: 410,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(PawBubbleLayer, "ojf9vmtgU1fw+TqzfKk+DDa6lDs=");
_c = PawBubbleLayer;
const PawBubbleSVG = ({ size, style, colorType, darkMode, inFooter = false })=>{
    // Gradient and colors
    // Light mode: pink #F4B6C2 and coral #FF7F6B, fill opacity 0.18-0.35, rim rgba(107,31,46,.18), highlight rgba(255,255,255,.7)
    // Dark mode: pink #F4B6C2 at opacity 0.12-0.22 and burgundy-tinted #4A1A27 / #5E2A38 fills, rim rgba(244,182,194,.25), highlight rgba(255,244,232,.25)
    // Footer: cream #FFF4E8 at opacity 0.15-0.25
    let pawFill = '#F4B6C2';
    let pawOpacity = 0.28;
    let rimColor = 'rgba(107, 31, 46, 0.18)';
    let highlightColor = 'rgba(255, 255, 255, 0.7)';
    let innerGlow = 'rgba(255, 255, 255, 0.15)';
    if (inFooter) {
        pawFill = '#FFF4E8';
        pawOpacity = 0.22;
        rimColor = 'rgba(255, 244, 232, 0.28)';
        highlightColor = 'rgba(255, 255, 255, 0.8)';
        innerGlow = 'rgba(255, 244, 232, 0.16)';
    } else if (darkMode) {
        rimColor = 'rgba(244, 182, 194, 0.25)';
        highlightColor = 'rgba(255, 244, 232, 0.25)';
        innerGlow = 'rgba(244, 182, 194, 0.08)';
        if (colorType === 'coral') {
            pawFill = '#FF7F6B';
            pawOpacity = 0.18;
        } else if (colorType === 'wine') {
            pawFill = '#4A1A27';
            pawOpacity = 0.22;
        } else {
            pawFill = '#F4B6C2';
            pawOpacity = 0.16;
        }
    } else {
        // Light mode
        rimColor = 'rgba(107, 31, 46, 0.18)';
        highlightColor = 'rgba(255, 255, 255, 0.7)';
        innerGlow = 'rgba(255, 255, 255, 0.25)';
        if (colorType === 'coral') {
            pawFill = '#FF7F6B';
            pawOpacity = 0.32;
        } else if (colorType === 'wine') {
            pawFill = '#6B1F2E';
            pawOpacity = 0.22;
        } else {
            pawFill = '#F4B6C2';
            pawOpacity = 0.30;
        }
    }
    const gradId = `bubble-grad-${size}-${colorType}-${inFooter ? 'f' : darkMode ? 'd' : 'l'}`;
    const hlGradId = `hl-grad-${size}-${inFooter ? 'f' : darkMode ? 'd' : 'l'}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 100 100",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: "w-full h-full block filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.04)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("radialGradient", {
                        id: gradId,
                        cx: "42%",
                        cy: "42%",
                        r: "58%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: innerGlow,
                                stopOpacity: "0.8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 561,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "65%",
                                stopColor: pawFill,
                                stopOpacity: pawOpacity * 0.4
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 562,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: pawFill,
                                stopOpacity: pawOpacity * 0.9
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 563,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 560,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: hlGradId,
                        x1: "0%",
                        y1: "0%",
                        x2: "100%",
                        y2: "100%",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "0%",
                                stopColor: highlightColor,
                                stopOpacity: "0.9"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 568,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "100%",
                                stopColor: highlightColor,
                                stopOpacity: "0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 569,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 567,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                lineNumber: 558,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "50",
                cy: "50",
                r: "48",
                fill: `url(#${gradId})`,
                stroke: rimColor,
                strokeWidth: "1.2"
            }, void 0, false, {
                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                lineNumber: 574,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "34",
                cy: "30",
                rx: "18",
                ry: "10",
                transform: "rotate(-30 34 30)",
                fill: `url(#${hlGradId})`
            }, void 0, false, {
                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                lineNumber: 584,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "24",
                cy: "22",
                r: "2.5",
                fill: highlightColor,
                opacity: "0.8"
            }, void 0, false, {
                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                lineNumber: 593,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                fill: pawFill,
                fillOpacity: pawOpacity,
                style: {
                    transformOrigin: '50px 50px'
                },
                children: [
                    style === 'dog' && // Dog Paw: wide heart-shaped pad, oval toe pads
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: "translate(0, 2)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M50 48 C41 48 34 54 35 64 C36 71 43 76 50 76 C57 76 64 71 65 64 C66 54 59 48 50 48 Z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 607,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                cx: "28",
                                cy: "46",
                                rx: "6.5",
                                ry: "8.5",
                                transform: "rotate(-25 28 46)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 609,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                cx: "42",
                                cy: "38",
                                rx: "6.8",
                                ry: "9.5",
                                transform: "rotate(-8 42 38)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 611,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                cx: "58",
                                cy: "38",
                                rx: "6.8",
                                ry: "9.5",
                                transform: "rotate(8 58 38)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 613,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                cx: "72",
                                cy: "46",
                                rx: "6.5",
                                ry: "8.5",
                                transform: "rotate(25 72 46)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 615,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 605,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    style === 'cat' && // Cat Paw: soft 3-lobed bottom pad, circular toe beads
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: "translate(0, 2)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M50 49 C42 49 36 53 35 60 C34 68 40 74 46 75 C48 75.3 50 74.2 50 74.2 C50 74.2 52 75.3 54 75 C60 74 66 68 65 60 C64 53 58 49 50 49 Z"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 623,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "28",
                                cy: "45",
                                r: "6.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 625,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "41",
                                cy: "37",
                                r: "7"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 627,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "59",
                                cy: "37",
                                r: "7"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 629,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "72",
                                cy: "45",
                                r: "6.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 631,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 621,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    style === 'round' && // Rounded Simple Paw: soft bean-shaped pad, 4 round beads
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        transform: "translate(0, 1)",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                cx: "50",
                                cy: "62",
                                rx: "14",
                                ry: "11"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 639,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "31",
                                cy: "46",
                                r: "6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 641,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "43",
                                cy: "38",
                                r: "6.8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 643,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "57",
                                cy: "38",
                                r: "6.8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 645,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                cx: "69",
                                cy: "46",
                                r: "6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                                lineNumber: 647,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PawBubbleLayer.tsx",
                        lineNumber: 637,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PawBubbleLayer.tsx",
                lineNumber: 596,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PawBubbleLayer.tsx",
        lineNumber: 550,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = PawBubbleSVG;
var _c, _c1;
__turbopack_context__.k.register(_c, "PawBubbleLayer");
__turbopack_context__.k.register(_c1, "PawBubbleSVG");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/config/cartConstants.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COUPON_DEFINITIONS",
    ()=>COUPON_DEFINITIONS,
    "FREE_SHIPPING_THRESHOLD",
    ()=>FREE_SHIPPING_THRESHOLD,
    "LOW_STOCK_THRESHOLD",
    ()=>LOW_STOCK_THRESHOLD,
    "STANDARD_SHIPPING_FEE",
    ()=>STANDARD_SHIPPING_FEE,
    "UNDO_TOAST_DURATION_MS",
    ()=>UNDO_TOAST_DURATION_MS
]);
const FREE_SHIPPING_THRESHOLD = 500000;
const STANDARD_SHIPPING_FEE = 30000;
const LOW_STOCK_THRESHOLD = 5;
const UNDO_TOAST_DURATION_MS = 5000;
const COUPON_DEFINITIONS = [
    {
        code: 'ANIMORA10',
        type: 'percent',
        value: 10,
        descriptionVi: 'Giảm 10% giá trị đơn hàng',
        descriptionEn: '10% off your order'
    },
    {
        code: 'GIAM10',
        type: 'percent',
        value: 10,
        descriptionVi: 'Giảm 10% giá trị đơn hàng',
        descriptionEn: '10% off your order'
    },
    {
        code: 'ANIMORA50K',
        type: 'fixed',
        value: 50000,
        minSubtotal: 200000,
        descriptionVi: 'Giảm 50.000đ cho đơn từ 200.000đ',
        descriptionEn: '50,000đ off orders from 200,000đ'
    },
    {
        code: 'GIAM50K',
        type: 'fixed',
        value: 50000,
        minSubtotal: 200000,
        descriptionVi: 'Giảm 50.000đ cho đơn từ 200.000đ',
        descriptionEn: '50,000đ off orders from 200,000đ'
    },
    {
        code: 'WELCOME20',
        type: 'percent',
        value: 20,
        maxDiscount: 100000,
        descriptionVi: 'Giảm 20% (tối đa 100.000đ)',
        descriptionEn: '20% off (up to 100,000đ)'
    },
    {
        code: 'PETLOVE30K',
        type: 'fixed',
        value: 30000,
        descriptionVi: 'Giảm 30.000đ cho mọi đơn hàng',
        descriptionEn: '30,000đ off any order'
    },
    {
        code: 'EXPIRED2025',
        type: 'percent',
        value: 15,
        expired: true,
        descriptionVi: 'Mã đã hết hạn',
        descriptionEn: 'Expired coupon'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cartLogic.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const AuthProvider = ({ children })=>{
    _s();
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AuthProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeGetStorage"])('animora_current_user', null)
    }["AuthProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            if (currentUser) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeSetStorage"])('animora_current_user', currentUser);
            } else {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeRemoveStorage"])('animora_current_user');
            }
        }
    }["AuthProvider.useEffect"], [
        currentUser
    ]);
    const logout = ()=>setCurrentUser(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            currentUser,
            setCurrentUser,
            isLoggedIn: Boolean(currentUser),
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AuthProvider, "hknbHUMxOoP0pvL0PmJppomuvf4=");
_c = AuthProvider;
const useAuth = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/CartContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cartLogic.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const CartProvider = ({ children })=>{
    _s();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "CartProvider.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeGetStorage"])('animora_cart', [])
    }["CartProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["safeSetStorage"])('animora_cart', cart);
        }
    }["CartProvider.useEffect"], [
        cart
    ]);
    const addToCart = (product, quantity = 1, selectedSpec)=>{
        setCart((prev)=>{
            const existing = prev.find((item)=>item.productId === product.id && item.selectedSpec === selectedSpec);
            if (existing) {
                return prev.map((item)=>item.productId === product.id && item.selectedSpec === selectedSpec ? {
                        ...item,
                        quantity: item.quantity + quantity
                    } : item);
            }
            return [
                ...prev,
                {
                    productId: product.id,
                    product,
                    quantity,
                    selectedSpec,
                    unitPriceAtAdd: product.price
                }
            ];
        });
    };
    const clearCart = ()=>setCart([]);
    const totalCount = cart.reduce((sum, item)=>sum + item.quantity, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            setCart,
            addToCart,
            clearCart,
            totalCount
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/CartContext.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartProvider, "T9qv78ANFKarIJId7VRXafYw3SA=");
_c = CartProvider;
const useCart = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/LanguageContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguage",
    ()=>useLanguage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/index.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const LanguageProvider = ({ children })=>{
    _s();
    const [lang, setLangState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "LanguageProvider.useState": ()=>{
            try {
                const saved = localStorage.getItem('animora_lang');
                return saved === 'en' ? 'en' : 'vi';
            } catch  {
                return 'vi';
            }
        }
    }["LanguageProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].changeLanguage(lang);
            try {
                localStorage.setItem('animora_lang', lang);
            } catch  {
            // ignore
            }
        }
    }["LanguageProvider.useEffect"], [
        lang
    ]);
    const toggleLanguage = ()=>setLangState((prev)=>prev === 'vi' ? 'en' : 'vi');
    const setLanguage = (newLang)=>setLangState(newLang);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            lang,
            toggleLanguage,
            setLanguage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/LanguageContext.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LanguageProvider, "ok1bswdaZQBrIaaR6jcEF9GuJ4U=");
_c = LanguageProvider;
const useLanguage = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
_s1(useLanguage, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const ThemeProvider = ({ children })=>{
    _s();
    const [darkMode, setDarkModeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ThemeProvider.useState": ()=>{
            try {
                const saved = localStorage.getItem('animora_theme');
                if (saved !== null) {
                    return saved === 'dark';
                }
            } catch  {
            // ignore
            }
            return ("TURBOPACK compile-time value", "object") !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }["ThemeProvider.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeProvider.useEffect": ()=>{
            const root = document.documentElement;
            const theme = darkMode ? 'dark' : 'light';
            root.setAttribute('data-theme', theme);
            if (darkMode) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            try {
                localStorage.setItem('animora_theme', theme);
            } catch  {
            // ignore
            }
        }
    }["ThemeProvider.useEffect"], [
        darkMode
    ]);
    const toggleDarkMode = ()=>setDarkModeState((prev)=>!prev);
    const setDarkMode = (val)=>setDarkModeState(val);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            darkMode,
            toggleDarkMode,
            setDarkMode
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/ThemeContext.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThemeProvider, "imy44a2n2HVVl6a3BOW6+iiLoio=");
_c = ThemeProvider;
const useTheme = ()=>{
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
_s1(useTheme, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/en.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "nav": {
        "home": "Home",
        "about": "About Us",
        "services": "Services",
        "adoption": "Adoption",
        "shop": "Shop",
        "petProfiles": "Pet Profiles",
        "myBookings": "My Bookings",
        "myCart": "Cart",
        "login": "Log In",
        "register": "Register"
    },
    "common": {
        "bookNow": "Book Now",
        "continue": "Continue",
        "back": "Back",
        "cancel": "Cancel",
        "save": "Save",
        "delete": "Delete",
        "search": "Search...",
        "loading": "Loading...",
        "notFound": "Page Not Found"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/index.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/i18next/dist/esm/i18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-i18next/dist/es/initReactI18next.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$vi$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/vi.json.[json].cjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$en$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/en.json.[json].cjs [app-client] (ecmascript)");
;
;
;
;
const savedLang = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('animora_lang') || 'vi' : "TURBOPACK unreachable";
__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].use(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$i18next$2f$dist$2f$es$2f$initReactI18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initReactI18next"]).init({
    resources: {
        vi: {
            translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$vi$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        },
        en: {
            translation: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$en$2e$json$2e5b$json$5d2e$cjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
        }
    },
    lng: savedLang,
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false
    }
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$i18next$2f$dist$2f$esm$2f$i18next$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/i18n/vi.json.[json].cjs [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = {
    "nav": {
        "home": "Trang chủ",
        "about": "Về chúng tôi",
        "services": "Dịch vụ",
        "adoption": "Nhận nuôi",
        "shop": "Cửa hàng",
        "petProfiles": "Hồ sơ thú cưng",
        "myBookings": "Lịch hẹn của tôi",
        "myCart": "Giỏ hàng",
        "login": "Đăng nhập",
        "register": "Đăng ký"
    },
    "common": {
        "bookNow": "Đặt lịch ngay",
        "continue": "Tiếp tục",
        "back": "Quay lại",
        "cancel": "Hủy",
        "save": "Lưu",
        "delete": "Xóa",
        "search": "Tìm kiếm...",
        "loading": "Đang tải...",
        "notFound": "Không tìm thấy trang"
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/providers.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppProviders",
    ()=>AppProviders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/ThemeContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/LanguageContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/CartContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
;
;
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false
        }
    }
});
const AppProviders = ({ children })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$ThemeContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$LanguageContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LanguageProvider"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$contexts$2f$CartContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartProvider"], {
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/providers.tsx",
                        lineNumber: 25,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/providers.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/providers.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/providers.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/providers.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = AppProviders;
var _c;
__turbopack_context__.k.register(_c, "AppProviders");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/cartLogic.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "acceptCartItemPriceChange",
    ()=>acceptCartItemPriceChange,
    "calculateCartSummary",
    ()=>calculateCartSummary,
    "changeCartItemSpec",
    ()=>changeCartItemSpec,
    "clampQuantity",
    ()=>clampQuantity,
    "formatVnd",
    ()=>formatVnd,
    "getCartItemKey",
    ()=>getCartItemKey,
    "mergeGuestCartIntoUserCart",
    ()=>mergeGuestCartIntoUserCart,
    "resolveProductSpecDetails",
    ()=>resolveProductSpecDetails,
    "safeGetStorage",
    ()=>safeGetStorage,
    "safeRemoveStorage",
    ()=>safeRemoveStorage,
    "safeSetStorage",
    ()=>safeSetStorage,
    "validateCartForCheckout",
    ()=>validateCartForCheckout,
    "validateCartItem",
    ()=>validateCartItem,
    "validateCouponCode",
    ()=>validateCouponCode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/cartConstants.ts [app-client] (ecmascript)");
;
function formatVnd(price) {
    const safe = Number.isFinite(price) ? Math.max(0, Math.round(price)) : 0;
    return `${safe.toLocaleString('vi-VN')}đ`;
}
function getCartItemKey(productId, selectedSpec) {
    return `${productId}::${(selectedSpec || '').trim()}`;
}
function resolveProductSpecDetails(product, selectedSpec, lang = 'vi') {
    const options = product.specOptions || [];
    const defaultVi = product.spec || 'Tiêu chuẩn';
    const defaultEn = product.specEn || product.spec || 'Standard';
    const trimmedSpec = (selectedSpec || '').trim();
    const matchedOption = options.find((opt)=>opt.labelVi === trimmedSpec || opt.labelEn === trimmedSpec);
    const specLabelVi = matchedOption ? matchedOption.labelVi : trimmedSpec || defaultVi;
    const specLabelEn = matchedOption ? matchedOption.labelEn : trimmedSpec || defaultEn;
    const displaySpec = lang === 'en' ? specLabelEn : specLabelVi;
    const unitPrice = matchedOption ? matchedOption.price : product.price;
    const oldPrice = matchedOption ? matchedOption.oldPrice : product.oldPrice;
    const stock = product.badges?.includes('out_of_stock') || product.stock === 0 ? 0 : product.stock ?? 25;
    return {
        specLabelVi,
        specLabelEn,
        displaySpec,
        unitPrice,
        oldPrice,
        stock,
        specOptions: options
    };
}
function clampQuantity(quantity, maxStock = 25) {
    const safeMax = Math.max(1, Math.floor(maxStock));
    const safeQty = Number.isFinite(quantity) ? Math.floor(quantity) : 1;
    return Math.min(safeMax, Math.max(1, safeQty));
}
function validateCouponCode(rawCode, subtotal, lang = 'vi') {
    const normalizedCode = (rawCode || '').trim().toUpperCase();
    if (!normalizedCode) {
        return {
            valid: false,
            normalizedCode: '',
            discountAmount: 0,
            errorMessage: lang === 'vi' ? 'Mã không hợp lệ hoặc đã hết hạn' : 'Invalid or expired coupon code'
        };
    }
    const found = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COUPON_DEFINITIONS"].find((c)=>c.code === normalizedCode);
    if (!found || found.expired) {
        return {
            valid: false,
            normalizedCode,
            discountAmount: 0,
            errorMessage: lang === 'vi' ? 'Mã không hợp lệ hoặc đã hết hạn' : 'Invalid or expired coupon code'
        };
    }
    if (found.minSubtotal && subtotal < found.minSubtotal) {
        return {
            valid: false,
            normalizedCode,
            discountAmount: 0,
            errorMessage: lang === 'vi' ? `Mã không hợp lệ hoặc đã hết hạn (Đơn tối thiểu ${formatVnd(found.minSubtotal)})` : `Invalid or expired coupon code (Minimum order ${formatVnd(found.minSubtotal)})`
        };
    }
    let discountAmount = 0;
    if (found.type === 'percent') {
        discountAmount = Math.round(subtotal * found.value / 100);
        if (found.maxDiscount) {
            discountAmount = Math.min(discountAmount, found.maxDiscount);
        }
    } else {
        discountAmount = found.value;
    }
    discountAmount = Math.min(subtotal, Math.max(0, discountAmount));
    return {
        valid: true,
        normalizedCode,
        discountAmount,
        descriptionVi: found.descriptionVi,
        descriptionEn: found.descriptionEn
    };
}
function validateCartItem(item, catalogProducts) {
    const catalogProd = catalogProducts.find((p)=>p.id === item.productId) || item.product;
    const resolved = resolveProductSpecDetails(catalogProd, item.selectedSpec, 'vi');
    const isOutOfStock = resolved.stock <= 0 || item.product.stock === 0 || Boolean(item.product.badges?.includes('out_of_stock'));
    const stock = isOutOfStock ? 0 : resolved.stock;
    const isLowStock = stock > 0 && stock <= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LOW_STOCK_THRESHOLD"];
    const oldRecordedPrice = item.unitPriceAtAdd ?? item.product.price;
    const newCatalogPrice = resolved.unitPrice;
    const hasPriceChanged = oldRecordedPrice !== newCatalogPrice;
    const exceedsStock = !isOutOfStock && item.quantity > stock;
    return {
        key: getCartItemKey(item.productId, item.selectedSpec),
        productId: item.productId,
        isOutOfStock,
        isLowStock,
        stock,
        hasPriceChanged,
        oldRecordedPrice,
        newCatalogPrice,
        exceedsStock
    };
}
function validateCartForCheckout(items, catalogProducts) {
    if (!items || items.length === 0) {
        return {
            isValid: false,
            isEmpty: true,
            hasOutOfStock: false,
            hasPriceChanged: false,
            hasStockExceeded: false,
            blockingMessageVi: 'Giỏ hàng đang trống',
            blockingMessageEn: 'Your cart is empty',
            itemValidations: {}
        };
    }
    const itemValidations = {};
    let hasOutOfStock = false;
    let hasPriceChanged = false;
    let hasStockExceeded = false;
    for (const item of items){
        const v = validateCartItem(item, catalogProducts);
        itemValidations[v.key] = v;
        if (v.isOutOfStock) hasOutOfStock = true;
        if (v.hasPriceChanged) hasPriceChanged = true;
        if (v.exceedsStock) hasStockExceeded = true;
    }
    const isValid = !hasOutOfStock && !hasPriceChanged && !hasStockExceeded;
    let blockingMessageVi;
    let blockingMessageEn;
    if (hasOutOfStock) {
        blockingMessageVi = 'Trong giỏ có sản phẩm đã hết hàng. Vui lòng xóa hoặc lưu mua sau trước khi thanh toán.';
        blockingMessageEn = 'Your cart contains out-of-stock items. Please remove or save them for later before checkout.';
    } else if (hasPriceChanged) {
        blockingMessageVi = 'Có sản phẩm thay đổi giá. Vui lòng chấp nhận giá mới hoặc xóa sản phẩm trước khi thanh toán.';
        blockingMessageEn = 'Item prices have changed. Please accept the updated price or remove the item before checkout.';
    } else if (hasStockExceeded) {
        blockingMessageVi = 'Số lượng một số sản phẩm vượt quá tồn kho hiện tại. Vui lòng điều chỉnh lại số lượng.';
        blockingMessageEn = 'Some item quantities exceed available stock. Please adjust your quantities.';
    }
    return {
        isValid,
        isEmpty: false,
        hasOutOfStock,
        hasPriceChanged,
        hasStockExceeded,
        blockingMessageVi,
        blockingMessageEn,
        itemValidations
    };
}
function calculateCartSummary(items, couponCode = '', catalogProducts = []) {
    let subtotal = 0;
    let totalQuantity = 0;
    for (const item of items){
        const unitPrice = item.unitPriceAtAdd ?? item.product.price;
        const qty = Math.max(1, item.quantity);
        subtotal += unitPrice * qty;
        totalQuantity += qty;
    }
    const isFreeShipping = subtotal >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FREE_SHIPPING_THRESHOLD"];
    const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_SHIPPING_FEE"];
    const remainingForFreeShip = Math.max(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FREE_SHIPPING_THRESHOLD"] - subtotal);
    const freeShipProgressPercent = subtotal <= 0 ? 0 : Math.min(100, Math.round(subtotal / __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FREE_SHIPPING_THRESHOLD"] * 100));
    let discountAmount = 0;
    let appliedCouponCode = '';
    if (couponCode && items.length > 0) {
        const couponRes = validateCouponCode(couponCode, subtotal, 'vi');
        if (couponRes.valid) {
            discountAmount = couponRes.discountAmount;
            appliedCouponCode = couponRes.normalizedCode;
        }
    }
    const total = items.length === 0 ? 0 : Math.max(0, subtotal - discountAmount + shippingFee);
    // Reference catalogProducts to avoid unused param warning when provided
    void catalogProducts;
    return {
        subtotal,
        shippingFee,
        remainingForFreeShip,
        freeShipProgressPercent,
        isFreeShipping,
        discountAmount,
        appliedCouponCode,
        total,
        totalQuantity
    };
}
function mergeGuestCartIntoUserCart(userCart, guestCart, catalogProducts = []) {
    const mergedMap = new Map();
    const normalizeItemSpec = (item)=>{
        const catalogProd = catalogProducts.find((p)=>p.id === item.productId) || item.product;
        const resolved = resolveProductSpecDetails(catalogProd, item.selectedSpec, 'vi');
        return resolved.specLabelVi;
    };
    for (const item of userCart){
        const specVi = normalizeItemSpec(item);
        const key = getCartItemKey(item.productId, specVi);
        const catalogProd = catalogProducts.find((p)=>p.id === item.productId) || item.product;
        const resolved = resolveProductSpecDetails(catalogProd, specVi, 'vi');
        const maxStock = resolved.stock > 0 ? resolved.stock : item.quantity;
        mergedMap.set(key, {
            ...item,
            selectedSpec: specVi,
            quantity: clampQuantity(item.quantity, maxStock),
            unitPriceAtAdd: item.unitPriceAtAdd ?? item.product.price
        });
    }
    for (const gItem of guestCart){
        const specVi = normalizeItemSpec(gItem);
        const key = getCartItemKey(gItem.productId, specVi);
        const catalogProd = catalogProducts.find((p)=>p.id === gItem.productId) || gItem.product;
        const resolved = resolveProductSpecDetails(catalogProd, specVi, 'vi');
        const maxStock = resolved.stock > 0 ? resolved.stock : gItem.quantity;
        const existing = mergedMap.get(key);
        if (existing) {
            mergedMap.set(key, {
                ...existing,
                quantity: clampQuantity(existing.quantity + gItem.quantity, maxStock)
            });
        } else {
            mergedMap.set(key, {
                ...gItem,
                selectedSpec: specVi,
                quantity: clampQuantity(gItem.quantity, maxStock),
                unitPriceAtAdd: gItem.unitPriceAtAdd ?? gItem.product.price
            });
        }
    }
    return Array.from(mergedMap.values());
}
function changeCartItemSpec(items, targetKey, newSpecLabelVi, catalogProducts) {
    const targetItem = items.find((i)=>getCartItemKey(i.productId, i.selectedSpec) === targetKey);
    if (!targetItem) return items;
    const catalogProd = catalogProducts.find((p)=>p.id === targetItem.productId) || targetItem.product;
    const resolved = resolveProductSpecDetails(catalogProd, newSpecLabelVi, 'vi');
    const newKey = getCartItemKey(targetItem.productId, resolved.specLabelVi);
    if (newKey === targetKey) return items;
    const updatedProduct = {
        ...targetItem.product,
        price: resolved.unitPrice,
        oldPrice: resolved.oldPrice,
        spec: resolved.specLabelVi,
        specEn: resolved.specLabelEn
    };
    const existingDuplicate = items.find((i)=>getCartItemKey(i.productId, i.selectedSpec) === newKey);
    if (existingDuplicate) {
        return items.filter((i)=>getCartItemKey(i.productId, i.selectedSpec) !== targetKey).map((i)=>{
            if (getCartItemKey(i.productId, i.selectedSpec) === newKey) {
                return {
                    ...i,
                    product: updatedProduct,
                    selectedSpec: resolved.specLabelVi,
                    unitPriceAtAdd: resolved.unitPrice,
                    quantity: clampQuantity(i.quantity + targetItem.quantity, resolved.stock > 0 ? resolved.stock : 25)
                };
            }
            return i;
        });
    }
    return items.map((i)=>{
        if (getCartItemKey(i.productId, i.selectedSpec) === targetKey) {
            return {
                ...i,
                product: updatedProduct,
                selectedSpec: resolved.specLabelVi,
                unitPriceAtAdd: resolved.unitPrice
            };
        }
        return i;
    });
}
function acceptCartItemPriceChange(items, targetKey, catalogProducts) {
    return items.map((item)=>{
        const key = getCartItemKey(item.productId, item.selectedSpec);
        if (key !== targetKey) return item;
        const catalogProd = catalogProducts.find((p)=>p.id === item.productId) || item.product;
        const resolved = resolveProductSpecDetails(catalogProd, item.selectedSpec, 'vi');
        return {
            ...item,
            product: {
                ...item.product,
                price: resolved.unitPrice,
                oldPrice: resolved.oldPrice
            },
            unitPriceAtAdd: resolved.unitPrice
        };
    });
}
function safeGetStorage(key, fallback) {
    try {
        if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.localStorage) return fallback;
        const raw = window.localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch  {
        return fallback;
    }
}
function safeSetStorage(key, value) {
    try {
        if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.localStorage) return;
        window.localStorage.setItem(key, JSON.stringify(value));
    } catch  {
    // ignore quota or privacy mode errors
    }
}
function safeRemoveStorage(key) {
    try {
        if (("TURBOPACK compile-time value", "object") === 'undefined' || !window.localStorage) return;
        window.localStorage.removeItem(key);
    } catch  {
    // ignore errors
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/pawBubbles.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateCursorPush",
    ()=>calculateCursorPush,
    "generateBubbleSeeds",
    ()=>generateBubbleSeeds,
    "generateBurstParticles",
    ()=>generateBurstParticles,
    "getBubbleCount",
    ()=>getBubbleCount,
    "isPointNearBubble",
    ()=>isPointNearBubble
]);
function getBubbleCount(width, prefersReducedMotion) {
    if (prefersReducedMotion) {
        return 6;
    }
    if (width > 1024) {
        return 18;
    }
    if (width >= 640) {
        return 12;
    }
    return 8;
}
function generateBubbleSeeds(count, randomFn = Math.random) {
    const configs = [];
    const pawStyles = [
        'dog',
        'cat',
        'round'
    ];
    const colorTypes = [
        'pink',
        'coral',
        'wine'
    ];
    for(let i = 0; i < count; i++){
        // 60% small, 30% medium, 10% large
        const categoryRoll = randomFn();
        let sizeCategory = 'small';
        let size = 24;
        let riseDuration = 16;
        if (categoryRoll < 0.6) {
            sizeCategory = 'small';
            size = Math.round(18 + randomFn() * 18); // 18 - 36px
            riseDuration = 14 + (size - 18) * 0.28 + randomFn() * 2; // ~14-19s
        } else if (categoryRoll < 0.9) {
            sizeCategory = 'medium';
            size = Math.round(37 + randomFn() * 17); // 37 - 54px
            riseDuration = 19 + (size - 37) * 0.28 + randomFn() * 2; // ~19-24s
        } else {
            sizeCategory = 'large';
            size = Math.round(55 + randomFn() * 17); // 55 - 72px
            riseDuration = 24 + (size - 55) * 0.24 + randomFn() * 2; // ~24-28s
        }
        const pawStyle = pawStyles[i % pawStyles.length];
        const colorType = colorTypes[i % colorTypes.length];
        const initialXPercent = Math.min(96, Math.max(4, i * (100 / count) + (randomFn() * 8 - 4)));
        const initialYPercent = randomFn() * 100; // evenly spread out vertically initially
        const swayDuration = 4.2 + randomFn() * 2.8; // 4.2s - 7s
        const swayAmplitude = 18 + randomFn() * 8; // 18px - 26px (~±24px)
        const rotationAmplitude = 12 + randomFn() * 8; // 12° - 20° (~±18°)
        configs.push({
            id: i,
            pawStyle,
            sizeCategory,
            size,
            initialXPercent,
            initialYPercent,
            riseDuration,
            swayDuration,
            swayAmplitude,
            rotationAmplitude,
            colorType,
            highlightOffset: {
                x: -0.22,
                y: -0.22
            }
        });
    }
    return configs;
}
function calculateCursorPush(bubbleX, bubbleY, mouseX, mouseY, maxDistance = 90) {
    const dx = bubbleX - mouseX;
    const dy = bubbleY - mouseY;
    const distance = Math.hypot(dx, dy);
    if (distance < 0.001 || distance >= maxDistance) {
        return {
            pushX: 0,
            pushY: 0,
            distance
        };
    }
    // Force decreases with distance (1 at center, 0 at maxDistance)
    const factor = 1 - distance / maxDistance;
    const maxPush = 35; // max pixel push
    const pushAmount = factor * maxPush;
    const nx = dx / distance;
    const ny = dy / distance;
    return {
        pushX: nx * pushAmount,
        pushY: ny * pushAmount,
        distance
    };
}
function isPointNearBubble(clickX, clickY, bubbleX, bubbleY, radius) {
    const tolerance = Math.max(radius * 1.25, 28); // easier to tap on mobile
    return Math.hypot(clickX - bubbleX, clickY - bubbleY) <= tolerance;
}
function generateBurstParticles(color) {
    return [
        {
            id: 1,
            dx: -18,
            dy: -14,
            size: 4,
            color
        },
        {
            id: 2,
            dx: 16,
            dy: -12,
            size: 3.5,
            color
        },
        {
            id: 3,
            dx: 0,
            dy: 16,
            size: 3,
            color
        }
    ];
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0320tqbqjicy5._.js.map