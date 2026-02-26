// src/app/pages/dashboard/dashboard.page.ts
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonContent, IonHeader, IonToolbar, IonIcon, IonBadge,
  IonAvatar, IonPopover, IonList, IonItem, IonLabel,
  IonMenuButton, IonSplitPane, IonMenu, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  gridOutline, cubeOutline, alertCircleOutline, layersOutline,
  ribbonOutline, documentTextOutline, colorPaletteOutline,
  notificationsOutline, personOutline, logOutOutline,
  trendingUpOutline, walletOutline, statsChartOutline,
  cashOutline, addCircleOutline, chevronDownOutline
} from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

export interface NavItem {
  label: string;
  icon:  string;
  route: string;
}

export interface StatCard {
  label:    string;
  value:    string;
  icon:     string;
  iconBg:   string;
  iconColor: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [
    CommonModule, RouterLink, RouterLinkActive,
    IonContent, IonHeader, IonToolbar, IonIcon, IonBadge,
    IonAvatar, IonPopover, IonList, IonItem, IonLabel,
    IonMenuButton, IonSplitPane, IonMenu, IonButtons
  ]
})
export class DashboardPage implements OnInit {
  showUserMenu  = false;
  activeTab     = 'primary';
  notifCount    = 3;

  navItems: NavItem[] = [
    { label: 'Dashboard',          icon: 'grid-outline',           route: '/dashboard'          },
    { label: 'Orders',             icon: 'cube-outline',           route: '/orders'             },
    { label: 'Complaints',         icon: 'alert-circle-outline',   route: '/complaints'         },
    { label: 'Stocks',             icon: 'layers-outline',         route: '/stocks'             },
    { label: 'Schemes',            icon: 'ribbon-outline',         route: '/schemes'            },
    { label: 'Product Certificate',icon: 'document-text-outline',  route: '/certificates'       },
    { label: 'Branding Request',   icon: 'color-palette-outline',  route: '/branding'           },
  ];

  statCards: StatCard[] = [
    { label: 'Current Month Targets', value: '32/42',   icon: 'cube-outline',          iconBg: '#EEF2FF', iconColor: '#4F46E5' },
    { label: 'Ledger Balance',        value: '₹18.5L',  icon: 'wallet-outline',        iconBg: '#ECFDF5', iconColor: '#059669' },
    { label: 'Current Month Sales',   value: '₹4.2Cr',  icon: 'trending-up-outline',   iconBg: '#FFF7ED', iconColor: '#EA580C' },
    { label: "Today's Sales",         value: '₹18.5L',  icon: 'cash-outline',          iconBg: '#ECFDF5', iconColor: '#059669' },
  ];

  contractOrders = [
    { id: 'OR-2401', dealer: 'Steel Enterprises Ltd',   value: '₹12,45,000', tonnage: '125 MT' },
    { id: 'OR-2401', dealer: 'Modern Construction Co',  value: '₹9,85,000',  tonnage: '98 MT'  },
    { id: 'OR-2401', dealer: 'Metro Builders',          value: '₹8,50,000',  tonnage: '85 MT'  },
    { id: 'OR-2401', dealer: 'Urban Infrastructure',    value: '₹7,20,000',  tonnage: '72 MT'  },
    { id: 'OR-2401', dealer: 'City Developers',         value: '₹6,80,000',  tonnage: '68 MT'  },
  ];

  dispatchedOrders = [
    { id: 'OR-1802', dealer: 'Raj Hardware Store',    value: '₹4,25,000', tonnage: '42 MT' },
    { id: 'OR-1802', dealer: 'Kumar Trading Co',      value: '₹3,90,000', tonnage: '39 MT' },
    { id: 'OR-1802', dealer: 'Gupta Enterprises',     value: '₹3,50,000', tonnage: '35 MT' },
    { id: 'OR-1802', dealer: 'Sharma Steel Mart',     value: '₹3,20,000', tonnage: '32 MT' },
    { id: 'OR-1802', dealer: 'Patel Distributors',    value: '₹2,95,000', tonnage: '29 MT' },
  ];

  constructor(public auth: AuthService, private router: Router) {
    addIcons({
      gridOutline, cubeOutline, alertCircleOutline, layersOutline,
      ribbonOutline, documentTextOutline, colorPaletteOutline,
      notificationsOutline, personOutline, logOutOutline,
      trendingUpOutline, walletOutline, statsChartOutline,
      cashOutline, addCircleOutline, chevronDownOutline
    });
  }

  ngOnInit(): void {}

  logout(): void {
    this.showUserMenu = false;
    this.auth.logout();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
