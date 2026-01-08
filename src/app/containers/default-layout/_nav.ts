import { INavData } from '@coreui/angular';

export const SuperAdminNavItems: INavData[] = [
 
  // {
  //   title: true,
  //   name: 'Theme'
  // },

  {
    name: 'Modules',
    title: true
  },
  //Admin
  {
    name: 'Admin',
    url: '/admin',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Tenants',
        url: '/admin/tenant'
      },
      {
        name: 'Unites',
        url: '/admin/unite'
      },
      {
        name: 'Unite Types',
        url: '/admin/uniteType'
      },
      // {
      //   name: 'User Types',
      //   url: '/admin/userType'
      // },
      {
        name: 'Unite Block',
        url: '/admin/uniteBlock'
      },
      {
        name: 'Complain Type',
        url: '/admin/complainType'
      },
      {
        name: 'Roles',
        url: '/admin/role'
      },
      {
        name: 'Users',
        url: '/admin/user'
      },
      {
        name: 'Request Type',
        url: '/admin/requestType'
      },
      {
        name:'Unite Stuff Type',
        url:'/admin/stuffType'
      },
     
     
     
     
    ]
  },
  //Operation
  {
    name: 'Operation',
    url: '/operation',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Complaints',
        url: '/operation/complaints'
      },
      {
        name: 'Requests',
        url: '/operation/requests'
      },
      {
        name: 'Visits',
        url: '/operation/visits'
      },
      {
        name: 'Unite Stuffs',
        url: '/operation/uniteStuff'
      },
      
      
    ]
  },
//Accounting
  {
    name: 'Accounting',
    url: '/accounting',
    iconComponent: { name: 'cil-credit-card' },
    children: [
      {
        name:'Bills',
        url:'/accounting/bill'
      },
      {
        name:'Unite Bills',
        url:'/accounting/uniteBill'
      },
      {
        name:'UnPaid Bills',
        url:'/accounting/unPaidBill'
      },
      
    ]
  },
  // {
  //   name: 'Forms',
  //   url: '/forms',
  //   iconComponent: { name: 'cil-notes' },
  //   children: [
  //     {
  //       name: 'Form Control',
  //       url: '/forms/form-control'
  //     },
  //     {
  //       name: 'Select',
  //       url: '/forms/select'
  //     },
  //     {
  //       name: 'Checks & Radios',
  //       url: '/forms/checks-radios'
  //     },
  //     {
  //       name: 'Range',
  //       url: '/forms/range'
  //     },
  //     {
  //       name: 'Input Group',
  //       url: '/forms/input-group'
  //     },
  //     {
  //       name: 'Floating Labels',
  //       url: '/forms/floating-labels'
  //     },
  //     {
  //       name: 'Layout',
  //       url: '/forms/layout'
  //     },
  //     {
  //       name: 'Validation',
  //       url: '/forms/validation'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   iconComponent: { name: 'cil-chart-pie' }
  // },
  // {
  //   name: 'Icons',
  //   iconComponent: { name: 'cil-star' },
  //   url: '/icons',
  //   children: [
  //     {
  //       name: 'CoreUI Free',
  //       url: '/icons/coreui-icons',
  //       badge: {
  //         color: 'success',
  //         text: 'FREE'
  //       }
  //     },
  //     {
  //       name: 'CoreUI Flags',
  //       url: '/icons/flags'
  //     },
  //     {
  //       name: 'CoreUI Brands',
  //       url: '/icons/brands'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   iconComponent: { name: 'cil-bell' },
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges'
  //     },
  //     {
  //       name: 'Modal',
  //       url: '/notifications/modal'
  //     },
  //     {
  //       name: 'Toast',
  //       url: '/notifications/toasts'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   iconComponent: { name: 'cil-calculator' },
  //   badge: {
  //     color: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  // {
  //   name: 'Pages',
  //   url: '/login',
  //   iconComponent: { name: 'cil-star' },
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500'
  //     }
  //   ]
  // },
];
export const AdminNavItems: INavData[] = [
  
  {
    title: true,
    name: 'Theme'
  },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'someAnchor' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  {
    name: 'Modules',
    title: true
  },
  {
    name: 'Admin',
    url: '/admin',
    iconComponent: { name: 'cil-puzzle' },
    children: [
     
      {
        name: 'Unites',
        url: '/admin/unite'
      },
      {
        name: 'Unite Types',
        url: '/admin/uniteType'
      },
      // {
      //   name: 'User Types',
      //   url: '/admin/userType'
      // },
      {
        name: 'Unite Block',
        url: '/admin/uniteBlock'
      },
      {
        name: 'Complain Type',
        url: '/admin/complainType'
      },
    
      {
        name: 'Users',
        url: '/admin/user'
      },
      {
        name: 'Request Type',
        url: '/admin/requestType'
      },
      {
        name:'Unite Stuff Type',
        url:'/admin/stuffType'
      },
      {
        name:'Bill',
        url:'/admin/bill'
      }
     
     
    ]
  },
  //Operation
  {
    name: 'Operation',
    url: '/operation',
    iconComponent: { name: 'cil-cursor' },
    children: [
      {
        name: 'Complaints',
        url: '/operation/complaints'
      },
      {
        name: 'Requests',
        url: '/operation/requests'
      },
      {
        name: 'Visits',
        url: '/operation/visits'
      },
      {
        name: 'Unite Stuffs',
        url: '/operation/uniteStuff'
      },
      
      
    ]
  },
  //Accounting
  {
    name: 'Accounting',
    url: '/accounting',
    iconComponent: { name: 'cil-credit-card' },
    children: [
      {
        name:'Bills',
        url:'/accounting/bill'
      },
      {
        name:'Unite Bills',
        url:'/accounting/uniteBill'
      },
      {
        name:'UnPaid Bills',
        url:'/accounting/unPaidBill'
      },
      
    ]
  },
 
];

export const OperationNavItems: INavData[] = [
 
  {
    title: true,
    name: 'Theme'
  },
 
  {
    name: 'Modules',
    title: true
  },
  {
    name: 'Admin',
    url: '/admin',
    iconComponent: { name: 'cil-puzzle' },
    children: [
     
    
      
      
      
      {
        name: 'Users',
        url: '/admin/user'
      },
      
      // {
      //   name:'Unite Stuff Type',
      //   url:'/admin/stuffType'
      // }
     
     
    ]
  },
  {
    name: 'Operation',
    url: '/operation',
    iconComponent: { name: 'cil-credit-card' },
    children: [
      {
        name: 'Complaints',
        url: '/operation/complaints'
      },
      {
        name: 'Requests',
        url: '/operation/requests'
      },
      {
        name: 'Visits',
        url: '/operation/visits'
      },
      {
        name: 'Unite Stuffs',
        url: '/operation/uniteStuff'
      },
      
      
    ]
  },
  
];