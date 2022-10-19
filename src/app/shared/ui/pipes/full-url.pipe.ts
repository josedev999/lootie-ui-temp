import { Pipe, PipeTransform } from '@angular/core';
import { AppConfigService } from '../../services/app-config.service';

@Pipe({ name: 'fullUrl', standalone: true })
export class FullUrlPipe implements PipeTransform {
  constructor(private appConfigService: AppConfigService) {}

  transform(value: string, variant: string, uploadType: string, width?: number, height?: number) {
    return this.appConfigService.getUploadFilePath(variant, uploadType, width, height) + value;
  }
}
