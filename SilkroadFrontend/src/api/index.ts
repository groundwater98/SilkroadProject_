import { fetchClient } from './axios';
import {
  getApiOccupationRequestBody,
  getApiOutlookRequestBody,
} from './index.type';

export const getApiOccupation = (
  occupation: string,
  period: number,
  periodType: string,
) =>
  fetchClient().get<getApiOccupationRequestBody>('/api/occupation', {
    params: {
      occupation,
      period,
      periodType,
    },
  });

export const getApiOutlook = (occupation: string) =>
  fetchClient().get<getApiOutlookRequestBody>('/api/outlook', {
    params: {
      occupation,
    },
  });
