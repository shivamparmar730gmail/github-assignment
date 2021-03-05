import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsersDataService {

	constructor(
		public helperService: HelperService
	) { }

	/**
	 * @desc Function for github user list from server
	 * @param search value
	*/
	getGithubUsersList(searchValue :any): Observable<any> {
		let url = 'search/users?q='+searchValue;
		return this.helperService.makeHttpRequest(
			url,
			"get"
		);
	}

	/**
	 * @desc Function for github user details from server
	 * @param username
	*/
	getGithubUsersDetails(loginName :any): Observable<any> {
		let url = 'users/'+loginName+'/repos';
		return this.helperService.makeHttpRequest(
			url,
			"get"
		);
	}
}
