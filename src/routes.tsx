import React, { Suspense, lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { MainLayout } from '@/layouts/MainLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { ProtectedRoute } from '@/guards/ProtectedRoute';
import { LoadingPage } from '@/components/common/feedback/LoadingPage';

const HomePage = lazy(() => import('@/views/HomePage'));
const AboutPage = lazy(() => import('@/views/AboutPage'));
const ServicesPage = lazy(() => import('@/views/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/views/ServiceDetailPage'));
const AdoptionPage = lazy(() => import('@/views/AdoptionPage'));
const PetDetailPage = lazy(() => import('@/views/PetDetailPage'));
const AdoptionFormPage = lazy(() => import('@/views/AdoptionFormPage'));
const ShopPage = lazy(() => import('@/views/ShopPage'));
const ProductDetailPage = lazy(() => import('@/views/ProductDetailPage'));
const CartPage = lazy(() => import('@/views/CartPage'));
const CheckoutPage = lazy(() => import('@/views/CheckoutPage'));
const OrdersPage = lazy(() => import('@/views/OrdersPage'));
const OrderDetailPage = lazy(() => import('@/views/OrderDetailPage'));
const BookingPage = lazy(() => import('@/views/BookingPage'));
const BookingsPage = lazy(() => import('@/views/BookingsPage'));
const PetProfilesPage = lazy(() => import('@/views/PetProfilesPage'));
const LoginPage = lazy(() => import('@/views/LoginPage'));
const NotFoundPage = lazy(() => import('@/views/NotFoundPage'));

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
