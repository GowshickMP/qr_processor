import axios, { AxiosRequestConfig } from 'axios';

const API_URL = process.env.REACT_APP_API_URL

export const CAMPAIGN_BY_ID_URL = `${API_URL}/ro_list_by_cam_id`

export function getCampaignById(id) {
    return axios.get(CAMPAIGN_BY_ID_URL+'/'+id)
    .then(res => res.data)
}