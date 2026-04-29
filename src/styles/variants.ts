import { cva } from 'class-variance-authority';

export const actionButton = cva(
  'flex-1 text-white font-black py-10 px-12 rounded-[3rem] text-5xl flex items-center justify-center gap-8 uppercase tracking-tighter transition-all transform hover:-translate-y-2 active:translate-y-3 active:shadow-none',
  {
    variants: {
      intent: {
        primary: 'bg-indigo-600 hover:bg-indigo-700 shadow-[0_15px_0_0_rgba(49,46,129,1)]',
        success: 'bg-emerald-500 hover:bg-emerald-600 shadow-[0_15px_0_0_rgba(6,95,70,1)]'
      },
      italic: {
        true: 'italic',
        false: ''
      }
    },
    defaultVariants: {
      intent: 'primary',
      italic: false
    }
  }
);

export const feedbackBanner = cva(
  'mt-12 p-10 rounded-[4rem] flex items-center gap-10 animate-in fade-in duration-500 border-[8px]',
  {
    variants: {
      type: {
        success: 'bg-green-50 text-green-800 border-green-200 shadow-xl',
        error: 'bg-rose-50 text-rose-800 border-rose-200'
      }
    },
    defaultVariants: {
      type: 'success'
    }
  }
);

export const answerOption = cva(
  'border-4 transition-all cursor-pointer',
  {
    variants: {
      selected: {
        true: '',
        false: ''
      },
      tone: {
        indigo: '',
        sky: '',
        rose: '',
        emerald: ''
      }
    },
    compoundVariants: [
      { selected: true, tone: 'indigo', class: 'bg-indigo-600 border-indigo-800 text-white scale-105 shadow-md' },
      { selected: false, tone: 'indigo', class: 'bg-white border-indigo-100 text-indigo-400 hover:bg-indigo-50' },
      { selected: true, tone: 'sky', class: 'bg-sky-500 border-sky-700 text-white shadow-md scale-[1.02]' },
      { selected: false, tone: 'sky', class: 'bg-slate-50 border-slate-200 text-slate-500 hover:border-sky-300' },
      { selected: true, tone: 'rose', class: 'bg-rose-600 border-rose-800 text-white scale-105' },
      { selected: false, tone: 'rose', class: 'bg-white border-rose-100 text-rose-300' },
      { selected: true, tone: 'emerald', class: 'bg-emerald-600 border-emerald-800 text-white scale-105' },
      { selected: false, tone: 'emerald', class: 'bg-white border-emerald-100 text-emerald-300' }
    ],
    defaultVariants: {
      selected: false,
      tone: 'indigo'
    }
  }
);
