import { Component, OnInit } from '@angular/core';
import { AuthService, UserRole } from '../../servises/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { IconComponent } from '../../icons/icons.component';

interface MenuItem {
  label: string;
  iconName: string;
  routerLink: string[];
  roles: UserRole[];
}

@Component({
  selector: 'brite-sidebar',
  standalone: true,
  imports: [MenuModule, ButtonModule, SidebarModule, IconComponent, RouterOutlet, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  // Define all possible menu items
  private allMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      iconName: 'dashboard',
      routerLink: ['/admin/dashboard'],
      roles: ['admin', 'manager', 'employee'],
    },
    {
      label: 'Users',
      iconName: 'users',
      routerLink: ['/admin/users'],
      roles: ['admin'],
    },
    {
      label: 'Products',
      iconName: 'shopping-cart',
      routerLink: ['/admin/products'],
      roles: ['admin', 'manager'],
    },
    {
      label: 'Orders',
      iconName: 'shopping-bag',
      routerLink: ['/admin/orders'],
      roles: ['admin', 'manager', 'employee'],
    },
    {
      label: 'Analytics',
      iconName: 'chart-line',
      routerLink: ['/admin/analytics'],
      roles: ['admin', 'manager'],
    },
    {
      label: 'Settings',
      iconName: 'cog',
      routerLink: ['/admin/settings'],
      roles: ['admin'],
    },
    {
      label: 'Reports',
      iconName: 'file',
      routerLink: ['/admin/reports'],
      roles: ['admin', 'manager'],
    },
  ];

  // Filtered menu items based on user role
  visibleMenuItems: MenuItem[] = [];

  // Sidebar visibility state
  isSidebarVisible = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.updateVisibleMenuItems();
  }

  // Update visible menu items based on the current user's role
  private updateVisibleMenuItems(): void {
    this.authService.getCurrentUserRole().subscribe({
      next: (userRole) => {
        if (userRole) {
          this.visibleMenuItems = this.filterMenuItemsByRole(userRole);
        } else {
          console.warn('No user role found. Showing no menu items.');
          this.visibleMenuItems = [];
        }
      },
      error: (error) => {
        console.error('Failed to fetch user role:', error);
        this.visibleMenuItems = [];
      },
    });
  }

  // Filter menu items by user role
  private filterMenuItemsByRole(role: UserRole): MenuItem[] {
    return this.allMenuItems.filter((item) => item.roles.includes(role));
  }
}
