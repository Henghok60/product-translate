import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import * as ExcelJS from 'exceljs';
import { ProductTranslate } from './entities/product-translate.entity';
import { Translation } from './entities/translation.entity';
import {
  appTranslateKey,
  languageCode,
  productKey,
} from 'src/common/constant/excel-row';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductTranslate)
    private productTranslateRepository: Repository<ProductTranslate>,
    @InjectRepository(Translation)
    private translateRepository: Repository<Translation>,
  ) {}

  async createTranslateByExcel(file: Express.Multer.File) {
    const workbook = new ExcelJS.Workbook();
    const key = productKey;

    // this.language
    // Read the Excel file
    await workbook.xlsx.readFile(file.path);
    const lang = ['en', ...languageCode];
    const worksheet = workbook.worksheets[0]; // Get the first worksheet
    let count = 0;
    // Iterate through all rows in the worksheet
    worksheet.eachRow(async (row, rowIndex) => {
      try {
        const data = await this.productRepository.findOne({
          where: { id: row.values[key.id] },
        });

        if (data) {
          // const en = await this.productTranslateRepository.findOne({
          //   where: { product_id: row.values[key.id], lang: 'en' },
          // });

          // if (!en) {
          //   await this.productTranslateRepository.insert({
          //     product_id: row.values[key.id],
          //     lang: 'en',
          //     name: row.values[key.name],
          //     unit: row.values[key.unit],
          //   });
          // }

          // const cn = await this.productTranslateRepository.findOne({
          //   where: { product_id: row.values[key.id], lang: 'cn' },
          // });

          // if (!cn) {
          //   await this.productTranslateRepository.insert({
          //     product_id: row.values[key.id],
          //     lang: 'cn',
          //     name: row.values[key.cnName].result,
          //     unit: row.values[key.unit],
          //   });
          // }

          // const kr = await this.productTranslateRepository.findOne({
          //   where: { product_id: row.values[key.id], lang: 'kr' },
          // });

          // if (!kr) {
          //   await this.productTranslateRepository.insert({
          //     product_id: row.values[key.id],
          //     lang: 'kr',
          //     name: row.values[key.krName].result,
          //     unit: row.values[key.unit],
          //   });
          // }

          // const jp = await this.productTranslateRepository.findOne({
          //   where: { product_id: row.values[key.id], lang: 'jp' },
          // });

          // if (!jp) {
          //   await this.productTranslateRepository.insert({
          //     product_id: row.values[key.id],
          //     lang: 'jp',
          //     name: row.values[key.jpName].result,
          //     unit: row.values[key.unit],
          //   });
          // }

          const insertData: any = [];
          for (let i = 0; i < lang.length; i++) {
            const translate = await this.productTranslateRepository.findOne({
              where: { product_id: row.values[key.id], lang: lang[i] },
            });

            if (!translate) {
              insertData.push({
                product_id: row.values[key.id],
                lang: lang[i],
                name: row.values[key[lang[i] + 'Name']].result
                  ? row.values[key[lang[i] + 'Name']].result
                  : row.values[key[lang[i] + 'Name']],
                unit: row.values[key.unit],
              });
            }
          }

          await this.productTranslateRepository.insert(insertData);
        }

        console.log('insert row :' + count++);
      } catch (error: any) {
        console.log(error);
      }
    });

    return 'This action adds a new product';
  }

  async sampleExcel() {
    let data = await this.productRepository.find({
      relations: ['productTranslates'],
    });
    data = data.filter((product) => product.productTranslates.length < 4);
    // await this.update();
    // await this.updateOne();
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('MySheet');

    const languages = ['en', 'cn', 'kr', 'jp'];

    const languageName = languages.map((item) => {
      return {
        header: item + '-name',
        key: item,
        width: 15,
      };
    });

    const languageNameCol = languages.map((item) => {
      if (item != 'en') item + 'Name';
    });

    worksheet.columns = [
      { header: 'product_id', key: 'id', width: 10 },
      { header: 'unit', key: 'unit', width: 15 },
      ...languageName,
    ];

    // data = data.slice(0, 1000);
    data.forEach((item: Product) => {
      worksheet.addRow({
        id: item.id,
        unit: item.unit,
        en: item.name,
        ...languageNameCol,
      });
    });
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  async update() {
    const data = await this.productTranslateRepository.find({
      where: { unit: IsNull() },
      relations: ['product'],
    });

    // data.forEach(async (item) => {
    //   await this.productTranslateRepository.update(item.id, {
    //     unit: item.product.unit,
    //   });
    // });

    return data;
  }

  async updateOne() {
    const data = await this.productRepository.find({
      where: { photos: '' },
    });

    data.forEach(async (item) => {
      await this.productRepository.update(item.id, {
        photos: item.thumbnail_img,
      });
    });

    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async translationSampleExcel() {
    const data = await this.translateRepository.find({
      where: { lang: 'en' },
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('MySheet');
    worksheet.columns = [
      { header: 'Lang Key', key: 'key', width: 40 },
      { header: 'Lang En', key: 'lengEn', width: 40 },
      { header: 'Lang Cn', key: 'lengCn', width: 40 },
      { header: 'Lang Kr', key: 'lengKr', width: 40 },
      { header: 'Lang Jp', key: 'lengJp', width: 40 },
    ];

    data.forEach((item: Translation) => {
      worksheet.addRow({
        key: item.lang_key,
        lengEn: item.lang_value,
        lengCn: '',
        lengKr: '',
        lengJp: '',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  async updateTranslation(file: Express.Multer.File) {
    const workbook = new ExcelJS.Workbook();
    const key = appTranslateKey;

    const lang = languageCode;

    // this.language
    // Read the Excel file
    await workbook.xlsx.readFile(file.path);

    const worksheet = workbook.worksheets[0];
    let count = 0;
    worksheet.eachRow(async (row, rowIndex) => {
      lang.forEach(async (item) => {
        try {
          const data = await this.translateRepository.findOne({
            where: { lang_key: row.values[key.langKey], lang: item },
          });

          if (data) {
            if (
              data.lang_value == row.values[key['lang' + item]] ||
              !data.lang_value
            ) {
              await this.translateRepository.update(data.id, {
                lang_value: row.values[key['lang' + item]].result,
              });
            }
          } else {
            await this.translateRepository.insert({
              lang_key: row.values[key.langKey],
              lang: item,
              lang_value: row.values[key['lang' + item]].result,
            });
          }
        } catch (e) {
          console.log(e);
        }
      });
    });

    return 'This action adds translation';
  }
}
