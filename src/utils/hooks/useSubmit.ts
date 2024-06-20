import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { listAtom } from '@/state';

interface useSubmitParams {
  type: 'text' | 'image';
  input: string;
}

const useSubmit = (params: useSubmitParams) => {
  const { type, input } = params;
  const [data, setData] = useRecoilState(listAtom);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const url = type === 'text'
    ? '/api/process-text'
    : '/api/process-image';

  useEffect(() => {
    const fetchData = async () => {
      if (!input) {
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        console.log('doing a fetch');
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ data: input }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error(jsonData.error || 'There was an error fetching data');
        }
        setData(jsonData.data);
      } catch (error: any) {
        setError(error?.message || 'There was an error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, input, url, setData]);

  return { data, isLoading, error, setError };
};

export default useSubmit;