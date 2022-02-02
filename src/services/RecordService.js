import axios from 'axios';

class RecordService {
  constructor() {
    this.httpclient = axios.create({
      baseURL: 'http://34.134.185.2/record',
      headers: { 'Content-type': 'application/json' },
    });
  }

  getIndexForLocations(location) {
    return this.httpclient.post('/record/getIndexForLocations', location);
  }

  uploadRecord(record) {
    return this.httpclient.post('/record/uploadRecord', record);
  }

  uploadStatus(status) {
    return this.httpclient.post('/record/uploadStatus', status);
  }
}

export default new RecordService();
