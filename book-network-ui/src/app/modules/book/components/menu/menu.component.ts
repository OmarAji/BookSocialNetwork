import {Component, OnInit} from '@angular/core';
import {TokenService} from "../../../../services/token/token.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  fullName: String = "";

  constructor(
    private tokenService: TokenService,
  ) {
  }

  ngOnInit(): void {
    const linkColor: NodeListOf<Element> = document.querySelectorAll('.nav-link');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });
    this.fullName = this.tokenService.getFullName();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
