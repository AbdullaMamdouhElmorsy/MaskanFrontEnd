import { NgModule } from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { TableModule } from 'primeng/table';
 import {PaginatorModule} from 'primeng/paginator';
 import {AutocompleteLibModule} from 'angular-ng-autocomplete';
 import { AvatarModule } from 'primeng/avatar';
 import { CalendarModule } from 'primeng/calendar';
 import { DropdownModule } from 'primeng/dropdown';
 import { CheckboxModule } from 'primeng/checkbox';
 import {MultiSelectModule} from 'primeng/multiselect';
 //import { AutoCompleteModule } from 'primeng/autocomplete';

 //import { AccordionModule } from 'primeng/accordion';
// import { BadgeModule } from 'primeng/badge';
// import { BreadcrumbModule } from 'primeng/breadcrumb';
// import { ButtonModule } from 'primeng/button';
// import { CarouselModule } from 'primeng/carousel';
// import { CascadeSelectModule } from 'primeng/cascadeselect';
// import { ChartModule } from 'primeng/chart';
// import { ChipModule } from 'primeng/chip';
// import { ChipsModule } from 'primeng/chips';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ColorPickerModule } from 'primeng/colorpicker';
// import { ContextMenuModule } from 'primeng/contextmenu';
// import { DataViewModule } from 'primeng/dataview';
// import { VirtualScrollerModule } from 'primeng/virtualscroller';
// import { DialogModule } from 'primeng/dialog';
// import { DividerModule } from 'primeng/divider';
// import { DockModule } from 'primeng/dock';
// import { DragDropModule } from 'primeng/dragdrop';
// import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { EditorModule } from 'primeng/editor';
// import { FieldsetModule } from 'primeng/fieldset';
// import { FileUploadModule } from 'primeng/fileupload';
// import { GalleriaModule } from 'primeng/galleria';
// import { InplaceModule } from 'primeng/inplace';
// import { InputMaskModule } from 'primeng/inputmask';
// import { InputSwitchModule } from 'primeng/inputswitch';
// import { InputTextModule } from 'primeng/inputtext';
// import { InputNumberModule } from 'primeng/inputnumber';
// import { InputTextareaModule } from 'primeng/inputtextarea';
// import { ImageModule } from 'primeng/image';
// import { KnobModule } from 'primeng/knob';
// import { ListboxModule } from 'primeng/listbox';
// import { MegaMenuModule } from 'primeng/megamenu';
// import { MenuModule } from 'primeng/menu';
// import { MenubarModule } from 'primeng/menubar';
// import { MessageModule } from 'primeng/message';
// import { MessagesModule } from 'primeng/messages';
// import { OrderListModule } from 'primeng/orderlist';
// import { OrganizationChartModule } from 'primeng/organizationchart';
// import { OverlayPanelModule } from 'primeng/overlaypanel';
// import { PanelModule } from 'primeng/panel';
// import { PanelMenuModule } from 'primeng/panelmenu';
// import { PasswordModule } from 'primeng/password';
// import { PickListModule } from 'primeng/picklist';
// import { ProgressBarModule } from 'primeng/progressbar';
// import { RadioButtonModule } from 'primeng/radiobutton';
// import { RatingModule } from 'primeng/rating';
// import { ScrollerModule } from 'primeng/scroller';
// import { ScrollPanelModule } from 'primeng/scrollpanel';
// import { ScrollTopModule } from 'primeng/scrolltop';
// import { SelectButtonModule } from 'primeng/selectbutton';
// import { SidebarModule } from 'primeng/sidebar';
// import { SkeletonModule } from 'primeng/skeleton';
// import { SlideMenuModule } from 'primeng/slidemenu';
// import { SliderModule } from 'primeng/slider';
// import { SpeedDialModule } from 'primeng/speeddial';
// import { SpinnerModule } from 'primeng/spinner';
// import { SplitButtonModule } from 'primeng/splitbutton';
// import { SplitterModule } from 'primeng/splitter';
// import { StepsModule } from 'primeng/steps';
// import { TabMenuModule } from 'primeng/tabmenu';
// import { TabViewModule } from 'primeng/tabview';
// import { TagModule } from 'primeng/tag';
// import { TerminalModule } from 'primeng/terminal';
// import { TieredMenuModule } from 'primeng/tieredmenu';
// import { TimelineModule } from 'primeng/timeline';
// import { ToastModule } from 'primeng/toast';
// import { ToggleButtonModule } from 'primeng/togglebutton';
// import { ToolbarModule } from 'primeng/toolbar';
// import { TooltipModule } from 'primeng/tooltip';
// import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
// import { TreeModule } from 'primeng/tree';
// import { TreeSelectModule } from 'primeng/treeselect';
// import { TreeTableModule } from 'primeng/treetable';
// import { AnimateModule } from 'primeng/animate';
// import { CardModule } from 'primeng/card';
// import { BlockUIModule } from 'primeng/blockui';
// import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { IconModule } from "@coreui/icons-angular";
import { AccountingRoutingModule } from "./accounting-routing.module";
import {BillComponent} from "./Bill/bill.component"
import {UniteBillComponent} from "./UniteBill/unite-bill.component"
import { AccountingComponent } from "./Accouting.component";
import {UnPaidBillComponent} from "./UnPaidBills/unpaid-bills..component"
import { TranslateModule } from "@ngx-translate/core";

@NgModule({ declarations: [
        AccountingComponent,
        BillComponent,
        UniteBillComponent,
        UnPaidBillComponent
    ], imports: [ReactiveFormsModule,
        AccountingRoutingModule,
        TranslateModule,
        IconModule,
        CommonModule,
        TableModule,
        AvatarModule,
        CalendarModule,
        CheckboxModule,
        PaginatorModule,
        AutocompleteLibModule,
        DropdownModule,
        MultiSelectModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AccountingModule {

}