import {API_BASE_URL} from '../config';
import {request} from '../controllers/request';
import {type EmptyObject} from '../types';

export const login = async (params?: { username: string, password: string }): Promise<{ data?: EmptyObject, errors?: string[] }> => request<EmptyObject>({
  url: `${API_BASE_URL}/login`,
  method: 'POST',
  params,
});
