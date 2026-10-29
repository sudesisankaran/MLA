import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Clock, Eye, AlertCircle, CheckCircle2, Archive } from 'lucide-react';

export const StatusBadge = ({ status, size = 'md' }) => {
  const { language } = useLanguage();

  const configs = {
    submitted: {
      en: 'Submitted',
      ta: 'சமர்ப்பிக்கப்பட்டது',
      bg: 'bg-blue-50 text-blue-800 border-blue-200',
      icon: Clock
    },
    under_review: {
      en: 'Under Review',
      ta: 'பரிசீலனையில் உள்ளது',
      bg: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: Eye
    },
    in_progress: {
      en: 'In Progress',
      ta: 'செயல்பாட்டில் உள்ளது',
      bg: 'bg-purple-50 text-purple-800 border-purple-300',
      icon: AlertCircle
    },
    resolved: {
      en: 'Resolved',
      ta: 'தீர்க்கப்பட்டது',
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      icon: CheckCircle2
    },
    closed: {
      en: 'Closed',
      ta: 'நிறைவுற்றது',
      bg: 'bg-slate-100 text-slate-700 border-slate-300',
      icon: Archive
    }
  };

  const current = configs[status] || configs['submitted'];
  const Icon = current.icon;
  const label = current[language] || current.en;

  const sizeClasses = size === 'sm'
    ? 'px-2 py-0.5 text-xs'
    : size === 'lg'
    ? 'px-3.5 py-1.5 text-sm font-semibold'
    : 'px-2.5 py-1 text-xs font-medium';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border shadow-sm ${current.bg} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{label}</span>
    </span>
  );
};

