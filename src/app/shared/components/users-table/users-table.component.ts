import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
// Angular Material
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Components
import { EmptyComponent } from '../empty/empty.component';
import { GitHubUser } from '@core/services/github/types';
import { MatTooltipModule } from '@angular/material/tooltip';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    EmptyComponent,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Table Data
  @Input({
    alias: 'items',
    transform: (value: any) => new MatTableDataSource<any>(value),
  }) data: MatTableDataSource<any> = new MatTableDataSource();
  @Input({ transform: booleanAttribute }) loading: boolean = false;
  @Input() total: number = 0;
  @Input() set pagination(value: PageEvent) {
    this.#pagination = value;
  };
  get pagination(): PageEvent {
    return this.#pagination;
  }
  #pagination: PageEvent = new PageEvent();
  @Output() paginationChange = new EventEmitter<PageEvent>();
  @Output() userSelect = new EventEmitter<GitHubUser>();

  readonly displayedColumns: string[] = ['avatar_url', 'login'];
  readonly pageSize = PAGE_SIZE;

  ngAfterViewInit(): void {
    this.sort?.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  handlePageChange(pagination: PageEvent): void {
    pagination = {
      ...pagination,
      pageIndex: pagination.pageIndex,
      previousPageIndex: pagination.previousPageIndex,
    }
    this.paginationChange.emit(pagination);
  }

  selectUser = (user: GitHubUser) => this.userSelect.emit(user);

}
