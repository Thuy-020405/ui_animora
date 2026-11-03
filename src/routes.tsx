import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/guards/ProtectedRoute';
import { LoadingPage } from '@/components/common/feedback/LoadingPage';

const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const AdoptionPage = lazy(() => import('@/pages/AdoptionPage'));
const PetDetailPage = lazy(() => import('@/pages/PetDetailPage'));
const AdoptionFormPage = lazy(() => import('@/pages/AdoptionFormPage'));
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const OrdersPage = lazy(() => import('@/pages/OrdersPage'));
const OrderDetailPage = lazy(() => import('@/pages/OrderDetailPage'));
const BookingPage = lazy(() => import('@/pages/BookingPage'));
const BookingsPage = lazy(() => import('@/pages/BookingsPage'));
const PetProfilesPage = lazy(() => import('@/pages/PetProfilesPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<LoadingPage />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(HomePage) },
      { path: 've-chung-toi', element: withSuspense(AboutPage) },
      { path: 'dich-vu', element: withSuspense(ServicesPage) },
      { path: 'dich-vu/:slug', element: withSuspense(ServiceDetailPage) },
      { path: 'nhan-nuoi', element: withSuspense(AdoptionPage) },
      { path: 'nhan-nuoi/:slug', element: withSuspense(PetDetailPage) },
      { path: 'nhan-nuoi/:slug/dang-ky', element: withSuspense(AdoptionFormPage) },
      { path: 'cua-hang', element: withSuspense(ShopPage) },
      { path: 'cua-hang/:slug', element: withSuspense(ProductDetailPage) },
      { path: 'gio-hang', element: withSuspense(CartPage) },
      { path: 'dat-lich', element: withSuspense(BookingPage) },
      { path: 'don-hang', element: withSuspense(OrdersPage) },
      { path: 'don-hang/:code', element: withSuspense(OrderDetailPage) },
      
      // Protected routes (requires user login if auth check enabled)
      {
        element: <ProtectedRoute />,
        children: [
          { path: 'thanh-toan', element: withSuspense(CheckoutPage) },
          { path: 'lich-hen', element: withSuspense(BookingsPage) },
          { path: 'ho-so-thu-cung', element: withSuspense(PetProfilesPage) },
        ],
      },
      
      { path: '*', element: withSuspense(NotFoundPage) },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'dang-nhap', element: withSuspense(LoginPage) },
    ],
  },
]);
