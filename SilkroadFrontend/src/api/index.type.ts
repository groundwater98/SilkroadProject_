export interface getApiOccupationRequestBody {
  occupation: string;
  title: string;
  content: { [key: string]: string[] };
  additionalData: { [key: string]: string[] };
  tip: string[];
}

export interface getApiOutlookRequestBody {
  occupation: string;
  title: string;
  positive: { [key: string]: string };
  negative: { [key: string]: string };
  additionalConsider: { [key: string]: string };
  viewOfExpert: { [key: string]: string };
  result: string[];
}
