import { Injectable } from '@angular/core';
import { ApiService } from '../../../global/services/api.services';
import {
	Category,
	CategorySlugNames,
} from '../../../global/entities/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { MainPageService } from '../../main-page/services/main-page.service';
import { ProductListInterface } from '../../../global/entities/product-list.interface';
import { ActivatedRoute } from '@angular/router';
import {FilterService} from "./filter.service";

@Injectable({
	providedIn: 'root',
})
export class ProductListService {
	private category: BehaviorSubject<Category> = new BehaviorSubject<Category>(
		{} as Category
	);
	public category$: Observable<Category> = this.category.asObservable();

  private params = {}

	public get categorySlug(): CategorySlugNames {
		return this.category.getValue().slug;
	}

	constructor(
		private apiService: ApiService,
		private mainPageService: MainPageService,
		private route: ActivatedRoute,
    private filterService: FilterService
	) {}

	public getCategoryBySlug(
		slug: CategorySlugNames
	): Observable<ProductListInterface> {

    this.route.queryParams.subscribe(
      query => {
        this.params = query
      }
    )
		return this.apiService.get<ProductListInterface>(
			`categories/${slug}/products/`,
			this.params
		);
	}

	public setCurrentCategoryBySlug(slug: CategorySlugNames) {
		if (!this.mainPageService.hasCategories) {
			this.mainPageService.getCategories().subscribe();
		}
		this.mainPageService.categories$?.subscribe(categories => {
			if (Object.keys(categories)?.length) {
				const currentCategory = categories?.find(
					category => category?.slug === slug
				);
				if (currentCategory) {
					this.category.next(currentCategory);
          this.filterService.initFilterState(currentCategory.filters)
				}
			}
		});
	}
}
