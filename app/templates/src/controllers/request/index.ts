// import qs from 'qs';
import {API_BASE_URL, REQUEST_HEADERS, REQUEST_TIMEOUT} from '../../config';

type KeyValuePairs = Record<string, string>;
interface RequestParams {
  url?: string
  headers?: HeadersInit
  method?: string
  data?: KeyValuePairs
}

// Recursive objects are not supported here
const qsStringify = (body: KeyValuePairs): string => new URLSearchParams(body).toString();
// If you need recursive objects/params then install 'qs' lib
// const qsStringifyRecursive = (body: Record<string, Record | string>): string => qs.stringify(body);

export const request = async <T>(params: RequestParams): Promise<{data?: T, errors?: string[]}> => {
  const {
    url = API_BASE_URL,
    headers = REQUEST_HEADERS,
    method = 'GET',
    data,
  } = params;
  const controller = new AbortController();
  const targetURL = method === 'GET' || method === 'HEAD' ? `${url}${data ? `?${qsStringify(data)}` : ''}` : url
  const options = {
    signal: controller.signal,
    method,
    headers,
    ...((method !== 'GET' && method !== 'HEAD' && data != null) ? {body: JSON.stringify(data)} : {}),
  };

  setTimeout((): void => { controller.abort(); }, REQUEST_TIMEOUT);

  try {
    const response = await fetch(targetURL, options);
    if (response.ok) {
      const json: T = await response.json();
      return {data: json};
    }

    return {errors: [`HTTP responded with status ${response.status}`]};
  } catch (error) {
    const errors: string[] = [];

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
