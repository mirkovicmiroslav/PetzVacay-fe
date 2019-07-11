import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsureModuleLoadedOnceGuard } from './guards/ensureModuleLoadedOnceGuard ';
import { AuthentificationService } from './services/authentification.service';
import { TokenService } from './services/token.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from './interceptors/htttpTokenInterceptor';
import { AuthenticationGuard } from './guards/authentification.guards';
import { IsNotPetSitterGuard } from './guards/isNotPetSitter.guard';
import { IsPetSitterGuard } from './guards/isPetSitter.guard';
import { IsAdminGuard } from './guards/isAdmin.guard';
@NgModule({
  declarations: [],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    AuthentificationService,
    AuthenticationGuard,
    IsPetSitterGuard,
    IsNotPetSitterGuard,
    IsAdminGuard,
    TokenService
  ],
  imports: [CommonModule],
  exports: [HttpClientModule]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
