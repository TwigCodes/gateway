import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';

/**
 * 加载图标，包括 svg 图标和 FontAwesome 字体图标等
 *
 * @param ir a MatIconRegistry 实例，用于注册图标资源
 * @param ds a DomSanitizer 实例，用于忽略安全检查返回一个 URL
 */
export const loadIconResources = (ir: MatIconRegistry, ds: DomSanitizer) => {
  const avatarDir = `assets/avatars`;
  const iconDir = `assets/icons`;
  ir.addSvgIconSetInNamespace(
    'avatars',
    ds.bypassSecurityTrustResourceUrl(`${avatarDir}/avatars.svg`)
  )
    .addSvgIcon(
      'male',
      ds.bypassSecurityTrustResourceUrl(`${avatarDir}/male.svg`)
    )
    .addSvgIcon(
      'female',
      ds.bypassSecurityTrustResourceUrl(`${avatarDir}/female.svg`)
    )
    .addSvgIcon(
      'review',
      ds.bypassSecurityTrustResourceUrl(`${iconDir}/review.svg`)
    )
    .addSvgIcon(
      'decline',
      ds.bypassSecurityTrustResourceUrl(`${iconDir}/decline.svg`)
    )
    .registerFontClassAlias('fontawesome', 'fa');
};

export const loadAvatars = () => {
  const avatarName = 'avatars';
  return _.range(1, 16)
    .map(i => `${avatarName}:svg-${i}`)
    .reduce((r: string[], x: string) => [...r, x], []);
};
