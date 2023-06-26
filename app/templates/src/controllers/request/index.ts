// import qs from 'qs';
import {API_BASE_URL, REQUEST_HEADERS, REQUEST_TIMEOUT} from '../../config';

type KeyValuePairs = Record<string, string>;
interface RequestParams {
  url?: string
  headers?: HeadersInit
  method?: string
  body?: KeyValuePairs
}

// Recursive objects are not supported here
const qsStringify = (body: KeyValuePairs): string => new URLSearchParams(body).toString();
// If you need recursive objects/params then install 'qs' lib
// const qsStringifyRecursive = (body: KeyValuePairs): string => qs.stringify(body);

const request = async <T>(params: RequestParams): Promise<{data?: Promise<T>, errors?: string[]}> => {
  const {
    url = API_BASE_URL,
    headers = REQUEST_HEADERS,
    method = 'GET',
    body = undefined,
  } = params;
  const controller = new AbortController();
  const init = {
    signal: controller.signal,
    method,
    headers,
    ...((body != null) ? method === 'GET' ? {body: qsStringify(body)} : {body: JSON.stringify(body)} : {}),
  };

  setTimeout((): void => { controller.abort(); }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(url, init);
    if (response.ok) {
      const json = await response.json() as Promise<T>;
      return {data: json};
    }

    return {errors: [`HTTP error status ${response.status}`]};
  } catch (error) {
    const errors = [];

    if (error instanceof SyntaxError) {
      errors.push(`Parsing response failed: ${error.message}`);
    } else if (error instanceof DOMException && error.name === 'AbortError') {
      errors.push('Request timed out');
    } else if (error instanceof Error) {
      errors.push(`Request failed: ${error.message}`);
    } else {
      errors.push(`Request failed: ${JSON.stringify(error)}`);
    }

    return {errors};
  }
};

export const getData = async<T> (body?: KeyValuePairs): Promise<{data?: Promise<T>, errors?: string[]}> => request({
  url: `${API_BASE_URL}/data`,
  method: 'GET',
  body,
});

export const submitData = async<T> (body?: KeyValuePairs): Promise<{data?: Promise<T>, errors?: string[]}> => request({
  url: `${API_BASE_URL}/submit`,
  method: 'POST',
  body,
});
