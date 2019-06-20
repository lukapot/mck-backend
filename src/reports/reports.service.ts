import { BadRequestException, Injectable } from '@nestjs/common';
import * as database from '../../assets/reports.json';
import { Report } from '../graphql.schema';
import { UpdateReportDto } from './dto/update-reports';

@Injectable()
export class ReportsService {
  private reportsDatabase: any = database;

  public async findOneById(id: string): Promise<Report> {
    const report = this.reportsDatabase.find(r => r.id === id);
    return report;
  }

  public async getList(): Promise<Report[]> {
    const list = this.reportsDatabase;
    return list;
  }

  public async update(doc: UpdateReportDto): Promise<Report> {
    const reportIndex = this.reportsDatabase.findIndex(r => r.id === doc.id);
    if (reportIndex < 0){
      throw new BadRequestException('Report doesnt exist');
    }
    const originalReport = this.reportsDatabase[reportIndex];
    this.reportsDatabase[reportIndex] = {
      ...originalReport,
      ...doc,
    };
    const updatedReport = await this.findOneById(doc.id);
    return updatedReport;
  }

}
