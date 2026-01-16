import axiosInstance from "../../axios";
import type { ReqSearchResponse } from "../responses/ReqSearchResponse.model";

const PATH_NAME = "/search";

export const reqSearch = (q: string) => {
  return axiosInstance.get<ReqSearchResponse>(PATH_NAME, {
    params: { q },
  });
};
