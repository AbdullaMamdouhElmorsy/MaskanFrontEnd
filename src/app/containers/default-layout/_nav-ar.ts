import { INavData } from '@coreui/angular';


export const ArSuperAdminNavItems: INavData[] = [
 
  
  // إدارة
  {
    name: 'إدارة',
    url: '/admin',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'المستأجرون',
        url: '/admin/tenant'
      },
      {
        name: 'الوحدات',
        url: '/admin/unite'
      },
      {
        name: 'أنواع الوحدات',
        url: '/admin/uniteType'
      },
      // {
      //   name: 'أنواع المستخدمين',
      //   url: '/admin/userType'
      // },
      {
        name: 'القطع',
        url: '/admin/uniteBlock'
      },
      {
        name: 'أنواع الشكاوى',
        url: '/admin/complainType'
      },
      {
        name: 'الأدوار',
        url: '/admin/role'
      },
      {
        name: 'المستخدمون',
        url: '/admin/user'
      },
      {
        name: 'أنواع الطلبات',
        url: '/admin/requestType'
      },
      {
        name: 'أغراض الوحدات',
        url: '/admin/stuffType'
      }
    ]
  },
  // العمليات
  {
    name: 'العمليات',
    url: '/operation',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'الشكاوى',
        url: '/operation/complaints'
      },
      {
        name: 'الطلبات',
        url: '/operation/requests'
      },
      {
        name: 'الزيارات',
        url: '/operation/visits'
      },
      {
        name: 'أغراض الوحدات',
        url: '/operation/uniteStuff'
      }
    ]
  },
  // المحاسبة
  {
    name: 'المحاسبة',
    url: '/accounting',
    iconComponent: { name: 'cil-credit-card' },
    children: [
      {
        name: 'الفواتير',
        url: '/accounting/bill'
      },
      {
        name: 'فواتير الوحدات',
        url: '/accounting/uniteBill'
      },
      {
        name: 'الفواتير غير المدفوعة',
        url: '/accounting/unPaidBill'
      }
    ]
  }
];

export const ArAdminNavItems: INavData[] = [
  
  // {
  //   title: true,
  //   name: 'السمات'
  // },
  // {
  //   name: 'الألوان',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'الخطوط',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  // {
  //   name: 'الوحدات',
  //   title: true
  // },
  {
    name: 'إدارة',
    url: '/admin',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'الوحدات',
        url: '/admin/unite'
      },
      {
        name: 'أنواع الوحدات',
        url: '/admin/uniteType'
      },
      // {
      //   name: 'أنواع المستخدمين',
      //   url: '/admin/userType'
      // },
      {
        name: 'كتلة الوحدة',
        url: '/admin/uniteBlock'
      },
      {
        name: 'أنواع الشكاوى',
        url: '/admin/complainType'
      },
      {
        name: 'المستخدمون',
        url: '/admin/user'
      },
      {
        name: 'أنواع الطلبات',
        url: '/admin/requestType'
      },
      {
        name: 'اغراض الوحدات',
        url: '/admin/stuffType'
      },
      {
        name: 'الفاتورة',
        url: '/admin/bill'
      }
    ]
  },
  // العمليات
  {
    name: 'العمليات',
    url: '/operation',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'الشكاوى',
        url: '/operation/complaints'
      },
      {
        name: 'الطلبات',
        url: '/operation/requests'
      },
      {
        name: 'الزيارات',
        url: '/operation/visits'
      },
      {
        name: 'اغراض الوحدات',
        url: '/operation/uniteStuff'
      }
    ]
  },
  // المحاسبة
  {
    name: 'المحاسبة',
    url: '/accounting',
    iconComponent: { name: 'cil-credit-card' },
    children: [
      {
        name: 'الفواتير',
        url: '/accounting/bill'
      },
      {
        name: 'فواتير الوحدات',
        url: '/accounting/uniteBill'
      },
      {
        name: 'الفواتير غير المدفوعة',
        url: '/accounting/unPaidBill'
      }
    ]
  }
];

export const ArOperationNavItems: INavData[] = [
 
  // {
  //   title: true,
  //   name: 'السمات'
  // },

  // {
  //   name: 'الوحدات',
  //   title: true
  // },
  {
    name: 'إدارة',
    url: '/admin',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'المستخدمون',
        url: '/admin/user'
      },
      // {
      //   name: 'أنواع موظفي الوحدات',
      //   url: '/admin/stuffType'
      // }
    ]
  },
  {
    name: 'العمليات',
    url: '/operation',
    iconComponent: { name: 'cil-credit-card' },
    children: [
      {
        name: 'الشكاوى',
        url: '/operation/complaints'
      },
      {
        name: 'الطلبات',
        url: '/operation/requests'
      },
      {
        name: 'الزيارات',
        url: '/operation/visits'
      },
      {
        name: 'اغراض الوحدات',
        url: '/operation/uniteStuff'
      }
    ]
  }
];


