import axios from 'axios';

class RecordService {
  constructor() {
    this.httpclient = axios.create({
      baseURL: 'http://34.134.185.2/record',
      headers: { 'Content-type': 'application/json' },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  getHeapMap() {
    // return this.httpclient.get('/record/getHeatMap');
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
