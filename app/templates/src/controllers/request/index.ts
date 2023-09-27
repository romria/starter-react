import {APPLICATION_JSON, APPLICATION_JSON_UTF8, CONTENT_TYPE} from '../../constants';
import {API_BASE_URL, DEFAULT_REQUEST_HEADERS, REQUEST_TIMEOUT_DURATION} from '../../config';
import {attachQueryParams} from '../../utils/api';

interface RequestParams {
  url?: string
  headers?: HeadersInit
  method?: string
  params?: string | Record<string, any> | any[] | FormData | File
}

export const request = async <T>(r: RequestParams): Promise<{ data?: T, errors?: string[] }> => {
  const {
    url = API_BASE_URL,
    headers = {},
    method = 'GET',
    params,
  } = r;
  const isGETMethod = method === 'GET';
  const controller = new AbortController();
  const init: Omit<RequestInit, 'headers'> & { headers: Headers } = {
    signal: controller.signal,
    method,
    headers: new Headers({...DEFAULT_REQUEST_HEADERS, ...headers}),
  };
  const targetURL = isGETMethod ? attachQueryParams(url, params) : url;

  if (params instanceof FormData || params instanceof File) {
    init.body = params;
  } else if (params != null && !isGETMethod) {
    init.body = JSON.stringify(params);
    init.headers.set(CONTENT_TYPE, APPLICATION_JSON_UTF8);
  }

  setTimeout((): void => { controller.abort(); }, REQUEST_TIMEOUT_DURATION);

  try {
    const response = await fetch(targetURL, init);
    const contentType = response.headers.get(CONTENT_TYPE) ?? '';

    if (response.ok) { // code was in the range from 200 to 299
      /**
       By default, the expected response 'Content-Type' is 'application/json'.
       Other expected cases can be defined below.
       In unexpected cases {data} will be set as undefined.
       */
      if (contentType.startsWith(APPLICATION_JSON)) {
        const json: T = await response.json();
        return {data: json};
      } /* else if (contentType.startsWith(TEXT_PLAIN)) {
        const text = await response.text();
        return {data: text};
      }
      else if (contentType.startsWith(TEXT_HTML)) {
        const text = await response.text();
        const parser = new DOMParser();
        const {title} = parser.parseFromString(text, TEXT_HTML);
        return {data: {title}};
      }
      else if (contentType.startsWith(TEXT_CSV)) {
        const blob = await response.blob();
        return {data: blob};
      } */

      return {data: undefined};
    }

    const errors: string[] = [`${method} ${url.replace(API_BASE_URL, '')} responded with ${response.status}${response.statusText ? `: ${response.statusText}` : ''}`];

    /**
     By default, the expected error response 'Content-Type' is 'application/json'.
     Other expected cases can be defined below.
     */
    if (contentType.startsWith(APPLICATION_JSON)) {
      const json = await response.json();
      errors.push(JSON.stringify(json));
    } /* else if (contentType.startsWith(TEXT_HTML)) {
      const text = await response.text();
      const parser = new DOMParser();
      const {title} = parser.parseFromString(text, TEXT_HTML);
      errors.push(`"${title}"`);
    } */

    return {errors};
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
