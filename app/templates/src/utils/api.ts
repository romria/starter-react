import qs from 'qs';

export const attachQueryParams = (url: string, params: any): string => {
  const query = qs.stringify(params);

  return `${url}${query ? `?${query}` : ''}`;
};

// export const attachQueryParams = (url: string, params: string | Record<string, string> | string[][] | URLSearchParams | undefined) => {
//   const query = new URLSearchParams(params).toString();
//
//   return `${url}${query ? `?${query}` : ''}`;
// }
