import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersDataService } from 'src/app/services/users-data.service';

@Component({
	selector: 'app-github-users',
	templateUrl: './github-users.component.html',
	styleUrls: ['./github-users.component.css']
})
export class GithubUsersComponent implements OnInit {
	isCollapsed = false;
	message: string = 'expanded';
	userDetails: any;
	dataCount: number = 0;
	sortByType = 'name-ascending';
	showDirectionLinks = true;
	p: number = 0;
	@ViewChild('userDetailsTable', { static: false }) userDetailsTableRef: any;

	// Form for searching the github user's.
	searchForm = new FormGroup({
		search: new FormControl('', Validators.required),
	});
	
	// Form for sorting of user data.
	sortForm = new FormGroup({
		sortBy: new FormControl(''),
	});

	constructor(
		public userData: UsersDataService,
		private renderer: Renderer2
	) { }

	ngOnInit(): void {
	}

	/**
	 * @desc Function for github user list from user service.
	*/
	getGithubUsersList() {
		if(this.searchForm.valid){
		let searchValue = this.searchForm.value.search.trim();
			this.userData.getGithubUsersList(searchValue).subscribe(
				result => {
					this.userDetails = result.items;
					this.dataCount = result.total_count;
					console.log(this.dataCount);
				}
			);
		} 
	}

	/**
	 * @desc Function for github user details from user service.
	*/
	getUserDetails(loginName: any) {
		this.userData.getGithubUsersDetails(loginName).subscribe(
			result => {
				this.showUserDetails(loginName, result);
			}
		);
	}

	/**
	 * @desc Function for show users details.
	*/
	showUserDetails(loginName: any, result: any) {
		if (result != '') {
			if (this.userDetailsTableRef.nativeElement.querySelector('#'+loginName).hasChildNodes()) {
				this.userDetailsTableRef.nativeElement.querySelector('#'+loginName).innerHTML = '';
			}
			result.forEach((element: any) => {

				// Create row for the table.
				const tr: HTMLParagraphElement = this.renderer.createElement('tr');
				this.userDetailsTableRef.nativeElement.querySelector('#'+loginName);

				// Create table data element for the table.
				let td1 = document.createElement('td');
				let td2 = document.createElement('td');
				let td3 = document.createElement('td');
				let td4 = document.createElement('td');
				let td5 = document.createElement('td');
				let td6 = document.createElement('td');

				let name = document.createTextNode(element.name);
				let language = document.createTextNode(element.language);
				let open_issues = document.createTextNode(element.open_issues);
				let stargazers_count = document.createTextNode(element.stargazers_count);
				let watchers = document.createTextNode(element.watchers);
				let forks_count = document.createTextNode(element.forks_count);

				// Add data to the table.
				td1.appendChild(name);
				td2.appendChild(language);
				td3.appendChild(open_issues);
				td4.appendChild(stargazers_count);
				td5.appendChild(watchers);
				td6.appendChild(forks_count);

				tr.appendChild(td1);
				tr.appendChild(td2);
				tr.appendChild(td3);
				tr.appendChild(td4);
				tr.appendChild(td5);
				tr.appendChild(td6);

				this.userDetailsTableRef.nativeElement.querySelector('#'+loginName).appendChild(tr);
			});
		}
	}

	/**
	 * @desc Function for sort user by ascending and descending (by name, rank).
	*/
	sortUser(){
		let sort = this.sortForm.value.sortBy;
		if(sort = 'name-descending'){
			this.userDetails.sort(this.dynamicSort("-login"));
		} else if(sort = 'rank-ascending') {
			this.userDetails.sort(this.dynamicSort("id"));
		} else if(sort = 'rank-descending') {
			this.userDetails.sort(this.dynamicSort("-id"));
		} else {
			this.userDetails.sort(this.dynamicSort("login"));
		}
	}
	
	/**
	 * @desc Logic for sort user.
	*/
	dynamicSort(property :any) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a :any,b:any) {
			if(sortOrder == -1){
				return b[property].localeCompare(a[property]);
			}else{
				return a[property].localeCompare(b[property]);
			}        
		}
	}
}
