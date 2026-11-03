(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/pages/ShopPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProductCard",
    ()=>ProductCard,
    "ShopPage",
    ()=>ShopPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dog$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dog.js [app-client] (ecmascript) <export default as Dog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cat$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cat.js [app-client] (ecmascript) <export default as Cat>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rabbit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rabbit$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rabbit.js [app-client] (ecmascript) <export default as Rabbit>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bird$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bird$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bird.js [app-client] (ecmascript) <export default as Bird>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fish$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Fish$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/fish.js [app-client] (ecmascript) <export default as Fish>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paw$2d$print$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PawPrint$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paw-print.js [app-client] (ecmascript) <export default as PawPrint>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/shopData.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/contact.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
function getShopSlugFromPath(pathname) {
    const m = pathname.match(/^\/cua-hang\/([^/?#]+)/);
    return m ? decodeURIComponent(m[1]) : null;
}
const PawPlaceholderSVG = ({ className = 'w-12 h-12' })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        viewBox: "0 0 64 64",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                cx: "32",
                cy: "41",
                rx: "11",
                ry: "9",
                fill: "currentColor",
                fillOpacity: "0.28"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 70,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "19",
                cy: "27",
                r: "4.8",
                fill: "currentColor",
                fillOpacity: "0.28"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 71,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "27.5",
                cy: "21.5",
                r: "5",
                fill: "currentColor",
                fillOpacity: "0.28"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 72,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "36.5",
                cy: "21.5",
                r: "5",
                fill: "currentColor",
                fillOpacity: "0.28"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 73,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "45",
                cy: "27",
                r: "4.8",
                fill: "currentColor",
                fillOpacity: "0.28"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 74,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pages/ShopPage.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = PawPlaceholderSVG;
/**
 * Returns at most ONE top-left image badge per Section 1:
 * - Priority: "Hết hàng" (Out of stock) > "Giảm {x}%" (Discount) > "Mới" (New) > "Bán chạy" (Best seller).
 * - Show the discount percentage ONLY ONCE: keep the small "-20%" pill next to the price,
 *   and make the image badge show only for products that have no discount (New / Best seller). Do not show both.
 */ function getSingleImageBadge(product, lang, isOutOfStock, discountPercent) {
    if (isOutOfStock) {
        return {
            label: lang === 'vi' ? 'Hết hàng' : 'Out of stock',
            bg: '#6B7280',
            color: '#FFFFFF'
        };
    }
    // Discount is shown once next to the price, so no image badge when discounted
    if (discountPercent > 0) {
        return null;
    }
    if (product.badges?.includes('new')) {
        return {
            label: lang === 'vi' ? 'Mới' : 'New',
            bg: '#6B1F2E',
            color: '#FFF4E8'
        };
    }
    if (product.badges?.includes('bestseller')) {
        return {
            label: lang === 'vi' ? 'Bán chạy' : 'Best seller',
            bg: '#F4B6C2',
            color: '#3A0F1B'
        };
    }
    return null;
}
const ProductCard = ({ product, lang, isAdded, isWishlisted, onToggleWishlist, onAddToCartClick, onBuyNowClick, onOpenProductDetail })=>{
    _s();
    const [imgLoaded, setImgLoaded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [imgError, setImgError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const slug = product.slug || product.id;
    const displayName = lang === 'en' && product.nameEn ? product.nameEn : product.name;
    const displaySpec = lang === 'en' && product.specEn ? product.specEn : product.spec || (lang === 'vi' ? 'Tiêu chuẩn' : 'Standard');
    const isOutOfStock = product.stock === 0 || Boolean(product.badges?.includes('out_of_stock'));
    const discountPercent = product.discountPercent || (product.oldPrice && product.oldPrice > product.price ? Math.round((product.oldPrice - product.price) / product.oldPrice * 100) : 0);
    const reviewCount = product.reviewCount ?? 0;
    const singleBadge = getSingleImageBadge(product, lang, isOutOfStock, discountPercent);
    const handleCardClick = (e)=>{
        e.preventDefault();
        onOpenProductDetail(slug);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        "data-testid": `shop-product-card-${product.id}`,
        className: `group relative flex flex-col h-full rounded-[20px] border p-3 sm:p-4 transition-all duration-300 ${isOutOfStock ? '' : 'hover:-translate-y-1 hover:shadow-xl'}`,
        style: {
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)',
            boxShadow: 'var(--shadow)'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shop-product-img-frame mb-3",
                children: [
                    (!imgLoaded || imgError) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 flex items-center justify-center",
                        style: {
                            backgroundColor: 'var(--surface-2)',
                            color: 'var(--primary)'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PawPlaceholderSVG, {
                            className: "w-14 h-14"
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 179,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `/cua-hang/${slug}`,
                        onClick: handleCardClick,
                        "aria-label": displayName,
                        className: "w-full h-full flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-xl cursor-pointer",
                        children: !imgError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: product.image,
                            alt: displayName,
                            loading: "lazy",
                            onLoad: ()=>setImgLoaded(true),
                            onError: ()=>setImgError(true),
                            className: `w-full h-full object-contain transition-transform duration-300 ${isOutOfStock ? 'opacity-60' : 'group-hover:scale-[1.04]'} ${imgLoaded ? '' : 'opacity-0'}`,
                            referrerPolicy: "no-referrer"
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    singleBadge && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "data-testid": `product-badge-${product.id}`,
                        className: "absolute top-2.5 left-2.5 z-10 inline-flex items-center justify-center pointer-events-none shadow-xs",
                        style: {
                            height: '24px',
                            padding: '0 10px',
                            borderRadius: '999px',
                            fontFamily: 'var(--font-body)',
                            fontSize: '13px',
                            fontWeight: 700,
                            lineHeight: 1,
                            backgroundColor: singleBadge.bg,
                            color: singleBadge.color
                        },
                        children: singleBadge.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 212,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: (e)=>{
                            e.stopPropagation();
                            onToggleWishlist(product.id);
                        },
                        "aria-label": lang === 'vi' ? isWishlisted ? `Bỏ yêu thích ${displayName}` : `Yêu thích ${displayName}` : isWishlisted ? `Remove ${displayName} from wishlist` : `Add ${displayName} to wishlist`,
                        "aria-pressed": isWishlisted,
                        className: "absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] shadow-xs cursor-pointer",
                        style: {
                            backgroundColor: 'rgba(255, 255, 255, 0.86)',
                            border: '1px solid rgba(90, 30, 45, 0.12)',
                            color: isWishlisted ? '#FF7F6B' : '#5A1E2D'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: `w-4 h-4 transition-colors ${isWishlisted ? 'fill-[#FF7F6B] text-[#FF7F6B]' : ''}`
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 232,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: `/cua-hang/${slug}`,
                onClick: handleCardClick,
                className: "block focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-lg cursor-pointer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "font-heading text-[15px] sm:text-[17px] font-semibold leading-[1.3] line-clamp-2 transition-colors group-hover:opacity-85",
                    style: {
                        color: 'var(--text)',
                        minHeight: '2.6em'
                    },
                    children: displayName
                }, void 0, false, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 269,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-[13px] sm:text-[14px] font-medium mt-1 truncate",
                style: {
                    color: 'var(--text-muted)'
                },
                children: displaySpec
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-auto pt-2.5 flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center gap-1.5 min-h-[26px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[18px] sm:text-[20px] font-extrabold leading-none",
                                style: {
                                    color: 'var(--primary)'
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVndPrice"])(product.price)
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 292,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            !isOutOfStock && product.oldPrice && product.oldPrice > product.price && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs sm:text-[14px] line-through font-medium",
                                        style: {
                                            color: 'var(--text-muted)'
                                        },
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVndPrice"])(product.oldPrice)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    discountPercent > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex items-center justify-center",
                                        style: {
                                            height: '22px',
                                            padding: '0 8px',
                                            borderRadius: '999px',
                                            fontSize: '12px',
                                            fontWeight: 700,
                                            lineHeight: 1,
                                            backgroundColor: '#FF7F6B',
                                            color: '#FFFFFF'
                                        },
                                        children: [
                                            "-",
                                            discountPercent,
                                            "%"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 307,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 299,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 291,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 mt-1.5 mb-3 min-h-[22px]",
                        children: reviewCount >= 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-0.5",
                                    "aria-hidden": "true",
                                    children: [
                                        ...Array(5)
                                    ].map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                            className: "w-3.5 h-3.5",
                                            style: {
                                                fill: idx < Math.round(product.rating) ? '#E8A33D' : 'transparent',
                                                color: '#E8A33D'
                                            }
                                        }, idx, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 333,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 331,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold",
                                    style: {
                                        color: 'var(--text-muted)'
                                    },
                                    children: product.rating.toFixed(1)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 343,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs",
                                    style: {
                                        color: 'var(--text-muted)'
                                    },
                                    children: [
                                        "(",
                                        reviewCount,
                                        ")"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 346,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs font-medium",
                            style: {
                                color: 'var(--text-muted)'
                            },
                            children: lang === 'vi' ? 'Chưa có đánh giá' : 'No reviews yet'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 351,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    isOutOfStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        disabled: true,
                        "aria-label": lang === 'vi' ? `${displayName} - Hết hàng` : `${displayName} - Out of stock`,
                        className: "w-full h-[40px] sm:h-[42px] rounded-full text-[13px] sm:text-[14px] font-bold inline-flex items-center justify-center border-2 cursor-not-allowed",
                        style: {
                            borderColor: '#9CA3AF',
                            backgroundColor: 'rgba(156, 163, 175, 0.14)',
                            color: '#6B7280'
                        },
                        children: lang === 'vi' ? 'Hết hàng' : 'Out of stock'
                    }, void 0, false, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 359,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-testid": `add-to-cart-btn-${product.id}`,
                                "data-added": isAdded ? 'true' : 'false',
                                "aria-label": lang === 'vi' ? `Thêm ${displayName} vào giỏ hàng` : `Add ${displayName} to cart`,
                                onClick: ()=>onAddToCartClick(product),
                                className: "btn-shop-outline sm:flex-[1.15] min-w-0 cursor-pointer",
                                children: isAdded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: lang === 'vi' ? 'Đã thêm ✓' : 'Added ✓'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 387,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                            className: "w-3.5 h-3.5 shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 390,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: lang === 'vi' ? 'Thêm vào giỏ' : 'Add to cart'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 391,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 389,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 374,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "data-testid": `buy-now-btn-${product.id}`,
                                "aria-label": lang === 'vi' ? `Mua hàng ${displayName}` : `Buy ${displayName} now`,
                                onClick: ()=>onBuyNowClick ? onBuyNowClick(product) : onAddToCartClick(product),
                                className: "btn-shop-buy sm:flex-1 min-w-0 cursor-pointer",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: lang === 'vi' ? 'Mua hàng' : 'Buy now'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 411,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 396,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 373,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pages/ShopPage.tsx",
        lineNumber: 165,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ProductCard, "vkGXVe4UyXOqfV/otCEuhDLXET8=");
_c1 = ProductCard;
const ShopPage = ({ lang, products: propProducts, pets = [], onAddToCart, onBuyNow, onOpenCart, onNavigate })=>{
    _s1();
    const catalogProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShopPage.useMemo[catalogProducts]": ()=>{
            return propProducts.length >= __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHOP_PRODUCTS"].length ? propProducts : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SHOP_PRODUCTS"];
        }
    }["ShopPage.useMemo[catalogProducts]"], [
        propProducts
    ]);
    // URL slug state for /cua-hang/{slug}
    const [selectedSlug, setSelectedSlug] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ShopPage.useState": ()=>getShopSlugFromPath(window.location.pathname)
    }["ShopPage.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": ()=>{
            const handlePopState = {
                "ShopPage.useEffect.handlePopState": ()=>{
                    setSelectedSlug(getShopSlugFromPath(window.location.pathname));
                }
            }["ShopPage.useEffect.handlePopState"];
            window.addEventListener('popstate', handlePopState);
            return ({
                "ShopPage.useEffect": ()=>window.removeEventListener('popstate', handlePopState)
            })["ShopPage.useEffect"];
        }
    }["ShopPage.useEffect"], []);
    const navigateToProductSlug = (slug)=>{
        const nextUrl = slug ? `/cua-hang/${slug}` : '/cua-hang';
        if (window.location.pathname !== nextUrl) {
            window.history.pushState({}, '', nextUrl);
        }
        setSelectedSlug(slug);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    // Filter & Search States
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [activePetGroup, setActivePetGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    const [searchInput, setSearchInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [debouncedQuery, setDebouncedQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [sortBy, setSortBy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('popular');
    const [onlyOnSale, setOnlyOnSale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Pagination ("Xem thêm" loads 12 at a time)
    const [visibleCount, setVisibleCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(12);
    const [isLoadingMore, setIsLoadingMore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Wishlist & Add-to-cart feedback states
    const [addedIds, setAddedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [wishlistedIds, setWishlistedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ShopPage.useState": ()=>{
            const saved = localStorage.getItem('animora_wishlist');
            return saved ? JSON.parse(saved) : {};
        }
    }["ShopPage.useState"]);
    // Pet profile recommendation state
    const [selectedPetId, setSelectedPetId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ShopPage.useState": ()=>pets.length > 0 ? pets[0].id : ''
    }["ShopPage.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": ()=>{
            if (pets.length > 0 && !pets.some({
                "ShopPage.useEffect": (p)=>p.id === selectedPetId
            }["ShopPage.useEffect"])) {
                setSelectedPetId(pets[0].id);
            }
        }
    }["ShopPage.useEffect"], [
        pets,
        selectedPetId
    ]);
    // Debounce search input by 300ms
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": ()=>{
            const timer = window.setTimeout({
                "ShopPage.useEffect.timer": ()=>{
                    setDebouncedQuery(searchInput);
                }
            }["ShopPage.useEffect.timer"], 300);
            return ({
                "ShopPage.useEffect": ()=>window.clearTimeout(timer)
            })["ShopPage.useEffect"];
        }
    }["ShopPage.useEffect"], [
        searchInput
    ]);
    // Sync wishlist to localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": ()=>{
            localStorage.setItem('animora_wishlist', JSON.stringify(wishlistedIds));
        }
    }["ShopPage.useEffect"], [
        wishlistedIds
    ]);
    // Product Detail Page local states
    const [selectedImageIdx, setSelectedImageIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [selectedSpecIdx, setSelectedSpecIdx] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [detailQty, setDetailQty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [activeDetailTab, setActiveDetailTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('description');
    const [reviewStarFilter, setReviewStarFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('all');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": ()=>{
            setSelectedImageIdx(0);
            setSelectedSpecIdx(0);
            setDetailQty(1);
            setActiveDetailTab('description');
            setReviewStarFilter('all');
        }
    }["ShopPage.useEffect"], [
        selectedSlug
    ]);
    const gridSectionRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const toggleWishlist = (productId)=>{
        setWishlistedIds((prev)=>({
                ...prev,
                [productId]: !prev[productId]
            }));
    };
    const handleAddProduct = (product, quantity = 1, customSpec)=>{
        onAddToCart(product, quantity, customSpec);
        setAddedIds((prev)=>({
                ...prev,
                [product.id]: true
            }));
        window.setTimeout(()=>{
            setAddedIds((prev)=>({
                    ...prev,
                    [product.id]: false
                }));
        }, 1500);
        onOpenCart();
    };
    const handleBuyNowProduct = (product, quantity = 1, customSpec)=>{
        if (onBuyNow) {
            onBuyNow(product, quantity, customSpec);
        } else {
            onAddToCart(product, quantity, customSpec);
            onNavigate('checkout');
        }
    };
    const categoryLabels = {
        all: {
            vi: 'Tất cả',
            en: 'All'
        },
        food: {
            vi: 'Đồ ăn',
            en: 'Food'
        },
        toys: {
            vi: 'Đồ chơi',
            en: 'Toys'
        },
        accessories: {
            vi: 'Phụ kiện',
            en: 'Accessories'
        },
        care: {
            vi: 'Chăm sóc',
            en: 'Care'
        }
    };
    const petGroupOptions = [
        {
            id: 'all',
            labelVi: 'Tất cả',
            labelEn: 'All',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paw$2d$print$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PawPrint$3e$__["PawPrint"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 559,
                columnNumber: 59
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            id: 'dog',
            labelVi: 'Chó',
            labelEn: 'Dogs',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dog$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Dog$3e$__["Dog"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 560,
                columnNumber: 57
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            id: 'cat',
            labelVi: 'Mèo',
            labelEn: 'Cats',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cat$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cat$3e$__["Cat"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 561,
                columnNumber: 57
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            id: 'rabbit_rodent',
            labelVi: 'Thỏ & chuột',
            labelEn: 'Rabbits & rodents',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rabbit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rabbit$3e$__["Rabbit"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 566,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            id: 'bird',
            labelVi: 'Chim',
            labelEn: 'Birds',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bird$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bird$3e$__["Bird"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 568,
                columnNumber: 60
            }, ("TURBOPACK compile-time value", void 0))
        },
        {
            id: 'fish_reptile',
            labelVi: 'Cá & bò sát',
            labelEn: 'Fish & reptiles',
            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$fish$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Fish$3e$__["Fish"], {
                className: "w-3.5 h-3.5"
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 573,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        }
    ];
    // Active Pet Profile for Recommendation (Section 7)
    const activePetProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShopPage.useMemo[activePetProfile]": ()=>pets.length > 0 ? pets.find({
                "ShopPage.useMemo[activePetProfile]": (p)=>p.id === selectedPetId
            }["ShopPage.useMemo[activePetProfile]"]) || pets[0] : null
    }["ShopPage.useMemo[activePetProfile]"], [
        pets,
        selectedPetId
    ]);
    const recommendedProductsForPet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShopPage.useMemo[recommendedProductsForPet]": ()=>{
            if (!activePetProfile) return [];
            const targetGroup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSpeciesToShopPetGroup"])(activePetProfile.species);
            const targetAge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parsePetAgeStage"])(activePetProfile.age);
            const matches = catalogProducts.filter({
                "ShopPage.useMemo[recommendedProductsForPet].matches": (prod)=>{
                    const matchesSpecies = prod.petTypes?.includes(targetGroup);
                    const matchesAge = !prod.recommendedAges || prod.recommendedAges.includes(targetAge);
                    return matchesSpecies && matchesAge && (prod.stock ?? 1) > 0;
                }
            }["ShopPage.useMemo[recommendedProductsForPet].matches"]);
            if (matches.length >= 4) return matches.slice(0, 4);
            const fallback = catalogProducts.filter({
                "ShopPage.useMemo[recommendedProductsForPet].fallback": (prod)=>!matches.some({
                        "ShopPage.useMemo[recommendedProductsForPet].fallback": (m)=>m.id === prod.id
                    }["ShopPage.useMemo[recommendedProductsForPet].fallback"]) && (prod.stock ?? 1) > 0
            }["ShopPage.useMemo[recommendedProductsForPet].fallback"]);
            return [
                ...matches,
                ...fallback
            ].slice(0, 4);
        }
    }["ShopPage.useMemo[recommendedProductsForPet]"], [
        activePetProfile,
        catalogProducts
    ]);
    // Filtered & Sorted Products
    const filteredProducts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShopPage.useMemo[filteredProducts]": ()=>{
            const normQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeViText"])(debouncedQuery);
            return catalogProducts.filter({
                "ShopPage.useMemo[filteredProducts]": (prod)=>{
                    if (activeCategory !== 'all' && prod.category !== activeCategory) {
                        return false;
                    }
                    if (activePetGroup !== 'all' && (!prod.petTypes || !prod.petTypes.includes(activePetGroup))) {
                        return false;
                    }
                    if (onlyOnSale) {
                        const hasDiscount = prod.discountPercent && prod.discountPercent > 0 || prod.oldPrice && prod.oldPrice > prod.price;
                        if (!hasDiscount) return false;
                    }
                    if (normQuery) {
                        const searchable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeViText"])(`${prod.name} ${prod.nameEn || ''} ${prod.brand || ''} ${prod.description}`);
                        if (!searchable.includes(normQuery)) {
                            return false;
                        }
                    }
                    return true;
                }
            }["ShopPage.useMemo[filteredProducts]"]).sort({
                "ShopPage.useMemo[filteredProducts]": (a, b)=>{
                    if (sortBy === 'price-asc') return a.price - b.price;
                    if (sortBy === 'price-desc') return b.price - a.price;
                    if (sortBy === 'newest') {
                        return (b.createdAtOrder ?? 0) - (a.createdAtOrder ?? 0);
                    }
                    if (sortBy === 'discount') {
                        const discA = a.discountPercent ?? 0;
                        const discB = b.discountPercent ?? 0;
                        return discB - discA;
                    }
                    const popA = (a.reviewCount ?? 10) * a.rating;
                    const popB = (b.reviewCount ?? 10) * b.rating;
                    return popB - popA;
                }
            }["ShopPage.useMemo[filteredProducts]"]);
        }
    }["ShopPage.useMemo[filteredProducts]"], [
        catalogProducts,
        activeCategory,
        activePetGroup,
        onlyOnSale,
        debouncedQuery,
        sortBy
    ]);
    const clearAllFilters = ()=>{
        setActiveCategory('all');
        setActivePetGroup('all');
        setOnlyOnSale(false);
        setSearchInput('');
        setDebouncedQuery('');
        setSortBy('popular');
    };
    const hasAnyActiveFilter = activeCategory !== 'all' || activePetGroup !== 'all' || onlyOnSale || debouncedQuery.trim() !== '';
    const handleLoadMore = ()=>{
        setIsLoadingMore(true);
        window.setTimeout(()=>{
            setVisibleCount((prev)=>prev + 12);
            setIsLoadingMore(false);
        }, 450);
    };
    // ============================================================================
    // VIEW 1: PRODUCT DETAIL PAGE (/cua-hang/{slug})
    // ============================================================================
    if (selectedSlug) {
        const detailProduct = catalogProducts.find((p)=>p.slug === selectedSlug || p.id === selectedSlug);
        if (!detailProduct) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-28 pb-24 min-h-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto px-4 sm:px-6 text-center py-16 space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-20 h-20 rounded-full mx-auto flex items-center justify-center",
                            style: {
                                backgroundColor: 'var(--surface-2)',
                                color: 'var(--primary)'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PawPlaceholderSVG, {
                                className: "w-12 h-12"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 697,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 690,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-heading text-3xl sm:text-4xl font-extrabold",
                            style: {
                                color: 'var(--primary)'
                            },
                            children: lang === 'vi' ? 'Không tìm thấy sản phẩm' : 'Product not found'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 699,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-base",
                            style: {
                                color: 'var(--text-muted)'
                            },
                            children: lang === 'vi' ? 'Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã ngừng kinh doanh.' : 'The product you are looking for does not exist or has been discontinued.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 705,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>navigateToProductSlug(null),
                                className: "btn-primary px-6 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2 cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 716,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: lang === 'vi' ? 'Quay lại cửa hàng' : 'Back to shop'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 717,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 711,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 710,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 689,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/pages/ShopPage.tsx",
                lineNumber: 688,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0));
        }
        const displayName = lang === 'en' && detailProduct.nameEn ? detailProduct.nameEn : detailProduct.name;
        const categoryLabel = categoryLabels[detailProduct.category][lang === 'vi' ? 'vi' : 'en'];
        const galleryImages = detailProduct.images && detailProduct.images.length > 0 ? detailProduct.images : [
            detailProduct.image
        ];
        const activeImage = galleryImages[selectedImageIdx] || detailProduct.image;
        const specOptions = detailProduct.specOptions && detailProduct.specOptions.length > 0 ? detailProduct.specOptions : [
            {
                labelVi: detailProduct.spec || 'Tiêu chuẩn',
                labelEn: detailProduct.specEn || 'Standard',
                price: detailProduct.price,
                oldPrice: detailProduct.oldPrice
            }
        ];
        const activeSpecOption = specOptions[selectedSpecIdx] || specOptions[0];
        const currentPrice = activeSpecOption.price;
        const currentOldPrice = activeSpecOption.oldPrice;
        const currentDiscount = currentOldPrice && currentOldPrice > currentPrice ? Math.round((currentOldPrice - currentPrice) / currentOldPrice * 100) : detailProduct.discountPercent || 0;
        const isOutOfStock = detailProduct.stock === 0 || detailProduct.badges?.includes('out_of_stock') || false;
        const allProductReviews = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRODUCT_REVIEWS"].filter((r)=>r.productId === detailProduct.id);
        const reviewsToUse = allProductReviews.length > 0 ? allProductReviews : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRODUCT_REVIEWS"].slice(0, 3);
        const filteredReviews = reviewStarFilter === 'all' ? reviewsToUse : reviewsToUse.filter((r)=>r.stars === reviewStarFilter);
        const relatedProducts = catalogProducts.filter((p)=>p.id !== detailProduct.id && (p.category === detailProduct.category || p.petTypes?.some((pt)=>detailProduct.petTypes?.includes(pt)))).slice(0, 4);
        const activeSpecLabel = lang === 'en' ? activeSpecOption.labelEn : activeSpecOption.labelVi;
        const handleDetailAddToCart = ()=>{
            if (isOutOfStock) return;
            const productWithSpec = {
                ...detailProduct,
                price: currentPrice,
                oldPrice: currentOldPrice,
                spec: activeSpecOption.labelVi,
                specEn: activeSpecOption.labelEn
            };
            handleAddProduct(productWithSpec, detailQty, activeSpecLabel);
        };
        const handleDetailBuyNow = ()=>{
            if (isOutOfStock) return;
            const productWithSpec = {
                ...detailProduct,
                price: currentPrice,
                oldPrice: currentOldPrice,
                spec: activeSpecOption.labelVi,
                specEn: activeSpecOption.labelEn
            };
            handleBuyNowProduct(productWithSpec, detailQty, activeSpecLabel);
        };
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "pt-24 pb-28 sm:pb-24 min-h-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border p-5 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12",
                            style: {
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)',
                                boxShadow: 'var(--shadow)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-6 space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "shop-product-img-frame border group",
                                            style: {
                                                borderColor: 'var(--border)'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: activeImage,
                                                alt: displayName,
                                                className: "w-full h-full object-contain transition-transform duration-500 group-hover:scale-110",
                                                referrerPolicy: "no-referrer"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 819,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 818,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-4 gap-3",
                                            children: galleryImages.map((imgUrl, idx)=>{
                                                const isSelected = idx === selectedImageIdx;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setSelectedImageIdx(idx),
                                                    "aria-label": lang === 'vi' ? `Xem ảnh ${idx + 1}` : `View image ${idx + 1}`,
                                                    className: `shop-product-img-frame !p-2 !rounded-xl border-2 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer ${isSelected ? 'shadow-xs' : 'opacity-75 hover:opacity-100'}`,
                                                    style: {
                                                        borderColor: isSelected ? 'var(--primary)' : 'var(--border)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: imgUrl,
                                                        alt: "",
                                                        className: "w-full h-full object-contain",
                                                        referrerPolicy: "no-referrer"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 845,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, idx, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 831,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 827,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 817,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "lg:col-span-6 flex flex-col justify-between space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-center gap-2",
                                                    children: [
                                                        detailProduct.brand && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-3 py-1 rounded-full text-xs font-extrabold",
                                                            style: {
                                                                backgroundColor: 'var(--surface-2)',
                                                                color: 'var(--primary)'
                                                            },
                                                            children: detailProduct.brand
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 862,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-3 py-1 rounded-full text-xs font-bold border",
                                                            style: {
                                                                borderColor: 'var(--border)',
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: categoryLabel
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 872,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        isOutOfStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-3 py-1 rounded-full text-xs font-extrabold bg-gray-600 text-white",
                                                            children: lang === 'vi' ? 'Hết hàng' : 'Out of stock'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 882,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-700 text-white",
                                                            children: lang === 'vi' ? `Còn hàng (${detailProduct.stock ?? 20})` : `In stock (${detailProduct.stock ?? 20})`
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 886,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 860,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                    className: "font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight",
                                                    style: {
                                                        color: 'var(--primary)'
                                                    },
                                                    children: displayName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 894,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: (detailProduct.reviewCount ?? 0) >= 5 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-0.5",
                                                                children: [
                                                                    ...Array(5)
                                                                ].map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                        className: "w-4 h-4",
                                                                        style: {
                                                                            fill: idx < Math.round(detailProduct.rating) ? '#E8A33D' : 'transparent',
                                                                            color: '#E8A33D'
                                                                        }
                                                                    }, idx, false, {
                                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                        lineNumber: 906,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                lineNumber: 904,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-extrabold",
                                                                style: {
                                                                    color: 'var(--text)'
                                                                },
                                                                children: detailProduct.rating.toFixed(1)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                lineNumber: 919,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm",
                                                                style: {
                                                                    color: 'var(--text-muted)'
                                                                },
                                                                children: [
                                                                    "(",
                                                                    detailProduct.reviewCount,
                                                                    ' ',
                                                                    lang === 'vi' ? 'đánh giá' : 'reviews',
                                                                    ")"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                lineNumber: 922,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 903,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium",
                                                        style: {
                                                            color: 'var(--text-muted)'
                                                        },
                                                        children: lang === 'vi' ? 'Chưa có đánh giá' : 'No reviews yet'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 928,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 901,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap items-baseline gap-3 pt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-3xl sm:text-4xl font-extrabold",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVndPrice"])(currentPrice)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 936,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        currentOldPrice && currentOldPrice > currentPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-lg line-through font-medium",
                                                                    style: {
                                                                        color: 'var(--text-muted)'
                                                                    },
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVndPrice"])(currentOldPrice)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 944,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                currentDiscount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-2.5 py-1 rounded-full text-xs font-extrabold",
                                                                    style: {
                                                                        backgroundColor: '#FF7F6B',
                                                                        color: '#FFFFFF'
                                                                    },
                                                                    children: [
                                                                        "-",
                                                                        currentDiscount,
                                                                        "%"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 951,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 943,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 935,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm sm:text-base leading-relaxed",
                                                    style: {
                                                        color: 'var(--text-muted)'
                                                    },
                                                    children: lang === 'en' && detailProduct.descriptionEn ? detailProduct.descriptionEn : detailProduct.description
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 965,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-2 pt-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            className: "block text-xs font-extrabold uppercase tracking-wider",
                                                            style: {
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: lang === 'vi' ? 'Chọn quy cách đóng gói' : 'Select size / pack'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 973,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap gap-2",
                                                            children: specOptions.map((opt, idx)=>{
                                                                const active = idx === selectedSpecIdx;
                                                                const label = lang === 'en' ? opt.labelEn : opt.labelVi;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setSelectedSpecIdx(idx),
                                                                    className: "px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                    style: {
                                                                        backgroundColor: active ? 'var(--primary)' : 'var(--bg)',
                                                                        color: active ? 'var(--on-primary)' : 'var(--text)',
                                                                        borderColor: active ? 'var(--primary)' : 'var(--border)'
                                                                    },
                                                                    children: label
                                                                }, label, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 984,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0));
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 979,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 972,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-4 pt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-extrabold uppercase tracking-wider",
                                                            style: {
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: lang === 'vi' ? 'Số lượng' : 'Quantity'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1004,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "inline-flex items-center rounded-full border p-1",
                                                            style: {
                                                                backgroundColor: 'var(--bg)',
                                                                borderColor: 'var(--border)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    disabled: detailQty <= 1,
                                                                    onClick: ()=>setDetailQty((q)=>Math.max(1, q - 1)),
                                                                    "aria-label": lang === 'vi' ? 'Giảm số lượng' : 'Decrease quantity',
                                                                    className: "w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 cursor-pointer",
                                                                    style: {
                                                                        color: 'var(--text)'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                        lineNumber: 1025,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1017,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "w-10 text-center text-sm font-extrabold",
                                                                    style: {
                                                                        color: 'var(--text)'
                                                                    },
                                                                    children: detailQty
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1027,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setDetailQty((q)=>q + 1),
                                                                    "aria-label": lang === 'vi' ? 'Tăng số lượng' : 'Increase quantity',
                                                                    className: "w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] cursor-pointer",
                                                                    style: {
                                                                        color: 'var(--text)'
                                                                    },
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                        lineNumber: 1040,
                                                                        columnNumber: 23
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1033,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1010,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1003,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: isOutOfStock,
                                                            onClick: handleDetailAddToCart,
                                                            className: `h-12 px-6 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 ${isOutOfStock ? 'opacity-60 cursor-not-allowed border' : 'btn-primary shadow-md cursor-pointer'}`,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1057,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: isOutOfStock ? lang === 'vi' ? 'Hết hàng' : 'Out of stock' : lang === 'vi' ? 'Thêm vào giỏ' : 'Add to cart'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1058,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1047,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            disabled: isOutOfStock,
                                                            onClick: handleDetailBuyNow,
                                                            className: "btn-secondary h-12 px-6 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: lang === 'vi' ? 'Mua hàng' : 'Buy now'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1075,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                                    className: "w-4 h-4"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1076,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1069,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1046,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$contact$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_INFO"].phoneHref,
                                                        className: "inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold hover:underline",
                                                        style: {
                                                            color: 'var(--primary)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                lineNumber: 1086,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: lang === 'vi' ? 'Gọi tư vấn: 0337 203 332' : 'Call for advice: 0337 203 332'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                lineNumber: 1087,
                                                                columnNumber: 21
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1081,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1080,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 859,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-3 pt-4 border-t text-xs font-bold",
                                            style: {
                                                borderColor: 'var(--border)',
                                                color: 'var(--text)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                            className: "w-4 h-4 shrink-0",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1102,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Giao nhanh trong ngày' : 'Same-day delivery'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1103,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1101,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                            className: "w-4 h-4 shrink-0",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1106,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Đổi trả trong 7 ngày' : '7-day easy returns'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1107,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1105,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                            className: "w-4 h-4 shrink-0",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1110,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Hàng chính hãng 100%' : '100% authentic'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1111,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1109,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                            className: "w-4 h-4 shrink-0",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1114,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Thanh toán khi nhận hàng' : 'Cash on delivery'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1115,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1113,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1097,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 858,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 808,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border p-6 sm:p-8 space-y-6",
                            style: {
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)',
                                boxShadow: 'var(--shadow)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2 overflow-x-auto pb-2 border-b",
                                    style: {
                                        borderColor: 'var(--border)',
                                        scrollbarWidth: 'none'
                                    },
                                    children: [
                                        {
                                            id: 'description',
                                            vi: 'Mô tả',
                                            en: 'Overview'
                                        },
                                        {
                                            id: 'ingredients',
                                            vi: 'Thành phần',
                                            en: 'Ingredients & materials'
                                        },
                                        {
                                            id: 'usage',
                                            vi: 'Hướng dẫn sử dụng',
                                            en: 'How to use'
                                        },
                                        {
                                            id: 'reviews',
                                            vi: `Đánh giá (${reviewsToUse.length})`,
                                            en: `Reviews (${reviewsToUse.length})`
                                        }
                                    ].map((tab)=>{
                                        const active = activeDetailTab === tab.id;
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setActiveDetailTab(tab.id),
                                            className: "px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer",
                                            style: {
                                                backgroundColor: active ? 'var(--primary)' : 'transparent',
                                                color: active ? 'var(--on-primary)' : 'var(--text)'
                                            },
                                            children: lang === 'vi' ? tab.vi : tab.en
                                        }, tab.id, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1148,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0));
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1130,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeDetailTab === 'description' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 text-sm sm:text-base leading-relaxed",
                                    style: {
                                        color: 'var(--text)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: lang === 'en' && detailProduct.descriptionEn ? detailProduct.descriptionEn : detailProduct.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1166,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? 'Tất cả sản phẩm tại cửa hàng Animora đều được đội ngũ bác sĩ thú y kiểm định nguồn gốc, hạn sử dụng và độ an toàn sinh học trước khi giao đến tay gia đình bé cưng.' : 'Every item in the Animora shop is vetted by our veterinary team for ingredient safety, freshness, and species appropriateness.'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1171,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1165,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeDetailTab === 'ingredients' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-sm sm:text-base leading-relaxed",
                                    style: {
                                        color: 'var(--text)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: lang === 'en' ? detailProduct.ingredientsEn || detailProduct.descriptionEn : detailProduct.ingredientsVi || detailProduct.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1181,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1180,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeDetailTab === 'usage' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2 text-sm sm:text-base leading-relaxed",
                                    style: {
                                        color: 'var(--text)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: lang === 'en' ? detailProduct.usageEn || detailProduct.descriptionEn : detailProduct.usageVi || detailProduct.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1191,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1190,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                activeDetailTab === 'reviews' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold mr-1",
                                                    style: {
                                                        color: 'var(--text-muted)'
                                                    },
                                                    children: lang === 'vi' ? 'Lọc theo số sao:' : 'Filter by rating:'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1202,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                [
                                                    'all',
                                                    5,
                                                    4,
                                                    3
                                                ].map((starOpt)=>{
                                                    const active = reviewStarFilter === starOpt;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setReviewStarFilter(starOpt),
                                                        className: "px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer",
                                                        style: {
                                                            backgroundColor: active ? 'var(--primary)' : 'var(--bg)',
                                                            color: active ? 'var(--on-primary)' : 'var(--text)',
                                                            borderColor: active ? 'var(--primary)' : 'var(--border)'
                                                        },
                                                        children: starOpt === 'all' ? lang === 'vi' ? 'Tất cả' : 'All' : `${starOpt} ★`
                                                    }, String(starOpt), false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1208,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0));
                                                })
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1201,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: filteredReviews.map((rev)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-2xl border space-y-2",
                                                    style: {
                                                        backgroundColor: 'var(--bg)',
                                                        borderColor: 'var(--border)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-wrap items-center justify-between gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "font-heading text-sm font-bold block",
                                                                            style: {
                                                                                color: 'var(--text)'
                                                                            },
                                                                            children: rev.author
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                            lineNumber: 1241,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs",
                                                                            style: {
                                                                                color: 'var(--text-muted)'
                                                                            },
                                                                            children: lang === 'vi' ? rev.petInfoVi : rev.petInfoEn
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                            lineNumber: 1244,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1240,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-center gap-0.5",
                                                                            children: [
                                                                                ...Array(5)
                                                                            ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                                                    className: "w-3.5 h-3.5",
                                                                                    style: {
                                                                                        fill: i < rev.stars ? '#E8A33D' : 'transparent',
                                                                                        color: '#E8A33D'
                                                                                    }
                                                                                }, i, false, {
                                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                                    lineNumber: 1251,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0)))
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                            lineNumber: 1249,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-xs",
                                                                            style: {
                                                                                color: 'var(--text-muted)'
                                                                            },
                                                                            children: rev.date
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                            lineNumber: 1261,
                                                                            columnNumber: 27
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                    lineNumber: 1248,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1239,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm leading-relaxed",
                                                            style: {
                                                                color: 'var(--text)'
                                                            },
                                                            children: lang === 'vi' ? rev.textVi : rev.textEn
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1266,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, rev.id, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1231,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1229,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1200,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1122,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-heading text-2xl sm:text-3xl font-extrabold",
                                    style: {
                                        color: 'var(--primary)'
                                    },
                                    children: lang === 'vi' ? 'Sản phẩm liên quan' : 'Related products'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1278,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
                                    children: relatedProducts.map((relProd)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                            product: relProd,
                                            lang: lang,
                                            isAdded: Boolean(addedIds[relProd.id]),
                                            isWishlisted: Boolean(wishlistedIds[relProd.id]),
                                            onToggleWishlist: toggleWishlist,
                                            onAddToCartClick: (p)=>handleAddProduct(p, 1),
                                            onBuyNowClick: (p)=>handleBuyNowProduct(p, 1),
                                            onOpenProductDetail: (slug)=>navigateToProductSlug(slug)
                                        }, relProd.id, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1286,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1284,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1277,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 806,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "sm:hidden fixed bottom-0 left-0 right-0 z-40 p-3 border-t shadow-2xl flex items-center justify-between gap-2",
                    style: {
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] block truncate",
                                    style: {
                                        color: 'var(--text-muted)'
                                    },
                                    children: activeSpecLabel
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1311,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-base font-extrabold",
                                    style: {
                                        color: 'var(--primary)'
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$shopData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVndPrice"])(currentPrice * detailQty)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1314,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1310,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: isOutOfStock,
                                    onClick: handleDetailAddToCart,
                                    className: "btn-secondary h-10 px-3.5 rounded-full text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1325,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: lang === 'vi' ? 'Thêm vào giỏ' : 'Add to cart'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1326,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1319,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: isOutOfStock,
                                    onClick: handleDetailBuyNow,
                                    className: "btn-primary h-10 px-4 rounded-full text-xs font-bold inline-flex items-center gap-1.5 disabled:opacity-50",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: lang === 'vi' ? 'Mua hàng' : 'Buy now'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1334,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1328,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1318,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 1303,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/pages/ShopPage.tsx",
            lineNumber: 805,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    // ============================================================================
    // VIEW 2: MAIN SHOP PAGE (/cua-hang)
    // ============================================================================
    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const hasMoreProducts = visibleCount < filteredProducts.length;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pt-24 pb-24 min-h-screen",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2.5 max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "data-testid": "shop-page-eyebrow",
                            className: "block uppercase font-bold",
                            style: {
                                fontFamily: 'var(--font-body)',
                                fontSize: '13px',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: 'var(--primary)'
                            },
                            children: lang === 'vi' ? 'CỬA HÀNG THÚ CƯNG' : 'PET SHOP'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1355,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            "data-testid": "shop-page-title",
                            className: "font-heading font-extrabold leading-[1.14] tracking-[-0.02em]",
                            style: {
                                fontSize: 'clamp(32px, 4vw, 48px)',
                                color: 'var(--primary)'
                            },
                            children: lang === 'vi' ? 'Cửa hàng cho bé cưng' : 'Shop for your pet'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1368,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            "data-testid": "shop-page-subtitle",
                            className: "text-[18px] leading-relaxed font-normal",
                            style: {
                                color: 'var(--text-muted)'
                            },
                            children: lang === 'vi' ? 'Thức ăn hữu cơ, đồ chơi và phụ kiện an toàn được tuyển chọn bởi đội ngũ bác sĩ thú y.' : 'Organic food, toys, and safe accessories curated by the Animora veterinary team.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1378,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 1354,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative rounded-3xl overflow-hidden border shadow-xs lg:h-[156px] flex items-center",
                    style: {
                        background: 'linear-gradient(95deg, var(--surface-2) 0%, var(--surface) 52%, color-mix(in srgb, var(--pink) 35%, var(--surface)) 100%)',
                        borderColor: 'var(--border)'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full grid grid-cols-1 lg:grid-cols-12 items-center px-5 sm:px-7 py-3.5 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-8 flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "aria-hidden": "true",
                                        className: "hidden sm:flex w-13 h-13 rounded-2xl items-center justify-center shrink-0",
                                        style: {
                                            backgroundColor: 'var(--primary)',
                                            color: 'var(--on-primary)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paw$2d$print$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PawPrint$3e$__["PawPrint"], {
                                            className: "w-6 h-6"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1410,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1402,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "block text-[11px] font-extrabold uppercase tracking-[0.16em]",
                                                style: {
                                                    color: 'var(--primary)'
                                                },
                                                children: lang === 'vi' ? 'ƯU ĐÃI ĐẶC BIỆT' : 'SPECIAL OFFER'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1414,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-heading text-lg sm:text-xl lg:text-2xl font-extrabold leading-tight",
                                                style: {
                                                    color: 'var(--primary)'
                                                },
                                                children: lang === 'vi' ? 'Giảm đến 30% sản phẩm thiết yếu tuyển chọn' : 'Up to 30% off selected pet essentials'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1420,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-0.5",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "data-testid": "promo-shop-deals-btn",
                                                    onClick: ()=>{
                                                        setOnlyOnSale(true);
                                                        setActiveCategory('all');
                                                        gridSectionRef.current?.scrollIntoView({
                                                            behavior: 'smooth'
                                                        });
                                                    },
                                                    className: "btn-primary px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Săn ưu đãi' : 'Shop deals'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1439,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1440,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1429,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1428,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1413,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 1401,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "lg:col-span-4 flex items-center justify-center lg:justify-end",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border p-2 flex items-center justify-center",
                                    style: {
                                        backgroundColor: 'color-mix(in srgb, var(--surface-2) 60%, var(--surface))',
                                        borderColor: 'var(--border)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/assets/products/nutripet-organic-2kg.png",
                                        alt: lang === 'vi' ? 'Hạt NutriPet hữu cơ đa loài (2kg)' : 'NutriPet organic multi-species kibble (2kg)',
                                        className: "w-full h-full object-contain"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1454,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1447,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 1446,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                        lineNumber: 1400,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 1392,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    ref: gridSectionRef,
                    id: "shop-products-grid",
                    className: "space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "sticky top-[var(--nav-h)] z-30 glass-card rounded-2xl px-4 py-2.5 border space-y-2",
                            style: {
                                borderColor: 'var(--border)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col lg:flex-row lg:items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-heading text-xl sm:text-2xl font-extrabold leading-tight shrink-0",
                                            style: {
                                                color: 'var(--primary)'
                                            },
                                            children: lang === 'vi' ? 'Sản phẩm nổi bật' : 'Featured products'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1479,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "relative flex-1 sm:w-60 min-w-[190px]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                            className: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none",
                                                            style: {
                                                                color: 'var(--text-muted)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1489,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "text",
                                                            value: searchInput,
                                                            onChange: (e)=>setSearchInput(e.target.value),
                                                            placeholder: lang === 'vi' ? 'Tìm theo tên, thương hiệu...' : 'Search name, brand...',
                                                            "aria-label": lang === 'vi' ? 'Tìm kiếm sản phẩm' : 'Search products',
                                                            className: "w-full h-9.5 pl-9 pr-8 rounded-full text-xs sm:text-sm border focus-visible:outline-2 focus-visible:outline-[#FF7F6B]",
                                                            style: {
                                                                backgroundColor: 'var(--surface)',
                                                                borderColor: 'var(--border)',
                                                                color: 'var(--text)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1493,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        searchInput && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>{
                                                                setSearchInput('');
                                                                setDebouncedQuery('');
                                                            },
                                                            "aria-label": lang === 'vi' ? 'Xóa từ khóa tìm kiếm' : 'Clear search',
                                                            className: "w-6 h-6 rounded-full flex items-center justify-center absolute right-1.5 top-1/2 -translate-y-1/2 hover:bg-[var(--surface-2)] cursor-pointer",
                                                            style: {
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                                lineNumber: 1521,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1511,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1488,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: sortBy,
                                                    onChange: (e)=>setSortBy(e.target.value),
                                                    "aria-label": lang === 'vi' ? 'Sắp xếp sản phẩm' : 'Sort products',
                                                    className: "h-9.5 px-3.5 rounded-full text-xs sm:text-sm font-bold border focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                    style: {
                                                        backgroundColor: 'var(--surface)',
                                                        borderColor: 'var(--border)',
                                                        color: 'var(--text)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "popular",
                                                            children: lang === 'vi' ? 'Phổ biến nhất' : 'Most popular'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1538,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "price-asc",
                                                            children: lang === 'vi' ? 'Giá thấp đến cao' : 'Price: Low to high'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1541,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "price-desc",
                                                            children: lang === 'vi' ? 'Giá cao đến thấp' : 'Price: High to low'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1544,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "newest",
                                                            children: lang === 'vi' ? 'Mới nhất' : 'Newest'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1547,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "discount",
                                                            children: lang === 'vi' ? 'Giảm giá nhiều nhất' : 'Biggest discount'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                            lineNumber: 1550,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1527,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1486,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1478,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center flex-nowrap overflow-x-auto gap-1.5 pt-0.5",
                                    style: {
                                        scrollbarWidth: 'none'
                                    },
                                    children: [
                                        [
                                            'all',
                                            'food',
                                            'toys',
                                            'accessories',
                                            'care'
                                        ].map((cat)=>{
                                            const active = activeCategory === cat;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setActiveCategory(cat),
                                                className: "h-8 px-3.5 rounded-full text-[13px] font-bold whitespace-nowrap shrink-0 border transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                style: {
                                                    backgroundColor: active ? 'var(--primary)' : 'var(--surface)',
                                                    color: active ? 'var(--on-primary)' : 'var(--text)',
                                                    borderColor: active ? 'var(--primary)' : 'var(--border)'
                                                },
                                                children: categoryLabels[cat][lang === 'vi' ? 'vi' : 'en']
                                            }, cat, false, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1566,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0));
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "aria-hidden": "true",
                                            className: "w-px h-5 shrink-0 mx-1.5",
                                            style: {
                                                backgroundColor: 'var(--border)'
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1583,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        petGroupOptions.map((petOpt)=>{
                                            const active = activePetGroup === petOpt.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>setActivePetGroup(petOpt.id),
                                                className: "h-8 px-2.5 text-[13px] font-bold whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 border-b-2 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                style: {
                                                    borderColor: active ? 'var(--primary)' : 'transparent',
                                                    color: active ? 'var(--primary)' : 'var(--text-muted)',
                                                    backgroundColor: 'transparent'
                                                },
                                                children: [
                                                    petOpt.icon,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: lang === 'vi' ? petOpt.labelVi : petOpt.labelEn
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1605,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, petOpt.id, true, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1593,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0));
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-auto pl-3 text-[13px] font-semibold whitespace-nowrap shrink-0",
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? `${filteredProducts.length} sản phẩm` : `${filteredProducts.length} products`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1611,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1558,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1473,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        hasAnyActiveFilter && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2 px-1",
                            children: [
                                activeCategory !== 'all' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setActiveCategory('all'),
                                    className: "px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer",
                                    style: {
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--primary)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: categoryLabels[activeCategory][lang === 'vi' ? 'vi' : 'en']
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1636,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1637,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1626,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                activePetGroup !== 'all' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setActivePetGroup('all'),
                                    className: "px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer",
                                    style: {
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--primary)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: petGroupOptions.find((p)=>p.id === activePetGroup)?.[lang === 'vi' ? 'labelVi' : 'labelEn']
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1652,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1659,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1642,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                onlyOnSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setOnlyOnSale(false),
                                    className: "px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer",
                                    style: {
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--primary)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: lang === 'vi' ? 'Đang giảm giá' : 'On sale'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1674,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1675,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1664,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                debouncedQuery.trim() !== '' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        setSearchInput('');
                                        setDebouncedQuery('');
                                    },
                                    className: "px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 border cursor-pointer",
                                    style: {
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--primary)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                '"',
                                                debouncedQuery,
                                                '"'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1693,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1694,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1680,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: clearAllFilters,
                                    className: "text-xs font-extrabold underline ml-1 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-xs cursor-pointer",
                                    style: {
                                        color: 'var(--primary)'
                                    },
                                    children: lang === 'vi' ? 'Xóa tất cả' : 'Clear all'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1698,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1624,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        pets.length > 0 && activePetProfile && recommendedProductsForPet.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            "aria-label": lang === 'vi' ? `Gợi ý cho ${activePetProfile.name}` : `Suggested for ${activePetProfile.name}`,
                            className: "space-y-3 pt-1 pb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-wrap items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                                    style: {
                                                        backgroundColor: 'var(--surface-2)',
                                                        color: 'var(--primary)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paw$2d$print$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PawPrint$3e$__["PawPrint"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1730,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1723,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-heading text-lg sm:text-xl font-extrabold",
                                                    style: {
                                                        color: 'var(--primary)'
                                                    },
                                                    children: lang === 'vi' ? `Gợi ý cho ${activePetProfile.name}` : `Suggested for ${activePetProfile.name}`
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1732,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2.5 py-0.5 rounded-full text-xs font-bold",
                                                    style: {
                                                        backgroundColor: 'var(--surface-2)',
                                                        color: 'var(--primary)'
                                                    },
                                                    children: [
                                                        activePetProfile.species,
                                                        " • ",
                                                        activePetProfile.age
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1740,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1722,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        pets.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 overflow-x-auto",
                                            children: pets.map((petItem)=>{
                                                const active = petItem.id === activePetProfile.id;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setSelectedPetId(petItem.id),
                                                    className: "px-3 py-1 rounded-full text-xs font-bold border whitespace-nowrap transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                    style: {
                                                        backgroundColor: active ? 'var(--primary)' : 'var(--surface)',
                                                        color: active ? 'var(--on-primary)' : 'var(--text)',
                                                        borderColor: active ? 'var(--primary)' : 'var(--border)'
                                                    },
                                                    children: petItem.name
                                                }, petItem.id, false, {
                                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                    lineNumber: 1756,
                                                    columnNumber: 25
                                                }, ("TURBOPACK compile-time value", void 0));
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1752,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1721,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex lg:grid lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory pb-1",
                                    style: {
                                        scrollbarWidth: 'none'
                                    },
                                    children: recommendedProductsForPet.map((prod)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-[240px] sm:w-[270px] lg:w-auto shrink-0 snap-start",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                                product: prod,
                                                lang: lang,
                                                isAdded: Boolean(addedIds[prod.id]),
                                                isWishlisted: Boolean(wishlistedIds[prod.id]),
                                                onToggleWishlist: toggleWishlist,
                                                onAddToCartClick: (p)=>handleAddProduct(p, 1),
                                                onBuyNowClick: (p)=>handleBuyNowProduct(p, 1),
                                                onOpenProductDetail: (slug)=>navigateToProductSlug(slug)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1785,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, `rec-${prod.id}`, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1781,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1776,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1713,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        filteredProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-3xl border py-16 px-6 text-center space-y-4",
                            style: {
                                backgroundColor: 'var(--surface)',
                                borderColor: 'var(--border)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-16 h-16 rounded-full mx-auto flex items-center justify-center",
                                    style: {
                                        backgroundColor: 'var(--surface-2)',
                                        color: 'var(--primary)'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PawPlaceholderSVG, {
                                        className: "w-10 h-10"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1817,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1810,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-heading text-xl font-bold",
                                    style: {
                                        color: 'var(--text)'
                                    },
                                    children: lang === 'vi' ? 'Không tìm thấy sản phẩm phù hợp' : 'No matching products found'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1819,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm max-w-md mx-auto",
                                    style: {
                                        color: 'var(--text-muted)'
                                    },
                                    children: lang === 'vi' ? 'Hãy thử điều chỉnh từ khóa hoặc xóa bớt bộ lọc để xem thêm các sản phẩm khác.' : 'Try adjusting your search keywords or clearing active filters.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1827,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: clearAllFilters,
                                        className: "btn-primary px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold cursor-pointer",
                                        children: lang === 'vi' ? 'Xóa bộ lọc' : 'Clear filters'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1833,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1832,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1803,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
                                    children: [
                                        visibleProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProductCard, {
                                                product: product,
                                                lang: lang,
                                                isAdded: Boolean(addedIds[product.id]),
                                                isWishlisted: Boolean(wishlistedIds[product.id]),
                                                onToggleWishlist: toggleWishlist,
                                                onAddToCartClick: (p)=>handleAddProduct(p, 1),
                                                onBuyNowClick: (p)=>handleBuyNowProduct(p, 1),
                                                onOpenProductDetail: (slug)=>navigateToProductSlug(slug)
                                            }, product.id, false, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1846,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))),
                                        isLoadingMore && [
                                            ...Array(4)
                                        ].map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-[20px] border p-4 space-y-3 animate-pulse",
                                                style: {
                                                    backgroundColor: 'var(--surface)',
                                                    borderColor: 'var(--border)'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "aspect-square w-full rounded-2xl",
                                                        style: {
                                                            backgroundColor: 'var(--surface-2)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1870,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-4 w-4/5 rounded-full",
                                                        style: {
                                                            backgroundColor: 'var(--surface-2)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1874,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-3 w-1/3 rounded-full",
                                                        style: {
                                                            backgroundColor: 'var(--surface-2)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1878,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-5 w-1/2 rounded-full",
                                                        style: {
                                                            backgroundColor: 'var(--surface-2)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1882,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-11 w-full rounded-full",
                                                        style: {
                                                            backgroundColor: 'var(--surface-2)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                        lineNumber: 1886,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, `skeleton-${idx}`, true, {
                                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                                lineNumber: 1862,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1844,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                hasMoreProducts && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-4 text-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        disabled: isLoadingMore,
                                        onClick: handleLoadMore,
                                        className: "btn-secondary px-8 py-3 rounded-full text-sm font-bold inline-flex items-center gap-2 cursor-pointer",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: isLoadingMore ? lang === 'vi' ? 'Đang tải thêm...' : 'Loading...' : lang === 'vi' ? `Xem thêm (${filteredProducts.length - visibleCount} sản phẩm)` : `Load more (${filteredProducts.length - visibleCount} products)`
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1903,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/ShopPage.tsx",
                                        lineNumber: 1897,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1896,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1843,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 1471,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-3xl border p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6",
                    style: {
                        backgroundColor: 'var(--surface)',
                        borderColor: 'var(--border)',
                        boxShadow: 'var(--shadow)'
                    },
                    children: [
                        {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 1932,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            titleVi: 'Giao nhanh trong ngày',
                            titleEn: 'Same-day delivery',
                            descVi: 'Nội thành TP.HCM trong 2 giờ',
                            descEn: 'Within 2 hours in HCMC'
                        },
                        {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 1939,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            titleVi: 'Đổi trả trong 7 ngày',
                            titleEn: '7-day easy returns',
                            descVi: 'Hỗ trợ đổi mới tận nơi miễn phí',
                            descEn: 'Free doorstep exchange'
                        },
                        {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 1946,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            titleVi: 'Hàng chính hãng',
                            titleEn: '100% authentic',
                            descVi: 'Kiểm định bởi bác sĩ thú y Animora',
                            descEn: 'Verified by Animora veterinarians'
                        },
                        {
                            icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                className: "w-6 h-6"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/ShopPage.tsx",
                                lineNumber: 1953,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            titleVi: 'Thanh toán khi nhận hàng',
                            titleEn: 'Cash on delivery',
                            descVi: 'Kiểm tra hàng trước khi thanh toán',
                            descEn: 'Inspect your order upon arrival'
                        }
                    ].map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0",
                                    style: {
                                        backgroundColor: 'var(--surface-2)',
                                        color: 'var(--primary)'
                                    },
                                    children: item.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1961,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-heading text-sm sm:text-base font-bold leading-snug",
                                            style: {
                                                color: 'var(--text)'
                                            },
                                            children: lang === 'vi' ? item.titleVi : item.titleEn
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1971,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs mt-0.5",
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? item.descVi : item.descEn
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                                            lineNumber: 1977,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                                    lineNumber: 1970,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, idx, true, {
                            fileName: "[project]/src/components/pages/ShopPage.tsx",
                            lineNumber: 1960,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)))
                }, void 0, false, {
                    fileName: "[project]/src/components/pages/ShopPage.tsx",
                    lineNumber: 1922,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/pages/ShopPage.tsx",
            lineNumber: 1350,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/pages/ShopPage.tsx",
        lineNumber: 1349,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(ShopPage, "NT2UqgGyJxLN6TE8kbd44hVZER4=");
_c2 = ShopPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "PawPlaceholderSVG");
__turbopack_context__.k.register(_c1, "ProductCard");
__turbopack_context__.k.register(_c2, "ShopPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_pages_ShopPage_tsx_1corz3jasutry._.js.map