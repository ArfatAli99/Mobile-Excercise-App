/** New config for API**/

import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import {API_KEY, API_URL} from '../../config/urls.config';

export const REQ_HEADERS = new Headers();
REQ_HEADERS.append('Accept', 'application/json');
REQ_HEADERS.append('Content-Type', 'application/x-www-form-urlencoded');
REQ_HEADERS.append('x-api-key', API_KEY);

export const GET_OPTIONS = new RequestOptions();
GET_OPTIONS.headers = REQ_HEADERS;
GET_OPTIONS.method = "get";

export const POST_OPTIONS = new RequestOptions();
POST_OPTIONS.headers = REQ_HEADERS;
POST_OPTIONS.method = "post";
