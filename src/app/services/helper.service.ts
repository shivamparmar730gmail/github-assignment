import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../config/constants';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HelperService {

	constructor(
		private http: HttpClient,
	) { }

	/**
	 * @desc Common function to call GET/POST with/without parameters
	 * @param url
	 * @param type
	 * @param data
	 */
	makeHttpRequest(url: any, type = 'get', data = {}) {
		let httpRequest: any;
		url = CONSTANTS.API_ENDPOINT + url;

		if (type == 'post') {
			httpRequest = this.http[type](url, data);
		} else {
			httpRequest = this.http['get'](url);
		}
		return httpRequest.pipe(
			map(response => {
				return response;
			}),
			catchError(err => of([]))
		);
	}
}
