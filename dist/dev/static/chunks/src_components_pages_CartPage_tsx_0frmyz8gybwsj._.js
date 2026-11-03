(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/pages/CartPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartPage",
    ()=>CartPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.js [app-client] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-client] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paw$2d$print$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PawPrint$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paw-print.js [app-client] (ecmascript) <export default as PawPrint>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cartLogic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/cartConstants.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$ShopPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pages/ShopPage.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const CartPage = ({ lang, darkMode = false, cart, savedForLater, products, appliedCoupon, orderNote, redirectNotice, onClearRedirectNotice, onUpdateQuantity, onChangeSpec, onRemoveItemWithUndo, onSaveForLater, onMoveSavedToCart, onRemoveSavedItem, onAcceptPriceChange, onApplyCoupon, onRemoveCoupon, onChangeOrderNote, onAddToCart, onBuyNow, onNavigate, onNavigateUrl })=>{
    _s();
    const [couponInput, setCouponInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(appliedCoupon || '');
    const [couponError, setCouponError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [couponSuccess, setCouponSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [liveQuantityAnnouncement, setLiveQuantityAnnouncement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [openSpecSelectorKey, setOpenSpecSelectorKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [addedItemIds, setAddedItemIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [wishlistedIds, setWishlistedIds] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCartSummary"])(cart, appliedCoupon, products);
    const checkoutValidation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateCartForCheckout"])(cart, products);
    const isEmpty = cart.length === 0;
    const errorTextColor = darkMode ? '#FDA29B' : '#B42318';
    const errorBgColor = darkMode ? 'rgba(253, 162, 155, 0.14)' : 'rgba(180, 35, 24, 0.08)';
    const errorBorderColor = darkMode ? 'rgba(253, 162, 155, 0.4)' : 'rgba(180, 35, 24, 0.3)';
    // 4 recommended products for "Có thể bạn cũng thích" or Empty state featured products
    const cartProductIds = new Set(cart.map((c)=>c.productId));
    const recommendedProducts = products.filter((p)=>!cartProductIds.has(p.id) && (p.stock ?? 20) > 0 && !p.badges?.includes('out_of_stock')).slice(0, 4);
    const featuredProducts = recommendedProducts.length >= 4 ? recommendedProducts : products.filter((p)=>(p.stock ?? 20) > 0 && !p.badges?.includes('out_of_stock')).slice(0, 4);
    const handleLinkClick = (e, targetPath)=>{
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
            return;
        }
        e.preventDefault();
        onNavigateUrl(targetPath);
    };
    const handleApplyCouponSubmit = (e)=>{
        e.preventDefault();
        setCouponError(null);
        setCouponSuccess(null);
        const trimmed = couponInput.trim();
        const res = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateCouponCode"])(trimmed, summary.subtotal, lang);
        if (!res.valid) {
            setCouponError(res.errorMessage || (lang === 'vi' ? 'Mã không hợp lệ hoặc đã hết hạn' : 'Invalid or expired coupon code'));
            return;
        }
        onApplyCoupon(res.normalizedCode);
        setCouponInput(res.normalizedCode);
        setCouponSuccess(lang === 'vi' ? `Đã áp dụng mã ${res.normalizedCode} (-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(res.discountAmount)})` : `Applied code ${res.normalizedCode} (-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(res.discountAmount)})`);
    };
    const handleCardAddToCart = (product)=>{
        onAddToCart(product, 1, product.spec);
        setAddedItemIds((prev)=>({
                ...prev,
                [product.id]: true
            }));
        window.setTimeout(()=>{
            setAddedItemIds((prev)=>({
                    ...prev,
                    [product.id]: false
                }));
        }, 1500);
    };
    const handleCardBuyNow = (product)=>{
        if (onBuyNow) {
            onBuyNow(product, 1, product.spec);
        } else {
            onAddToCart(product, 1, product.spec);
            onNavigateUrl('/thanh-toan');
        }
    };
    const handleToggleWishlist = (productId)=>{
        setWishlistedIds((prev)=>({
                ...prev,
                [productId]: !prev[productId]
            }));
    };
    const handleOpenProductDetail = (slug)=>{
        onNavigateUrl(`/cua-hang/${slug}`);
    };
    const renderSavedForLaterSection = ()=>{
        if (savedForLater.length === 0) return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "data-testid": "saved-for-later-section",
            "aria-labelledby": "saved-for-later-heading",
            className: "rounded-[24px] border p-5 sm:p-6 space-y-4",
            style: {
                backgroundColor: 'var(--surface)',
                borderColor: 'var(--border)',
                boxShadow: 'var(--shadow)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between gap-2",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                className: "w-5 h-5",
                                style: {
                                    color: 'var(--primary)'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 205,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "saved-for-later-heading",
                                className: "font-heading text-xl font-bold",
                                style: {
                                    color: 'var(--primary)'
                                },
                                children: lang === 'vi' ? `Đã lưu để mua sau (${savedForLater.length})` : `Saved for later (${savedForLater.length})`
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 206,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CartPage.tsx",
                        lineNumber: 204,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/pages/CartPage.tsx",
                    lineNumber: 203,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y",
                    style: {
                        borderColor: 'var(--border)'
                    },
                    children: savedForLater.map((item)=>{
                        const catalogProd = products.find((p)=>p.id === item.productId) || item.product;
                        const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveProductSpecDetails"])(catalogProd, item.selectedSpec, lang);
                        const itemKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCartItemKey"])(item.productId, item.selectedSpec);
                        const displayName = lang === 'en' && item.product.nameEn ? item.product.nameEn : item.product.name;
                        const productSlug = item.product.slug || catalogProd.slug || item.productId;
                        const isOutOfStock = resolved.stock <= 0;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-testid": `saved-item-${item.productId}`,
                            className: "py-4 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3.5 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: `/cua-hang/${productSlug}`,
                                            onClick: (e)=>handleLinkClick(e, `/cua-hang/${productSlug}`),
                                            className: "w-18 h-18 rounded-2xl border p-2 shrink-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B]",
                                            style: {
                                                backgroundColor: '#FFFFFF',
                                                borderColor: 'var(--border)'
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: item.product.image,
                                                alt: displayName,
                                                className: "w-full h-full object-contain"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                lineNumber: 254,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 243,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "min-w-0 space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: `/cua-hang/${productSlug}`,
                                                    onClick: (e)=>handleLinkClick(e, `/cua-hang/${productSlug}`),
                                                    className: "font-heading text-base font-bold line-clamp-2 hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-sm",
                                                    style: {
                                                        color: 'var(--text)'
                                                    },
                                                    children: displayName
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 261,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-semibold",
                                                    style: {
                                                        color: 'var(--text-muted)'
                                                    },
                                                    children: resolved.displaySpec
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 271,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-extrabold",
                                                    style: {
                                                        color: 'var(--primary)'
                                                    },
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(resolved.unitPrice)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 260,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                    lineNumber: 242,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2.5 shrink-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            disabled: isOutOfStock,
                                            "data-testid": `move-to-cart-${item.productId}`,
                                            onClick: ()=>onMoveSavedToCart(item),
                                            className: "btn-secondary min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: lang === 'vi' ? 'Chuyển vào giỏ' : 'Move to cart'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 295,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>onRemoveSavedItem(itemKey),
                                            "aria-label": lang === 'vi' ? `Xóa ${displayName} khỏi danh sách đã lưu` : `Remove ${displayName} from saved list`,
                                            className: "min-h-[44px] px-3 py-2 rounded-full text-xs font-bold transition-colors hover:bg-[var(--surface-2)] focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? 'Xóa' : 'Remove'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 299,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                    lineNumber: 286,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, itemKey, true, {
                            fileName: "[project]/src/components/pages/CartPage.tsx",
                            lineNumber: 237,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0));
                    })
                }, void 0, false, {
                    fileName: "[project]/src/components/pages/CartPage.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/pages/CartPage.tsx",
            lineNumber: 193,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-testid": "cart-page",
        className: "pt-[calc(var(--nav-h)+24px)] pb-36 lg:pb-20 min-h-screen relative z-10",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sr-only",
                "aria-live": "polite",
                "aria-atomic": "true",
                "data-testid": "cart-live-region",
                children: liveQuantityAnnouncement
            }, void 0, false, {
                fileName: "[project]/src/components/pages/CartPage.tsx",
                lineNumber: 327,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shared-container space-y-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2.5 max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-testid": "cart-page-eyebrow",
                                className: "block uppercase font-bold",
                                style: {
                                    fontFamily: 'var(--font-body)',
                                    fontSize: '13px',
                                    fontWeight: 700,
                                    letterSpacing: '0.12em',
                                    color: 'var(--primary)'
                                },
                                children: lang === 'vi' ? 'GIỎ HÀNG' : 'SHOPPING CART'
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-heading font-extrabold leading-[1.14] tracking-[-0.02em]",
                                style: {
                                    fontSize: 'clamp(32px, 4vw, 48px)',
                                    color: 'var(--primary)'
                                },
                                children: [
                                    lang === 'vi' ? 'Giỏ hàng của bạn' : 'Your cart',
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-testid": "cart-page-item-count",
                                        className: "text-lg sm:text-2xl font-bold align-middle",
                                        style: {
                                            color: 'var(--text-muted)'
                                        },
                                        children: [
                                            "(",
                                            summary.totalQuantity,
                                            ' ',
                                            lang === 'vi' ? 'sản phẩm' : summary.totalQuantity === 1 ? 'item' : 'items',
                                            ")"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 360,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                "data-testid": "cart-page-subtitle",
                                className: "text-[18px] leading-relaxed font-normal",
                                style: {
                                    color: 'var(--text-muted)'
                                },
                                children: lang === 'vi' ? 'Kiểm tra sản phẩm, chọn quy cách và áp dụng mã ưu đãi trước khi thanh toán.' : 'Review your items, select package sizes, and apply promo codes before checkout.'
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 374,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CartPage.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    redirectNotice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        role: "alert",
                        "data-testid": "cart-redirect-notice",
                        className: "p-4 rounded-2xl border flex items-center justify-between gap-3",
                        style: {
                            backgroundColor: errorBgColor,
                            borderColor: errorBorderColor,
                            color: errorTextColor
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5 text-sm font-bold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                        className: "w-5 h-5 shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 398,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: redirectNotice
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 399,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 397,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: onClearRedirectNotice,
                                className: "min-h-[36px] px-3 py-1 rounded-full text-xs font-extrabold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                children: lang === 'vi' ? 'Đã hiểu' : 'Dismiss'
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 401,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CartPage.tsx",
                        lineNumber: 387,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    isEmpty ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-10",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-testid": "cart-page-empty-state",
                                className: "rounded-[24px] border p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-5",
                                style: {
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                    boxShadow: 'var(--shadow)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-20 h-20 rounded-full mx-auto flex items-center justify-center",
                                        style: {
                                            backgroundColor: 'var(--surface-2)',
                                            color: 'var(--primary)'
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paw$2d$print$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PawPrint$3e$__["PawPrint"], {
                                            className: "w-10 h-10"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 430,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 423,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "font-heading text-2xl sm:text-3xl font-extrabold",
                                        style: {
                                            color: 'var(--primary)'
                                        },
                                        children: lang === 'vi' ? 'Giỏ hàng của bạn đang trống' : 'Your cart is empty'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 432,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm sm:text-base max-w-md mx-auto font-medium",
                                        style: {
                                            color: 'var(--text-muted)'
                                        },
                                        children: lang === 'vi' ? 'Khám phá hạt hữu cơ, pate tươi, đồ chơi an toàn và sản phẩm chăm sóc sức khỏe cho các bé thú cưng tại Animora.' : 'Discover organic kibble, fresh wet food, safe toys, and veterinary care essentials for your beloved pets.'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 440,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/cua-hang",
                                            "data-testid": "empty-cart-explore-btn",
                                            onClick: (e)=>handleLinkClick(e, '/cua-hang'),
                                            className: "btn-primary min-h-[48px] px-8 py-3 rounded-full text-base font-bold inline-flex items-center justify-center gap-2 shadow-md focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 455,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: lang === 'vi' ? 'Khám phá cửa hàng' : 'Explore shop'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 456,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 449,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 448,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 414,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            renderSavedForLaterSection(),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                "aria-labelledby": "empty-cart-featured-heading",
                                className: "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "empty-cart-featured-heading",
                                        className: "font-heading text-2xl sm:text-3xl font-extrabold",
                                        style: {
                                            color: 'var(--primary)'
                                        },
                                        children: lang === 'vi' ? 'Sản phẩm nổi bật' : 'Featured products'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 471,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
                                        children: featuredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$ShopPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                                                product: product,
                                                lang: lang,
                                                isAdded: Boolean(addedItemIds[product.id]),
                                                isWishlisted: Boolean(wishlistedIds[product.id]),
                                                onToggleWishlist: handleToggleWishlist,
                                                onAddToCartClick: handleCardAddToCart,
                                                onBuyNowClick: handleCardBuyNow,
                                                onOpenProductDetail: handleOpenProductDetail
                                            }, product.id, false, {
                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                lineNumber: 480,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 478,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 467,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CartPage.tsx",
                        lineNumber: 413,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)) : /* Two-column Desktop Layout: LEFT (~62%) Item List, RIGHT (~38%) Sticky Summary */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col lg:flex-row items-start gap-7",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-full lg:w-[62%] space-y-8 min-w-0",
                                children: [
                                    !checkoutValidation.isValid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        role: "alert",
                                        "data-testid": "cart-blocking-alert",
                                        className: "p-4 rounded-2xl border flex items-start gap-3",
                                        style: {
                                            backgroundColor: errorBgColor,
                                            borderColor: errorBorderColor,
                                            color: errorTextColor
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                className: "w-5 h-5 shrink-0 mt-0.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-bold leading-snug",
                                                children: lang === 'vi' ? checkoutValidation.blockingMessageVi : checkoutValidation.blockingMessageEn
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                lineNumber: 513,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 502,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-[24px] border p-4 sm:p-6 divide-y",
                                        style: {
                                            backgroundColor: 'var(--surface)',
                                            borderColor: 'var(--border)',
                                            boxShadow: 'var(--shadow)'
                                        },
                                        children: cart.map((item)=>{
                                            const catalogProd = products.find((p)=>p.id === item.productId) || item.product;
                                            const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveProductSpecDetails"])(catalogProd, item.selectedSpec, lang);
                                            const itemKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCartItemKey"])(item.productId, item.selectedSpec);
                                            const validation = checkoutValidation.itemValidations[itemKey];
                                            const displayName = lang === 'en' && item.product.nameEn ? item.product.nameEn : item.product.name;
                                            const productSlug = item.product.slug || catalogProd.slug || item.productId;
                                            const unitPrice = item.unitPriceAtAdd ?? item.product.price;
                                            const oldPrice = resolved.oldPrice;
                                            const lineTotal = unitPrice * item.quantity;
                                            const hasMultipleSpecs = (resolved.specOptions?.length || 0) > 1;
                                            const isSpecOpen = openSpecSelectorKey === itemKey;
                                            const maxStock = validation && validation.stock > 0 ? validation.stock : 25;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-testid": `cart-row-${item.productId}`,
                                                className: "py-5 first:pt-1 last:pb-1 space-y-3",
                                                children: [
                                                    validation?.isOutOfStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        role: "alert",
                                                        "data-testid": `row-out-of-stock-${item.productId}`,
                                                        className: "p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold",
                                                        style: {
                                                            backgroundColor: errorBgColor,
                                                            borderColor: errorBorderColor,
                                                            color: errorTextColor
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                        className: "w-4 h-4 shrink-0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 579,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: lang === 'vi' ? 'Sản phẩm đã hết hàng' : 'This item is out of stock'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 580,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 578,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: ()=>onRemoveItemWithUndo(item),
                                                                className: "px-3 py-1 rounded-full text-xs font-extrabold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                children: lang === 'vi' ? 'Xóa khỏi giỏ' : 'Remove item'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 586,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 568,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    !validation?.isOutOfStock && validation?.hasPriceChanged && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        role: "alert",
                                                        "data-testid": `row-price-changed-${item.productId}`,
                                                        className: "p-3 rounded-xl border flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold",
                                                        style: {
                                                            backgroundColor: errorBgColor,
                                                            borderColor: errorBorderColor,
                                                            color: errorTextColor
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                                        className: "w-4 h-4 shrink-0"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 608,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: lang === 'vi' ? `Giá đã thay đổi từ ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(validation.oldRecordedPrice)} thành ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(validation.newCatalogPrice)}` : `Price changed from ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(validation.oldRecordedPrice)} to ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(validation.newCatalogPrice)}`
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 609,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 607,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        "data-testid": `accept-price-${item.productId}`,
                                                                        onClick: ()=>onAcceptPriceChange(itemKey),
                                                                        className: "px-3 py-1.5 rounded-full text-xs font-extrabold transition-colors focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                        style: {
                                                                            backgroundColor: 'var(--primary)',
                                                                            color: 'var(--on-primary)'
                                                                        },
                                                                        children: lang === 'vi' ? 'Chấp nhận giá mới' : 'Accept new price'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 616,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                        type: "button",
                                                                        onClick: ()=>onRemoveItemWithUndo(item),
                                                                        className: "px-2.5 py-1 rounded-full text-xs font-bold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                        children: lang === 'vi' ? 'Xóa' : 'Remove'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 630,
                                                                        columnNumber: 29
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 615,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex gap-4 items-start",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                href: `/cua-hang/${productSlug}`,
                                                                onClick: (e)=>handleLinkClick(e, `/cua-hang/${productSlug}`),
                                                                className: "w-[88px] h-[88px] rounded-2xl border p-2 shrink-0 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#FF7F6B]",
                                                                style: {
                                                                    backgroundColor: '#FFFFFF',
                                                                    borderColor: 'var(--border)'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: item.product.image,
                                                                    alt: displayName,
                                                                    className: `w-full h-full object-contain ${validation?.isOutOfStock ? 'opacity-50' : ''}`,
                                                                    referrerPolicy: "no-referrer"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                    lineNumber: 654,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 643,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex-1 min-w-0 space-y-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex flex-col sm:flex-row sm:items-start justify-between gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "min-w-0 space-y-1",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                                                        href: `/cua-hang/${productSlug}`,
                                                                                        onClick: (e)=>handleLinkClick(e, `/cua-hang/${productSlug}`),
                                                                                        "data-testid": `cart-item-name-${item.productId}`,
                                                                                        className: "font-heading text-base sm:text-lg font-bold leading-snug line-clamp-2 break-words hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-sm block",
                                                                                        style: {
                                                                                            color: 'var(--text)'
                                                                                        },
                                                                                        children: displayName
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 668,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex flex-wrap items-center gap-2 pt-0.5",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                "data-testid": `cart-item-spec-${item.productId}`,
                                                                                                className: "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border",
                                                                                                style: {
                                                                                                    backgroundColor: 'var(--bg)',
                                                                                                    borderColor: 'var(--border)',
                                                                                                    color: 'var(--text)'
                                                                                                },
                                                                                                children: resolved.displaySpec
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 682,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            hasMultipleSpecs && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                type: "button",
                                                                                                "data-testid": `change-spec-toggle-${item.productId}`,
                                                                                                "aria-expanded": isSpecOpen,
                                                                                                onClick: ()=>setOpenSpecSelectorKey((prev)=>prev === itemKey ? null : itemKey),
                                                                                                className: "text-xs font-extrabold underline px-1.5 py-1 rounded-md focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                                                style: {
                                                                                                    color: 'var(--primary)'
                                                                                                },
                                                                                                children: lang === 'vi' ? 'Đổi quy cách' : 'Change spec'
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 695,
                                                                                                columnNumber: 35
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 681,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    hasMultipleSpecs && isSpecOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        "data-testid": `spec-selector-panel-${item.productId}`,
                                                                                        className: "pt-1.5 flex flex-wrap gap-1.5",
                                                                                        children: resolved.specOptions.map((opt)=>{
                                                                                            const isSelected = opt.labelVi === resolved.specLabelVi;
                                                                                            const label = lang === 'en' ? opt.labelEn : opt.labelVi;
                                                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                type: "button",
                                                                                                onClick: ()=>{
                                                                                                    onChangeSpec(itemKey, opt.labelVi);
                                                                                                    setOpenSpecSelectorKey(null);
                                                                                                },
                                                                                                className: "min-h-[36px] px-3 py-1 rounded-full text-xs font-bold border transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                                                style: {
                                                                                                    backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg)',
                                                                                                    color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                                                                                                    borderColor: isSelected ? 'var(--primary)' : 'var(--border)'
                                                                                                },
                                                                                                children: [
                                                                                                    label,
                                                                                                    " · ",
                                                                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(opt.price)
                                                                                                ]
                                                                                            }, opt.labelVi, true, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 726,
                                                                                                columnNumber: 39
                                                                                            }, ("TURBOPACK compile-time value", void 0));
                                                                                        })
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 716,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                lineNumber: 667,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "sm:text-right shrink-0",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "flex sm:justify-end items-baseline gap-2",
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                "data-testid": `cart-item-unit-price-${item.productId}`,
                                                                                                className: "text-sm sm:text-base font-extrabold",
                                                                                                style: {
                                                                                                    color: 'var(--text)'
                                                                                                },
                                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(unitPrice)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 757,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            oldPrice && oldPrice > unitPrice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                className: "text-xs line-through font-medium",
                                                                                                style: {
                                                                                                    color: 'var(--text-muted)'
                                                                                                },
                                                                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(oldPrice)
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 765,
                                                                                                columnNumber: 35
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 756,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        className: "text-[11px] font-medium hidden sm:block",
                                                                                        style: {
                                                                                            color: 'var(--text-muted)'
                                                                                        },
                                                                                        children: lang === 'vi' ? 'Đơn giá' : 'Unit price'
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 773,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                lineNumber: 755,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 666,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "pt-2 flex flex-wrap items-center justify-between gap-3",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "flex flex-wrap items-center gap-3",
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "inline-flex items-center rounded-full border",
                                                                                        style: {
                                                                                            backgroundColor: 'var(--bg)',
                                                                                            borderColor: 'var(--border)'
                                                                                        },
                                                                                        children: [
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                type: "button",
                                                                                                "data-testid": `qty-decrease-${item.productId}`,
                                                                                                disabled: item.quantity <= 1 || Boolean(validation?.isOutOfStock),
                                                                                                onClick: ()=>{
                                                                                                    if (item.quantity > 1) {
                                                                                                        const nextQty = item.quantity - 1;
                                                                                                        onUpdateQuantity(itemKey, -1);
                                                                                                        setLiveQuantityAnnouncement(lang === 'vi' ? `Số lượng: ${nextQty}` : `Quantity: ${nextQty}`);
                                                                                                    }
                                                                                                },
                                                                                                "aria-label": lang === 'vi' ? `Giảm số lượng ${displayName}` : `Decrease quantity for ${displayName}`,
                                                                                                className: "w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                                                style: {
                                                                                                    color: 'var(--text)'
                                                                                                },
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                                                    className: "w-4 h-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                    lineNumber: 819,
                                                                                                    columnNumber: 35
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 793,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                "data-testid": `qty-value-${item.productId}`,
                                                                                                className: "text-sm font-extrabold min-w-[34px] text-center",
                                                                                                style: {
                                                                                                    color: 'var(--text)'
                                                                                                },
                                                                                                children: item.quantity
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 821,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                                type: "button",
                                                                                                "data-testid": `qty-increase-${item.productId}`,
                                                                                                disabled: item.quantity >= maxStock || Boolean(validation?.isOutOfStock),
                                                                                                onClick: ()=>{
                                                                                                    if (item.quantity < maxStock) {
                                                                                                        const nextQty = item.quantity + 1;
                                                                                                        onUpdateQuantity(itemKey, 1);
                                                                                                        setLiveQuantityAnnouncement(lang === 'vi' ? `Số lượng: ${nextQty}` : `Quantity: ${nextQty}`);
                                                                                                    }
                                                                                                },
                                                                                                "aria-label": lang === 'vi' ? `Tăng số lượng ${displayName}` : `Increase quantity for ${displayName}`,
                                                                                                className: "w-11 h-11 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--surface-2)] disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                                                                style: {
                                                                                                    color: 'var(--text)'
                                                                                                },
                                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                                    className: "w-4 h-4"
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                    lineNumber: 854,
                                                                                                    columnNumber: 35
                                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                                            }, void 0, false, {
                                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                                lineNumber: 828,
                                                                                                columnNumber: 33
                                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                                        ]
                                                                                    }, void 0, true, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 786,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    validation?.isLowStock && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        "data-testid": `low-stock-badge-${item.productId}`,
                                                                                        className: "text-xs font-extrabold px-2.5 py-1 rounded-full border",
                                                                                        style: {
                                                                                            backgroundColor: errorBgColor,
                                                                                            borderColor: errorBorderColor,
                                                                                            color: errorTextColor
                                                                                        },
                                                                                        children: lang === 'vi' ? `Chỉ còn ${validation.stock} sản phẩm` : `Only ${validation.stock} left in stock`
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 860,
                                                                                        columnNumber: 33
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                lineNumber: 784,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                className: "text-right ml-auto",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    "data-testid": `cart-item-line-total-${item.productId}`,
                                                                                    className: "font-heading text-lg sm:text-xl font-extrabold block",
                                                                                    style: {
                                                                                        color: 'var(--primary)'
                                                                                    },
                                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(lineTotal)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                    lineNumber: 878,
                                                                                    columnNumber: 31
                                                                                }, ("TURBOPACK compile-time value", void 0))
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                lineNumber: 877,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 783,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "pt-1 flex flex-wrap items-center gap-4",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                "data-testid": `save-for-later-${item.productId}`,
                                                                                onClick: ()=>onSaveForLater(item),
                                                                                className: "min-h-[44px] px-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-lg cursor-pointer",
                                                                                style: {
                                                                                    color: 'var(--text-muted)'
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 897,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: lang === 'vi' ? 'Lưu để mua sau' : 'Save for later'
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 898,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                lineNumber: 890,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                "data-testid": `remove-item-${item.productId}`,
                                                                                onClick: ()=>onRemoveItemWithUndo(item),
                                                                                "aria-label": lang === 'vi' ? 'Xóa khỏi giỏ hàng' : 'Remove from cart',
                                                                                className: "min-h-[44px] px-2 inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-lg cursor-pointer",
                                                                                style: {
                                                                                    color: errorTextColor
                                                                                },
                                                                                children: [
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                        className: "w-3.5 h-3.5"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 917,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                        children: lang === 'vi' ? 'Xóa' : 'Remove'
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                        lineNumber: 918,
                                                                                        columnNumber: 31
                                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                                ]
                                                                            }, void 0, true, {
                                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                                lineNumber: 905,
                                                                                columnNumber: 29
                                                                            }, ("TURBOPACK compile-time value", void 0))
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                        lineNumber: 889,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, itemKey, true, {
                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                lineNumber: 561,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 522,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    renderSavedForLaterSection(),
                                    featuredProducts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        "data-testid": "cart-you-may-also-like",
                                        "aria-labelledby": "cart-recommendations-heading",
                                        className: "pt-4 space-y-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-3",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                            className: "w-5 h-5",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 940,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            id: "cart-recommendations-heading",
                                                            className: "font-heading text-2xl sm:text-3xl font-extrabold",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            },
                                                            children: lang === 'vi' ? 'Có thể bạn cũng thích' : 'You may also like'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 944,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 939,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                lineNumber: 938,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5",
                                                children: featuredProducts.map((product)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pages$2f$ShopPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProductCard"], {
                                                        product: product,
                                                        lang: lang,
                                                        isAdded: Boolean(addedItemIds[product.id]),
                                                        isWishlisted: Boolean(wishlistedIds[product.id]),
                                                        onToggleWishlist: handleToggleWishlist,
                                                        onAddToCartClick: handleCardAddToCart,
                                                        onBuyNowClick: handleCardBuyNow,
                                                        onOpenProductDetail: handleOpenProductDetail
                                                    }, product.id, false, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 958,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                lineNumber: 956,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                        lineNumber: 933,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 499,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                "aria-label": lang === 'vi' ? 'Tóm tắt đơn hàng' : 'Order summary',
                                className: "w-full lg:w-[38%] lg:sticky lg:top-[calc(var(--nav-h)+24px)] space-y-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-testid": "cart-summary-card",
                                    className: "rounded-[24px] border p-5 sm:p-7 space-y-5",
                                    style: {
                                        backgroundColor: 'var(--surface)',
                                        borderColor: 'var(--border)',
                                        boxShadow: 'var(--shadow)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "font-heading text-xl sm:text-2xl font-extrabold",
                                            style: {
                                                color: 'var(--primary)'
                                            },
                                            children: lang === 'vi' ? 'Tóm tắt đơn hàng' : 'Order summary'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 991,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-testid": "cart-free-shipping-box",
                                            className: "p-3.5 rounded-2xl border space-y-2",
                                            style: {
                                                backgroundColor: 'var(--bg)',
                                                borderColor: 'var(--border)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2 text-xs sm:text-sm font-bold",
                                                    style: {
                                                        color: 'var(--text)'
                                                    },
                                                    children: summary.remainingForFreeShip > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                                className: "w-4 h-4 shrink-0",
                                                                style: {
                                                                    color: 'var(--primary)'
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 1013,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: lang === 'vi' ? `Mua thêm ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.remainingForFreeShip)} để được miễn phí vận chuyển` : `Add ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.remainingForFreeShip)} more for free shipping`
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 1017,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 1012,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "w-4 h-4 shrink-0 text-emerald-600"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 1025,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                style: {
                                                                    color: 'var(--primary)'
                                                                },
                                                                children: lang === 'vi' ? 'Bạn được miễn phí vận chuyển!' : 'You unlocked free shipping!'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 1026,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 1024,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1007,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-full h-2.5 rounded-full overflow-hidden",
                                                    style: {
                                                        backgroundColor: 'var(--surface-2)'
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        "data-testid": "cart-free-shipping-progress",
                                                        className: "h-full rounded-full transition-all duration-300",
                                                        style: {
                                                            width: `${summary.freeShipProgressPercent}%`,
                                                            backgroundColor: 'var(--primary)'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 1038,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1034,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 999,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "cart-coupon-input",
                                                    className: "block text-xs sm:text-sm font-bold",
                                                    style: {
                                                        color: 'var(--text)'
                                                    },
                                                    children: lang === 'vi' ? 'Mã giảm giá' : 'Coupon code'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1051,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                                    onSubmit: handleApplyCouponSubmit,
                                                    className: "flex gap-2",
                                                    noValidate: true,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                                    className: "w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none",
                                                                    style: {
                                                                        color: 'var(--text-muted)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                    lineNumber: 1064,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    id: "cart-coupon-input",
                                                                    "data-testid": "cart-coupon-input",
                                                                    type: "text",
                                                                    value: couponInput,
                                                                    onChange: (e)=>{
                                                                        setCouponInput(e.target.value);
                                                                        if (couponError) setCouponError(null);
                                                                    },
                                                                    placeholder: lang === 'vi' ? 'Nhập mã (VD: ANIMORA10)' : 'Enter code (e.g. ANIMORA10)',
                                                                    className: "form-input w-full pl-9 pr-3 uppercase font-bold text-sm"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                    lineNumber: 1068,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1063,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "submit",
                                                            "data-testid": "cart-coupon-apply-btn",
                                                            className: "btn-secondary min-h-[48px] px-4 rounded-2xl text-sm font-bold shrink-0 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                            children: lang === 'vi' ? 'Áp dụng' : 'Apply'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1085,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1058,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                couponError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    role: "alert",
                                                    "data-testid": "cart-coupon-error",
                                                    className: "text-xs sm:text-[13px] font-bold flex items-center gap-1.5 pt-0.5",
                                                    style: {
                                                        color: errorTextColor
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                            className: "w-3.5 h-3.5 shrink-0"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1102,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: couponError
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1103,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1096,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                summary.appliedCouponCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    "data-testid": "cart-applied-coupon-tag",
                                                    className: "flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-bold",
                                                    style: {
                                                        backgroundColor: 'var(--surface-2)',
                                                        borderColor: 'var(--border)',
                                                        color: 'var(--primary)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1.5",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                    className: "w-3.5 h-3.5 shrink-0"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                    lineNumber: 1118,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: lang === 'vi' ? `Mã ${summary.appliedCouponCode}: -${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.discountAmount)}` : `Code ${summary.appliedCouponCode}: -${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.discountAmount)}`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                    lineNumber: 1119,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1117,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "data-testid": "cart-remove-coupon-btn",
                                                            onClick: ()=>{
                                                                onRemoveCoupon();
                                                                setCouponInput('');
                                                                setCouponSuccess(null);
                                                                setCouponError(null);
                                                            },
                                                            className: "underline font-extrabold ml-2 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                            children: lang === 'vi' ? 'Gỡ' : 'Remove'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1125,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1108,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                couponSuccess && !couponError && !summary.appliedCouponCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs font-bold",
                                                    style: {
                                                        color: 'var(--primary)'
                                                    },
                                                    children: couponSuccess
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1141,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 1050,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 pt-3 border-t text-sm",
                                            style: {
                                                borderColor: 'var(--border)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            style: {
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: lang === 'vi' ? 'Tạm tính' : 'Subtotal'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1156,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-testid": "cart-summary-subtotal",
                                                            className: "font-bold",
                                                            style: {
                                                                color: 'var(--text)'
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.subtotal)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1162,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1155,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            style: {
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: lang === 'vi' ? 'Phí vận chuyển tạm tính' : 'Estimated shipping'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-testid": "cart-summary-shipping",
                                                            className: "font-bold",
                                                            style: {
                                                                color: 'var(--text)'
                                                            },
                                                            children: summary.shippingFee === 0 ? lang === 'vi' ? 'Miễn phí (0đ)' : 'Free (0đ)' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_SHIPPING_FEE"])
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1180,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1171,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-semibold",
                                                            style: {
                                                                color: 'var(--text-muted)'
                                                            },
                                                            children: lang === 'vi' ? 'Giảm giá' : 'Discount'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1194,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-testid": "cart-summary-discount",
                                                            className: "font-bold",
                                                            style: {
                                                                color: summary.discountAmount > 0 ? 'var(--primary)' : 'var(--text)'
                                                            },
                                                            children: summary.discountAmount > 0 ? `-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.discountAmount)}` : '0đ'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1200,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1193,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-3 border-t flex items-baseline justify-between",
                                                    style: {
                                                        borderColor: 'var(--border)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-base font-extrabold",
                                                            style: {
                                                                color: 'var(--text)'
                                                            },
                                                            children: lang === 'vi' ? 'Tổng cộng' : 'Total'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1220,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-testid": "cart-summary-total",
                                                            className: "font-heading text-2xl sm:text-3xl font-extrabold",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            },
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.total)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1226,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1216,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 1151,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "cart-order-note",
                                                    className: "block text-xs sm:text-sm font-bold",
                                                    style: {
                                                        color: 'var(--text)'
                                                    },
                                                    children: lang === 'vi' ? 'Ghi chú đơn hàng (không bắt buộc)' : 'Order note (optional)'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1238,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    id: "cart-order-note",
                                                    "data-testid": "cart-order-note",
                                                    rows: 2,
                                                    value: orderNote,
                                                    onChange: (e)=>onChangeOrderNote(e.target.value),
                                                    placeholder: lang === 'vi' ? 'Ví dụ: Giao giờ hành chính, gọi trước khi giao...' : 'E.g., Deliver during business hours, call before arrival...',
                                                    className: "w-full rounded-2xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F6B]",
                                                    style: {
                                                        backgroundColor: 'var(--bg)',
                                                        borderColor: 'var(--border)',
                                                        color: 'var(--text)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1247,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 1237,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-3 pt-1",
                                            children: [
                                                checkoutValidation.isValid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "/thanh-toan",
                                                    "data-testid": "cart-proceed-checkout-btn",
                                                    onClick: (e)=>handleLinkClick(e, '/thanh-toan'),
                                                    className: "btn-primary w-full h-[52px] rounded-full text-base font-extrabold flex items-center justify-center gap-2 shadow-lg focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: lang === 'vi' ? 'Tiến hành thanh toán' : 'Proceed to checkout'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 1276,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1270,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    disabled: true,
                                                    "data-testid": "cart-proceed-checkout-btn",
                                                    "aria-disabled": "true",
                                                    className: "btn-primary w-full h-[52px] rounded-full text-base font-extrabold flex items-center justify-center gap-2 opacity-50 cursor-not-allowed",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: lang === 'vi' ? 'Tiến hành thanh toán' : 'Proceed to checkout'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 1290,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                        href: "/cua-hang",
                                                        "data-testid": "cart-continue-shopping-link",
                                                        onClick: (e)=>handleLinkClick(e, '/cua-hang'),
                                                        className: "inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-full cursor-pointer",
                                                        style: {
                                                            color: 'var(--primary)'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 1306,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: lang === 'vi' ? 'Tiếp tục mua sắm' : 'Continue shopping'
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                                                lineNumber: 1307,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/CartPage.tsx",
                                                        lineNumber: 1299,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1298,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 1268,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pt-4 border-t grid grid-cols-2 gap-2.5 text-xs font-bold",
                                            style: {
                                                borderColor: 'var(--border)',
                                                color: 'var(--text-muted)'
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
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1325,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Giao nhanh' : 'Fast delivery'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1329,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1324,
                                                    columnNumber: 19
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
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Đổi trả 7 ngày' : '7-day returns'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1338,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1333,
                                                    columnNumber: 19
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
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1343,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Hàng chính hãng' : '100% authentic'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1347,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1342,
                                                    columnNumber: 19
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
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1352,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'COD' : 'Cash on delivery'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                                            lineNumber: 1356,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                                    lineNumber: 1351,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CartPage.tsx",
                                            lineNumber: 1317,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                    lineNumber: 982,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 976,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/pages/CartPage.tsx",
                        lineNumber: 497,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pages/CartPage.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            !isEmpty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                "data-testid": "cart-mobile-bottom-bar",
                className: "lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t px-4 py-3 shadow-2xl",
                style: {
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border)'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1200px] mx-auto flex items-center justify-between gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-bold block",
                                    style: {
                                        color: 'var(--text-muted)'
                                    },
                                    children: lang === 'vi' ? 'Tổng thanh toán' : 'Total'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                    lineNumber: 1379,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-testid": "cart-mobile-total",
                                    className: "font-heading text-xl font-extrabold",
                                    style: {
                                        color: 'var(--primary)'
                                    },
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.total)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/CartPage.tsx",
                                    lineNumber: 1385,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CartPage.tsx",
                            lineNumber: 1378,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        checkoutValidation.isValid ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: "/thanh-toan",
                            "data-testid": "cart-mobile-checkout-btn",
                            onClick: (e)=>handleLinkClick(e, '/thanh-toan'),
                            className: "btn-primary min-h-[48px] px-6 rounded-full text-sm font-extrabold inline-flex items-center justify-center gap-2 shadow-md focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: lang === 'vi' ? 'Thanh toán' : 'Checkout'
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 1401,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CartPage.tsx",
                            lineNumber: 1395,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            disabled: true,
                            "data-testid": "cart-mobile-checkout-btn",
                            className: "btn-primary min-h-[48px] px-6 rounded-full text-sm font-extrabold inline-flex items-center justify-center gap-2 opacity-50 cursor-not-allowed",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: lang === 'vi' ? 'Thanh toán' : 'Checkout'
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CartPage.tsx",
                                lineNumber: 1410,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CartPage.tsx",
                            lineNumber: 1404,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CartPage.tsx",
                    lineNumber: 1377,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/pages/CartPage.tsx",
                lineNumber: 1369,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pages/CartPage.tsx",
        lineNumber: 322,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CartPage, "GlJK/YTcnMoft4rKs7pCc3FXrV0=");
_c = CartPage;
var _c;
__turbopack_context__.k.register(_c, "CartPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_pages_CartPage_tsx_0frmyz8gybwsj._.js.map