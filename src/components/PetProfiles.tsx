import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar,
  Syringe,
  Pill,
  Stethoscope,
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  Download,
  X,
  AlertTriangle,
  Bell,
  Search,
  PawPrint,
  TrendingUp,
  FileText,
  Check,
  Clock,
} from 'lucide-react';
import { Pet, PetSpecies, Gender, Vaccination, Language, Booking } from '../types';
import {
  CareRecord,
  CareRecordType,
  PetProfileEntity,
  WeightLog,
  INITIAL_PET_PROFILES,
  INITIAL_WEIGHT_LOGS,
  INITIAL_CARE_RECORDS,
  computeDaysFromToday,
  formatDisplayDate,
  formatAgeWithDob,
  getCareRecordStatusBadge,
  getNearestReminderForPet,
  hasPetDueSoonOrOverdue,
  sortAndGroupCareRecords,
  computeWeightTrend,
  validateCareRecordInput,
  translateSpecies,
  translateGender,
  toLocalIsoDate,
  offsetDaysIso,
  formatWeightNumber,
} from '../data/petProfilesData';

interface PetProfilesProps {
  lang: Language;
  pets?: Pet[];
  vaccinations?: Vaccination[];
  onUpdatePet?: (updatedPet: Pet, updatedVaccinations: Vaccination[]) => void;
  onAddPet?: (newPet: Pet, newVaccinations: Vaccination[]) => void;
  onOpenDetail?: () => void;
  onBookService?: (serviceName: string) => void;
  onAddBooking?: (booking: Booking) => void;
  onShowToast?: (text: string) => void;
}

const DEFAULT_SPECIES_PHOTOS: Record<PetSpecies, string> = {
  Chó: '/src/assets/images/hero_golden_retriever_1793177482877.jpg',
  Mèo: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
  Thỏ: '/assets/adoption/tuyet-nhung-1.jpg',
  Hamster: '/assets/adoption/banh-quy-1.jpg',
  Chim: '/assets/adoption/kiwi-1.jpg',
  'Bò sát': '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
  Khác: '/src/assets/images/about_fluffy_cat_1793177483392.jpg',
};

const STORAGE_KEYS = {
  PROFILES: 'animora_pet_profiles_v3',
  WEIGHTS: 'animora_pet_weights_v3',
  RECORDS: 'animora_pet_care_records_v3',
  EMAIL_REMINDERS: 'animora_pet_email_reminders_v3',
};

export const PetProfiles: React.FC<PetProfilesProps> = ({
  lang,
  onUpdatePet,
  onAddPet,
  onOpenDetail,
  onBookService,
  onAddBooking,
  onShowToast,
}) => {
  // 1. Stateful Pet Profiles, Weight Logs, Care Records
  const [profiles, setProfiles] = useState<PetProfileEntity[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_PET_PROFILES;
  });

  const [weightLogs, setWeightLogs] = useState<WeightLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WEIGHTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_WEIGHT_LOGS;
  });

  const [careRecords, setCareRecords] = useState<CareRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECORDS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_CARE_RECORDS;
  });

  const [emailRemindersMap, setEmailRemindersMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EMAIL_REMINDERS);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { 'pet-1': true, 'pet-2': true, 'pet-3': true, 'pet-6': true };
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
    } catch {
      // ignore
    }
  }, [profiles]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weightLogs));
    } catch {
      // ignore
    }
  }, [weightLogs]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(careRecords));
    } catch {
      // ignore
    }
  }, [careRecords]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EMAIL_REMINDERS, JSON.stringify(emailRemindersMap));
    } catch {
      // ignore
    }
  }, [emailRemindersMap]);

  // Active Pet & Crossfade transition
  const [activePetId, setActivePetId] = useState<string>(profiles[0]?.id || 'pet-1');
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [petSearchQuery, setPetSearchQuery] = useState('');

  // Care history filter
  const [careFilter, setCareFilter] = useState<'all' | CareRecordType>('all');

  // Horizontal pet selector scroller & edge fades
  const selectorScrollerRef = useRef<HTMLDivElement | null>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Modals state
  const [isEditPetModalOpen, setIsEditPetModalOpen] = useState(false);
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isCareModalOpen, setIsCareModalOpen] = useState(false);
  const [editingCareRecord, setEditingCareRecord] = useState<CareRecord | null>(null);
  const [deletingRecordId, setDeletingRecordId] = useState<string | null>(null);
  const [bookingModalService, setBookingModalService] = useState<string | null>(null);

  // Local toast fallback if onShowToast is not passed
  const [localToast, setLocalToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    if (onShowToast) {
      onShowToast(msg);
    } else {
      setLocalToast(msg);
      window.setTimeout(() => setLocalToast(null), 3500);
    }
  };

  const activePet = profiles.find((p) => p.id === activePetId) || profiles[0];

  // Check horizontal scroll overflow on pet selector
  const updateSelectorScrollEdges = () => {
    const el = selectorScrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 6);
  };

  useEffect(() => {
    updateSelectorScrollEdges();
    window.addEventListener('resize', updateSelectorScrollEdges);
    return () => window.removeEventListener('resize', updateSelectorScrollEdges);
  }, [profiles.length, petSearchQuery]);

  // Smoothly center the active pet pill inside the horizontal scroller WITHOUT scrolling the window
  const handleSelectPet = (petId: string) => {
    if (petId === activePetId) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    setActivePetId(petId);
    if (!prefersReduced) {
      setIsCrossfading(true);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setIsCrossfading(false);
        });
      });
    }

    const scroller = selectorScrollerRef.current;
    const btn = pillRefs.current[petId];
    if (scroller && btn) {
      const targetLeft =
        btn.offsetLeft - scroller.clientWidth / 2 + btn.clientWidth / 2;
      scroller.scrollTo({
        left: Math.max(0, targetLeft),
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    }
  };

  // Filtered pets for selector (when > 8 pets and search is used)
  const visibleSelectorPets = profiles.filter((p) => {
    if (!petSearchQuery.trim()) return true;
    const q = petSearchQuery.toLowerCase().trim();
    return (
      p.name.toLowerCase().includes(q) ||
      p.species.toLowerCase().includes(q) ||
      p.breed.toLowerCase().includes(q)
    );
  });

  // Active pet records & weight logs
  const petRecords = careRecords.filter((r) => r.pet === activePet?.id);
  const petWeights = weightLogs.filter((w) => w.pet === activePet?.id);
  const weightTrend = computeWeightTrend(petWeights, lang);
  const nearestReminder = getNearestReminderForPet(petRecords, lang);
  const { filtered: filteredRecords, groupedByYear, showYearGroups } =
    sortAndGroupCareRecords(petRecords, careFilter);

  const nextCheckupDays = computeDaysFromToday(activePet?.nextCheckupDate);

  // ============================================================================
  // 1. Edit Pet Info Modal State & Handlers
  // ============================================================================
  const [editName, setEditName] = useState('');
  const [editBreed, setEditBreed] = useState('');
  const [editBirthDate, setEditBirthDate] = useState('');
  const [editWeightStr, setEditWeightStr] = useState('');
  const [editCoatColor, setEditCoatColor] = useState('');
  const [editAllergies, setEditAllergies] = useState('');
  const [editMicrochip, setEditMicrochip] = useState('');
  const [editNextCheckupDate, setEditNextCheckupDate] = useState('');
  const [editNeutered, setEditNeutered] = useState(true);

  const openEditPetModal = () => {
    if (!activePet) return;
    setEditName(activePet.name);
    setEditBreed(lang === 'en' && activePet.breedEn ? activePet.breedEn : activePet.breed);
    setEditBirthDate(activePet.birthDate || '2024-03-14');
    setEditWeightStr(activePet.weight);
    setEditCoatColor(
      lang === 'en' && activePet.coatColorEn ? activePet.coatColorEn : activePet.coatColor
    );
    setEditAllergies(
      lang === 'en' && activePet.allergiesEn ? activePet.allergiesEn : activePet.allergies
    );
    setEditMicrochip(activePet.microchip);
    setEditNextCheckupDate(activePet.nextCheckupDate);
    setEditNeutered(activePet.neutered);
    setIsEditPetModalOpen(true);
  };

  const handleSaveEditPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePet || !editName.trim()) return;

    const updated: PetProfileEntity = {
      ...activePet,
      name: editName.trim(),
      breed: editBreed.trim() || activePet.breed,
      breedEn: lang === 'en' ? editBreed.trim() : activePet.breedEn,
      birthDate: editBirthDate || activePet.birthDate,
      weight: editWeightStr.trim() || activePet.weight,
      coatColor: editCoatColor.trim() || activePet.coatColor,
      coatColorEn: lang === 'en' ? editCoatColor.trim() : activePet.coatColorEn,
      allergies: editAllergies.trim() || (lang === 'vi' ? 'Không có' : 'None'),
      allergiesEn: lang === 'en' ? editAllergies.trim() : activePet.allergiesEn,
      microchip: editMicrochip.trim() || activePet.microchip,
      nextCheckupDate: editNextCheckupDate || activePet.nextCheckupDate,
      neutered: editNeutered,
    };

    setProfiles((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (onUpdatePet) {
      onUpdatePet(updated, []);
    } else {
      triggerToast(
        lang === 'vi'
          ? `Đã cập nhật thông tin của ${updated.name}!`
          : `Updated ${updated.name}'s profile!`
      );
    }
    setIsEditPetModalOpen(false);
  };

  // ============================================================================
  // 2. Add New Pet Modal State & Handlers
  // ============================================================================
  const [newPetName, setNewPetName] = useState('');
  const [newPetSpecies, setNewPetSpecies] = useState<PetSpecies>('Mèo');
  const [newPetBreed, setNewPetBreed] = useState('');
  const [newPetGender, setNewPetGender] = useState<Gender>('Cái');
  const [newPetBirthDate, setNewPetBirthDate] = useState('2025-04-10');
  const [newPetWeight, setNewPetWeight] = useState('3.2');
  const [newPetCoat, setNewPetCoat] = useState('');
  const [newPetAllergies, setNewPetAllergies] = useState('');
  const [newPetMicrochip, setNewPetMicrochip] = useState('');
  const [newPetNeutered, setNewPetNeutered] = useState(false);

  const handleSaveNewPet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPetName.trim()) return;

    const newId = 'pet-' + Date.now();
    const kgNum = parseFloat(newPetWeight.replace(',', '.')) || 2.5;
    const formattedW = `${formatWeightNumber(kgNum, lang)} kg`;

    const created: PetProfileEntity = {
      id: newId,
      name: newPetName.trim(),
      species: newPetSpecies,
      breed: newPetBreed.trim() || newPetSpecies,
      breedEn: newPetBreed.trim() || translateSpecies(newPetSpecies, 'en'),
      gender: newPetGender,
      birthDate: newPetBirthDate || toLocalIsoDate(new Date()),
      age: '1 tuổi',
      ageEn: '1 year old',
      weight: formattedW,
      coatColor: newPetCoat.trim() || 'Trắng kem',
      coatColorEn: newPetCoat.trim() || 'Cream white',
      allergies: newPetAllergies.trim() || 'Không có',
      allergiesEn: newPetAllergies.trim() || 'None',
      microchip: newPetMicrochip.trim() || 'Chưa gắn vi mạch',
      photo: DEFAULT_SPECIES_PHOTOS[newPetSpecies],
      neutered: newPetNeutered,
      vaccinated: true,
      nextCheckupDate: offsetDaysIso(30),
      owner: 'Chủ nuôi Animora',
    };

    setProfiles((prev) => [...prev, created]);
    setWeightLogs((prev) => [
      ...prev,
      {
        id: 'w-' + Date.now(),
        pet: newId,
        date: toLocalIsoDate(new Date()),
        kg: kgNum,
      },
    ]);
    if (onAddPet) {
      onAddPet(created, []);
    } else {
      triggerToast(
        lang === 'vi'
          ? `Đã thêm hồ sơ mới cho bé ${created.name}!`
          : `Added new profile for ${created.name}!`
      );
    }
    setActivePetId(newId);
    setIsAddPetModalOpen(false);
    setNewPetName('');
    setNewPetBreed('');
    setNewPetCoat('');
    setNewPetAllergies('');
    setNewPetMicrochip('');
  };

  // ============================================================================
  // 3. Weight Log Modal State & Handlers
  // ============================================================================
  const [newWeightKg, setNewWeightKg] = useState('');
  const [newWeightDate, setNewWeightDate] = useState(() => toLocalIsoDate(new Date()));
  const [weightFormError, setWeightFormError] = useState('');

  const handleAddWeightLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePet) return;
    const parsed = parseFloat(newWeightKg.replace(',', '.'));
    if (Number.isNaN(parsed) || parsed <= 0 || parsed > 120) {
      setWeightFormError(
        lang === 'vi'
          ? 'Vui lòng nhập cân nặng hợp lệ (0,05 – 120 kg).'
          : 'Please enter a valid weight (0.05 – 120 kg).'
      );
      return;
    }
    if (!newWeightDate) {
      setWeightFormError(
        lang === 'vi' ? 'Vui lòng chọn ngày cân.' : 'Please select a date.'
      );
      return;
    }

    const log: WeightLog = {
      id: 'w-' + Date.now(),
      pet: activePet.id,
      date: newWeightDate,
      kg: Math.round(parsed * 100) / 100,
    };

    const formattedW = `${formatWeightNumber(log.kg, lang)} kg`;
    setWeightLogs((prev) => [...prev, log]);
    setProfiles((prev) =>
      prev.map((p) => (p.id === activePet.id ? { ...p, weight: formattedW } : p))
    );
    setNewWeightKg('');
    setWeightFormError('');
    triggerToast(
      lang === 'vi'
        ? `Đã lưu cân nặng mới (${formattedW}) cho ${activePet.name}!`
        : `Saved new weight (${formattedW}) for ${activePet.name}!`
    );
  };

  // ============================================================================
  // 4. Add / Edit CareRecord Modal State & Handlers
  // ============================================================================
  const [careType, setCareType] = useState<CareRecordType>('vaccine');
  const [careName, setCareName] = useState('');
  const [careDate, setCareDate] = useState(() => toLocalIsoDate(new Date()));
  const [careNextDue, setCareNextDue] = useState('');
  const [careNotes, setCareNotes] = useState('');
  const [careAttachmentName, setCareAttachmentName] = useState('');
  const [careAttachmentSize, setCareAttachmentSize] = useState(0);
  const [careAttachmentType, setCareAttachmentType] = useState('');
  const [careFormError, setCareFormError] = useState('');

  const openAddCareModal = (defaultType: CareRecordType = 'vaccine') => {
    setEditingCareRecord(null);
    setCareType(defaultType);
    setCareName('');
    setCareDate(toLocalIsoDate(new Date()));
    setCareNextDue(offsetDaysIso(30));
    setCareNotes('');
    setCareAttachmentName('');
    setCareAttachmentSize(0);
    setCareAttachmentType('');
    setCareFormError('');
    setIsCareModalOpen(true);
  };

  const openEditCareModal = (rec: CareRecord) => {
    setEditingCareRecord(rec);
    setCareType(rec.type);
    setCareName(lang === 'en' && rec.nameEn ? rec.nameEn : rec.name);
    setCareDate(rec.date);
    setCareNextDue(rec.nextDueDate || '');
    setCareNotes(lang === 'en' && rec.notesEn ? rec.notesEn : rec.notes || '');
    setCareAttachmentName(rec.attachmentName || '');
    setCareAttachmentSize(0);
    setCareAttachmentType('');
    setCareFormError('');
    setIsCareModalOpen(true);
  };

  const handleAttachmentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      setCareAttachmentName('');
      setCareAttachmentSize(0);
      setCareAttachmentType('');
      return;
    }
    setCareAttachmentName(file.name);
    setCareAttachmentSize(file.size);
    setCareAttachmentType(file.type);
    setCareFormError('');
  };

  const handleSaveCareRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePet) return;

    const validation = validateCareRecordInput({
      type: careType,
      name: careName,
      date: careDate,
      nextDueDate: careNextDue,
      fileSize: careAttachmentSize,
      fileType: careAttachmentType,
    });

    if (!validation.valid) {
      setCareFormError(
        lang === 'vi'
          ? validation.errorVi || 'Thông tin không hợp lệ.'
          : validation.errorEn || 'Invalid input.'
      );
      return;
    }

    const diff = computeDaysFromToday(careNextDue);
    const computedStatus =
      diff === null ? 'done' : diff < 0 ? 'overdue' : diff <= 60 ? 'upcoming' : 'done';

    if (editingCareRecord) {
      const updatedRec: CareRecord = {
        ...editingCareRecord,
        type: careType,
        name: careName.trim(),
        nameEn: careName.trim(),
        date: careDate,
        nextDueDate: careNextDue.trim() || undefined,
        notes: careNotes.trim() || undefined,
        notesEn: careNotes.trim() || undefined,
        attachmentName: careAttachmentName || editingCareRecord.attachmentName,
        attachmentUrl: careAttachmentName
          ? `#attachment-${Date.now()}`
          : editingCareRecord.attachmentUrl,
        status: computedStatus,
      };
      setCareRecords((prev) =>
        prev.map((r) => (r.id === editingCareRecord.id ? updatedRec : r))
      );
      triggerToast(
        lang === 'vi'
          ? 'Đã cập nhật lịch sử chăm sóc thành công!'
          : 'Care record updated successfully!'
      );
    } else {
      const newRec: CareRecord = {
        id: 'care-' + Date.now(),
        pet: activePet.id,
        type: careType,
        name: careName.trim(),
        nameEn: careName.trim(),
        date: careDate,
        nextDueDate: careNextDue.trim() || undefined,
        notes: careNotes.trim() || undefined,
        notesEn: careNotes.trim() || undefined,
        attachmentName: careAttachmentName || undefined,
        attachmentUrl: careAttachmentName ? `#attachment-${Date.now()}` : undefined,
        status: computedStatus,
      };
      setCareRecords((prev) => [newRec, ...prev]);
      triggerToast(
        lang === 'vi'
          ? `Đã thêm lịch chăm sóc mới cho ${activePet.name}!`
          : `Added new care record for ${activePet.name}!`
      );
    }

    setIsCareModalOpen(false);
  };

  const handleConfirmDeleteRecord = () => {
    if (!deletingRecordId) return;
    setCareRecords((prev) => prev.filter((r) => r.id !== deletingRecordId));
    setDeletingRecordId(null);
    triggerToast(
      lang === 'vi'
        ? 'Đã xóa mục lịch sử chăm sóc.'
        : 'Deleted care record.'
    );
  };

  const handleDownloadAttachment = (rec: CareRecord) => {
    const filename =
      rec.attachmentName ||
      `phieu-cham-soc-${activePet.name.toLowerCase().replace(/\s+/g, '-')}-${rec.date}.txt`;
    const content = [
      `ANIMORA VETERINARY & PET CARE — CHỨNG NHẬN CHĂM SÓC`,
      `====================================================`,
      `Bé cưng / Pet: ${activePet.name} (${activePet.species} · ${activePet.breed})`,
      `Mã vi mạch / Microchip: ${activePet.microchip}`,
      `Hạng mục / Record: ${rec.name}`,
      `Ngày thực hiện / Date: ${formatDisplayDate(rec.date, lang)}`,
      rec.nextDueDate
        ? `Ngày nhắc tiếp theo / Next Due: ${formatDisplayDate(rec.nextDueDate, lang)}`
        : '',
      rec.notes ? `Ghi chú bác sĩ / Notes: ${rec.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename.endsWith('.pdf') ? filename.replace('.pdf', '.txt') : filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    triggerToast(
      lang === 'vi'
        ? `Đang tải tệp đính kèm: ${rec.attachmentName || filename}`
        : `Downloading attachment: ${rec.attachmentName || filename}`
    );
  };

  // ============================================================================
  // 5. Email Reminders Toggle & Export PDF (Without Owner Contact Details)
  // ============================================================================
  const isEmailReminderOn = Boolean(emailRemindersMap[activePet?.id || '']);

  const handleToggleEmailReminder = () => {
    if (!activePet) return;
    const nextVal = !isEmailReminderOn;
    setEmailRemindersMap((prev) => ({ ...prev, [activePet.id]: nextVal }));
    triggerToast(
      nextVal
        ? lang === 'vi'
          ? `Đã bật nhắc lịch qua email cho bé ${activePet.name}.`
          : `Enabled email reminders for ${activePet.name}.`
        : lang === 'vi'
        ? `Đã tắt nhắc lịch qua email cho bé ${activePet.name}.`
        : `Disabled email reminders for ${activePet.name}.`
    );
  };

  const handleExportPdf = () => {
    if (!activePet) return;
    // Privacy rule from Section 4 & 5: Export pet's profile and history WITHOUT owner's contact details
    const lines = [
      `====================================================================`,
      `ANIMORA — SỔ SỨC KHỎE THÚ CƯNG (PET HEALTH RECORD - PDF EXPORT)`,
      `====================================================================`,
      `Tên bé / Pet Name: ${activePet.name}`,
      `Loài & Giống / Species & Breed: ${activePet.species} — ${activePet.breed}`,
      `Giới tính / Gender: ${activePet.gender}`,
      `Tuổi & Ngày sinh / Age & DOB: ${activePet.age} (${formatDisplayDate(activePet.birthDate, lang)})`,
      `Cân nặng hiện tại / Weight: ${weightTrend.formattedLatest || activePet.weight}`,
      `Màu lông / Coat Color: ${activePet.coatColor}`,
      `Dị ứng / Allergies: ${activePet.allergies}`,
      `Mã vi mạch / Microchip: ${activePet.microchip}`,
      `Khám định kỳ tiếp theo / Next Checkup: ${formatDisplayDate(activePet.nextCheckupDate, lang)}`,
      ``,
      `--------------------------------------------------------------------`,
      `LỊCH SỬ CÂN NẶNG (6 LẦN GẦN NHẤT / LAST 6 WEIGHT LOGS)`,
      `--------------------------------------------------------------------`,
      ...weightTrend.lastSix.map(
        (w) => `- ${formatDisplayDate(w.date, lang)}: ${formatWeightNumber(w.kg, lang)} kg`
      ),
      ``,
      `--------------------------------------------------------------------`,
      `LỊCH SỬ TIÊM CHỦNG & CHĂM SÓC (VACCINES & CARE HISTORY)`,
      `--------------------------------------------------------------------`,
      ...(petRecords.length === 0
        ? [`(Chưa có lịch sử chăm sóc / No records yet)`]
        : petRecords.map((r) => {
            const badge = getCareRecordStatusBadge(r, lang);
            return `- [${formatDisplayDate(r.date, lang)}] ${r.name} (${badge.label})${
              r.nextDueDate ? ` | Hẹn tiếp: ${formatDisplayDate(r.nextDueDate, lang)}` : ''
            }${r.notes ? ` | Ghi chú: ${r.notes}` : ''}`;
          })),
      `====================================================================`,
      `Xuất từ hệ thống Sổ Sức Khỏe Animora (Đã ẩn thông tin liên hệ chủ nuôi)`,
    ].join('\n');

    const blob = new Blob([lines], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `so-suc-khoe-${activePet.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    triggerToast(
      lang === 'vi'
        ? `Đã xuất hồ sơ PDF của ${activePet.name} (đã ẩn thông tin chủ nuôi)!`
        : `Exported ${activePet.name}'s PDF health record (owner info hidden)!`
    );
  };

  // ============================================================================
  // 6. Booking Modal from Reminder Bar ("Đặt lịch" / "Book")
  // ============================================================================
  const [bookingCustomerName, setBookingCustomerName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState(() => offsetDaysIso(2));

  const handleOpenReminderBooking = (serviceName: string) => {
    setBookingModalService(serviceName);
    if (onBookService) {
      onBookService(serviceName);
    }
  };

  const handleSubmitReminderBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingModalService || !activePet) return;
    const newBooking: Booking = {
      id: 'bk-' + Date.now(),
      fullName: bookingCustomerName.trim() || activePet.owner || 'Khách hàng Animora',
      phone: bookingPhone.trim() || '0901234567',
      petType: `${activePet.species} (${activePet.name})`,
      service: bookingModalService,
      date: bookingDate || offsetDaysIso(2),
      createdAt: new Date().toISOString(),
    };
    if (onAddBooking) {
      onAddBooking(newBooking);
    } else {
      triggerToast(
        lang === 'vi'
          ? `Đã đặt lịch "${bookingModalService}" cho bé ${activePet.name}!`
          : `Booked "${bookingModalService}" for ${activePet.name}!`
      );
    }
    setBookingModalService(null);
  };

  if (!activePet) return null;

  const { ageLabel, dobLabel } = formatAgeWithDob(
    activePet.age,
    activePet.ageEn,
    activePet.birthDate,
    lang
  );

  const rawAllergies =
    lang === 'en' && activePet.allergiesEn ? activePet.allergiesEn : activePet.allergies;
  const hasAllergyWarning =
    Boolean(rawAllergies) &&
    !['không có', 'none', 'không', 'chưa ghi nhận'].includes(
      rawAllergies.trim().toLowerCase()
    );

  const hasMicrochip =
    Boolean(activePet.microchip) &&
    !activePet.microchip.toLowerCase().includes('chưa') &&
    !activePet.microchip.toLowerCase().includes('none');

  const getCareTypeIcon = (type: CareRecordType) => {
    switch (type) {
      case 'vaccine':
        return <Syringe className="w-5 h-5" />;
      case 'deworm':
        return <Pill className="w-5 h-5" />;
      case 'checkup':
        return <Stethoscope className="w-5 h-5" />;
      case 'spa':
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="pet-profiles"
      data-testid="pet-profiles-section"
      className="pt-[96px] pb-16 lg:pb-24 relative"
    >
      {/* Polite live region for local fallback toast */}
      {localToast && (
        <div
          aria-live="polite"
          role="status"
          className="fixed bottom-20 sm:bottom-6 right-4 z-50 px-4 py-3 rounded-2xl shadow-xl text-sm font-bold"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--on-primary)',
          }}
        >
          {localToast}
        </div>
      )}

      <div className="shared-container space-y-8">
        {/* 1. Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <span
              data-testid="pet-profiles-eyebrow"
              className="block uppercase font-bold"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: 'var(--primary)',
              }}
            >
              {lang === 'vi' ? 'HỒ SƠ THÚ CƯNG' : 'PET PROFILES'}
            </span>
            <h2
              data-testid="pet-profiles-title"
              className="font-heading font-extrabold leading-[1.14] tracking-[-0.02em]"
              style={{
                fontSize: 'clamp(32px, 4vw, 48px)',
                color: 'var(--primary)',
              }}
            >
              {lang === 'vi' ? 'Sổ sức khỏe của bé' : "Your pet's health record"}
            </h2>
            <p
              data-testid="pet-profiles-subtitle"
              className="text-[18px] leading-relaxed font-normal"
              style={{ color: 'var(--text-muted)' }}
            >
              {lang === 'vi'
                ? 'Theo dõi tiêm chủng, khám định kỳ và cân nặng của từng bé.'
                : 'Track vaccines, checkups and weight for each pet.'}
            </p>
          </div>

          <button
            type="button"
            data-testid="pet-profiles-add-pet-btn"
            onClick={() => setIsAddPetModalOpen(true)}
            className="btn-primary px-6 py-3 text-[15px] font-bold transition-all flex items-center gap-2 shadow-sm self-start md:self-auto shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
          >
            <Plus className="w-4.5 h-4.5" />
            <span>{lang === 'vi' ? 'Thêm bé mới' : 'Add new pet'}</span>
          </button>
        </div>

        {/* 2. Pet Selector (One row, horizontal scroll, hidden scrollbar, edge fades, coral due dot, >8 search) */}
        <div className="relative">
          {canScrollLeft && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10"
              style={{
                background: 'linear-gradient(to right, var(--bg) 15%, transparent 100%)',
              }}
            />
          )}
          {canScrollRight && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10"
              style={{
                background: 'linear-gradient(to left, var(--bg) 15%, transparent 100%)',
              }}
            />
          )}

          <div
            ref={selectorScrollerRef}
            onScroll={updateSelectorScrollEdges}
            role="tablist"
            aria-label={lang === 'vi' ? 'Chọn hồ sơ thú cưng' : 'Select pet profile'}
            className="flex flex-nowrap items-center gap-2.5 overflow-x-auto py-1.5 scrollbar-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {visibleSelectorPets.map((pet) => {
              const isSelected = activePet.id === pet.id;
              const thisPetRecords = careRecords.filter((r) => r.pet === pet.id);
              const isDueSoon = hasPetDueSoonOrOverdue(thisPetRecords);

              return (
                <button
                  key={pet.id}
                  ref={(el) => {
                    pillRefs.current[pet.id] = el;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  data-testid={`pet-selector-pill-${pet.id}`}
                  onClick={() => handleSelectPet(pet.id)}
                  className="px-3.5 py-2 rounded-full text-[15px] font-bold transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
                  style={{
                    backgroundColor: isSelected ? 'var(--primary)' : 'var(--surface)',
                    color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
                  }}
                >
                  <img
                    src={pet.photo}
                    alt={pet.name}
                    className="w-7 h-7 rounded-full object-cover shrink-0 border"
                    style={{ borderColor: isSelected ? 'var(--on-primary)' : 'var(--border)' }}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/images/about_fluffy_cat_1793177483392.jpg';
                    }}
                  />
                  <span>{pet.name}</span>
                  <span
                    className="text-[12px] font-bold px-2.5 py-0.5 rounded-full leading-tight"
                    style={{
                      backgroundColor: isSelected
                        ? 'color-mix(in srgb, var(--on-primary) 18%, transparent)'
                        : 'var(--surface-2)',
                      color: isSelected ? 'var(--on-primary)' : 'var(--text)',
                    }}
                  >
                    {translateSpecies(pet.species, lang)}
                  </span>
                  {isDueSoon && (
                    <span
                      role="img"
                      data-testid={`pet-due-dot-${pet.id}`}
                      aria-label={
                        lang === 'vi'
                          ? 'Có lịch sắp đến hạn'
                          : 'Has upcoming due item'
                      }
                      title={
                        lang === 'vi'
                          ? 'Có lịch sắp đến hạn'
                          : 'Has upcoming due item'
                      }
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: '#FF7F6B',
                        boxShadow: isSelected
                          ? '0 0 0 2px var(--primary)'
                          : '0 0 0 2px var(--surface)',
                      }}
                    />
                  )}
                </button>
              );
            })}

            {/* Search field at the end of the row when there are more than 8 pets */}
            {profiles.length > 8 && (
              <div className="relative shrink-0 ml-1">
                <Search
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  style={{ color: 'var(--text-muted)' }}
                />
                <input
                  type="search"
                  value={petSearchQuery}
                  onChange={(e) => setPetSearchQuery(e.target.value)}
                  placeholder={lang === 'vi' ? 'Tìm bé…' : 'Find pet…'}
                  aria-label={lang === 'vi' ? 'Tìm bé' : 'Find pet'}
                  className="pl-9 pr-3 py-2 rounded-full text-[14px] border w-44 focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                  style={{
                    backgroundColor: 'var(--surface)',
                    color: 'var(--text)',
                    borderColor: 'var(--border)',
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* 3. Main Profile Card (with 0.25s crossfade on pet switch) */}
        <div
          data-testid="pet-profile-card"
          className="animora-card p-6 sm:p-8 space-y-7"
          style={{
            opacity: isCrossfading ? 0.35 : 1,
            transition: 'opacity 0.25s ease',
          }}
        >
          {/* Top Highlighted Upcoming Reminder Bar */}
          {nearestReminder.state === 'upcoming' && (
            <div
              data-testid="pet-reminder-bar"
              data-reminder-state="upcoming"
              className="rounded-2xl px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{
                backgroundColor: 'var(--surface-2)',
                borderLeft: '4px solid #FF7F6B',
                color: 'var(--text)',
              }}
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 shrink-0" style={{ color: 'var(--primary)' }} />
                <p className="text-[16px] font-bold leading-snug" style={{ color: 'var(--text)' }}>
                  {lang === 'vi'
                    ? `Sắp tới: ${nearestReminder.itemName} · còn ${nearestReminder.days} ngày`
                    : `Upcoming: ${nearestReminder.itemName} · ${nearestReminder.days} days left`}
                </p>
              </div>
              <button
                type="button"
                data-testid="pet-reminder-book-btn"
                onClick={() => handleOpenReminderBooking(nearestReminder.servicePreselect)}
                className="btn-primary px-4 py-2 text-[14px] font-bold shrink-0 self-start sm:self-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
              >
                {lang === 'vi' ? 'Đặt lịch' : 'Book'}
              </button>
            </div>
          )}

          {nearestReminder.state === 'overdue' && (
            <div
              data-testid="pet-reminder-bar"
              data-reminder-state="overdue"
              className="rounded-2xl px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              style={{
                backgroundColor: '#C2410C',
                borderLeft: '4px solid #7C2D12',
                color: '#FFFFFF',
              }}
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 shrink-0 text-white" />
                <p className="text-[16px] font-bold leading-snug text-white">
                  {lang === 'vi'
                    ? `${nearestReminder.itemName} · Quá hạn ${nearestReminder.days} ngày`
                    : `${nearestReminder.itemName} · Overdue ${nearestReminder.days} days`}
                </p>
              </div>
              <button
                type="button"
                data-testid="pet-reminder-book-btn"
                onClick={() => handleOpenReminderBooking(nearestReminder.servicePreselect)}
                className="px-4 py-2 rounded-full text-[14px] font-bold bg-white text-[#3B1520] hover:bg-[#FFF4E8] transition-colors shrink-0 self-start sm:self-auto cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {lang === 'vi' ? 'Đặt lịch' : 'Book'}
              </button>
            </div>
          )}

          {nearestReminder.state === 'up_to_date' && (
            <div
              data-testid="pet-reminder-bar"
              data-reminder-state="up_to_date"
              className="rounded-2xl px-4 py-3.5 flex items-center gap-3"
              style={{
                backgroundColor: '#F4B6C2',
                borderLeft: '4px solid #6B1F2E',
                color: '#3A0F1B',
              }}
            >
              <Check className="w-5 h-5 shrink-0 text-[#3A0F1B]" />
              <p className="text-[16px] font-bold leading-snug text-[#3A0F1B]">
                {lang === 'vi'
                  ? 'Mọi thứ đang đúng lịch 🎉'
                  : 'All up to date 🎉'}
              </p>
            </div>
          )}

          {/* Two-Column Layout: Left Pet Info (5 cols) | Right Care History (7 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 4. Left Column: Pet Info */}
            <div
              className="lg:col-span-5 w-full space-y-5 border-b lg:border-b-0 lg:border-r pb-7 lg:pb-0 lg:pr-8"
              style={{ borderColor: 'var(--border)' }}
            >
              {/* Top row: 160px round photo on left, name & fact chips to its right (centered on mobile) */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 w-full">
                <div
                  className="relative w-[160px] h-[160px] rounded-full overflow-hidden border-4 shadow-md shrink-0"
                  style={{ borderColor: '#FF7F6B' }}
                >
                  <img
                    src={activePet.photo}
                    alt={activePet.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/images/about_fluffy_cat_1793177483392.jpg';
                    }}
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-2.5 w-full">
                  <span
                    className="block text-[13px] font-bold uppercase tracking-wider"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {translateSpecies(activePet.species, lang)} ·{' '}
                    {translateGender(activePet.gender, lang)}
                  </span>

                  <div className="flex flex-wrap items-center justify-center sm:justify-between gap-2">
                    <h3
                      data-testid="active-pet-name"
                      className="font-heading text-[32px] font-bold leading-tight"
                      style={{ color: 'var(--text)' }}
                    >
                      {activePet.name}
                    </h3>

                    <button
                      type="button"
                      data-testid="pet-edit-info-btn"
                      onClick={openEditPetModal}
                      className="btn-secondary px-3.5 py-1.5 text-[13px] font-bold inline-flex items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>{lang === 'vi' ? 'Sửa thông tin' : 'Edit info'}</span>
                    </button>
                  </div>

                  {/* Fact chips in a row */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                    {activePet.vaccinated !== false && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[12px] font-bold border"
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          color: 'var(--text)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        {lang === 'vi' ? 'Đã tiêm phòng' : 'Vaccinated'}
                      </span>
                    )}
                    {activePet.neutered && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[12px] font-bold border"
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          color: 'var(--text)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        {lang === 'vi' ? 'Đã triệt sản' : 'Neutered'}
                      </span>
                    )}
                    {hasMicrochip && (
                      <span
                        className="px-2.5 py-1 rounded-full text-[12px] font-bold border"
                        style={{
                          backgroundColor: 'var(--surface-2)',
                          color: 'var(--text)',
                          borderColor: 'var(--border)',
                        }}
                      >
                        {lang === 'vi' ? 'Có vi mạch' : 'Microchipped'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 2 x 3 Info Tiles Grid (Equal height, 13px label, 16px value, no Owner tile) */}
              <div className="grid grid-cols-2 gap-3">
                {/* 1. Giống / loài */}
                <div
                  className="p-3.5 rounded-2xl border min-h-[86px] h-full flex flex-col justify-start gap-1.5"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[13px] font-bold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Giống / loài' : 'Breed'}
                  </span>
                  <span
                    className="text-[16px] font-bold leading-snug block"
                    style={{ color: 'var(--text)' }}
                  >
                    {lang === 'en' && activePet.breedEn ? activePet.breedEn : activePet.breed}
                  </span>
                </div>

                {/* 2. Tuổi + DOB */}
                <div
                  className="p-3.5 rounded-2xl border min-h-[86px] h-full flex flex-col justify-start gap-1.5"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[13px] font-bold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Tuổi' : 'Age'}
                  </span>
                  <div>
                    <span
                      className="text-[16px] font-bold leading-snug block"
                      style={{ color: 'var(--text)' }}
                    >
                      {ageLabel}
                    </span>
                    <span
                      className="text-[12px] font-semibold block"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {dobLabel}
                    </span>
                  </div>
                </div>

                {/* 3. Cân nặng */}
                <div
                  className="p-3.5 rounded-2xl border min-h-[86px] h-full flex flex-col justify-start gap-1.5"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[13px] font-bold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Cân nặng' : 'Weight'}
                  </span>
                  <span
                    data-testid="pet-tile-weight"
                    className="text-[16px] font-bold leading-snug tabular-nums block"
                    style={{ color: 'var(--text)' }}
                  >
                    {weightTrend.formattedLatest || activePet.weight}
                  </span>
                </div>

                {/* 4. Màu lông */}
                <div
                  className="p-3.5 rounded-2xl border min-h-[86px] h-full flex flex-col justify-start gap-1.5"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[13px] font-bold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Màu lông' : 'Coat color'}
                  </span>
                  <span
                    className="text-[16px] font-bold leading-snug block"
                    style={{ color: 'var(--text)' }}
                  >
                    {lang === 'en' && activePet.coatColorEn
                      ? activePet.coatColorEn
                      : activePet.coatColor}
                  </span>
                </div>

                {/* 5. Dị ứng (with warning icon when present) */}
                <div
                  className="p-3.5 rounded-2xl border min-h-[86px] h-full flex flex-col justify-start gap-1.5"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[13px] font-bold flex items-center gap-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <span>{lang === 'vi' ? 'Dị ứng' : 'Allergies'}</span>
                    {hasAllergyWarning && (
                      <AlertTriangle
                        className="w-4 h-4 shrink-0"
                        style={{ color: '#D9534F' }}
                        aria-label={lang === 'vi' ? 'Lưu ý dị ứng' : 'Allergy warning'}
                      />
                    )}
                  </span>
                  <span
                    className="text-[16px] font-bold leading-snug block"
                    style={{ color: 'var(--text)' }}
                  >
                    {rawAllergies}
                  </span>
                </div>

                {/* 6. Mã vi mạch */}
                <div
                  className="p-3.5 rounded-2xl border min-h-[86px] h-full flex flex-col justify-start gap-1.5"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <span
                    className="text-[13px] font-bold block"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {lang === 'vi' ? 'Mã vi mạch' : 'Microchip'}
                  </span>
                  <span
                    className="text-[16px] font-bold leading-snug tabular-nums block"
                    style={{ color: 'var(--text)' }}
                  >
                    {activePet.microchip}
                  </span>
                </div>
              </div>

              {/* "Khám định kỳ tiếp theo" Row */}
              <div
                className="p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-2 border"
                style={{
                  backgroundColor: 'var(--surface-2)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4.5 h-4.5 shrink-0" style={{ color: 'var(--primary)' }} />
                  <span className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Khám định kỳ tiếp theo' : 'Next checkup'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[16px] font-extrabold tabular-nums"
                    style={{ color: 'var(--text)' }}
                  >
                    {formatDisplayDate(activePet.nextCheckupDate, lang)}
                  </span>
                  {nextCheckupDays !== null && (
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[12px] font-bold"
                      style={{
                        backgroundColor: '#F4B6C2',
                        color: '#3A0F1B',
                      }}
                    >
                      {nextCheckupDays >= 0
                        ? lang === 'vi'
                          ? `còn ${nextCheckupDays} ngày`
                          : `${nextCheckupDays} days left`
                        : lang === 'vi'
                        ? `quá hạn ${Math.abs(nextCheckupDays)} ngày`
                        : `${Math.abs(nextCheckupDays)}d overdue`}
                    </span>
                  )}
                </div>
              </div>

              {/* Weight Trend Sparkline (80px high inline SVG, clickable to open full modal) */}
              <button
                type="button"
                data-testid="pet-weight-sparkline-btn"
                onClick={() => setIsWeightModalOpen(true)}
                className="w-full text-left p-4 rounded-2xl border transition-all hover:shadow-md cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
                style={{
                  backgroundColor: 'var(--bg)',
                  borderColor: 'var(--border)',
                }}
                aria-label={
                  lang === 'vi'
                    ? `Biểu đồ cân nặng của ${activePet.name}: ${weightTrend.formattedLatest} (${weightTrend.formattedDelta}). Nhấn để xem chi tiết và thêm cân nặng.`
                    : `Weight trend for ${activePet.name}: ${weightTrend.formattedLatest} (${weightTrend.formattedDelta}). Click to view chart and add weight.`
                }
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className="text-[13px] font-bold flex items-center gap-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <TrendingUp className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                    <span>
                      {lang === 'vi' ? 'Xu hướng cân nặng (6 lần)' : 'Weight trend (last 6)'}
                    </span>
                  </span>
                  <span
                    data-testid="pet-weight-trend-summary"
                    className="text-[16px] font-extrabold tabular-nums"
                    style={{ color: 'var(--text)' }}
                  >
                    {weightTrend.formattedLatest} · {weightTrend.formattedDelta}
                  </span>
                </div>

                <div className="w-full h-[80px]">
                  <svg
                    viewBox="0 0 240 80"
                    className="w-full h-[80px] overflow-visible"
                    role="img"
                    aria-hidden="true"
                  >
                    {weightTrend.areaPath && (
                      <path
                        d={weightTrend.areaPath}
                        fill="#F4B6C2"
                        fillOpacity="0.42"
                      />
                    )}
                    {weightTrend.linePath && (
                      <path
                        d={weightTrend.linePath}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {weightTrend.points.map((pt, idx) => {
                      const isLast = idx === weightTrend.points.length - 1;
                      return (
                        <circle
                          key={`${pt.date}-${idx}`}
                          cx={pt.x}
                          cy={pt.y}
                          r={isLast ? 4.5 : 3}
                          fill={isLast ? '#FF7F6B' : 'var(--primary)'}
                          stroke="var(--surface)"
                          strokeWidth="1.5"
                        />
                      );
                    })}
                  </svg>
                </div>
              </button>
            </div>

            {/* 5. Right Column: Care History */}
            <div className="lg:col-span-7 w-full flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* Heading + Primary Add Record Button */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h4
                    className="font-heading text-[24px] font-bold leading-snug"
                    style={{ color: 'var(--text)' }}
                  >
                    {lang === 'vi'
                      ? 'Lịch sử tiêm chủng & chăm sóc'
                      : 'Vaccines & care history'}
                  </h4>

                  <button
                    type="button"
                    data-testid="pet-add-care-record-btn"
                    onClick={() => openAddCareModal('vaccine')}
                    className="btn-primary px-4 py-2.5 text-[14px] font-bold inline-flex items-center gap-1.5 shadow-sm cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>
                      {lang === 'vi'
                        ? 'Thêm mũi tiêm / lịch chăm sóc'
                        : 'Add vaccine / care record'}
                    </span>
                  </button>
                </div>

                {/* Filter Chips (Tất cả, Tiêm phòng, Tẩy giun, Khám bệnh, Chăm sóc) */}
                <div
                  role="tablist"
                  aria-label={lang === 'vi' ? 'Lọc lịch sử chăm sóc' : 'Filter care history'}
                  className="flex flex-wrap items-center gap-2"
                >
                  {(
                    [
                      { id: 'all', vi: 'Tất cả', en: 'All' },
                      { id: 'vaccine', vi: 'Tiêm phòng', en: 'Vaccines' },
                      { id: 'deworm', vi: 'Tẩy giun', en: 'Deworming' },
                      { id: 'checkup', vi: 'Khám bệnh', en: 'Checkups' },
                      { id: 'spa', vi: 'Chăm sóc', en: 'Grooming' },
                    ] as const
                  ).map((chip) => {
                    const active = careFilter === chip.id;
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        data-testid={`care-filter-chip-${chip.id}`}
                        onClick={() => setCareFilter(chip.id)}
                        className="h-9 px-3.5 rounded-full text-[13px] font-bold border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
                        style={{
                          backgroundColor: active ? 'var(--primary)' : 'var(--surface-2)',
                          color: active ? 'var(--on-primary)' : 'var(--text)',
                          borderColor: active ? 'var(--primary)' : 'var(--border)',
                        }}
                      >
                        {lang === 'vi' ? chip.vi : chip.en}
                      </button>
                    );
                  })}
                </div>

                {/* Care Records List */}
                {petRecords.length === 0 ? (
                  /* Zero records empty state */
                  <div
                    data-testid="pet-care-empty-zero"
                    className="p-8 rounded-2xl border text-center space-y-4"
                    style={{
                      backgroundColor: 'var(--bg)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--surface-2)',
                        color: 'var(--primary)',
                      }}
                    >
                      <PawPrint className="w-6 h-6" />
                    </div>
                    <p
                      className="text-[16px] font-bold max-w-md mx-auto"
                      style={{ color: 'var(--text)' }}
                    >
                      {lang === 'vi'
                        ? `Chưa có lịch sử. Hãy thêm mũi tiêm đầu tiên của ${activePet.name}.`
                        : `No history yet. Add ${activePet.name}'s first vaccine.`}
                    </p>
                    <button
                      type="button"
                      onClick={() => openAddCareModal('vaccine')}
                      className="btn-primary px-5 py-2.5 text-[14px] font-bold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>
                        {lang === 'vi'
                          ? 'Thêm mũi tiêm / lịch chăm sóc'
                          : 'Add vaccine / care record'}
                      </span>
                    </button>
                  </div>
                ) : filteredRecords.length === 0 ? (
                  <div
                    className="p-6 rounded-2xl border text-center space-y-2"
                    style={{
                      backgroundColor: 'var(--bg)',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <p className="text-[15px] font-bold" style={{ color: 'var(--text)' }}>
                      {lang === 'vi'
                        ? 'Không có mục nào trong phân loại này.'
                        : 'No records in this category.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {groupedByYear.map((group) => (
                      <div key={group.year} className="space-y-2.5">
                        {showYearGroups && (
                          <div className="flex items-center gap-2 pt-1">
                            <span
                              className="text-[12px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor: 'var(--surface-2)',
                                color: 'var(--text)',
                              }}
                            >
                              {lang === 'vi' ? `Năm ${group.year}` : `Year ${group.year}`}
                            </span>
                            <div
                              className="h-px flex-1"
                              style={{ backgroundColor: 'var(--border)' }}
                            />
                          </div>
                        )}

                        {group.items.map((rec) => {
                          const badge = getCareRecordStatusBadge(rec, lang);
                          const displayTitle =
                            lang === 'en' && rec.nameEn ? rec.nameEn : rec.name;
                          const displayNotes =
                            lang === 'en' && rec.notesEn ? rec.notesEn : rec.notes;

                          return (
                            <div
                              key={rec.id}
                              data-testid={`care-record-row-${rec.id}`}
                              className="group p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 transition-all hover:shadow-sm"
                              style={{
                                backgroundColor: 'var(--bg)',
                                borderColor: 'var(--border)',
                              }}
                            >
                              <div className="flex items-start gap-3.5 min-w-0">
                                {/* 40px round type icon tile */}
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                                  style={{
                                    backgroundColor: 'var(--surface-2)',
                                    color: 'var(--primary)',
                                  }}
                                >
                                  {getCareTypeIcon(rec.type)}
                                </div>

                                <div className="space-y-1 min-w-0">
                                  <p
                                    className="text-[16px] font-bold leading-snug"
                                    style={{ color: 'var(--text)' }}
                                  >
                                    {displayTitle}
                                  </p>

                                  <div
                                    className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]"
                                    style={{ color: 'var(--text-muted)' }}
                                  >
                                    <span className="tabular-nums">
                                      {lang === 'vi' ? 'Thực hiện: ' : 'Date: '}
                                      {formatDisplayDate(rec.date, lang)}
                                    </span>
                                    {rec.nextDueDate && (
                                      <span className="tabular-nums font-semibold">
                                        · {lang === 'vi' ? 'Hẹn tiếp: ' : 'Next due: '}
                                        {formatDisplayDate(rec.nextDueDate, lang)}
                                      </span>
                                    )}
                                  </div>

                                  {displayNotes && (
                                    <p
                                      className="text-[14px] leading-snug"
                                      style={{ color: 'var(--text-muted)' }}
                                    >
                                      {displayNotes}
                                    </p>
                                  )}
                                </div>
                              </div>

                              {/* Right side: Status Pill + Hover/Focus Actions */}
                              <div className="flex flex-wrap sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                                {badge.variant === 'done' && (
                                  <span
                                    data-testid={`care-status-pill-${rec.id}`}
                                    className="px-3 py-1 rounded-full text-[13px] font-bold bg-[#F4B6C2] text-[#3A0F1B]"
                                  >
                                    {badge.label}
                                  </span>
                                )}
                                {badge.variant === 'upcoming' && (
                                  <span
                                    data-testid={`care-status-pill-${rec.id}`}
                                    className="px-3 py-1 rounded-full text-[13px] font-bold bg-[#FFD2C9] text-[#3A0F1B] inline-flex items-center gap-1"
                                  >
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{badge.label}</span>
                                  </span>
                                )}
                                {badge.variant === 'overdue' && (
                                  <span
                                    data-testid={`care-status-pill-${rec.id}`}
                                    className="px-3 py-1 rounded-full text-[13px] font-bold bg-[#C2410C] text-white"
                                  >
                                    {badge.label}
                                  </span>
                                )}

                                {/* Row Actions: Sửa, Xóa, Tải đính kèm */}
                                <div className="flex items-center gap-1.5 opacity-95 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity">
                                  <button
                                    type="button"
                                    onClick={() => openEditCareModal(rec)}
                                    aria-label={
                                      lang === 'vi'
                                        ? `Sửa ${displayTitle}`
                                        : `Edit ${displayTitle}`
                                    }
                                    className="px-2.5 py-1 rounded-lg text-[12px] font-bold border inline-flex items-center gap-1 hover:bg-[var(--surface-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                                    style={{
                                      borderColor: 'var(--border)',
                                      color: 'var(--text)',
                                      backgroundColor: 'var(--surface)',
                                    }}
                                  >
                                    <Edit2 className="w-3 h-3" />
                                    <span>{lang === 'vi' ? 'Sửa' : 'Edit'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setDeletingRecordId(rec.id)}
                                    aria-label={
                                      lang === 'vi'
                                        ? `Xóa ${displayTitle}`
                                        : `Delete ${displayTitle}`
                                    }
                                    className="px-2.5 py-1 rounded-lg text-[12px] font-bold border inline-flex items-center gap-1 hover:bg-[var(--surface-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                                    style={{
                                      borderColor: 'var(--border)',
                                      color: 'var(--text)',
                                      backgroundColor: 'var(--surface)',
                                    }}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>{lang === 'vi' ? 'Xóa' : 'Delete'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleDownloadAttachment(rec)}
                                    aria-label={
                                      lang === 'vi'
                                        ? `Tải đính kèm ${displayTitle}`
                                        : `Download attachment for ${displayTitle}`
                                    }
                                    className="px-2.5 py-1 rounded-lg text-[12px] font-bold border inline-flex items-center gap-1 hover:bg-[var(--surface-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                                    style={{
                                      borderColor: 'var(--border)',
                                      color: 'var(--text)',
                                      backgroundColor: 'var(--surface)',
                                    }}
                                  >
                                    <Download className="w-3 h-3" />
                                    <span>
                                      {lang === 'vi' ? 'Tải đính kèm' : 'Download'}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}

                {/* Short list filler block (when > 0 and <= 3 records) so right column never looks half empty */}
                {petRecords.length > 0 && filteredRecords.length <= 3 && (
                  <div
                    data-testid="pet-care-short-filler"
                    className="p-5 rounded-2xl border border-dashed flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--surface-2) 55%, var(--bg))',
                      borderColor: 'var(--border)',
                    }}
                  >
                    <div className="flex items-center gap-3 text-center sm:text-left">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: 'var(--surface)',
                          color: 'var(--primary)',
                        }}
                      >
                        <PawPrint className="w-5 h-5" />
                      </div>
                      <p className="text-[15px] font-bold" style={{ color: 'var(--text)' }}>
                        {lang === 'vi'
                          ? 'Thêm lịch tiêm tiếp theo để không bỏ lỡ nhé'
                          : 'Add the next vaccine so you never miss it'}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => openAddCareModal('vaccine')}
                      className="btn-secondary px-4 py-2 text-[14px] font-bold shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
                    >
                      + {lang === 'vi' ? 'Thêm lịch mới' : 'Add record'}
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Controls: "Nhắc lịch qua email" Toggle & "Xuất hồ sơ PDF" Button */}
              <div
                className="pt-5 mt-4 border-t flex flex-wrap items-center justify-between gap-4"
                style={{ borderColor: 'var(--border)' }}
              >
                <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isEmailReminderOn}
                    data-testid="pet-email-reminder-toggle"
                    onClick={handleToggleEmailReminder}
                    className="w-11 h-6 rounded-full p-0.5 transition-colors relative cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
                    style={{
                      backgroundColor: isEmailReminderOn
                        ? 'var(--primary)'
                        : 'var(--border)',
                    }}
                  >
                    <span
                      className="block w-5 h-5 rounded-full transition-transform shadow-sm"
                      style={{
                        backgroundColor: isEmailReminderOn
                          ? 'var(--on-primary)'
                          : 'var(--surface)',
                        transform: isEmailReminderOn
                          ? 'translateX(20px)'
                          : 'translateX(0px)',
                      }}
                    />
                  </button>
                  <span className="text-[15px] font-bold" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Nhắc lịch qua email' : 'Email reminders'}
                  </span>
                </label>

                <button
                  type="button"
                  data-testid="pet-export-pdf-btn"
                  onClick={handleExportPdf}
                  className="btn-secondary px-5 py-2.5 text-[14px] font-bold inline-flex items-center gap-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7F6B]"
                >
                  <FileText className="w-4 h-4" />
                  <span>{lang === 'vi' ? 'Xuất hồ sơ PDF' : 'Export PDF'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {onOpenDetail && (
          <div className="text-center pt-2">
            <button
              type="button"
              data-testid="home-cta-pet-profiles"
              onClick={onOpenDetail}
              className="btn-secondary px-7 py-3 text-[15px] font-bold cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
            >
              {lang === 'vi'
                ? 'Mở trang Sổ sức khỏe & Chuyên gia dinh dưỡng hàng ngày →'
                : 'Open Full Health Record & Daily Nutrition Planner →'}
            </button>
          </div>
        )}
      </div>

      {/* ======================================================================
          MODAL 1: Weight Trend Full Chart & "Thêm cân nặng" (Add weight)
      ====================================================================== */}
      {isWeightModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'vi' ? 'Biểu đồ cân nặng' : 'Weight chart'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="animora-card max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto space-y-5">
            <button
              type="button"
              onClick={() => setIsWeightModalOpen(false)}
              aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--surface-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FF7F6B]"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3
                className="font-heading text-2xl font-bold"
                style={{ color: 'var(--text)' }}
              >
                {lang === 'vi'
                  ? `Theo dõi cân nặng — ${activePet.name}`
                  : `Weight History — ${activePet.name}`}
              </h3>
              <p className="text-[14px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                {weightTrend.formattedLatest} · {weightTrend.formattedDelta}
              </p>
            </div>

            {/* Full SVG Chart */}
            <div
              className="p-4 rounded-2xl border space-y-3"
              style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
            >
              <svg viewBox="0 0 240 80" className="w-full h-32 overflow-visible">
                {weightTrend.areaPath && (
                  <path d={weightTrend.areaPath} fill="#F4B6C2" fillOpacity="0.45" />
                )}
                {weightTrend.linePath && (
                  <path
                    d={weightTrend.linePath}
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
                {weightTrend.points.map((pt, idx) => (
                  <g key={`${pt.date}-${idx}`}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={4}
                      fill={idx === weightTrend.points.length - 1 ? '#FF7F6B' : 'var(--primary)'}
                      stroke="var(--surface)"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}
              </svg>

              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                {weightTrend.lastSix.map((item) => (
                  <div key={item.id} className="text-center">
                    <span
                      className="block text-[14px] font-bold tabular-nums"
                      style={{ color: 'var(--text)' }}
                    >
                      {formatWeightNumber(item.kg, lang)} kg
                    </span>
                    <span
                      className="block text-[12px] tabular-nums"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {formatDisplayDate(item.date, lang).slice(0, 5)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* "Thêm cân nặng" (Add weight) Form */}
            <form onSubmit={handleAddWeightLog} className="space-y-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <h4 className="font-heading text-lg font-bold" style={{ color: 'var(--text)' }}>
                {lang === 'vi' ? 'Thêm cân nặng' : 'Add weight'}
              </h4>
              {weightFormError && (
                <p className="text-[14px] font-bold text-[#C2410C]">{weightFormError}</p>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Cân nặng (kg) *' : 'Weight (kg) *'}
                  </label>
                  <input
                    type="text"
                    data-testid="input-new-weight-kg"
                    value={newWeightKg}
                    onChange={(e) => setNewWeightKg(e.target.value)}
                    placeholder={lang === 'vi' ? 'VD: 3,9' : 'e.g. 3.9'}
                    className="form-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Ngày cân *' : 'Date *'}
                  </label>
                  <input
                    type="date"
                    value={newWeightDate}
                    onChange={(e) => setNewWeightDate(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
              </div>
              <button
                type="submit"
                data-testid="submit-new-weight-btn"
                className="btn-primary w-full py-3 text-[15px] font-bold cursor-pointer"
              >
                {lang === 'vi' ? 'Lưu cân nặng' : 'Save weight'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 2: Add / Edit CareRecord ("Thêm mũi tiêm / lịch chăm sóc")
      ====================================================================== */}
      {isCareModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={
            editingCareRecord
              ? lang === 'vi'
                ? 'Sửa lịch chăm sóc'
                : 'Edit care record'
              : lang === 'vi'
              ? 'Thêm mũi tiêm / lịch chăm sóc'
              : 'Add vaccine / care record'
          }
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="animora-card max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsCareModalOpen(false)}
              aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--surface-2)] cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              className="font-heading text-2xl font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              {editingCareRecord
                ? lang === 'vi'
                  ? `Sửa lịch chăm sóc (${activePet.name})`
                  : `Edit care record (${activePet.name})`
                : lang === 'vi'
                ? `Thêm mũi tiêm / lịch chăm sóc (${activePet.name})`
                : `Add vaccine / care record (${activePet.name})`}
            </h3>

            <form onSubmit={handleSaveCareRecord} className="space-y-4">
              {careFormError && (
                <div
                  role="alert"
                  className="p-3 rounded-xl text-[14px] font-bold bg-[#C2410C] text-white"
                >
                  {careFormError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Loại *' : 'Type *'}
                </label>
                <select
                  data-testid="care-modal-type"
                  value={careType}
                  onChange={(e) => setCareType(e.target.value as CareRecordType)}
                  className="form-input w-full"
                >
                  <option value="vaccine">
                    {lang === 'vi' ? 'Tiêm phòng' : 'Vaccine'}
                  </option>
                  <option value="deworm">
                    {lang === 'vi' ? 'Tẩy giun' : 'Deworming'}
                  </option>
                  <option value="checkup">
                    {lang === 'vi' ? 'Khám bệnh' : 'Checkup'}
                  </option>
                  <option value="spa">
                    {lang === 'vi' ? 'Spa & chăm sóc' : 'Spa & grooming'}
                  </option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Tên mũi tiêm / dịch vụ chăm sóc *' : 'Record name *'}
                </label>
                <input
                  type="text"
                  data-testid="care-modal-name"
                  value={careName}
                  onChange={(e) => setCareName(e.target.value)}
                  placeholder={
                    lang === 'vi'
                      ? 'VD: Vắc-xin 4 bệnh FVRCP, Tẩy giun Drontal...'
                      : 'e.g. FVRCP Booster, Heartgard Plus...'
                  }
                  className="form-input w-full"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Ngày thực hiện *' : 'Date performed *'}
                  </label>
                  <input
                    type="date"
                    data-testid="care-modal-date"
                    value={careDate}
                    onChange={(e) => setCareDate(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Ngày nhắc tiếp theo' : 'Next due date'}
                  </label>
                  <input
                    type="date"
                    data-testid="care-modal-next-due"
                    value={careNextDue}
                    onChange={(e) => setCareNextDue(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Ghi chú' : 'Notes'}
                </label>
                <textarea
                  rows={2}
                  data-testid="care-modal-notes"
                  value={careNotes}
                  onChange={(e) => setCareNotes(e.target.value)}
                  placeholder={
                    lang === 'vi'
                      ? 'Ghi chú phản ứng sau tiêm, liều lượng hoặc lời dặn của bác sĩ...'
                      : 'Notes on dosage, vet instructions, or reactions...'
                  }
                  className="form-input w-full !h-auto py-2.5"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                  {lang === 'vi'
                    ? 'Đính kèm (Ảnh hoặc PDF, tối đa 5MB)'
                    : 'Attachment (Image or PDF, max 5MB)'}
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleAttachmentFileChange}
                  className="block w-full text-[13px] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[13px] file:font-bold file:bg-[var(--surface-2)] file:text-[var(--text)] hover:file:opacity-90"
                  style={{ color: 'var(--text-muted)' }}
                />
                {careAttachmentName && (
                  <p className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Đã chọn: ' : 'Selected: '}
                    {careAttachmentName}
                  </p>
                )}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCareModalOpen(false)}
                  className="btn-secondary px-5 py-2.5 text-[14px] font-bold cursor-pointer"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  data-testid="care-modal-submit-btn"
                  className="btn-primary px-6 py-2.5 text-[14px] font-bold shadow-md cursor-pointer"
                >
                  {lang === 'vi' ? 'Lưu lịch chăm sóc' : 'Save record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 3: Edit Pet Info ("Sửa thông tin")
      ====================================================================== */}
      {isEditPetModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'vi' ? 'Sửa thông tin thú cưng' : 'Edit pet info'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="animora-card max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsEditPetModalOpen(false)}
              aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--surface-2)] cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              className="font-heading text-2xl font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              {lang === 'vi'
                ? `Sửa thông tin — ${activePet.name}`
                : `Edit info — ${activePet.name}`}
            </h3>

            <form onSubmit={handleSaveEditPet} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Tên bé *' : 'Pet name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Giống / loài' : 'Breed'}
                  </label>
                  <input
                    type="text"
                    value={editBreed}
                    onChange={(e) => setEditBreed(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Ngày sinh' : 'Date of birth'}
                  </label>
                  <input
                    type="date"
                    value={editBirthDate}
                    onChange={(e) => setEditBirthDate(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Cân nặng' : 'Weight'}
                  </label>
                  <input
                    type="text"
                    value={editWeightStr}
                    onChange={(e) => setEditWeightStr(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Màu lông' : 'Coat color'}
                  </label>
                  <input
                    type="text"
                    value={editCoatColor}
                    onChange={(e) => setEditCoatColor(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Mã vi mạch' : 'Microchip'}
                  </label>
                  <input
                    type="text"
                    value={editMicrochip}
                    onChange={(e) => setEditMicrochip(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Dị ứng' : 'Allergies'}
                  </label>
                  <input
                    type="text"
                    value={editAllergies}
                    onChange={(e) => setEditAllergies(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Khám định kỳ tiếp theo' : 'Next checkup'}
                  </label>
                  <input
                    type="date"
                    value={editNextCheckupDate}
                    onChange={(e) => setEditNextCheckupDate(e.target.value)}
                    className="form-input w-full"
                  />
                </div>
              </div>

              <label className="inline-flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={editNeutered}
                  onChange={(e) => setEditNeutered(e.target.checked)}
                  className="w-4 h-4 accent-[var(--primary)]"
                />
                <span className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Đã triệt sản' : 'Neutered'}
                </span>
              </label>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditPetModalOpen(false)}
                  className="btn-secondary px-5 py-2.5 text-[14px] font-bold cursor-pointer"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6 py-2.5 text-[14px] font-bold shadow-md cursor-pointer"
                >
                  {lang === 'vi' ? 'Lưu thay đổi' : 'Save changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 4: Add New Pet ("Thêm bé mới")
      ====================================================================== */}
      {isAddPetModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'vi' ? 'Thêm bé mới' : 'Add new pet'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="animora-card max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setIsAddPetModalOpen(false)}
              aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--surface-2)] cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <h3
              className="font-heading text-2xl font-bold mb-4"
              style={{ color: 'var(--text)' }}
            >
              {lang === 'vi' ? 'Thêm hồ sơ thú cưng mới' : 'Add new pet profile'}
            </h3>

            <form onSubmit={handleSaveNewPet} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Tên bé *' : 'Pet name *'}
                  </label>
                  <input
                    type="text"
                    required
                    data-testid="add-pet-name-input"
                    value={newPetName}
                    onChange={(e) => setNewPetName(e.target.value)}
                    placeholder="e.g. Bún, Kiki"
                    className="form-input w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Loài' : 'Species'}
                  </label>
                  <select
                    value={newPetSpecies}
                    onChange={(e) => setNewPetSpecies(e.target.value as PetSpecies)}
                    className="form-input w-full"
                  >
                    <option value="Mèo">{lang === 'vi' ? 'Mèo' : 'Cat'}</option>
                    <option value="Chó">{lang === 'vi' ? 'Chó' : 'Dog'}</option>
                    <option value="Thỏ">{lang === 'vi' ? 'Thỏ' : 'Rabbit'}</option>
                    <option value="Hamster">Hamster</option>
                    <option value="Chim">{lang === 'vi' ? 'Chim / Vẹt' : 'Bird'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Giống / loài' : 'Breed'}
                  </label>
                  <input
                    type="text"
                    value={newPetBreed}
                    onChange={(e) => setNewPetBreed(e.target.value)}
                    placeholder="e.g. Corgi, British Shorthair"
                    className="form-input w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Giới tính' : 'Gender'}
                  </label>
                  <select
                    value={newPetGender}
                    onChange={(e) => setNewPetGender(e.target.value as Gender)}
                    className="form-input w-full"
                  >
                    <option value="Cái">{lang === 'vi' ? 'Cái' : 'Female'}</option>
                    <option value="Đực">{lang === 'vi' ? 'Đực' : 'Male'}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Ngày sinh' : 'Date of birth'}
                  </label>
                  <input
                    type="date"
                    value={newPetBirthDate}
                    onChange={(e) => setNewPetBirthDate(e.target.value)}
                    className="form-input w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Cân nặng (kg)' : 'Weight (kg)'}
                  </label>
                  <input
                    type="text"
                    value={newPetWeight}
                    onChange={(e) => setNewPetWeight(e.target.value)}
                    placeholder="3.2"
                    className="form-input w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Màu lông' : 'Coat color'}
                  </label>
                  <input
                    type="text"
                    value={newPetCoat}
                    onChange={(e) => setNewPetCoat(e.target.value)}
                    placeholder={lang === 'vi' ? 'Trắng kem' : 'Cream white'}
                    className="form-input w-full"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Mã vi mạch' : 'Microchip'}
                  </label>
                  <input
                    type="text"
                    value={newPetMicrochip}
                    onChange={(e) => setNewPetMicrochip(e.target.value)}
                    placeholder="VN-900..."
                    className="form-input w-full"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Dị ứng (nếu có)' : 'Allergies (if any)'}
                </label>
                <input
                  type="text"
                  value={newPetAllergies}
                  onChange={(e) => setNewPetAllergies(e.target.value)}
                  placeholder={lang === 'vi' ? 'Không có' : 'None'}
                  className="form-input w-full"
                />
              </div>

              <label className="inline-flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newPetNeutered}
                  onChange={(e) => setNewPetNeutered(e.target.checked)}
                  className="w-4 h-4 accent-[var(--primary)]"
                />
                <span className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Đã triệt sản' : 'Neutered'}
                </span>
              </label>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPetModalOpen(false)}
                  className="btn-secondary px-5 py-2.5 text-[14px] font-bold cursor-pointer"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  data-testid="add-pet-submit-btn"
                  className="btn-primary px-6 py-2.5 text-[14px] font-bold shadow-md cursor-pointer"
                >
                  {lang === 'vi' ? 'Thêm bé mới' : 'Add new pet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 5: Delete Confirmation Dialog
      ====================================================================== */}
      {deletingRecordId && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'vi' ? 'Xác nhận xóa' : 'Confirm delete'}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="animora-card max-w-sm w-full p-6 space-y-4 text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto flex items-center justify-center"
              style={{ backgroundColor: 'var(--surface-2)', color: '#C2410C' }}
            >
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-heading text-xl font-bold" style={{ color: 'var(--text)' }}>
              {lang === 'vi'
                ? 'Xóa mục lịch sử chăm sóc?'
                : 'Delete this care record?'}
            </h3>
            <p className="text-[14px]" style={{ color: 'var(--text-muted)' }}>
              {lang === 'vi'
                ? 'Hành động này không thể hoàn tác. Bạn có chắc chắn muốn xóa mục này khỏi sổ sức khỏe của bé?'
                : 'This action cannot be undone. Are you sure you want to delete this record?'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingRecordId(null)}
                className="btn-secondary px-5 py-2 text-[14px] font-bold cursor-pointer"
              >
                {lang === 'vi' ? 'Hủy' : 'Cancel'}
              </button>
              <button
                type="button"
                data-testid="confirm-delete-record-btn"
                onClick={handleConfirmDeleteRecord}
                className="px-5 py-2 rounded-full text-[14px] font-bold bg-[#C2410C] text-white hover:opacity-90 cursor-pointer"
              >
                {lang === 'vi' ? 'Xóa' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================
          MODAL 6: Preselected Booking Form Modal ("Đặt lịch" / "Book")
      ====================================================================== */}
      {bookingModalService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'vi' ? 'Đặt lịch chăm sóc' : 'Book appointment'}
          data-testid="pet-reminder-booking-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <div className="animora-card max-w-md w-full p-6 relative space-y-4">
            <button
              type="button"
              onClick={() => setBookingModalService(null)}
              aria-label={lang === 'vi' ? 'Đóng' : 'Close'}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-[var(--surface-2)] cursor-pointer"
              style={{ color: 'var(--text-muted)' }}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-heading text-2xl font-bold" style={{ color: 'var(--text)' }}>
              {lang === 'vi'
                ? `Đặt lịch cho bé ${activePet.name}`
                : `Book appointment for ${activePet.name}`}
            </h3>

            <form onSubmit={handleSubmitReminderBooking} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Dịch vụ đã chọn' : 'Selected service'}
                </label>
                <input
                  type="text"
                  data-testid="booking-modal-preselected-service"
                  value={bookingModalService}
                  onChange={(e) => setBookingModalService(e.target.value)}
                  className="form-input w-full font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Họ và tên' : 'Your name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingCustomerName}
                    onChange={(e) => setBookingCustomerName(e.target.value)}
                    placeholder={activePet.owner || 'Nguyễn Thảo Nhi'}
                    className="form-input w-full"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                    {lang === 'vi' ? 'Số điện thoại' : 'Phone number'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingPhone}
                    onChange={(e) => setBookingPhone(e.target.value)}
                    placeholder="0901 234 567"
                    className="form-input w-full"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[13px] font-bold block" style={{ color: 'var(--text)' }}>
                  {lang === 'vi' ? 'Ngày hẹn' : 'Preferred date'}
                </label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="form-input w-full"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBookingModalService(null)}
                  className="btn-secondary px-5 py-2.5 text-[14px] font-bold cursor-pointer"
                >
                  {lang === 'vi' ? 'Hủy' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  data-testid="booking-modal-submit-btn"
                  className="btn-primary px-6 py-2.5 text-[14px] font-bold shadow-md cursor-pointer"
                >
                  {lang === 'vi' ? 'Xác nhận đặt lịch' : 'Confirm booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
