import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LootieResponse } from './cases.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class AppConfig {
  appId!: string;
  appName!: string;
  referralCutLevels?: number[];
  referralLevels?: number[];
  depositBonus?: {
    [key: string]: number;
  };
  notification?: string;
  upload?: {
    baseUrl: string;
    types?: {
      [key: string]: string;
    };
  };
  metainfo?: any;
}

@Injectable({providedIn: 'root'})
export class AppConfigService {
  private _appConfig: AppConfig = {
    referralCutLevels: [
      0.05,
      0.06,
      0.07,
      0.08,
      0.1
    ],
    referralLevels: [
      50,
      200,
      1000,
      5000
    ],
    appName: 'Lootie',
    appId: 'lootie',
    depositBonus: {
      coinbase: 0.05
    },
    upload: {
      baseUrl: 'https://image.lootie.com/',
      types: {
        caseImage: 'case-images',
        itemImage: 'item-images',
        testimonial: 'testimonials'
      }
    },
  }

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }


  getAppId() {
    return environment.appId;
  }

  get config(): AppConfig {
    return this._appConfig;
  }

  getUploadFilePath(variant: string, uploadType: string, width?: number, height?: number) {
    let filepath: string = this._appConfig.upload?.baseUrl || '';

    if (filepath.slice(-1) !== '/') {
      filepath += '/';
    }

    if (variant) {
      filepath += variant + '/';
    }

    filepath += (this._appConfig.upload?.types || {})[uploadType] + '/';

    if (width || height) {
      const params: { quality: number, width?: number, height?: number, format?: 'webp' | 'png' | 'auto' } = {
        quality: 75,
      };

      if (width) {
        params['width'] = width;
      }

      if (height) {
        params['height'] = height;
      }

      params['format'] = 'webp';

      const query = Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join(',');

      return `https://lootie.com/cdn-cgi/image/${query}/${filepath}`;
    }

    return filepath;
  }
}
