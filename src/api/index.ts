import ApiClientProd from './apiClient';
import ApiClientTest from './testApiClient';

const useTestApi = import.meta.env.VITE_USE_TEST_API === 'true';
const ApiClient = useTestApi ? ApiClientTest : ApiClientProd;

export default ApiClient;