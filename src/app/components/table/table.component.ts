import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  OnInit,
  Output,
  Signal,
  signal,
} from '@angular/core'
import {
  Column,
  ColumnDef,
  type ColumnOrderState,
  type ColumnPinningState,
  createAngularTable,
  FlexRenderDirective,
  getCoreRowModel,
  type VisibilityState,
} from '@tanstack/angular-table'
import { NgStyle } from '@angular/common'
import { ToastModule } from 'primeng/toast';
import { OnChanges } from '@angular/core';
type Person = {
  id: number
  cheackbox: boolean,
  firstName: string,
  lastName: string,
  age: number,
  visits: number,
  status: string,
  progress: number,
}

const defaultColumns: ColumnDef<Person>[] = [
  {
    header: () => '',
    cell: info => info.getValue(),
    footer: props => props.column.id,
    id: 'select',
    size: 52,
  },
  {
    accessorKey: 'firstName',
    id: 'firstName',
    cell: info => info.getValue(),
    header: () => 'First Name',
    footer: props => props.column.id,
    size: 200,
  },
  {
    accessorKey: 'lastName',
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => 'Last Name',
    footer: props => props.column.id,
    size: 200,
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    footer: props => props.column.id,
    size: 200,
  },
  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Visits',
    footer: props => props.column.id,
    size: 200,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    footer: props => props.column.id,
    size: 200,
  },
  {
    accessorKey: 'progress',
    id: 'progress',
    header: 'Profile Progress',
    footer: props => props.column.id,
    size: 150,
  },
]
@Component({
  selector: 'brite-table',
  imports: [FlexRenderDirective, NgStyle, ToastModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Output() selectedIdsChange = new EventEmitter<number[]>();
  pinFirstCol = input<boolean>(true)
  pinSecCol = input<boolean>(true)
  pinLastCol = input<boolean>(true)
  pinSecLastCol = input<boolean>(true)
  data = input<any[]>([
    {
      id: 110,
      cheackbox: true,
      firstName: 'tanner Mahmoud Morsi Mahmoud Hassaneen',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      id: 2,
      cheackbox: true,
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      id: 3,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'miller',
      age: 36,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
    {
      id: 4,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      id: 5,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      id: 6,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      id: 7,
      cheackbox: true,
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      id: 8,
      cheackbox: true,
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      id: 9,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'miller',
      age: 36,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
    {
      id: 10,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      id: 11,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      id: 12,
      cheackbox: true,
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
  ])
  readonly columns = signal([...defaultColumns])


  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns(),
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
  }))
  ngOnInit() {
    this.pinColumnsLeft()
    this.pinSecColumnRight()
    this.pinColumnRight()
    this.pinSecColumnLeft()

  }
  ngOnChanges() {
  }
  pinColumnsLeft() {
    const allColumns = this.table.getAllColumns();
    console.log(allColumns);
    const firstTwoColumn = allColumns.slice(0, 1);
    firstTwoColumn.forEach((column) => column.pin('left'));

  }
  pinSecColumnLeft() {
    const allColumns = this.table.getAllColumns();
    console.log(allColumns);
    const firstTwoColumn = allColumns.slice(1, 2);
    firstTwoColumn.forEach((column) => column.pin('left'));

  }
  pinColumnRight() {
    const allColumns = this.table.getAllColumns();
    console.log(allColumns);
    const lastTwoColumn = allColumns.slice(-1);

    lastTwoColumn.forEach((column) => column.pin('right'));
  }
  pinSecColumnRight() {
    const allColumns = this.table.getAllColumns();
    console.log(allColumns);
    const lastTwoColumn = allColumns.slice(-2, -1);

    lastTwoColumn.forEach((column) => column.pin('right'));
  }

  stringifiedColumnPinning = computed(() => {
    return JSON.stringify(this.table.getState().columnPinning)

  })

  readonly getCommonPinningStyles = (
    column: Column<Person>
  ): Record<string, any> => {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn =
      isPinned === 'left' && column.getIsLastColumn('left')
    const isFirstRightPinnedColumn =
      isPinned === 'right' && column.getIsFirstColumn('right')

    return {
      boxShadow: isLastLeftPinnedColumn
        ? '7px 0px 10px 0px rgba(0, 0, 0, 0.06) '
        : isFirstRightPinnedColumn
          ? '1px 3px 20px 0px rgba(0, 0, 0, 0.1) '
          : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? 'sticky' : 'relative',
      width: `${column.getSize()}px`,
      zIndex: isPinned ? 1 : 0,
    }
  }
  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    console.log(event);
    document.querySelectorAll('.checkbox').forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = checked;
    })
    const selectedIds = this.data().map((item) => {
      return item.id;
    });
    this.selectedIdsChange.emit(this.selectedIds);
    console.log("Selected Rows:", this.selectedIds);
  }

  selectedIds: number[] = [];

  selectRow(id: string) {
    const selectedRow = this.table.getRow(id);

    if (!selectedRow) {
      console.error(`Row with ID ${id} not found.`);
      return;
    }

    const rowId: number = selectedRow.original.id;
    const index = this.selectedIds.indexOf(rowId);

    if (index > -1) {
      this.selectedIds.splice(index, 1);
      console.log(`Row with ID ${rowId} deselected.`);
    } else {
      this.selectedIds.push(rowId);
      console.log(`Row with ID ${rowId} selected.`);
    }

    this.selectedIdsChange.emit(this.selectedIds);
  }


}

