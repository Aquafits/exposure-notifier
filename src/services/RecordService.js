import axios from 'axios';

class RecordService {
  constructor() {
    this.httpclient = axios.create({
      baseURL: 'https://macoredroid295homework.com/record',
      headers: { 'Content-type': 'application/json' },
    });
  }

  getHeatMapByActiveCases() {
    return this.httpclient.get('/record/getHeatMapByActiveCases');
  }

  getHeatMapByExposedCases() {
    return this.httpclient.get('/record/getHeatMapByExposedCases');
  }

  getIndexForLocations(locationInfoDTO) {
    return this.httpclient.post('/record/getIndexForLocations', locationInfoDTO);
  }

  uploadRecord(recordDTO) {
    return this.httpclient.post('/record/uploadRecord', recordDTO);
  }

  uploadStatus(statusDTO) {
    return this.httpclient.post('/record/uploadStatus', statusDTO);
  }
}

export default new RecordService();
