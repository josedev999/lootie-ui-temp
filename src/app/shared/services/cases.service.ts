import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpClientModule } from '@angular/common/http';

export interface LootieResponse<T> {
  message: string;
  data: T;
}

export enum CaseType {
  all = 'ALL',
  official = 'OFFICIAL',
  daily = 'DAILY',
  streetwear = 'STREETWEAR',
  electronics = 'ELECTRONICS',
  accessories = 'ACCESSORIES',
  top = 'TOP 100',
  new = 'NEW CASE',
  cent = 'GAMING',
  free = 'FREE'
}


export class CaseModel {
  _id?: string;
  name!: string;
  image!: string;
  caseType?: CaseType;
  earning?: number;
  unboxCounts?: number;
  salePercent?: number;
  items?: any[];
  affiliateCut?: number;
  price?: number;
  // TODO: [demidn] dont know what is that for. But it is used in HTML for case-box
  value?: number;
  creator?: string;
  updatedAt?: string;
  createdAt?: string;
  color?: string;
  slug?: string;
  houseEdge?: number;
  count?: number;
  badgeLabel?: string;
  badgeType?: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __v?: number;
}


export type PageableLootieResponse<T> = LootieResponse<{ total: number; data: T[] }>;

export class Pagination {
  limit?: number;
  offset?: number;
  totalItems?: number;
}

export type SortOrder = 'asc' | 'desc';
export type SortBy = 'name' | 'value' | 'price' | 'featured' | 'any_price' | 'most_popular' | 'best_float' | 'createdAt';

export class Filters {
  orderDir: SortOrder = 'asc';
  orderBy: SortBy = 'name';
}

@Injectable({providedIn: 'root'})
export class CasesService{
  private readonly caseColors = ['#19bd66', '#9d63d2', '#4fc1e3', '#f3893a', '#f34747'];
  private prevColor = '';

  constructor(private http: HttpClient) {
  }

  getCases(
    caseType: CaseType,
    pagination: Pagination | undefined,
    filters: Filters,
    name?: string
  ): Observable<PageableLootieResponse<CaseModel>> {
    let params = '';
    if (pagination) {
      const { limit, offset } = pagination;
      params = (limit ? `limit=${limit}` : '') + `&offset=${offset}&`;
    }

    if (filters) {
      const { orderBy, orderDir } = filters;
      params += `sortBy=${orderBy}&sortDirection=${orderDir}&`;
    }

    if (name && name !== '') {
      params += `name=${encodeURIComponent(name)}&`;
    }

    if (caseType !== CaseType.all) {
      params += `caseType=${caseType}&`;
    }
    return this.http.get<PageableLootieResponse<CaseModel>>(`${environment.apiUrl}/cases?${params}`);
  }

  getLatestDrops(): Observable<LootieResponse<any[]>> {
    return this.http.get<LootieResponse<any[]>>(`${environment.apiUrl}/case-openings/latest-drops`);
  }


  getSystemStatistics(): Observable<LootieResponse<{ unboxed: number, registered: number, online: number }>> {
    return this.http.get<LootieResponse<{ unboxed: number, registered: number, online: number }>>(`${environment.apiUrl}/statistics/system?d=` + Date.now());
  }

  generateColor(): string {
    const color = this.caseColors[Math.floor(Math.random() * this.caseColors.length)];
    if (color === this.prevColor) {
      return this.generateColor();
    }

    this.prevColor = color;
    return color;
  }
}
