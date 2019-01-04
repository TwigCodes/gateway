import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of, combineLatest, Subscription } from 'rxjs';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  AppState,
  LocalStorageService,
  selectIsAuthenticated,
  ActionAuthCheckLogin,
  selectRealm
} from '@app/core';
import { filter } from 'rxjs/operators';
// import { OAuthService } from 'angular-oauth2-oidc';
// import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { environment as env } from '@env/environment';

import {
  ActionSettingsChangeLanguage,
  ActionSettingsChangeAnimationsPageDisabled,
  selectEffectiveTheme,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from './settings';

export interface RouteMenu {
  link: string;
  label: string;
}

@Component({
  selector: 'tgapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  realm$: Observable<string>;
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
  languages = [
    { label: '中文', value: 'zh-cn' },
    { label: 'English', value: 'en' }
  ];
  navigation = [
    { link: 'about', label: 'tgapp.menu.about' },
    { link: 'feedback/raters', label: 'tgapp.menu.feedback.raters' },
    { link: 'feedback/audit', label: 'tgapp.menu.feedback.audit' },
    {
      link: 'feedback/review',
      label: 'tgapp.menu.feedback.review'
    },
    { link: 'admin', label: 'tgapp.menu.admin' }
  ];
  navigation$: Observable<RouteMenu[]>;
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'tgapp.menu.settings' }
  ];
  navigationSideMenu$: Observable<RouteMenu[]>;
  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  sub = new Subscription();
  constructor(
    private store: Store<AppState>,
    private storageService: LocalStorageService
  ) // private oauthService: OAuthService
  {}

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    this.realm$ = this.store.pipe(
      select(selectRealm),
      filter(val => val != null)
    );
    // this.sub.add(
    //   this.realm$.subscribe(realm => {
    //     this.oauthService.configure({
    //       ...env.oidcConfig,
    //       issuer: `${env.oidcConfig.issuer}/${realm}`
    //     });
    //     this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    //     this.oauthService.loadDiscoveryDocumentAndTryLogin();
    //   })
    // );
    this.navigation$ = combineLatest(
      this.realm$,
      of(this.navigation),
      (realm, navs) =>
        navs.map(nav => ({ ...nav, link: `${realm}/${nav.link}` }))
    );
    this.navigationSideMenu$ = combineLatest(
      this.realm$,
      of(this.navigationSideMenu),
      (realm, navs) =>
        navs.map(nav => ({ ...nav, link: `${realm}/${nav.link}` }))
    );
    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.store.dispatch(new ActionAuthCheckLogin());
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  onLoginClick() {
    this.store.dispatch(new ActionAuthLogin());
  }

  onLogoutClick() {
    this.store.dispatch(new ActionAuthLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }
}
