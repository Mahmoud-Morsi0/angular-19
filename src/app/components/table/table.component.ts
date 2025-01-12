import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
import { NgStyle, NgTemplateOutlet, SlicePipe } from '@angular/common'
import { MenuItem, MessageService } from 'primeng/api';
import { SplitButton } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'First Name',
    cell: info => info.getValue(),
    footer: props => props.column.id,
    size: 180,
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => 'Last Name',
    footer: props => props.column.id,
    size: 180,
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    footer: props => props.column.id,
    size: 180,
  },
  {
    accessorKey: 'visits',
    id: 'visits',
    header: 'Visits',
    footer: props => props.column.id,
    size: 180,
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    footer: props => props.column.id,
    size: 180,
  },
  {
    accessorKey: 'progress',
    id: 'progress',
    header: 'Profile Progress',
    footer: props => props.column.id,
    size: 180,
  },
]
@Component({
  selector: 'brite-table',
  imports: [FlexRenderDirective, NgStyle, ToastModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  readonly columns = signal([...defaultColumns])
  readonly data = signal<Person[]>([
    {
      firstName: 'tanner Mahmoud Morsi Mahmoud Hassaneen',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'miller',
      age: 36,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
    {
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      firstName: 'tanner',
      lastName: 'linsley',
      age: 24,
      visits: 100,
      status: 'In Relationship',
      progress: 50,
    },
    {
      firstName: 'tandy',
      lastName: 'miller',
      age: 40,
      visits: 40,
      status: 'Single',
      progress: 80,
    },
    {
      firstName: 'joe',
      lastName: 'miller',
      age: 36,
      visits: 20,
      status: 'Complicated',
      progress: 10,
    },
    {
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
    {
      firstName: 'joe',
      lastName: 'smith',
      age: 62,
      visits: 60,
      status: 'In Relationship',
      progress: 66,
    },
  ])
  readonly columnVisibility = signal<VisibilityState>({})
  readonly columnOrder = signal<ColumnOrderState>([])
  readonly columnPinning = signal<ColumnPinningState>({})
  readonly split = signal(false)

  table = createAngularTable(() => ({
    data: this.data(),
    columns: this.columns(),
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    columnResizeMode: 'onChange',
  }))

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
        ? '2px 0 4px 2px rgba(0, 0, 0, 0.06) '
        : isFirstRightPinnedColumn
          ? '2px 0 4px 6px rgba(0, 0, 0, 0.06) '
          : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? 'sticky' : 'relative',
      width: `${column.getSize()}px`,
      zIndex: isPinned ? 1 : 0,
    }
  }

}

