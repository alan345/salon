import { AdminGuardService } from './services/adminGuard';
import { AdminUsersComponent } from './user/adminUsers.component';
export var ADMIN_ROUTES = [
    { path: 'user', component: AdminUsersComponent, canActivate: [AdminGuardService] },
];
//# sourceMappingURL=admin.routes.js.map