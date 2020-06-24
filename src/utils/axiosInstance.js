import axiosBase from 'axios';

const DOMAIN = 'https://mockup-api.herokuapp.com/';

export const AUTH_TOKEN = 'auth_token';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const instance = axiosBase.create({
  baseURL: DOMAIN,
  headers,
});

export const axios = instance;
