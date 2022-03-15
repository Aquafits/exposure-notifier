import axios from 'axios';

class RecordService {
  constructor() {
    this.httpclient = axios.create({
      baseURL: 'https://api.macoredroid295homework.com/record/',
      headers: { 'Content-type': 'application/json' },
    });
  }

  getCasesByDay() {
    return this.httpclient.get('getDailyCases');
  }

  getDailyCases(dailyCasesDTO) {
    return this.httpclient.post('getDailyCases', dailyCasesDTO);
  }

  getStatus(getStatusDTO) {
    return this.httpclient.post('getStatus', getStatusDTO);
  }

  getHeatMapByActiveCases() {
    return this.httpclient.get('getHeatMapByActiveCases');
  }

  getHeatMapByExposedCases() {
    return this.httpclient.get('getHeatMapByExposedCases');
  }

  getIndexForLocations(locationInfoDTO) {
    return this.httpclient.post('getIndexForLocations', locationInfoDTO);
  }

  uploadRecord(recordDTO) {
    return this.httpclient.post('uploadRecord', recordDTO);
  }

  uploadStatus(statusDTO) {
    return this.httpclient.post('uploadStatus', statusDTO);
  }
}

export default new RecordService();
