import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './component/diary/diary/diary.component';

const routes: Routes = [
  { path: '', redirectTo: '/diary', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: './component/diary/diary.module.ts#DiaryModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
