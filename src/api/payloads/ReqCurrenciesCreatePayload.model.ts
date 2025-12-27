import type { Currency } from "../models/Currency.model";

export type ReqCurrenciesCreatePayload = Omit<Currency, "id">;
