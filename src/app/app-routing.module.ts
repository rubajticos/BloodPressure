import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/diary', pathMatch: 'full' },
  {
    path: 'diary',
    loadChildren: () =>
      import('./component/diary/diary.module').then((m) => m.DiaryModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./component/auth/auth.module').then((m) => m.AuthModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
