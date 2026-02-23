export const BUTTON_SIZE_SMALL =
  "h-8 px-2 gap-x-2 rounded-md text-s14-l20 font-medium";

export const BUTTON_SIZE_MEDIUM =
  "h-9 px-3 gap-x-2 rounded-md text-s14-l20 font-medium";

export const BUTTON_SIZE_LARGE =
  "h-10 px-3 gap-x-3 rounded-md text-s16-l24 font-medium";

export const BUTTON_SIZE_X_LARGE =
  "h-12 px-6 gap-x-4 rounded-lg text-s16-l24 font-medium";

export const BUTTON_BASE = `${BUTTON_SIZE_MEDIUM} flex items-center justify-center cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed fill-current`;

export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-primary text-surface-primary hover:bg-primary-dark disabled:bg-primary/40`;

export const BUTTON_PRIMARY_OUTLINED = `${BUTTON_BASE} bg-transparent border border-primary text-primary hover:bg-primary hover:text-surface-primary hover:border-primary disabled:border-primary/40 disabled:text-primary/40 disabled:hover:bg-transparent`;

export const BUTTON_ACCENT = `${BUTTON_BASE} bg-accent text-surface-primary hover:bg-accent-dark disabled:bg-accent/40`;

export const BUTTON_ACCENT_OUTLINED = `${BUTTON_BASE} bg-transparent border border-accent text-accent hover:bg-accent hover:text-surface-primary hover:border-accent disabled:border-accent/40 disabled:text-accent/40 disabled:hover:bg-transparent`;

export const BUTTON_ERROR = `${BUTTON_BASE} bg-error-primary text-surface-primary hover:bg-error-primary/90 disabled:bg-error-primary/40`;

export const INPUT_BASE = `h-10 pl-4 rounded-lg text-s14-l20 text-text-primary placeholder:text-text-disabled border border-border-primary outline-none transition-colors`;

export const INPUT_ERROR = "border-error-primary focus:border-error-primary";

export const INPUT_DISABLED = "bg-gray-3 cursor-not-allowed opacity-60";

export const TEXT_AREA_BASE = `h-20 px-4 py-3 resize-none rounded-[10px] text-s14-l20 text-text-primary placeholder:text-text-disabled border border-border-primary outline-none transition-colors`;

export const TEXT_AREA_ERROR =
  "border-error-primary focus:border-error-primary";

export const TEXT_AREA_DISABLED = "bg-gray-3 cursor-not-allowed opacity-60";
