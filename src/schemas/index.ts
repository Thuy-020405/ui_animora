import { z } from 'zod';
import { VALID_VN_PHONE_PREFIXES } from '@/utils/phone';

export const phoneSchema = z
  .string()
  .min(1, { message: 'Vui lòng nhập số điện thoại' })
  .transform((val) => val.replace(/\D/g, ''))
  .refine((val) => val.length === 10, { message: 'Số điện thoại cần đủ 10 số' })
  .refine((val) => VALID_VN_PHONE_PREFIXES.includes(val.slice(0, 2)), {
    message: 'Số điện thoại phải bắt đầu bằng 03, 05, 07, 08 hoặc 09',
  });

export const emailSchema = z
  .string()
  .min(1, { message: 'Vui lòng nhập địa chỉ email' })
  .email({ message: 'Địa chỉ email không hợp lệ' });

export const bookingSchema = z.object({
  petName: z.string().min(1, { message: 'Vui lòng nhập tên bé' }),
  ownerName: z.string().min(1, { message: 'Vui lòng nhập tên chủ nuôi' }),
  phone: phoneSchema,
  serviceSlug: z.string().min(1, { message: 'Vui lòng chọn dịch vụ' }),
  date: z.string().min(1, { message: 'Vui lòng chọn ngày hẹn' }),
  timeSlot: z.string().min(1, { message: 'Vui lòng chọn khung giờ' }),
  notes: z.string().optional(),
});

export const adoptionSchema = z.object({
  applicantName: z.string().min(1, { message: 'Vui lòng nhập họ và tên' }),
  phone: phoneSchema,
  email: emailSchema,
  city: z.string().min(1, { message: 'Vui lòng chọn tỉnh/thành' }),
  contactMethod: z.string(),
  timeSlot: z.string(),
});

export const checkoutSchema = z.object({
  fullName: z.string().min(1, { message: 'Vui lòng nhập họ tên người nhận' }),
  phone: phoneSchema,
  address: z.string().min(1, { message: 'Vui lòng nhập địa chỉ giao hàng' }),
  paymentMethod: z.enum(['cod', 'qr', 'card']),
  note: z.string().optional(),
});
