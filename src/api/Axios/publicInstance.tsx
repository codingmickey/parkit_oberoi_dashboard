import axios from 'axios';
import { BASE_URL } from '../utils';

const axiosPublicInstance = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzcGFjZVByb3ZpZGVySWQiOjI0LCJmdWxsTmFtZSI6IkdvcmVnb2FuIFNwb3J0cyBDbHViIiwiZW1haWxJZCI6ImFuaWtldC5wYXRpbEBnc2MuaW4iLCJBTlBSUHVibGljIjpmYWxzZSwiQU5QUlJlc2lkZW50aWFsIjpmYWxzZSwiUkZJRENvcnBvcmF0ZSI6ZmFsc2UsIlJGSURSZXNpZGVudGlhbCI6ZmFsc2UsImNsdWIiOnRydWUsIm9pcyI6ZmFsc2UsImlhdCI6MTY4NzE1Njc1NX0.AwxecgJufBA0Z8F1dhia7_KKgNTjUeymAPXZhcRykCg'
  }
});

export default axiosPublicInstance;
