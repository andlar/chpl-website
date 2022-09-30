import { useQuery } from 'react-query';

import { useAxios } from './axios';
import options from './options';

const useFetchApiDocumentationCollection = ({
  orderBy,
  pageNumber,
  pageSize,
  sortDescending,
  query,
}) => {
  const axios = useAxios();
  return useQuery(['search/v2', {
    orderBy, pageNumber, pageSize, sortDescending, query,
  }], async () => {
    const response = await axios.get(`/search/v2?${query}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBy=${orderBy}&sortDescending=${sortDescending}`);
    return response.data;
  }, { keepPreviousData: true });
};

const useFetchApiDocumentationData = () => {
  const axios = useAxios();
  return useQuery(['files/api_documentation/details'], async () => {
    const response = await axios.get('/files/api_documentation/details');
    return response.data;
  }, options.daily);
};

const useFetchBannedDevelopersCollection = ({
  orderBy,
  pageNumber,
  pageSize,
  sortDescending,
  query,
}) => {
  const axios = useAxios();
  return useQuery(['developers/search', {
    orderBy, pageNumber, pageSize, sortDescending, query,
  }], async () => {
    const response = await axios.get(`/developers/search?statuses=Under certification ban by ONC&${query}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBy=${orderBy}&sortDescending=${sortDescending}`);
    return response.data;
  }, { keepPreviousData: true });
};

const useFetchRealWorldTestingCollection = ({
  orderBy,
  pageNumber,
  pageSize,
  sortDescending,
  query,
}) => {
  const axios = useAxios();
  return useQuery(['search/v2', {
    orderBy, pageNumber, pageSize, sortDescending, query,
  }], async () => {
    const response = await axios.get(`/search/v2?${query}&pageNumber=${pageNumber}&pageSize=${pageSize}&orderBy=${orderBy}&sortDescending=${sortDescending}`);
    return response.data;
  }, { keepPreviousData: true });
};

export {
  useFetchApiDocumentationCollection,
  useFetchApiDocumentationData,
  useFetchBannedDevelopersCollection,
  useFetchRealWorldTestingCollection,
};
