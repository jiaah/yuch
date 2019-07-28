import mockAxios from 'axios';
import { mockStore } from '../setupTests';
import { API_HOST } from '../../../config';

const store = mockStore({});

it('calls login axios and returns user info object', async () => {
  const url = `${API_HOST}/auth/login`;
  mockAxios.post.mockImplementationOnce(url =>
    Promise.resolve({
      status: 200,
      data: {
        token: '8f5af680-973e-11e4-ad43-4ee58e9a13a6',
        id: '8f5af680-973e-11e4-ad43-a13a6',
        companyName: 'yuch',
        isAdmin: 'true',
      },
    }),
  );
  // expect(mockAxios.post).toHaveBeenCalledTimes(1);
  // expect(mockAxios.get).toHaveBeenCalledWith(url, {
  //   username,
  //   password,
  // });
});
