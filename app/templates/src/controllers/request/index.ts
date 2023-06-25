import qs from 'qs';
import {API_BASE_URL, REQUEST_HEADERS} from '../../config';

type RequestParams = {
  url?: string;
  headers?: HeadersInit;
  method?: string;
  body?: Record<string, any>;
}

const request = (params: RequestParams): Promise<any> => {
  const {
    url = API_BASE_URL,
    headers = REQUEST_HEADERS,
    method = 'GET',
    body = undefined,
  } = params;

  return fetch(url, {
    method,
    headers,
    ...(body ? method === 'GET' ? {body: qs.stringify(body)} : {body: JSON.stringify(body)} : {}),
  }).then(response => response.json());
};

export const submitData = (body: any): Promise<any> => request({
  url: `${API_BASE_URL}/submit`,
  method: 'POST',
  body,
}).then(({data, errors}) => ({data, errors}));
