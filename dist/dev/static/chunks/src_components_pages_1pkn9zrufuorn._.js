(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/pages/CheckoutPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CheckoutPage",
    ()=>CheckoutPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/credit-card.js [app-client] (ecmascript) <export default as CreditCard>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/cartLogic.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config/cartConstants.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
const CheckoutPage = ({ lang, darkMode = false, cart, products, currentUser, appliedCoupon, orderNote, onChangeOrderNote, onReturnToCartWithNotice, onCompleteOrder, onNavigate, onNavigateUrl })=>{
    _s();
    const defaultAddress = currentUser?.addresses?.find((a)=>a.isDefault)?.addressLine || currentUser?.addresses?.[0]?.addressLine || '';
    const [recipientName, setRecipientName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentUser?.fullName || '');
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(currentUser?.phone || '');
    const [address, setAddress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultAddress);
    const [paymentMethod, setPaymentMethod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('cod');
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [submittedOrder, setSubmittedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Re-validate stock and prices when entering checkout
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CheckoutPage.useEffect": ()=>{
            if (submittedOrder) return;
            if (cart.length === 0) {
                onReturnToCartWithNotice(lang === 'vi' ? 'Giỏ hàng đang trống' : 'Your cart is empty');
                return;
            }
            const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateCartForCheckout"])(cart, products);
            if (!validation.isValid) {
                const msg = lang === 'vi' ? validation.blockingMessageVi || 'Giỏ hàng có thay đổi về giá hoặc tồn kho. Vui lòng kiểm tra lại.' : validation.blockingMessageEn || 'Cart prices or stock have changed. Please review your cart.';
                onReturnToCartWithNotice(msg);
            }
        }
    }["CheckoutPage.useEffect"], [
        cart,
        products,
        lang,
        onReturnToCartWithNotice,
        submittedOrder
    ]);
    const summary = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["calculateCartSummary"])(cart, appliedCoupon, products);
    const errorTextColor = darkMode ? '#FDA29B' : '#B42318';
    const handleLinkClick = (e, targetPath)=>{
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
            return;
        }
        e.preventDefault();
        onNavigateUrl(targetPath);
    };
    const handleSubmitOrder = (e)=>{
        e.preventDefault();
        // Re-validate stock and prices on submit
        if (cart.length === 0) {
            onReturnToCartWithNotice(lang === 'vi' ? 'Giỏ hàng đang trống' : 'Your cart is empty');
            return;
        }
        const validation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateCartForCheckout"])(cart, products);
        if (!validation.isValid) {
            const msg = lang === 'vi' ? validation.blockingMessageVi || 'Giỏ hàng có thay đổi về giá hoặc tồn kho. Vui lòng kiểm tra lại.' : validation.blockingMessageEn || 'Cart prices or stock have changed. Please review your cart.';
            onReturnToCartWithNotice(msg);
            return;
        }
        const nextErrors = {};
        if (!recipientName.trim()) {
            nextErrors.recipientName = lang === 'vi' ? 'Vui lòng nhập họ tên người nhận' : 'Please enter recipient name';
        }
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 9 || cleanPhone.length > 11) {
            nextErrors.phone = lang === 'vi' ? 'Vui lòng nhập số điện thoại hợp lệ (10 chữ số)' : 'Please enter a valid phone number';
        }
        if (!address.trim()) {
            nextErrors.address = lang === 'vi' ? 'Vui lòng nhập địa chỉ nhận hàng' : 'Please enter shipping address';
        }
        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }
        const orderCode = `DH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const orderInfo = {
            orderCode,
            recipientName: recipientName.trim(),
            phone: phone.trim(),
            address: address.trim(),
            paymentMethod,
            note: orderNote.trim(),
            total: summary.total,
            itemsCount: summary.totalQuantity
        };
        setSubmittedOrder(orderInfo);
        onCompleteOrder(orderInfo);
    };
    if (submittedOrder) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-testid": "checkout-success",
            className: "pt-[calc(var(--nav-h)+32px)] pb-20 min-h-screen relative z-10",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "shared-container max-w-2xl mx-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-[24px] border p-8 sm:p-12 text-center space-y-6",
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
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-10 h-10"
                            }, void 0, false, {
                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                lineNumber: 219,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 212,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xs font-extrabold uppercase tracking-widest",
                                    style: {
                                        color: 'var(--primary)'
                                    },
                                    children: lang === 'vi' ? 'ĐẶT HÀNG THÀNH CÔNG' : 'ORDER CONFIRMED'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "font-heading text-2xl sm:text-4xl font-extrabold",
                                    style: {
                                        color: 'var(--primary)'
                                    },
                                    children: lang === 'vi' ? `Cảm ơn ${submittedOrder.recipientName}!` : `Thank you, ${submittedOrder.recipientName}!`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm sm:text-base font-medium",
                                    style: {
                                        color: 'var(--text-muted)'
                                    },
                                    children: lang === 'vi' ? `Mã đơn hàng ${submittedOrder.orderCode} đang được đội ngũ Animora chuẩn bị đóng gói.` : `Order ${submittedOrder.orderCode} is being prepared by the Animora team.`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-5 rounded-2xl border text-left space-y-2.5 text-sm",
                            style: {
                                backgroundColor: 'var(--bg)',
                                borderColor: 'var(--border)'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? 'Mã đơn hàng:' : 'Order code:'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 255,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-extrabold",
                                            style: {
                                                color: 'var(--primary)'
                                            },
                                            children: submittedOrder.orderCode
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 254,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? 'Người nhận:' : 'Recipient:'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            style: {
                                                color: 'var(--text)'
                                            },
                                            children: [
                                                submittedOrder.recipientName,
                                                " · ",
                                                submittedOrder.phone
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 266,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 262,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? 'Địa chỉ:' : 'Address:'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 271,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-right",
                                            style: {
                                                color: 'var(--text)'
                                            },
                                            children: submittedOrder.address
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 274,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 270,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                submittedOrder.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            style: {
                                                color: 'var(--text-muted)'
                                            },
                                            children: lang === 'vi' ? 'Ghi chú:' : 'Order note:'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 283,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold text-right",
                                            style: {
                                                color: 'var(--text)'
                                            },
                                            children: submittedOrder.note
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 286,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 282,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "pt-2.5 border-t flex justify-between items-baseline",
                                    style: {
                                        borderColor: 'var(--border)'
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold",
                                            style: {
                                                color: 'var(--text)'
                                            },
                                            children: lang === 'vi' ? 'Tổng thanh toán:' : 'Total amount:'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 298,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-heading text-xl font-extrabold",
                                            style: {
                                                color: 'var(--primary)'
                                            },
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(submittedOrder.total)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 301,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 294,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 247,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-2 flex flex-wrap items-center justify-center gap-3",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "/cua-hang",
                                onClick: (e)=>handleLinkClick(e, '/cua-hang'),
                                className: "btn-primary min-h-[48px] px-7 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 316,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: lang === 'vi' ? 'Tiếp tục mua sắm' : 'Continue shopping'
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 317,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                lineNumber: 311,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 310,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                    lineNumber: 204,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                lineNumber: 203,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
            lineNumber: 199,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-testid": "checkout-page",
        className: "pt-[calc(var(--nav-h)+24px)] pb-20 min-h-screen relative z-10",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "shared-container space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2.5 max-w-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "data-testid": "checkout-page-eyebrow",
                            className: "block uppercase font-bold",
                            style: {
                                fontFamily: 'var(--font-body)',
                                fontSize: '13px',
                                fontWeight: 700,
                                letterSpacing: '0.12em',
                                color: 'var(--primary)'
                            },
                            children: lang === 'vi' ? 'THANH TOÁN' : 'CHECKOUT'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 336,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-heading font-extrabold leading-[1.14] tracking-[-0.02em]",
                            style: {
                                fontSize: 'clamp(32px, 4vw, 48px)',
                                color: 'var(--primary)'
                            },
                            children: lang === 'vi' ? 'Thanh toán đơn hàng' : 'Checkout'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 349,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            "data-testid": "checkout-page-subtitle",
                            className: "text-[18px] leading-relaxed font-normal",
                            style: {
                                color: 'var(--text-muted)'
                            },
                            children: lang === 'vi' ? 'Điền thông tin nhận hàng và chọn phương thức thanh toán thuận tiện nhất.' : 'Enter your shipping details and choose your preferred payment method.'
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 358,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                    lineNumber: 335,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmitOrder,
                    noValidate: true,
                    className: "flex flex-col lg:flex-row items-start gap-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full lg:w-[62%] space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                            children: lang === 'vi' ? 'Thông tin nhận hàng' : 'Shipping details'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 384,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "checkout-name",
                                                            className: "flex items-center gap-1.5 text-sm font-bold",
                                                            style: {
                                                                color: 'var(--text)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                                    className: "w-4 h-4",
                                                                    style: {
                                                                        color: 'var(--primary)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 398,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: lang === 'vi' ? 'Họ và tên người nhận *' : 'Recipient name *'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 399,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 393,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "checkout-name",
                                                            "data-testid": "checkout-name-input",
                                                            type: "text",
                                                            value: recipientName,
                                                            onChange: (e)=>{
                                                                setRecipientName(e.target.value);
                                                                if (errors.recipientName) setErrors((prev)=>({
                                                                        ...prev,
                                                                        recipientName: undefined
                                                                    }));
                                                            },
                                                            placeholder: lang === 'vi' ? 'Nguyễn Thảo Nhi' : 'Full name',
                                                            className: "form-input w-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 403,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        errors.recipientName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            role: "alert",
                                                            className: "text-xs font-bold",
                                                            style: {
                                                                color: errorTextColor
                                                            },
                                                            children: errors.recipientName
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 417,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 392,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "space-y-1.5",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "checkout-phone",
                                                            className: "flex items-center gap-1.5 text-sm font-bold",
                                                            style: {
                                                                color: 'var(--text)'
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                    className: "w-4 h-4",
                                                                    style: {
                                                                        color: 'var(--primary)'
                                                                    }
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: lang === 'vi' ? 'Số điện thoại *' : 'Phone number *'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 434,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 428,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "checkout-phone",
                                                            "data-testid": "checkout-phone-input",
                                                            type: "tel",
                                                            inputMode: "numeric",
                                                            value: phone,
                                                            onChange: (e)=>{
                                                                setPhone(e.target.value);
                                                                if (errors.phone) setErrors((prev)=>({
                                                                        ...prev,
                                                                        phone: undefined
                                                                    }));
                                                            },
                                                            placeholder: "0901234567",
                                                            className: "form-input w-full"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 436,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        errors.phone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            role: "alert",
                                                            className: "text-xs font-bold",
                                                            style: {
                                                                color: errorTextColor
                                                            },
                                                            children: errors.phone
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 451,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 427,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 391,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "checkout-address",
                                                    className: "flex items-center gap-1.5 text-sm font-bold",
                                                    style: {
                                                        color: 'var(--text)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                            className: "w-4 h-4",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 468,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Địa chỉ nhận hàng chi tiết *' : 'Shipping address *'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 469,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    id: "checkout-address",
                                                    "data-testid": "checkout-address-input",
                                                    type: "text",
                                                    value: address,
                                                    onChange: (e)=>{
                                                        setAddress(e.target.value);
                                                        if (errors.address) setErrors((prev)=>({
                                                                ...prev,
                                                                address: undefined
                                                            }));
                                                    },
                                                    placeholder: lang === 'vi' ? 'Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố' : 'Street address, ward, district, city',
                                                    className: "form-input w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 475,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                errors.address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    role: "alert",
                                                    className: "text-xs font-bold",
                                                    style: {
                                                        color: errorTextColor
                                                    },
                                                    children: errors.address
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 462,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "checkout-order-note",
                                                    className: "flex items-center gap-1.5 text-sm font-bold",
                                                    style: {
                                                        color: 'var(--text)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                            className: "w-4 h-4",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 510,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: lang === 'vi' ? 'Ghi chú đơn hàng' : 'Order note'
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 511,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 505,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                    id: "checkout-order-note",
                                                    "data-testid": "checkout-order-note",
                                                    rows: 2,
                                                    value: orderNote,
                                                    onChange: (e)=>onChangeOrderNote(e.target.value),
                                                    placeholder: lang === 'vi' ? 'Ghi chú giao hàng cho shipper...' : 'Delivery instructions...',
                                                    className: "w-full rounded-2xl border p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF7F6B]",
                                                    style: {
                                                        backgroundColor: 'var(--bg)',
                                                        borderColor: 'var(--border)',
                                                        color: 'var(--text)'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 504,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 376,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-[24px] border p-5 sm:p-7 space-y-4",
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
                                            children: lang === 'vi' ? 'Phương thức thanh toán' : 'Payment method'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 547,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPaymentMethod('cod'),
                                                    "aria-pressed": paymentMethod === 'cod',
                                                    className: "p-4 rounded-2xl border text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                    style: {
                                                        backgroundColor: paymentMethod === 'cod' ? 'var(--surface-2)' : 'var(--bg)',
                                                        borderColor: paymentMethod === 'cod' ? 'var(--primary)' : 'var(--border)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                            className: "w-5 h-5 shrink-0 mt-0.5",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 567,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-extrabold",
                                                                    style: {
                                                                        color: 'var(--text)'
                                                                    },
                                                                    children: lang === 'vi' ? 'Thanh toán khi nhận hàng (COD)' : 'Cash on Delivery (COD)'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 572,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs mt-0.5",
                                                                    style: {
                                                                        color: 'var(--text-muted)'
                                                                    },
                                                                    children: lang === 'vi' ? 'Kiểm tra hàng trước khi thanh toán' : 'Inspect package upon delivery'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 577,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 571,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 555,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setPaymentMethod('bank'),
                                                    "aria-pressed": paymentMethod === 'bank',
                                                    className: "p-4 rounded-2xl border text-left flex items-start gap-3 transition-all focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                                    style: {
                                                        backgroundColor: paymentMethod === 'bank' ? 'var(--surface-2)' : 'var(--bg)',
                                                        borderColor: paymentMethod === 'bank' ? 'var(--primary)' : 'var(--border)'
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$credit$2d$card$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CreditCard$3e$__["CreditCard"], {
                                                            className: "w-5 h-5 shrink-0 mt-0.5",
                                                            style: {
                                                                color: 'var(--primary)'
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 597,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm font-extrabold",
                                                                    style: {
                                                                        color: 'var(--text)'
                                                                    },
                                                                    children: lang === 'vi' ? 'Chuyển khoản ngân hàng / VietQR' : 'Bank Transfer / VietQR'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 602,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs mt-0.5",
                                                                    style: {
                                                                        color: 'var(--text-muted)'
                                                                    },
                                                                    children: lang === 'vi' ? 'Xác nhận tự động qua mã QR' : 'Instant verification via QR'
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 607,
                                                                    columnNumber: 21
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                            lineNumber: 601,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 585,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 554,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                    lineNumber: 539,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 375,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                            className: "w-full lg:w-[38%] lg:sticky lg:top-[calc(var(--nav-h)+24px)]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "data-testid": "checkout-summary-card",
                                className: "rounded-[24px] border p-5 sm:p-7 space-y-5",
                                style: {
                                    backgroundColor: 'var(--surface)',
                                    borderColor: 'var(--border)',
                                    boxShadow: 'var(--shadow)'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "font-heading text-xl font-extrabold",
                                                style: {
                                                    color: 'var(--primary)'
                                                },
                                                children: lang === 'vi' ? 'Đơn hàng của bạn' : 'Your order'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 630,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "/gio-hang",
                                                onClick: (e)=>handleLinkClick(e, '/gio-hang'),
                                                className: "text-xs font-extrabold underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-sm",
                                                style: {
                                                    color: 'var(--primary)'
                                                },
                                                children: lang === 'vi' ? 'Sửa giỏ hàng' : 'Edit cart'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 636,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 629,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-3 max-h-[280px] overflow-y-auto pr-1 divide-y",
                                        style: {
                                            borderColor: 'var(--border)'
                                        },
                                        children: cart.map((item)=>{
                                            const catalogProd = products.find((p)=>p.id === item.productId) || item.product;
                                            const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveProductSpecDetails"])(catalogProd, item.selectedSpec, lang);
                                            const displayName = lang === 'en' && item.product.nameEn ? item.product.nameEn : item.product.name;
                                            const unitPrice = item.unitPriceAtAdd ?? item.product.price;
                                            const itemKey = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCartItemKey"])(item.productId, item.selectedSpec);
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-3 first:pt-0 flex items-center justify-between gap-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-3 min-w-0",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-12 h-12 rounded-xl border p-1 shrink-0 flex items-center justify-center",
                                                                style: {
                                                                    backgroundColor: '#FFFFFF',
                                                                    borderColor: 'var(--border)'
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                    src: item.product.image,
                                                                    alt: displayName,
                                                                    className: "w-full h-full object-contain"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                    lineNumber: 682,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                lineNumber: 675,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "min-w-0",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-bold line-clamp-1",
                                                                        style: {
                                                                            color: 'var(--text)'
                                                                        },
                                                                        children: displayName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                        lineNumber: 689,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs font-medium",
                                                                        style: {
                                                                            color: 'var(--text-muted)'
                                                                        },
                                                                        children: [
                                                                            resolved.displaySpec,
                                                                            " × ",
                                                                            item.quantity
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                        lineNumber: 695,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                                lineNumber: 688,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 674,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-extrabold shrink-0",
                                                        style: {
                                                            color: 'var(--primary)'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(unitPrice * item.quantity)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 703,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, itemKey, true, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 670,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0));
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 647,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    summary.appliedCouponCode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-testid": "checkout-applied-coupon",
                                        className: "px-3.5 py-2.5 rounded-xl border flex items-center justify-between text-xs font-bold",
                                        style: {
                                            backgroundColor: 'var(--surface-2)',
                                            borderColor: 'var(--border)',
                                            color: 'var(--primary)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 726,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: lang === 'vi' ? `Mã giảm giá: ${summary.appliedCouponCode}` : `Coupon: ${summary.appliedCouponCode}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 727,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 725,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    "-",
                                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.discountAmount)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 733,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 716,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2.5 pt-3 border-t text-sm",
                                        style: {
                                            borderColor: 'var(--border)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--text-muted)'
                                                        },
                                                        children: lang === 'vi' ? 'Tạm tính' : 'Subtotal'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 743,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-testid": "checkout-subtotal",
                                                        className: "font-bold",
                                                        style: {
                                                            color: 'var(--text)'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.subtotal)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 746,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 742,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--text-muted)'
                                                        },
                                                        children: lang === 'vi' ? 'Phí vận chuyển' : 'Shipping fee'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 755,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-testid": "checkout-shipping",
                                                        className: "font-bold",
                                                        style: {
                                                            color: 'var(--text)'
                                                        },
                                                        children: summary.shippingFee === 0 ? lang === 'vi' ? 'Miễn phí (0đ)' : 'Free (0đ)' : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2f$cartConstants$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STANDARD_SHIPPING_FEE"])
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 754,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        style: {
                                                            color: 'var(--text-muted)'
                                                        },
                                                        children: lang === 'vi' ? 'Giảm giá' : 'Discount'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 771,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-testid": "checkout-discount",
                                                        className: "font-bold",
                                                        style: {
                                                            color: summary.discountAmount > 0 ? 'var(--primary)' : 'var(--text)'
                                                        },
                                                        children: summary.discountAmount > 0 ? `-${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.discountAmount)}` : '0đ'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 774,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 770,
                                                columnNumber: 17
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
                                                        children: lang === 'vi' ? 'Tổng thanh toán' : 'Total'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 793,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-testid": "checkout-total",
                                                        className: "font-heading text-2xl sm:text-3xl font-extrabold",
                                                        style: {
                                                            color: 'var(--primary)'
                                                        },
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$cartLogic$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatVnd"])(summary.total)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                        lineNumber: 799,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 789,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 738,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        "data-testid": "checkout-submit-order-btn",
                                        className: "btn-primary w-full h-[52px] rounded-full text-base font-extrabold flex items-center justify-center gap-2 shadow-lg focus-visible:outline-2 focus-visible:outline-[#FF7F6B] cursor-pointer",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 814,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: lang === 'vi' ? 'Đặt hàng ngay' : 'Place order'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                lineNumber: 815,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 809,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "/gio-hang",
                                            "data-testid": "checkout-back-to-cart-link",
                                            onClick: (e)=>handleLinkClick(e, '/gio-hang'),
                                            className: "inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 text-sm font-bold hover:underline focus-visible:outline-2 focus-visible:outline-[#FF7F6B] rounded-full cursor-pointer",
                                            style: {
                                                color: 'var(--primary)'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 828,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: lang === 'vi' ? 'Quay lại giỏ hàng' : 'Back to cart'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                                    lineNumber: 829,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                            lineNumber: 821,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                        lineNumber: 820,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                                lineNumber: 620,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                            lineNumber: 619,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/pages/CheckoutPage.tsx",
                    lineNumber: 369,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/pages/CheckoutPage.tsx",
            lineNumber: 333,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/pages/CheckoutPage.tsx",
        lineNumber: 329,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CheckoutPage, "PVSVEjE/vJUwRnbfIshVSxKe8Lo=");
_c = CheckoutPage;
var _c;
__turbopack_context__.k.register(_c, "CheckoutPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/pages/PetProfilesPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PetProfilesPage",
    ()=>PetProfilesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PetProfiles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PetProfiles.tsx [app-client] (ecmascript)");
;
;
const PetProfilesPage = ({ lang, pets, vaccinations, onUpdatePet, onAddPet, onBookService, onAddBooking, onShowToast })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-testid": "page-pet-profiles",
        className: "pb-12",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PetProfiles$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PetProfiles"], {
            lang: lang,
            pets: pets,
            vaccinations: vaccinations,
            onUpdatePet: onUpdatePet,
            onAddPet: onAddPet,
            onBookService: onBookService,
            onAddBooking: onAddBooking,
            onShowToast: onShowToast
        }, void 0, false, {
            fileName: "[project]/src/components/pages/PetProfilesPage.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/pages/PetProfilesPage.tsx",
        lineNumber: 34,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = PetProfilesPage;
var _c;
__turbopack_context__.k.register(_c, "PetProfilesPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_pages_1pkn9zrufuorn._.js.map