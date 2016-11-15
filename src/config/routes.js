import Frame from '../frame/subroute.vue'
import login from '../page/login.vue'
import main from '../page/main.vue'
import customer from '../page/customer/index.vue'
import customerAdd from '../page/customer/add.vue'
import customerPreview from '../page/customer/preview.vue'

export default [
  {
    path: '/login',
    component: login
  },
  {
    path: '/main',
    component: main
  },
  {
    path: '/customer',
    component: Frame,
    children: [
      {path: '/',component: customer},
      {path: 'add',component: customerAdd},
      {path: 'preview/:id',component: customerPreview}
    ],
  },
]
