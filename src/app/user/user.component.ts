import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import { switchMap, tap } from 'rxjs/operators';

import { HackerNewsAPIService } from '../shared/services/hackernews-api.service';
import { User } from '../shared/models/user';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
    sub: Subscription;
    userId: string;
    user: User;
    errorMessage = '';

    constructor(
        private _hackerNewsAPIService: HackerNewsAPIService,
        private route: ActivatedRoute,
        private _location: Location
    ) {}

    ngOnInit() {
        this.sub = this.route.paramMap
            .pipe(
                tap((paramMap) => (this.userId = paramMap.get('id'))),
                switchMap(() => this._hackerNewsAPIService.fetchUser(this.userId))
            )
            .subscribe(
                (data) => (this.user = data),
                () => (this.errorMessage = 'Could not load user ' + this.userId + '.')
            );
    }

    goBack() {
        this._location.back();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
