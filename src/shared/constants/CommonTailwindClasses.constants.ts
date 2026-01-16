export const BUTTON_SIZE_SMALL =
  "h-8 px-2 gap-x-2 rounded-md text-s14-l20 font-medium";

export const BUTTON_SIZE_MEDIUM =
  "h-9 px-3 gap-x-2 rounded-md text-s14-l20 font-medium";

export const BUTTON_SIZE_LARGE =
  "h-10 px-3 gap-x-3 rounded-md text-s16-l24 font-medium";

export const BUTTON_SIZE_X_LARGE =
  "h-12 px-6 gap-x-4 rounded-lg text-s16-l24 font-medium";

export const BUTTON_BASE = `${BUTTON_SIZE_MEDIUM} flex items-center justify-center cursor-pointer transition-colors duration-200 disabled:cursor-not-allowed`;

export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-orange text-white hover:bg-orange-dark disabled:bg-orange/40`;

export const BUTTON_PRIMARY_OUTLINED = `${BUTTON_BASE} bg-transparent border border-orange text-orange hover:bg-orange hover:text-white hover:border-orange disabled:border-orange/40 disabled:text-orange/40 disabled:hover:bg-transparent`;

export const BUTTON_ERROR = `${BUTTON_BASE} bg-error-primary text-white hover:bg-error-primary/90 disabled:bg-error-primary/40`;

export const INPUT_BASE = `h-10 pl-4 rounded-lg text-s14-l20 text-text-primary placeholder:text-gray-2 border border-gray-2 outline-none transition-colors`;

export const INPUT_ERROR = "border-error-primary focus:border-error-primary";

export const INPUT_DISABLED = "bg-gray-3 cursor-not-allowed opacity-60";

export const TEXT_AREA_BASE = `h-20 px-4 py-3 resize-none rounded-[10px] text-s14-l20 text-text-primary placeholder:text-gray-2 border border-gray-2 outline-none transition-colors`;

export const TEXT_AREA_ERROR =
  "border-error-primary focus:border-error-primary";

export const TEXT_AREA_DISABLED = "bg-gray-3 cursor-not-allowed opacity-60";
