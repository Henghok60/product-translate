import { Controller } from '@nestjs/common';
import { TranslatesService } from './translates.service';

@Controller('translates')
export class TranslatesController {
  constructor(private readonly translatesService: TranslatesService) {}
}
